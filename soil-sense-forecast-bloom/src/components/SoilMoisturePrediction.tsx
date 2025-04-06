
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets } from "lucide-react";

// Mock moisture prediction data
const moistureData = [
  { day: 'Today', actual: 42, predicted: 42 },
  { day: 'Tomorrow', actual: null, predicted: 38 },
  { day: 'Wed', actual: null, predicted: 35 },
  { day: 'Thu', actual: null, predicted: 32 },
  { day: 'Fri', actual: null, predicted: 30 },
  { day: 'Sat', actual: null, predicted: 36 },
  { day: 'Sun', actual: null, predicted: 40 },
];

const SoilMoisturePrediction: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-sky-100 pb-3">
        <CardTitle className="text-soil-800 flex items-center gap-2">
          <Droplets size={20} className="text-sky-400" />
          Soil Moisture Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={moistureData}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis
                domain={[0, 60]}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip formatter={(value) => [`${value}%`, 'Moisture']} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual" 
                stroke="#3E6B48" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                name="Predicted" 
                stroke="#4A90E2" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 p-2 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Prediction:</span> Moisture levels will drop to 30% by Friday due to forecasted high temperatures. Consider irrigation on Thursday to maintain optimal levels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilMoisturePrediction;
