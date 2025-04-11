
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface IrrigationStatusCardProps {
  zone: string;
  status: "active" | "scheduled" | "completed" | "idle";
  progress?: number;
  nextScheduled?: string;
  waterUsed?: number;
  duration?: {
    elapsed?: number;
    total?: number;
  };
}

export function IrrigationStatusCard({
  zone,
  status,
  progress = 0,
  nextScheduled,
  waterUsed,
  duration,
}: IrrigationStatusCardProps) {
  const [currentProgress, setCurrentProgress] = useState(progress);
  
  // Simulate progress updates if active
  useEffect(() => {
    let interval: number | undefined;
    
    if (status === "active" && currentProgress < 100) {
      interval = window.setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = prev + 1;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000) as unknown as number;
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, currentProgress]);
  
  const getStatusColor = () => {
    switch(status) {
      case "active": return "bg-agro-blue text-white";
      case "scheduled": return "bg-agro-lightGreen text-agro-darkGreen";
      case "completed": return "bg-green-100 text-green-800";
      case "idle": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Zone: {zone}</CardTitle>
        <Badge className={getStatusColor()}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        {status === "active" && (
          <div className="space-y-2">
            <div className="flex justify-between mb-1 text-xs">
              <span>Progress</span>
              <span>{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-2" />
            {duration && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Time: {duration.elapsed || 0} min / {duration.total || 0} min</span>
                <span>Water: {waterUsed || 0} L</span>
              </div>
            )}
          </div>
        )}
        
        {status === "scheduled" && (
          <div className="text-sm flex flex-col">
            <span className="text-muted-foreground text-xs">Next scheduled:</span>
            <span>{nextScheduled}</span>
          </div>
        )}
        
        {status === "completed" && (
          <div className="text-sm flex flex-col">
            <span className="text-muted-foreground text-xs">Last irrigation:</span>
            <span>Water used: {waterUsed || 0} L</span>
          </div>
        )}
        
        {status === "idle" && (
          <div className="text-sm text-muted-foreground">
            No irrigation scheduled
          </div>
        )}
      </CardContent>
    </Card>
  );
}
