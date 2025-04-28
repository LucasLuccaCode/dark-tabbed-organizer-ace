
import React from "react";

type FileLog = {
  fileName: string;
  action: "organized" | "deleted";
  timestamp: string;
  destination?: string;
};

const RecentStats = () => {
  const recentLogs: FileLog[] = [
    {
      fileName: "document.pdf",
      action: "organized",
      timestamp: "2024-04-28 10:30",
      destination: "Documents"
    },
    {
      fileName: "image.jpg",
      action: "organized",
      timestamp: "2024-04-28 09:45",
      destination: "Images"
    },
    {
      fileName: "oldfile.txt",
      action: "deleted",
      timestamp: "2024-04-28 08:15"
    }
  ];

  const stats = {
    organized: 245,
    autoDeleted: 32,
    savedSpace: "1.2 GB"
  };

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl">
          <h3 className="text-sm text-muted-foreground">Arquivos Organizados</h3>
          <p className="text-2xl font-bold">{stats.organized}</p>
        </div>
        <div className="bg-card p-4 rounded-xl">
          <h3 className="text-sm text-muted-foreground">Auto-deletados</h3>
          <p className="text-2xl font-bold">{stats.autoDeleted}</p>
        </div>
        <div className="bg-card p-4 rounded-xl">
          <h3 className="text-sm text-muted-foreground">Espaço Economizado</h3>
          <p className="text-2xl font-bold">{stats.savedSpace}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Histórico Recente</h3>
        <div className="space-y-3">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div>
                <span className="text-muted-foreground">{log.fileName}</span>
                <span className="mx-2">•</span>
                <span className={log.action === "deleted" ? "text-red-500" : "text-green-500"}>
                  {log.action === "deleted" ? "Deletado" : "Organizado"}
                </span>
              </div>
              <div className="text-muted-foreground">{log.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentStats;
