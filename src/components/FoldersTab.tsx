
import React from "react";
import FileCategory from "./FileCategory";
import { Folder } from "lucide-react";

const FoldersTab = () => {
  const folders = [
    { name: "Android", count: 124, color: "bg-app-blue" },
    { name: "Camera", count: 522, color: "bg-app-blue" },
    { name: "Download", count: 213, color: "bg-app-blue" },
    { name: "Pictures", count: 450, color: "bg-app-blue" },
    { name: "Music", count: 103, color: "bg-app-blue" },
    { name: "Whatsapp", count: 293, color: "bg-app-blue" },
  ];

  return (
    <div className="space-y-1 p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Storage</h2>
          <button className="p-2 rounded-full bg-primary flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M2 4H14M2 8H14M2 12H10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          <span>96 GB Occupied</span>
          <span className="mx-2">|</span>
          <span>32 GB Available</span>
        </div>
      </div>

      <div className="space-y-1">
        {folders.map((folder) => (
          <FileCategory 
            key={folder.name} 
            name={folder.name} 
            count={folder.count} 
            color={folder.color} 
            icon={<Folder size={24} />}
          />
        ))}
      </div>
    </div>
  );
};

export default FoldersTab;
