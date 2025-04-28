
import { cn } from "@/lib/utils";

type CategoryIconProps = {
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
};

const CategoryIcon = ({ icon, color, onClick }: CategoryIconProps) => {
  return (
    <div 
      className={cn("file-icon cursor-pointer", color)} 
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default CategoryIcon;
