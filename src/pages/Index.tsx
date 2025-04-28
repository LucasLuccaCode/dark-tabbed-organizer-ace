
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Folder, Search, Plus } from "lucide-react";
import RecentTab from "@/components/RecentTab";
import FoldersTab from "@/components/FoldersTab";
import FilesTab from "@/components/FilesTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto">
      <header className="flex justify-between items-center p-4">
        <button className="p-2 rounded-lg bg-card">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="3" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="11" y="3" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="3" y="11" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="11" y="11" width="4" height="4" rx="1" fill="currentColor" />
          </svg>
        </button>
        
        <button className="p-2 rounded-lg bg-card">
          <Search size={18} />
        </button>
      </header>

      <div className="flex-1">
        <Tabs defaultValue="recent" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger value="recent" className="rounded-full data-[state=active]:bg-primary">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="folders" className="rounded-full data-[state=active]:bg-primary">
                <Folder className="mr-2 h-4 w-4" />
                Folders
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recent">
            <RecentTab />
          </TabsContent>

          <TabsContent value="folders">
            <FoldersTab />
          </TabsContent>

          <TabsContent value="files">
            <FilesTab />
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-6 right-6">
        <button className="p-4 rounded-full bg-primary text-white shadow-lg">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Index;
