
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Leaf, BarChart2, AlertTriangle } from "lucide-react";

// Mock nutrition data
const nutritionData = {
  current: {
    nitrogen: 68,
    phosphorus: 42,
    potassium: 85,
    calcium: 70,
    magnesium: 60,
    sulfur: 55,
    iron: 75,
  },
  recommended: {
    nitrogen: 80,
    phosphorus: 60,
    potassium: 90,
    calcium: 75,
    magnesium: 65,
    sulfur: 50,
    iron: 70,
  },
  deficit: {
    nitrogen: 12,
    phosphorus: 18,
    potassium: 5,
    calcium: 5,
    magnesium: 5,
    sulfur: 0,
    iron: 0,
  }
};

// Convert to chart format
const chartData = Object.keys(nutritionData.current).map(nutrient => ({
  name: nutrient.charAt(0).toUpperCase() + nutrient.slice(1),
  current: nutritionData.current[nutrient as keyof typeof nutritionData.current],
  recommended: nutritionData.recommended[nutrient as keyof typeof nutritionData.recommended],
  deficit: nutritionData.deficit[nutrient as keyof typeof nutritionData.deficit],
}));

// Create historical trend data
const trendData = [
  { name: 'Apr 1', nitrogen: 60, phosphorus: 40, potassium: 70 },
  { name: 'Apr 7', nitrogen: 62, phosphorus: 38, potassium: 75 },
  { name: 'Apr 14', nitrogen: 65, phosphorus: 40, potassium: 80 },
  { name: 'Apr 21', nitrogen: 68, phosphorus: 42, potassium: 85 },
  { name: 'Apr 28', nitrogen: 68, phosphorus: 42, potassium: 85 },
];

const CropNutrition: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-soil-400 pb-3">
        <CardTitle className="text-soil-800 flex items-center gap-2">
          <Leaf size={20} />
          Crop Nutrition Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="current">
          <TabsList className="w-full rounded-none bg-soil-100 grid grid-cols-3">
            <TabsTrigger value="current" className="data-[state=active]:bg-white">Current Status</TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-white">Recommendations</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-white">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="p-4 m-0">
            <div className="h-[250px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Current Level" fill="#8BAF7A" />
                  <Bar dataKey="recommended" name="Recommended" fill="#3E6B48" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="p-4 m-0">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Nutrient Deficiencies Detected
              </h3>
              <div className="space-y-2">
                {Object.keys(nutritionData.deficit).map((nutrient, idx) => {
                  const deficit = nutritionData.deficit[nutrient as keyof typeof nutritionData.deficit];
                  if (deficit > 0) {
                    return (
                      <div key={idx} className="flex justify-between items-center p-2 bg-soil-50 rounded">
                        <span className="capitalize">{nutrient}</span>
                        <div className="flex items-center">
                          <span className="text-amber-500 font-medium">{deficit}% below optimal</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Recommended Actions</h3>
              <ul className="space-y-2 text-sm">
                <li className="p-2 bg-soil-50 rounded">Apply nitrogen-rich fertilizer within the next 7 days</li>
                <li className="p-2 bg-soil-50 rounded">Increase phosphorus with bone meal or rock phosphate</li>
                <li className="p-2 bg-soil-50 rounded">Monitor potassium levels after rainfall</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="p-4 m-0">
            <div className="h-[250px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="nitrogen" name="Nitrogen" stroke="#3E6B48" fill="#3E6B48" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="phosphorus" name="Phosphorus" stroke="#F5A623" fill="#F5A623" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="potassium" name="Potassium" stroke="#4A90E2" fill="#4A90E2" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CropNutrition;
