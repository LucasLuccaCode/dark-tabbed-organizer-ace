
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Folder, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FileExplorerProps {
  onSelectFolder: (path: string) => void;
}

// Lista simulada de diretórios - em um ambiente real, isso seria obtido do sistema de arquivos
const mockDirectories = {
  "C:": ["Program Files", "Users", "Windows", "Temp", "Downloads"],
  "C:/Program Files": ["Common Files", "Internet Explorer", "Microsoft"],
  "C:/Users": ["Public", "Default", "UserName"],
  "C:/Users/UserName": ["Documents", "Pictures", "Downloads", "Desktop"],
  "C:/Users/UserName/Documents": ["Work", "Personal"],
  "C:/Users/UserName/Downloads": ["Software", "Images", "Documents"],
};

const FileExplorer: React.FC<FileExplorerProps> = ({ onSelectFolder }) => {
  const [currentPath, setCurrentPath] = useState<string>("C:");
  const [history, setHistory] = useState<string[]>(["C:"]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [customPath, setCustomPath] = useState<string>("C:");

  // Em um ambiente real, isso obteria os diretórios do sistema de arquivos
  const getDirectories = (path: string) => {
    return mockDirectories[path as keyof typeof mockDirectories] || [];
  };

  const navigate = (directory: string) => {
    const newPath = currentPath === "C:" 
      ? `${currentPath}/${directory}` 
      : `${currentPath}/${directory}`;
    
    setCurrentPath(newPath);
    setCustomPath(newPath);
    
    // Atualizar histórico
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setCustomPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setCustomPath(history[historyIndex + 1]);
    }
  };

  const goUp = () => {
    if (currentPath === "C:") return;
    
    const pathParts = currentPath.split('/');
    pathParts.pop();
    const parentPath = pathParts.join('/');
    setCurrentPath(parentPath);
    setCustomPath(parentPath);
    
    // Atualizar histórico
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(parentPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleCustomPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPath(e.target.value);
  };

  const handleCustomPathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPath) {
      // Em um ambiente real, verificaríamos se o caminho existe
      setCurrentPath(customPath);
      
      // Atualizar histórico
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(customPath);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleSelectCurrentFolder = () => {
    onSelectFolder(currentPath);
  };

  return (
    <div className="border rounded-md flex flex-col h-96">
      <div className="flex items-center space-x-2 p-2 border-b">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goBack}
          disabled={historyIndex <= 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goUp}
          disabled={currentPath === "C:"}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <form onSubmit={handleCustomPathSubmit} className="flex-1 flex">
          <Input 
            value={customPath} 
            onChange={handleCustomPathChange}
            className="flex-1"
          />
        </form>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {getDirectories(currentPath).length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {getDirectories(currentPath).map((dir) => (
              <div
                key={dir}
                className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => navigate(dir)}
              >
                <Folder className="h-5 w-5 mr-2 text-blue-500" />
                <span className="truncate">{dir}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Pasta vazia ou caminho não encontrado
          </div>
        )}
      </div>
      
      <div className="border-t p-2 flex justify-between">
        <div className="text-sm text-muted-foreground">
          {currentPath}
        </div>
        <Button onClick={handleSelectCurrentFolder}>
          Selecionar esta pasta
        </Button>
      </div>
    </div>
  );
};

export default FileExplorer;
