
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type StorageDisplayProps = {
  available: string;
  used: string;
  percentage: number;
};

const StorageDisplay = ({ available, used, percentage }: StorageDisplayProps) => {
  return (
    <div className="bg-card rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">My Storage</h3>
          <p className="text-lg font-semibold">{available} Available</p>
        </div>
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-lg">{percentage}%</span>
          </div>
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
              className="text-primary"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center text-xs text-muted-foreground mb-4">
        <span>{used} Ocupado</span>
        <span className="mx-2">|</span>
        <span>{available} Disponível</span>
      </div>
      <Button variant="secondary" size="sm" className="w-full">
        Detalhes
      </Button>
    </div>
  );
};

export default StorageDisplay;
