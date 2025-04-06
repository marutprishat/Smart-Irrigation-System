
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-soil-600 text-white py-3 px-4 md:py-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-soil-400 flex items-center justify-center">
          <span className="text-soil-800 font-bold text-sm">SS</span>
        </div>
        <h1 className="text-lg md:text-xl font-semibold">SoilSense IIT</h1>
      </div>
      
      {!isMobile ? (
        <Tabs defaultValue="dashboard" className="h-10">
          <TabsList className="bg-soil-700">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-soil-500">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="forecast" className="text-white data-[state=active]:bg-soil-500">
              Forecast
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-white data-[state=active]:bg-soil-500">
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-soil-500">
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
      ) : (
        <Button variant="ghost" size="icon" className="text-white">
          <Menu size={24} />
        </Button>
      )}
    </header>
  );
};

export default Header;
