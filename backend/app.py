from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3
import os
import kubernetes.client
from kubernetes import client, config
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Kubernetes client
try:
    # Try to load in-cluster config first (for production)
    config.load_incluster_config()
    logger.info("Loaded in-cluster Kubernetes configuration")
except:
    try:
        # Try to load kubeconfig (for local development)
        config.load_kube_config()
        logger.info("Loaded local Kubernetes configuration")
    except:
        logger.warning("Running without Kubernetes support - deployment features will be limited")

# Initialize Kubernetes API client
try:
    k8s_client = kubernetes.client.ApiClient()
    k8s_apps_v1 = kubernetes.client.AppsV1Api(k8s_client)
    k8s_core_v1 = kubernetes.client.CoreV1Api(k8s_client)
    logger.info("Kubernetes client initialized successfully")
except:
    logger.warning("Failed to initialize Kubernetes client - running in development mode")
    k8s_client = None

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('sensor_data.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS sensor_readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT NOT NULL,
            temperature REAL,
            humidity REAL,
            soil_moisture REAL,
            battery_level REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT NOT NULL UNIQUE,
            mac_address TEXT NOT NULL UNIQUE,
            firmware_version TEXT,
            last_seen DATETIME,
            status TEXT DEFAULT 'offline',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/api/sensor-data', methods=['POST'])
def receive_sensor_data():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['device_id', 'temperature', 'humidity', 'soil_moisture', 'battery_level']
        if not all(field in data for field in required_fields):
            return jsonify({
                "error": "Missing required fields",
                "required_fields": required_fields
            }), 400

        # Store in database
        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO sensor_readings 
            (device_id, temperature, humidity, soil_moisture, battery_level)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['device_id'],
            data['temperature'],
            data['humidity'],
            data['soil_moisture'],
            data['battery_level']
        ))
        conn.commit()
        conn.close()

        return jsonify({"message": "Data received and stored successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sensor-data/<device_id>', methods=['GET'])
def get_sensor_data(device_id):
    try:
        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        
        # Get the latest reading for the device
        c.execute('''
            SELECT temperature, humidity, soil_moisture, battery_level, timestamp
            FROM sensor_readings
            WHERE device_id = ?
            ORDER BY timestamp DESC
            LIMIT 1
        ''', (device_id,))
        
        row = c.fetchone()
        conn.close()
        
        if row:
            return jsonify({
                "temperature": row[0],
                "humidity": row[1],
                "soil_moisture": row[2],
                "battery_level": row[3],
                "timestamp": row[4]
            }), 200
        else:
            return jsonify({"error": "No data found for device"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sensor-data/<device_id>/history', methods=['GET'])
def get_sensor_history(device_id):
    try:
        hours = request.args.get('hours', default=24, type=int)
        
        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        
        # Get historical data for the specified time range
        c.execute('''
            SELECT temperature, humidity, soil_moisture, battery_level, timestamp
            FROM sensor_readings
            WHERE device_id = ?
            AND timestamp >= datetime('now', '-' || ? || ' hours')
            ORDER BY timestamp DESC
        ''', (device_id, hours))
        
        rows = c.fetchall()
        conn.close()
        
        if rows:
            return jsonify([{
                "temperature": row[0],
                "humidity": row[1],
                "soil_moisture": row[2],
                "battery_level": row[3],
                "timestamp": row[4]
            } for row in rows]), 200
        else:
            return jsonify({"error": "No historical data found for device"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/devices/register', methods=['POST'])
def register_device():
    try:
        data = request.get_json()
        required_fields = ['device_id', 'mac_address']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        
        # Check if device already exists
        c.execute('SELECT * FROM devices WHERE device_id = ? OR mac_address = ?',
                 (data['device_id'], data['mac_address']))
        if c.fetchone():
            conn.close()
            return jsonify({"error": "Device already registered"}), 409

        # Register new device
        c.execute('''
            INSERT INTO devices (device_id, mac_address, status)
            VALUES (?, ?, 'online')
        ''', (data['device_id'], data['mac_address']))
        
        conn.commit()
        conn.close()
        
        return jsonify({"message": "Device registered successfully"}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/devices/<device_id>/deploy', methods=['POST'])
def deploy_firmware(device_id):
    try:
        # Get device info
        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        c.execute('SELECT * FROM devices WHERE device_id = ?', (device_id,))
        device = c.fetchone()
        conn.close()
        
        if not device:
            return jsonify({"error": "Device not found"}), 404

        if k8s_client is None:
            return jsonify({
                "message": "Development mode: Firmware deployment simulated",
                "ota_url": f"http://localhost:8080/firmware/{device_id}.bin"
            }), 200

        # Create Kubernetes deployment for the device
        deployment = {
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "metadata": {
                "name": f"esp8266-{device_id}",
                "namespace": "farm-iot"
            },
            "spec": {
                "replicas": 1,
                "selector": {
                    "matchLabels": {
                        "app": "esp-device",
                        "device-id": device_id
                    }
                },
                "template": {
                    "metadata": {
                        "labels": {
                            "app": "esp-device",
                            "device-id": device_id
                        }
                    },
                    "spec": {
                        "containers": [{
                            "name": "ota-server",
                            "image": "farm-iot-registry/esp-firmware:latest",
                            "ports": [{"containerPort": 80}]
                        }]
                    }
                }
            }
        }

        # Create the deployment
        k8s_apps_v1.create_namespaced_deployment(
            namespace="farm-iot",
            body=deployment
        )

        return jsonify({
            "message": "Firmware deployment initiated",
            "ota_url": f"http://ota-server-{device_id}.farm-iot.local/firmware.bin"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/devices', methods=['GET'])
def get_devices():
    try:
        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        c.execute('SELECT * FROM devices')
        devices = c.fetchall()
        conn.close()
        
        return jsonify([{
            "device_id": device[1],
            "mac_address": device[2],
            "firmware_version": device[3],
            "last_seen": device[4],
            "status": device[5]
        } for device in devices]), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sensor-data', methods=['GET'])
def get_default_sensor_data():
    """Endpoint to get data for a default device (for testing)"""
    try:
        conn = sqlite3.connect('sensor_data.db')
        c = conn.cursor()
        
        # Get the latest reading for any device
        c.execute('''
            SELECT temperature, humidity, soil_moisture, battery_level, timestamp
            FROM sensor_readings
            ORDER BY timestamp DESC
            LIMIT 1
        ''')
        
        row = c.fetchone()
        conn.close()
        
        if row:
            return jsonify({
                "temperature": row[0],
                "humidity": row[1],
                "soil_moisture": row[2],
                "battery_level": row[3],
                "timestamp": row[4]
            }), 200
        else:
            return jsonify({"error": "No data found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 