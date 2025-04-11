
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DeviceManager } from "@/components/automation/DeviceManager";
import { FirmwareUpload } from "@/components/automation/FirmwareUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitorSmartphone } from "lucide-react";

const Devices = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold">Device Management</h1>
        <p className="text-muted-foreground">
          Manage your IoT devices and update firmware for optimal performance.
        </p>
        
        <Tabs defaultValue="devices" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="firmware">Firmware</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devices" className="mt-0">
            <DeviceManager />
          </TabsContent>
          
          <TabsContent value="firmware" className="mt-0">
            <FirmwareUpload />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Devices;
