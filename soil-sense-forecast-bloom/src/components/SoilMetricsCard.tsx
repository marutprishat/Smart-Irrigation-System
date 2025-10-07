
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SoilMetricProps = {
  title: string;
  value: number;
  unit: string;
  description: string;
  optimal: [number, number];
  icon?: React.ReactNode;
}

const SoilMetricsCard: React.FC<SoilMetricProps> = ({ 
  title, 
  value, 
  unit, 
  description,
  optimal,
  icon 
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - optimal[0]) / (optimal[1] - optimal[0])) * 100));
  
  let statusColor = "bg-amber-500"; // Default warning
  if (value >= optimal[0] && value <= optimal[1]) {
    statusColor = "bg-green-500"; // Optimal
  } else if (value < optimal[0] * 0.8 || value > optimal[1] * 1.2) {
    statusColor = "bg-red-500"; // Critical
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-soil-50 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-soil-800">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-2xl font-bold text-soil-800">{value}{unit}</span>
          <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
        </div>
        
        <Progress value={percentage} className="h-2 mb-2" />
        
        <div className="flex justify-between text-xs text-soil-600">
          <span>{optimal[0]}{unit}</span>
          <span>Optimal</span>
          <span>{optimal[1]}{unit}</span>
        </div>
        
        <p className="mt-3 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default SoilMetricsCard;
