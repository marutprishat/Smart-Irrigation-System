
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { HardDrive, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

type FirmwareHistory = {
  id: string;
  version: string;
  date: string;
  devices: string[];
  status: "success" | "failed" | "pending";
};

const firmwareHistory: FirmwareHistory[] = [
  {
    id: "fw-1",
    version: "v1.2.3",
    date: "2023-04-01",
    devices: ["ESP-001", "ESP-002"],
    status: "success",
  },
  {
    id: "fw-2",
    version: "v1.2.4",
    date: "2023-05-15",
    devices: ["ESP-003"],
    status: "success",
  },
  {
    id: "fw-3",
    version: "v1.3.0-beta",
    date: "2023-06-20",
    devices: ["ESP-004"],
    status: "failed",
  },
];

export function FirmwareUpload() {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      firmwareVersion: "",
      releaseNotes: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a firmware file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedDevice) {
      toast({
        title: "No device selected",
        description: "Please select a device for firmware update.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Show success message
          toast({
            title: "Firmware upload complete",
            description: `Successfully uploaded ${selectedFile.name} to ${selectedDevice}.`,
          });
          
          return 100;
        }
        return next;
      });
    }, 500);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    toast({
      title: "Firmware added to library",
      description: `Version ${data.firmwareVersion} has been added to the firmware library.`,
    });
    form.reset();
    setSelectedFile(null);
  };

  return (
    <Card className="w-full border border-agro-lightGreen/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-agro-green" />
          Firmware Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload Firmware</TabsTrigger>
            <TabsTrigger value="library">Firmware Library</TabsTrigger>
            <TabsTrigger value="history">Update History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="device">Select Device</Label>
                <Select onValueChange={setSelectedDevice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device for firmware update" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ESP-001">ESP-001 (Main Controller)</SelectItem>
                    <SelectItem value="ESP-002">ESP-002 (Zone B Controller)</SelectItem>
                    <SelectItem value="ESP-003">ESP-003 (Zone C Controller)</SelectItem>
                    <SelectItem value="ESP-004">ESP-004 (Weather Station)</SelectItem>
                    <SelectItem value="all">All Devices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="firmware">Select Firmware File</Label>
                <div className="border border-dashed border-border rounded-md p-8 text-center">
                  <input
                    type="file"
                    id="firmware"
                    className="hidden"
                    accept=".bin,.hex"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="firmware"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {selectedFile ? selectedFile.name : "Click to select firmware file (.bin, .hex)"}
                    </span>
                    <Button type="button" variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </label>
                </div>
              </div>
              
              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              <div className="flex justify-end">
                <Button onClick={handleUpload} disabled={isUploading || !selectedFile || !selectedDevice}>
                  {isUploading ? "Uploading..." : "Upload Firmware"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="library" className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firmwareVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firmware Version</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="e.g., v1.2.5" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the version of this firmware release.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="releaseNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Release Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter release notes and changes" {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe the changes in this firmware version.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <Label>Firmware File</Label>
                  <div className="border border-dashed border-border rounded-md p-6 text-center">
                    <input
                      type="file"
                      id="libraryFirmware"
                      className="hidden"
                      accept=".bin,.hex"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="libraryFirmware"
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {selectedFile ? selectedFile.name : "Click to upload firmware file"}
                      </span>
                    </label>
                  </div>
                </div>
                
                <Button type="submit">Add to Library</Button>
              </form>
            </Form>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Available Firmware</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Version</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>v1.3.0</TableCell>
                    <TableCell>2023-06-25</TableCell>
                    <TableCell>firmware_v1.3.0.bin</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Deploy</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>v1.2.5</TableCell>
                    <TableCell>2023-05-20</TableCell>
                    <TableCell>firmware_v1.2.5.bin</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Deploy</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Devices</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {firmwareHistory.map((fw) => (
                  <TableRow key={fw.id}>
                    <TableCell>{fw.version}</TableCell>
                    <TableCell>{fw.date}</TableCell>
                    <TableCell>{fw.devices.join(", ")}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          fw.status === "success"
                            ? "bg-green-100 text-green-800"
                            : fw.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {fw.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Import missing components
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...props} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...props} />;
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
