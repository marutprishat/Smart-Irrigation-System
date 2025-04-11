
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Droplets, Thermometer, Wind } from "lucide-react";

interface WeatherWidgetProps {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  forecast: {
    day: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: string;
    icon: string;
  }[];
}

export function WeatherWidget({
  temperature,
  humidity,
  precipitation,
  windSpeed,
  forecast
}: WeatherWidgetProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Weather Conditions</CardTitle>
        <Cloud className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-3xl font-bold">{temperature}°C</p>
            <p className="text-xs text-muted-foreground">Current Temperature</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-agro-blue" />
              <span>{humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-agro-blue" />
              <span>{precipitation} mm</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              <span>{windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-agro-green" />
              <span>Feels like {temperature - 1}°C</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-xs font-medium mb-2">3-Day Forecast</h4>
          <div className="grid grid-cols-3 gap-2">
            {forecast.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-md">
                <span className="text-xs font-medium">{day.day}</span>
                <span className="text-lg mt-1">{day.icon}</span>
                <div className="flex gap-2 text-xs mt-1">
                  <span className="text-muted-foreground">{day.temperature.min}°</span>
                  <span className="font-medium">{day.temperature.max}°</span>
                </div>
                <span className="text-xs mt-1">{day.condition}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
