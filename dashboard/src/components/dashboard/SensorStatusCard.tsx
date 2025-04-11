import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSensorData } from '@/hooks/useSensorData';
import { useState, useEffect } from 'react';

interface SensorStatusCardProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: "online" | "offline";
  optimal?: {
    min: number;
    max: number;
  };
  lastUpdated: string;
  sensorType: 'soil_moisture' | 'field_temperature' | 'water_usage';
}

export function SensorStatusCard({
  title,
  value: initialValue,
  unit,
  min,
  max,
  status: initialStatus,
  optimal,
  lastUpdated: initialLastUpdated,
  sensorType,
}: SensorStatusCardProps) {
  const { sensorData, error } = useSensorData();
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState(initialStatus);
  const [lastUpdated, setLastUpdated] = useState(initialLastUpdated);

  useEffect(() => {
    if (sensorData) {
      setValue(sensorData[sensorType]);
      setStatus('online');
      setLastUpdated(new Date(sensorData.timestamp).toLocaleString());
    }
  }, [sensorData, sensorType]);

  const percentage = ((value - min) / (max - min)) * 100;
  
  // Determine if value is within optimal range
  let color = "#2E7D32"; // default green
  if (optimal) {
    if (value < optimal.min) {
      color = "#1976D2"; // blue for low
    } else if (value > optimal.max) {
      color = "#FF9800"; // orange for high
    }
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center text-xs">
          <div className={`h-4 w-4 relative mr-2 ${status === 'online' ? 'sensor-status-online' : 'sensor-status-offline'}`}></div>
          <span>{status === "online" ? "Online" : "Offline"}</span>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={percentage}
              minValue={0}
              maxValue={100}
              text={`${value}${unit}`}
              styles={buildStyles({
                textSize: '22px',
                pathColor: color,
                textColor: 'currentColor',
              })}
            />
          </div>
        </div>
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          <div>{min}{unit}</div>
          <div>{max}{unit}</div>
        </div>
        {optimal && (
          <div className="w-full mt-1 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-agro-green" 
              style={{
                width: `${(optimal.max - optimal.min) / (max - min) * 100}%`,
                marginLeft: `${(optimal.min - min) / (max - min) * 100}%`
              }}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <p className="w-full text-center text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
      </CardFooter>
    </Card>
  );
}
