
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudSun, Droplets, Thermometer, Wind } from "lucide-react";

// Mock weather data
const weatherData = {
  current: {
    temp: 24,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    precipitation: 0
  },
  forecast: [
    { day: "Today", high: 24, low: 18, condition: "Partly Cloudy", precipitation: 10 },
    { day: "Tomorrow", high: 22, low: 17, condition: "Light Rain", precipitation: 40 },
    { day: "Wed", high: 26, low: 19, condition: "Sunny", precipitation: 0 },
    { day: "Thu", high: 25, low: 20, condition: "Mostly Sunny", precipitation: 5 },
    { day: "Fri", high: 23, low: 18, condition: "Scattered Showers", precipitation: 30 },
  ]
};

const WeatherForecast: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-sky-400 pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <CloudSun size={20} />
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="current">
          <TabsList className="w-full rounded-none bg-sky-100 grid grid-cols-2">
            <TabsTrigger value="current" className="data-[state=active]:bg-white">Current</TabsTrigger>
            <TabsTrigger value="forecast" className="data-[state=active]:bg-white">5-Day Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="p-4 m-0">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-soil-800 mb-2">{weatherData.current.temp}°C</div>
              <div className="text-lg mb-4">{weatherData.current.condition}</div>
              
              <div className="grid grid-cols-3 gap-4 w-full mt-2">
                <div className="flex flex-col items-center">
                  <Droplets size={18} className="text-sky-400 mb-1" />
                  <div className="text-sm font-medium">{weatherData.current.humidity}%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
                <div className="flex flex-col items-center">
                  <Wind size={18} className="text-sky-400 mb-1" />
                  <div className="text-sm font-medium">{weatherData.current.windSpeed} km/h</div>
                  <div className="text-xs text-muted-foreground">Wind</div>
                </div>
                <div className="flex flex-col items-center">
                  <Droplets size={18} className="text-sky-400 mb-1" />
                  <div className="text-sm font-medium">{weatherData.current.precipitation}%</div>
                  <div className="text-xs text-muted-foreground">Precipitation</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="forecast" className="p-0 m-0">
            <div className="divide-y divide-gray-100">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4">
                  <div className="w-24">
                    <div className="font-medium">{day.day}</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <CloudSun size={18} className="text-sky-400" />
                    <span className="text-sm">{day.condition}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Droplets size={16} className="text-sky-400" />
                    <span className="text-sm">{day.precipitation}%</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-muted-foreground ml-2">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
