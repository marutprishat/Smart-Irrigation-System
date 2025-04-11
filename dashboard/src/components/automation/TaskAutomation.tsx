
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Edit, Plus, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Task = {
  id: string;
  name: string;
  schedule: string;
  deviceId: string;
  action: string;
  enabled: boolean;
  lastRun: string;
};

const initialTasks: Task[] = [
  {
    id: "task-1",
    name: "Morning Irrigation",
    schedule: "Daily at 6:00 AM",
    deviceId: "ESP-001",
    action: "Start irrigation for 30 minutes",
    enabled: true,
    lastRun: "Today at 6:00 AM",
  },
  {
    id: "task-2",
    name: "Temperature Check",
    schedule: "Every 2 hours",
    deviceId: "ESP-002",
    action: "Check temperature and alert if > 35°C",
    enabled: true,
    lastRun: "Today at 12:00 PM",
  },
  {
    id: "task-3",
    name: "Weekly System Report",
    schedule: "Every Sunday at 9:00 AM",
    deviceId: "All devices",
    action: "Generate and send weekly report",
    enabled: false,
    lastRun: "Last Sunday",
  },
];

export function TaskAutomation() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();
  
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: "",
    schedule: "",
    deviceId: "",
    action: "",
    enabled: true,
  });
  
  const [isAdding, setIsAdding] = useState(false);

  const handleToggleTask = (id: string, enabled: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, enabled } : task
      )
    );
    
    toast({
      title: enabled ? "Task enabled" : "Task disabled",
      description: `Task has been ${enabled ? "enabled" : "disabled"}.`,
    });
  };

  const handleAddTask = () => {
    // Simple validation
    if (!newTask.name || !newTask.schedule || !newTask.deviceId || !newTask.action) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new task
    const task: Task = {
      id: `task-${tasks.length + 1}`,
      name: newTask.name || "",
      schedule: newTask.schedule || "",
      deviceId: newTask.deviceId || "",
      action: newTask.action || "",
      enabled: newTask.enabled || false,
      lastRun: "Never",
    };
    
    setTasks([...tasks, task]);
    
    // Reset form
    setNewTask({
      name: "",
      schedule: "",
      deviceId: "",
      action: "",
      enabled: true,
    });
    
    setIsAdding(false);
    
    toast({
      title: "Task created",
      description: `Task "${task.name}" has been created.`,
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The automation task has been deleted.",
    });
  };

  return (
    <Card className="w-full border border-agro-lightGreen/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-agro-green" />
          Task Automation
        </CardTitle>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Create Task"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdding && (
          <Card className="border-agro-lightGreen border-dashed bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taskName">Task Name</Label>
                    <Input
                      id="taskName"
                      placeholder="Morning Irrigation"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskSchedule">Schedule</Label>
                    <Input
                      id="taskSchedule"
                      placeholder="Daily at 6:00 AM"
                      value={newTask.schedule}
                      onChange={(e) => setNewTask({ ...newTask, schedule: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taskDevice">Device</Label>
                    <Select
                      onValueChange={(value) => setNewTask({ ...newTask, deviceId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ESP-001">ESP-001 (Main Controller)</SelectItem>
                        <SelectItem value="ESP-002">ESP-002 (Zone B Controller)</SelectItem>
                        <SelectItem value="ESP-003">ESP-003 (Zone C Controller)</SelectItem>
                        <SelectItem value="ESP-004">ESP-004 (Weather Station)</SelectItem>
                        <SelectItem value="All devices">All devices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskAction">Action</Label>
                    <Input
                      id="taskAction"
                      placeholder="Start irrigation for 30 minutes"
                      value={newTask.action}
                      onChange={(e) => setNewTask({ ...newTask, action: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="taskEnabled"
                    checked={newTask.enabled}
                    onCheckedChange={(checked) => setNewTask({ ...newTask, enabled: checked })}
                  />
                  <Label htmlFor="taskEnabled">Enable task immediately</Label>
                </div>
                
                <Button onClick={handleAddTask} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h3 className="font-medium">{task.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {task.schedule}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={task.enabled}
                    onCheckedChange={(checked) => handleToggleTask(task.id, checked)}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this task? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="bg-muted/50 px-6 py-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Device: {task.deviceId}</span>
                  <span className="text-xs text-muted-foreground">Last run: {task.lastRun}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">{task.action}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
