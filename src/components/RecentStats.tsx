
import { useState, useEffect } from "react";
import { Clock, Folder, Trash2 } from "lucide-react";

type LogEntry = {
  timestamp: string;
  type: "folderRule" | "autodelete";
  rule: any;
  command: string;
};

const RecentStats = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Carregar logs do localStorage
    const savedLogs = localStorage.getItem("shellCommandLogs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getFolderStats = () => {
    const folderRules = JSON.parse(localStorage.getItem("folderRules") || "[]");
    return {
      total: folderRules.length,
      extensions: folderRules.reduce((acc: string[], rule: any) => [...acc, ...rule.extensions], [])
        .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i).length
    };
  };

  const getAutoDeleteStats = () => {
    const autoDeleteRules = JSON.parse(localStorage.getItem("autoDeleteRules") || "[]");
    return {
      total: autoDeleteRules.length,
      active: autoDeleteRules.filter((r: any) => r.enabled).length
    };
  };

  const folderStats = getFolderStats();
  const autoDeleteStats = getAutoDeleteStats();

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-4 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Folder className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">Regras de organização</p>
                <p className="text-2xl font-semibold">{folderStats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {folderStats.extensions} extensões configuradas
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <Trash2 className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-muted-foreground">Regras de auto-limpeza</p>
                <p className="text-2xl font-semibold">{autoDeleteStats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {autoDeleteStats.active} regras ativas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Registro de Comandos</h2>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum comando registrado ainda.
            <p className="mt-2">
              Adicione regras de organização ou auto-limpeza para gerar comandos.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.slice().reverse().map((log, index) => (
              <div key={index} className="bg-card p-4 rounded-xl">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {log.type === "folderRule" ? (
                        <Folder className="w-4 h-4 text-primary" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-destructive" />
                      )}
                      <span className="font-medium">
                        {log.type === "folderRule" ? "Organização" : "Auto-limpeza"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatDate(log.timestamp)}</span>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
                    {log.command}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentStats;
