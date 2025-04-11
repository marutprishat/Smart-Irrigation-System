
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SoilMoistureChartProps {
  data: {
    time: string;
    moisture: number;
    optimalMin?: number;
    optimalMax?: number;
  }[];
}

export function SoilMoistureChart({ data }: SoilMoistureChartProps) {
  // Add optimal range to each data point if not already there
  const chartData = data.map(point => {
    return {
      ...point,
      optimalMin: point.optimalMin || 30,
      optimalMax: point.optimalMax || 60
    };
  });
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Soil Moisture Trend</CardTitle>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-agro-blue"></div>
            <span className="text-xs">Moisture</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-agro-green opacity-30"></div>
            <span className="text-xs">Optimal Range</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-1">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              className="area-chart"
            >
              <defs>
                <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976D2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1976D2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOptimal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                tickLine={false} 
                axisLine={false} 
                domain={[0, 100]} 
                unit="%" 
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, "Moisture"]}
                labelFormatter={(label) => `Time: ${label}`} 
              />
              
              {/* Area for optimal range */}
              <Area 
                type="monotone" 
                dataKey="optimalMax"
                stroke="none" 
                fill="url(#colorOptimal)" 
                fillOpacity={1} 
                isAnimationActive={false}
                stackId="1"
              />
              <Area 
                type="monotone" 
                dataKey="optimalMin" 
                stroke="none"
                fill="#fff" 
                fillOpacity={1} 
                isAnimationActive={false}
                stackId="1" 
              />
              
              {/* Line for moisture */}
              <Area 
                type="monotone" 
                dataKey="moisture" 
                stroke="#1976D2" 
                strokeWidth={2}
                fill="url(#colorMoisture)" 
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
