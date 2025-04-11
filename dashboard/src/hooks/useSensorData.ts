import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface SensorData {
  device_id: string;
  soil_moisture: number;
  field_temperature: number;
  water_usage: number;
  timestamp: string;
}

export function useSensorData() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:8000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      setError(null);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to server');
      setIsConnected(false);
    });

    socket.on('sensor_update', (data: SensorData) => {
      console.log('Received sensor update:', data);
      setSensorData(data);
      setError(null);
    });

    socket.on('error', (err: string) => {
      console.error('Socket error:', err);
      setError(err);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { sensorData, error, isConnected };
} 