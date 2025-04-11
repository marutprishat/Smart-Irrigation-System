
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function DashboardHeader() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Simple theme toggle functionality
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };
  
  // Set initial theme based on system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b bg-card">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold hidden md:block">Dashboard Overview</h2>
      </div>
      
      <div className="hidden md:flex items-center gap-2 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          className="pl-10 w-[300px] h-9" 
          placeholder="Search sensors, devices..." 
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-agro-green rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-agro-green flex items-center justify-center text-white font-medium">
            <span>AB</span>
          </div>
        </div>
      </div>
    </header>
  );
}
