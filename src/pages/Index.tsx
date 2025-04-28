
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Folder, Trash2 } from "lucide-react";
import { Toaster } from "sonner";
import RecentStats from "@/components/RecentStats";
import FolderRules from "@/components/FolderRules";
import AutoDelete from "@/components/AutoDelete";

const Index = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-4xl mx-auto">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Organizador de Arquivos</h1>
      </header>

      <div className="flex-1">
        <Tabs defaultValue="recent" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-3 h-14">
              <TabsTrigger value="recent" className="data-[state=active]:bg-primary">
                <Clock className="mr-2 h-4 w-4" />
                Recentes
              </TabsTrigger>
              <TabsTrigger value="folders" className="data-[state=active]:bg-primary">
                <Folder className="mr-2 h-4 w-4" />
                Pastas
              </TabsTrigger>
              <TabsTrigger value="autodelete" className="data-[state=active]:bg-primary">
                <Trash2 className="mr-2 h-4 w-4" />
                Auto-limpeza
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recent">
            <RecentStats />
          </TabsContent>

          <TabsContent value="folders">
            <FolderRules />
          </TabsContent>

          <TabsContent value="autodelete">
            <AutoDelete />
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
