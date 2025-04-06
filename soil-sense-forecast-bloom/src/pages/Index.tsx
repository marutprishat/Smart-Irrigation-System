
import React from 'react';
import Header from '@/components/Header';
import SoilMetricsCard from '@/components/SoilMetricsCard';
import WeatherForecast from '@/components/WeatherForecast';
import CropNutrition from '@/components/CropNutrition';
import SoilMoisturePrediction from '@/components/SoilMoisturePrediction';
import InsightsWidget from '@/components/InsightsWidget';
import { Droplets, Thermometer, Pill, Gauge, FlaskConical } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-soil-50 soil-pattern-bg flex flex-col">
      <Header />

      <main className="flex-1 container py-6">
        <div className="grid gap-4 md:gap-6">
          <section>
            <h2 className="text-xl font-semibold text-soil-800 mb-3">Soil Health Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <SoilMetricsCard 
                title="Moisture" 
                value={42} 
                unit="%" 
                description="Water content in soil" 
                optimal={[35, 50]}
                icon={<Droplets size={16} className="text-sky-400" />}
              />
              <SoilMetricsCard 
                title="Temperature" 
                value={22} 
                unit="°C" 
                description="Soil temperature at 10cm depth" 
                optimal={[18, 24]}
                icon={<Thermometer size={16} className="text-amber-500" />}
              />
              <SoilMetricsCard 
                title="pH Level" 
                value={6.5} 
                unit="" 
                description="Soil acidity/alkalinity" 
                optimal={[6.0, 7.0]}
                icon={<FlaskConical size={16} className="text-purple-500" />}
              />
              <SoilMetricsCard 
                title="Nutrients" 
                value={68} 
                unit="%" 
                description="Overall nutrient index" 
                optimal={[70, 90]}
                icon={<Pill size={16} className="text-green-500" />}
              />
              <SoilMetricsCard 
                title="Conductivity" 
                value={1.2} 
                unit="dS/m" 
                description="Electrical conductivity" 
                optimal={[0.8, 1.5]}
                icon={<Gauge size={16} className="text-gray-500" />}
              />
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <CropNutrition />
            </div>
            <div>
              <WeatherForecast />
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <SoilMoisturePrediction />
            </div>
            <div className="h-full">
              <InsightsWidget />
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-soil-800 text-white py-3 px-4 text-center text-sm">
        <p>© 2025 SoilSense IIT | Soil Monitoring & Prediction System</p>
      </footer>
    </div>
  );
};

export default Index;
