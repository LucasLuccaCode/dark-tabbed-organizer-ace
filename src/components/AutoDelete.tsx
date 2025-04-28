import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Clock, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import FileExplorer from "./FileExplorer";

type AutoDeleteRule = {
  id: number;
  folderPath: string;
  days: number;
  enabled: boolean;
};

const AutoDelete = () => {
  const [rules, setRules] = useState<AutoDeleteRule[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number>(7);

  useEffect(() => {
    const savedRules = localStorage.getItem("autoDeleteRules");
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("autoDeleteRules", JSON.stringify(rules));
  }, [rules]);

  const handleSelectFolder = (folderPath: string) => {
    const newRule: AutoDeleteRule = {
      id: Date.now(),
      folderPath,
      days: selectedDays,
      enabled: true,
    };
    
    setRules([...rules, newRule]);
    setIsDialogOpen(false);
    
    const shellCommand = generateShellCommand(newRule);
    logShellCommand(newRule, shellCommand);
    
    toast.success("Regra de auto-limpeza adicionada com sucesso!");
  };

  const updateRuleDays = (id: number, days: number) => {
    const updatedRules = rules.map(rule => {
      if (rule.id === id) {
        const updatedRule = { ...rule, days };
        const shellCommand = generateShellCommand(updatedRule);
        logShellCommand(updatedRule, shellCommand);
        return updatedRule;
      }
      return rule;
    });
    
    setRules(updatedRules);
  };

  const toggleRuleStatus = (id: number) => {
    const updatedRules = rules.map(rule => {
      if (rule.id === id) {
        return { ...rule, enabled: !rule.enabled };
      }
      return rule;
    });
    
    setRules(updatedRules);
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success("Regra de auto-limpeza removida com sucesso!");
  };

  const generateShellCommand = (rule: AutoDeleteRule) => {
    return `find "${rule.folderPath}" -type f -mtime +${rule.days} -exec rm {} \\;`;
  };
  
  const logShellCommand = (rule: AutoDeleteRule, command: string) => {
    const logs = JSON.parse(localStorage.getItem("shellCommandLogs") || "[]");
    logs.push({
      timestamp: new Date().toISOString(),
      type: "autodelete",
      rule,
      command
    });
    localStorage.setItem("shellCommandLogs", JSON.stringify(logs));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Auto-limpeza</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Pasta
        </Button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma regra de auto-limpeza configurada.
            <p className="mt-2">
              Adicione pastas para remover arquivos antigos automaticamente.
            </p>
          </div>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-card p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${rule.enabled ? 'bg-destructive/10' : 'bg-muted/30'}`}>
                  <Trash2 className={`w-6 h-6 ${rule.enabled ? 'text-destructive' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="font-medium">{rule.folderPath}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    Deletar após {rule.days} dias
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={rule.days}
                    onChange={(e) => updateRuleDays(rule.id, parseInt(e.target.value) || 1)}
                    className="w-20 text-center"
                    min={1}
                  />
                  <span className="text-sm text-muted-foreground">dias</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleRuleStatus(rule.id)}
                  className={rule.enabled ? "" : "opacity-50"}
                >
                  {rule.enabled ? (
                    <Trash2 className="w-4 h-4 text-destructive" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  )}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Selecionar pasta para auto-limpeza</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span>Deletar arquivos mais antigos que</span>
              <Input 
                type="number" 
                value={selectedDays} 
                onChange={(e) => setSelectedDays(parseInt(e.target.value) || 7)} 
                className="w-20 text-center" 
                min={1} 
              />
              <span>dias</span>
            </div>
            <FileExplorer onSelectFolder={handleSelectFolder} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutoDelete;
