import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Folder, File, Trash2, Edit } from "lucide-react";
import FolderRulesModal from "./FolderRulesModal";
import { toast } from "sonner";

type Rule = {
  id: number;
  folderPath: string;
  extensions: string[];
};

const FolderRules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  useEffect(() => {
    const savedRules = localStorage.getItem("folderRules");
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("folderRules", JSON.stringify(rules));
  }, [rules]);

  const addRule = (rule: Omit<Rule, "id">) => {
    const newRule = {
      ...rule,
      id: Date.now(),
    };
    
    setRules([...rules, newRule]);
    
    const shellCommand = generateShellCommand(newRule);
    logShellCommand(newRule, shellCommand);
    
    toast.success("Regra de organização adicionada com sucesso!");
  };

  const editRule = (updatedRule: Rule) => {
    const updatedRules = rules.map(rule => 
      rule.id === updatedRule.id ? updatedRule : rule
    );
    
    setRules(updatedRules);
    
    const shellCommand = generateShellCommand(updatedRule);
    logShellCommand(updatedRule, shellCommand);
    
    toast.success("Regra de organização atualizada com sucesso!");
  };

  const handleEditClick = (rule: Rule) => {
    setEditingRule(rule);
    setIsModalOpen(true);
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success("Regra de organização removida com sucesso!");
  };

  const generateShellCommand = (rule: Rule) => {
    const commands = rule.extensions.map(ext => 
      `find ~/storage/downloads -name "*${ext}" -exec mv {} "${rule.folderPath}" \\;`
    ).join(" && ");
    
    return commands;
  };

  const logShellCommand = (rule: Rule, command: string) => {
    const logs = JSON.parse(localStorage.getItem("shellCommandLogs") || "[]");
    logs.push({
      timestamp: new Date().toISOString(),
      type: "folderRule",
      rule,
      command
    });
    localStorage.setItem("shellCommandLogs", JSON.stringify(logs));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Regras de Organização</h2>
        <Button onClick={() => {
          setEditingRule(null);
          setIsModalOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Regra
        </Button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma regra de organização configurada.
            <p className="mt-2">
              Adicione regras para organizar seus arquivos automaticamente.
            </p>
          </div>
        ) : (
          rules.map((rule) => (
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
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditClick(rule)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteRule(rule.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <FolderRulesModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onAddRule={addRule}
        onEditRule={editRule}
        editingRule={editingRule}
      />
    </div>
  );
};

export default FolderRules;
