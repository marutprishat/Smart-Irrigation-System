import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SensorStatusCard } from "@/components/dashboard/SensorStatusCard";
import { IrrigationStatusCard } from "@/components/dashboard/IrrigationStatusCard";
import { DeviceStatusCard } from "@/components/dashboard/DeviceStatusCard";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { SoilMoistureChart } from "@/components/dashboard/SoilMoistureChart";
import { Activity, Droplets, Gauge, Thermometer } from "lucide-react";
import { useSensorData } from "@/hooks/useSensorData";

const weatherForecast = [
  { day: "Today", temperature: { min: 23, max: 29 }, condition: "Sunny", icon: "☀️" },
  { day: "Tomorrow", temperature: { min: 20, max: 27 }, condition: "Cloudy", icon: "⛅" },
  { day: "Wed", temperature: { min: 19, max: 25 }, condition: "Rain", icon: "🌧️" },
];

const Index = () => {
  const { sensorData, error, isConnected } = useSensorData();

  // Generate soil moisture data for the chart
  const soilMoistureData = [
    { time: "00:00", moisture: 45 },
    { time: "03:00", moisture: 40 },
    { time: "06:00", moisture: 35 },
    { time: "09:00", moisture: 30 },
    { time: "12:00", moisture: 25 },
    { time: "15:00", moisture: 35 },
    { time: "18:00", moisture: 40 },
    { time: "21:00", moisture: 52 },
    { time: "Now", moisture: sensorData?.soil_moisture || 48 },
  ];

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold">AgroNet-4-BHARAT Dashboard</h1>
        
        {/* Connection Status */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Average Soil Moisture" 
            value={`${sensorData?.soil_moisture || 0}%`}
            icon={Gauge}
            trend={{ value: 5, positive: true }}
            description="Across all active sensors"
          />
          <StatCard 
            title="Field Temperature" 
            value={`${sensorData?.field_temperature || 0}°C`}
            icon={Thermometer}
            trend={{ value: 2, positive: true }}
            description="Average from all nodes"
          />
          <StatCard 
            title="Water Usage" 
            value={`${sensorData?.water_usage || 0}L`}
            icon={Droplets}
            trend={{ value: 10, positive: false }}
            description="Total water used today"
          />
          <StatCard 
            title="System Status" 
            value={isConnected ? "Online" : "Offline"}
            icon={Activity}
            trend={{ value: 0, positive: isConnected }}
            description="Connection status"
          />
        </div>

        {/* Sensor Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SensorStatusCard
            title="Soil Moisture"
            value={sensorData?.soil_moisture || 0}
            unit="%"
            min={0}
            max={100}
            status={isConnected ? "online" : "offline"}
            optimal={{ min: 30, max: 70 }}
            lastUpdated={sensorData?.timestamp ? new Date(sensorData.timestamp).toLocaleString() : "Never"}
            sensorType="soil_moisture"
          />
          <SensorStatusCard
            title="Field Temperature"
            value={sensorData?.field_temperature || 0}
            unit="°C"
            min={0}
            max={50}
            status={isConnected ? "online" : "offline"}
            optimal={{ min: 15, max: 35 }}
            lastUpdated={sensorData?.timestamp ? new Date(sensorData.timestamp).toLocaleString() : "Never"}
            sensorType="field_temperature"
          />
          <IrrigationStatusCard
            zone="Main Field"
            status={sensorData?.water_usage ? "active" : "idle"}
            progress={sensorData?.water_usage ? 50 : 0}
            waterUsed={sensorData?.water_usage || 0}
            duration={{ elapsed: 30, total: 60 }}
          />
        </div>

        {/* Charts and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SoilMoistureChart data={soilMoistureData} />
          <WeatherWidget 
            temperature={sensorData?.field_temperature || 25}
            humidity={65}
            precipitation={0}
            windSpeed={12}
            forecast={weatherForecast}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
