
import { 
  Activity, 
  BarChart, 
  Calendar, 
  Cloud, 
  Gauge, 
  Home, 
  Layout, 
  Map, 
  MonitorSmartphone, 
  Settings, 
  Thermometer,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Layout, path: "/" },
  { title: "Environment", icon: Cloud, path: "/environment" },
  { title: "Soil Health", icon: Gauge, path: "/soil" },
  { title: "Water Usage", icon: Activity, path: "/water" },
  { title: "Analytics", icon: BarChart, path: "/analytics" },
  { title: "Weather", icon: Thermometer, path: "/weather" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
  { title: "Farm Map", icon: Map, path: "/map" },
  { title: "Devices", icon: MonitorSmartphone, path: "/devices" },
  { title: "Automation", icon: Bot, path: "/automation" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-agro-lightGreen/20">
      <SidebarHeader className="py-5 border-b border-agro-lightGreen/20">
        <div className="flex items-center px-3 gap-2">
          <div className="w-10 h-10 bg-agro-green rounded-full flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">AgroNet</h1>
            <p className="text-xs text-muted-foreground">4-BHARAT</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className="flex items-center gap-3 py-2"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
