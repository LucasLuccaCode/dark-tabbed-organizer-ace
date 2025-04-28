
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Clock, Trash2 } from "lucide-react";

type AutoDeleteRule = {
  id: number;
  folderPath: string;
  days: number;
  enabled: boolean;
};

const AutoDelete = () => {
  const [rules] = useState<AutoDeleteRule[]>([
    {
      id: 1,
      folderPath: "C:\\Downloads",
      days: 30,
      enabled: true,
    },
    {
      id: 2,
      folderPath: "C:\\Temp",
      days: 7,
      enabled: true,
    },
  ]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Auto-limpeza</h2>
        <Button>
          <Folder className="w-4 h-4 mr-2" />
          Adicionar Pasta
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-card p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <Trash2 className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="font-medium">{rule.folderPath}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  Deletar após {rule.days} dias
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={rule.days}
                className="w-20 text-center"
                min={1}
              />
              <span className="text-sm text-muted-foreground">dias</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoDelete;
