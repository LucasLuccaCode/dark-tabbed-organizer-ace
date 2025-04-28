
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Folder, File } from "lucide-react";
import FolderRulesModal from "./FolderRulesModal";

type Rule = {
  id: number;
  folderPath: string;
  extensions: string[];
};

const FolderRules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules] = useState<Rule[]>([
    {
      id: 1,
      folderPath: "C:\\Documents",
      extensions: [".pdf", ".doc", ".txt"],
    },
    {
      id: 2,
      folderPath: "C:\\Images",
      extensions: [".jpg", ".png", ".gif"],
    },
  ]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Regras de Organização</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Regra
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-card p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Folder className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{rule.folderPath}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <File className="w-4 h-4 mr-1" />
                  {rule.extensions.join(", ")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FolderRulesModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default FolderRules;
