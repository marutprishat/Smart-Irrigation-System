from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3
import os

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 