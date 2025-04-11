
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonitorSmartphone, MoreVertical, PlusCircle, RefreshCw, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type DeviceType = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  lastPing: string;
};

const initialDevices: DeviceType[] = [
  {
    id: "ESP-001",
    name: "Main Controller",
    type: "ESP8266",
    location: "Zone A",
    status: "online",
    lastPing: "2 min ago",
  },
  {
    id: "ESP-002",
    name: "Zone B Controller",
    type: "ESP8266",
    location: "Zone B",
    status: "online",
    lastPing: "5 min ago",
  },
  {
    id: "ESP-003",
    name: "Zone C Controller",
    type: "ESP32",
    location: "Zone C",
    status: "offline",
    lastPing: "2 hours ago",
  },
  {
    id: "ESP-004",
    name: "Weather Station",
    type: "ESP32",
    location: "Central",
    status: "maintenance",
    lastPing: "1 day ago",
  },
];

export function DeviceManager() {
  const [devices, setDevices] = useState<DeviceType[]>(initialDevices);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Form state for adding new device
  const [newDevice, setNewDevice] = useState({
    id: "",
    name: "",
    type: "ESP8266",
    location: "",
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate network request
    setTimeout(() => {
      toast({
        title: "Devices refreshed",
        description: "Latest device status has been updated.",
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newDevice.id || !newDevice.name || !newDevice.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Add new device
    const device: DeviceType = {
      ...newDevice,
      status: "offline",
      lastPing: "Never",
    };
    
    setDevices([...devices, device]);
    
    // Reset form
    setNewDevice({
      id: "",
      name: "",
      type: "ESP8266",
      location: "",
    });
    
    toast({
      title: "Device added",
      description: `${device.name} (${device.id}) has been added.`,
    });
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id));
    toast({
      title: "Device removed",
      description: `Device ${id} has been removed.`,
    });
  };

  const getStatusColor = (status: DeviceType["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full border border-agro-lightGreen/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MonitorSmartphone className="h-5 w-5 text-agro-green" />
          Device Management
        </CardTitle>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddDevice}>
                <DialogHeader>
                  <DialogTitle>Add New Device</DialogTitle>
                  <DialogDescription>
                    Add a new IoT device to your AgroNet network.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deviceId" className="text-right">
                      Device ID
                    </Label>
                    <Input
                      id="deviceId"
                      value={newDevice.id}
                      onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                      placeholder="ESP-XXX"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deviceName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="deviceName"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                      placeholder="Device name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deviceType" className="text-right">
                      Type
                    </Label>
                    <select
                      id="deviceType"
                      value={newDevice.type}
                      onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="ESP8266">ESP8266</option>
                      <option value="ESP32">ESP32</option>
                      <option value="Arduino">Arduino</option>
                      <option value="RaspberryPi">Raspberry Pi</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deviceLocation" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="deviceLocation"
                      value={newDevice.location}
                      onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                      placeholder="Device location"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Device</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Ping</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.id}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(device.status)}`} />
                    <span className="capitalize">{device.status}</span>
                  </div>
                </TableCell>
                <TableCell>{device.lastPing}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Configure</DropdownMenuItem>
                      <DropdownMenuItem>Restart</DropdownMenuItem>
                      <DropdownMenuItem>View Logs</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteDevice(device.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
