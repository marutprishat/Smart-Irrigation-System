
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Signal, WifiOff } from "lucide-react";

interface DeviceStatusCardProps {
  deviceId: string;
  deviceName: string;
  status: "online" | "offline";
  battery?: number;
  signal?: number;
  lastContact?: string;
  sensors?: {
    name: string;
    status: "ok" | "warning" | "error";
  }[];
}

export function DeviceStatusCard({
  deviceId,
  deviceName,
  status,
  battery,
  signal,
  lastContact,
  sensors
}: DeviceStatusCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{deviceName}</CardTitle>
        <Badge 
          variant={status === "online" ? "default" : "outline"}
          className={status === "online" ? "bg-agro-green" : "text-muted-foreground"}
        >
          {status === "online" ? "Online" : "Offline"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-3">
          ID: {deviceId}
        </div>
        
        <div className="flex justify-between items-center mb-3">
          {status === "online" ? (
            <>
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                <span className="text-sm">{battery}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="h-4 w-4" />
                <span className="text-sm">{signal}%</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm">Disconnected</span>
            </div>
          )}
        </div>
        
        {sensors && sensors.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs font-medium mb-2">Connected Sensors</h4>
            <div className="flex flex-wrap gap-2">
              {sensors.map((sensor, idx) => (
                <Badge 
                  key={idx}
                  variant="outline" 
                  className={`text-xs ${
                    sensor.status === "ok" 
                      ? "border-agro-green text-agro-green" 
                      : sensor.status === "warning" 
                      ? "border-yellow-500 text-yellow-500" 
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {sensor.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {lastContact && (
          <div className="mt-3 text-xs text-muted-foreground">
            Last contact: {lastContact}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
