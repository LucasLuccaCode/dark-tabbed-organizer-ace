
import { File, Folder, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import FileCategory from "./FileCategory";

const FilesTab = () => {
  const categories = [
    { name: "Documents", icon: <File size={24} />, count: 143, color: "bg-app-blue" },
    { name: "Images", icon: <Image size={24} />, count: 652, color: "bg-app-cyan" },
    { name: "Projects", icon: <Folder size={24} />, count: 86, color: "bg-app-purple" },
    { name: "Presentations", icon: <File size={24} />, count: 45, color: "bg-app-red" },
    { name: "Templates", icon: <File size={24} />, count: 26, color: "bg-app-green" },
  ];

  return (
    <div className="p-4 space-y-4">
      <Input 
        placeholder="Search files..." 
        className="bg-card border-none"
      />
      
      <div className="space-y-1">
        {categories.map((category) => (
          <FileCategory 
            key={category.name} 
            name={category.name} 
            count={category.count} 
            icon={category.icon}
            color={category.color}
          />
        ))}
      </div>
    </div>
  );
};

export default FilesTab;
