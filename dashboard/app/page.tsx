// app/page.tsx
'use client';

import { Card, Title, Text, Tab, TabList, TabGroup, Button } from '@tremor/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowPathIcon, BellIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Types
interface SensorData {
  device_id: string;
  temperature: number;
  humidity: number;
  soil_moisture: number;
  battery_level: number;
  timestamp: string;
}


interface MetricCardData {
  value: number;
  label: string;
  color: 'blue' | 'yellow' | 'green';
  unit: string;
  max: number;
}

const CircularGauge = ({ value, max, label, color, unit }: MetricCardData) => {
  const radius = 40;
  const strokeWidth = 8;
  const normalizedValue = (value / max) * 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  const getColorClass = (color: 'blue' | 'yellow' | 'green') => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      yellow: 'from-amber-400 to-amber-500',
      green: 'from-emerald-400 to-emerald-500'
    } as const;
    return colorMap[color];
  };

  return (
    <div className="relative w-44 h-44 mx-auto group">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-inner" />
      <svg className="w-full h-full transform -rotate-90 transition-transform duration-300 group-hover:scale-105">
        <circle
          className="text-gray-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="88"
          cy="88"
        />
        <circle
          className={`transition-all duration-700 ease-out stroke-current text-${color}-500`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="88"
          cy="88"
        >
          <animate
            attributeName="stroke-dashoffset"
            from={circumference}
            to={strokeDashoffset}
            dur="1.5s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4 0 0.2 1"
          />
        </circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold bg-gradient-to-r ${getColorClass(color)} bg-clip-text text-transparent transition-all duration-300`}>
          {value}{unit}
        </span>
        <span className="text-sm text-gray-600 mt-2 font-medium tracking-wide uppercase">{label}</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sensor-data/esp8266-01');
      if (!response.ok) throw new Error('Failed to fetch sensor data');
      const data = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sensor data');
      console.error('Error fetching sensor data:', err);
    }
  };



  useEffect(() => {
    fetchSensorData();
    
    
    const interval = setInterval(() => {
      fetchSensorData();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const sensorCards = sensorData ? [
    { value: sensorData.temperature, label: 'Temperature', color: 'blue' as const, unit: '°C', max: 50 },
    { value: sensorData.humidity, label: 'Humidity', color: 'yellow' as const, unit: '%', max: 100 },
    { value: sensorData.soil_moisture, label: 'Soil Moisture', color: 'green' as const, unit: '%', max: 100 }
  ] : [];


  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Title className="text-red-600 mb-4">Error</Title>
          <Text>{error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 backdrop-blur-sm bg-white/50">
          <div>
            <Title className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              IoT Agricultural Monitoring
            </Title>
            <Text className="text-gray-600 text-lg">Real-time sensor data from your farm</Text>
          </div>
        </div>



        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {sensorCards.map((sensor) => (
            <Card
              key={sensor.label}
              className="p-8 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-gray-100/50 backdrop-blur-sm bg-white/50"
              decoration="top"
              decorationColor={sensor.color}
            >
              <CircularGauge {...sensor} />
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
