
import React from "react";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";

type FileCategoryProps = {
  name: string;
  count: number;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
};

const FileCategory = ({
  name,
  count,
  icon,
  color = "bg-app-blue",
  onClick,
}: FileCategoryProps) => {
  return (
    <div 
      className="flex items-center space-x-4 rounded-xl p-3 transition-colors hover:bg-muted cursor-pointer"
      onClick={onClick}
    >
      <div className={cn("file-icon", color)}>
        {icon || <Folder />}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{count} items</p>
      </div>
    </div>
  );
};

export default FileCategory;
