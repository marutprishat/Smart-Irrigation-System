
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// These are example responses that would be replaced with actual AI responses
const mockResponses = [
  "I've scheduled irrigation for Zone B to run tomorrow at 6:00 AM.",
  "Based on current soil moisture readings, no irrigation is needed for Zone A today.",
  "The temperature threshold for Zone C has been updated to 30°C.",
  "I've added a new device ESP-004 to your network. You can configure it in the Device Management tab.",
  "Soil moisture in Zone B is critically low at 18%. Would you like me to start irrigation now?",
];

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AgroNet Assistant. How can I help you manage your farm today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const botMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      
      // Show a toast for important actions
      if (randomResponse.includes("critically low")) {
        toast({
          title: "Alert: Low Soil Moisture",
          description: "Zone B requires immediate attention",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <Card className="w-full border border-agro-lightGreen/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-agro-green" />
          AgroNet Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto flex flex-col gap-4 mb-4 p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 bg-agro-green">
                  <Bot className="h-4 w-4 text-white" />
                </Avatar>
              )}
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-agro-green text-white"
                    : "bg-muted border border-agro-lightGreen/20"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 bg-primary">
                  <User className="h-4 w-4" />
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 bg-agro-green">
                <Bot className="h-4 w-4 text-white" />
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] border border-agro-lightGreen/20">
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-agro-green rounded-full animate-bounce delay-0"></div>
                  <div className="h-2 w-2 bg-agro-green rounded-full animate-bounce delay-150"></div>
                  <div className="h-2 w-2 bg-agro-green rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something or give a command..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
