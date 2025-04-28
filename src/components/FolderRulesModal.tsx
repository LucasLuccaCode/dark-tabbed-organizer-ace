
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FolderRule = {
  folderPath: string;
  extensions: string[];
};

type FolderRulesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FolderRulesModal = ({ open, onOpenChange }: FolderRulesModalProps) => {
  const [folderPath, setFolderPath] = useState("");
  const [extensions, setExtensions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Regra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="folderPath" className="text-sm font-medium">
              Pasta de Destino
            </label>
            <Input
              id="folderPath"
              placeholder="Ex: C:\Documents"
              value={folderPath}
              onChange={(e) => setFolderPath(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="extensions" className="text-sm font-medium">
              Extensões (separadas por vírgula)
            </label>
            <Input
              id="extensions"
              placeholder="Ex: .pdf, .doc, .txt"
              value={extensions}
              onChange={(e) => setExtensions(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FolderRulesModal;
