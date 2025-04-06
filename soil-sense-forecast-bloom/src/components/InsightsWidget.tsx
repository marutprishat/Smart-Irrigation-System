
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

// Mock insights data
const insights = [
  { 
    type: 'warning', 
    message: 'Nitrogen levels 12% below optimal range. Consider fertilization within 7 days.',
    time: '2 hours ago' 
  },
  { 
    type: 'info', 
    message: 'Weather forecast indicates dry conditions for next 5 days. Consider adjusting irrigation schedule.',
    time: '4 hours ago' 
  },
  { 
    type: 'success', 
    message: 'Soil pH has stabilized within optimal range after lime application.',
    time: '1 day ago' 
  },
];

const InsightsWidget: React.FC = () => {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="bg-amber-50 pb-3">
        <CardTitle className="text-soil-800 flex items-center gap-2">
          <Lightbulb size={20} className="text-amber-500" />
          Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-auto">
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="p-3 bg-white border rounded-md shadow-sm">
              <div className="flex gap-2 items-start">
                {insight.type === 'warning' && (
                  <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                )}
                {insight.type === 'info' && (
                  <Lightbulb size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
                )}
                {insight.type === 'success' && (
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{insight.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      {insight.time}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsWidget;
