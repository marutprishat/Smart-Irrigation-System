
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChatBot } from "@/components/automation/ChatBot";
import { TaskAutomation } from "@/components/automation/TaskAutomation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, ListCheck } from "lucide-react";

const Automation = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold">Automation Control Center</h1>
        <p className="text-muted-foreground">
          Automate tasks and interact with the AgroNet Assistant.
        </p>
        
        <Tabs defaultValue="chatbot" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="chatbot">AI Assistant</TabsTrigger>
            <TabsTrigger value="tasks">Task Automation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chatbot" className="mt-0">
            <ChatBot />
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-0">
            <TaskAutomation />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Automation;
