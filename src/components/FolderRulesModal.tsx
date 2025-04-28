
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import FileExplorer from "./FileExplorer";

interface FolderRulesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRule: (rule: { folderPath: string; extensions: string[] }) => void;
  onEditRule?: (rule: { id: number; folderPath: string; extensions: string[] }) => void;
  editingRule?: { id: number; folderPath: string; extensions: string[] } | null;
}

const FolderRulesModal: React.FC<FolderRulesModalProps> = ({
  open,
  onOpenChange,
  onAddRule,
  onEditRule,
  editingRule,
}) => {
  const [folderPath, setFolderPath] = useState('');
  const [extension, setExtension] = useState('');
  const [extensions, setExtensions] = useState<string[]>([]);
  const [step, setStep] = useState<'folder' | 'extensions'>('folder');

  useEffect(() => {
    if (editingRule) {
      setFolderPath(editingRule.folderPath);
      setExtensions(editingRule.extensions);
      setStep('extensions');
    }
  }, [editingRule]);

  const handleAddExtension = () => {
    if (!extension.trim()) return;
    
    let formattedExtension = extension.trim();
    if (!formattedExtension.startsWith('.')) {
      formattedExtension = `.${formattedExtension}`;
    }
    
    if (!extensions.includes(formattedExtension)) {
      setExtensions([...extensions, formattedExtension]);
    }
    setExtension('');
  };

  const handleRemoveExtension = (ext: string) => {
    setExtensions(extensions.filter((e) => e !== ext));
  };

  const handleSelectFolder = (path: string) => {
    setFolderPath(path);
    setStep('extensions');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderPath && extensions.length > 0) {
      if (editingRule && onEditRule) {
        onEditRule({
          id: editingRule.id,
          folderPath,
          extensions,
        });
      } else {
        onAddRule({
          folderPath,
          extensions,
        });
      }
      resetForm();
      onOpenChange(false);
    }
  };

  const resetForm = () => {
    setFolderPath('');
    setExtension('');
    setExtensions([]);
    setStep('folder');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingRule 
              ? 'Editar regra de organização' 
              : step === 'folder' 
                ? 'Selecione uma pasta destino' 
                : 'Adicione extensões de arquivos'
            }
          </DialogTitle>
          <DialogDescription>
            {step === 'folder' 
              ? 'Navegue e selecione a pasta onde os arquivos serão organizados'
              : 'Defina quais tipos de arquivo serão movidos para esta pasta'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'folder' ? (
          <FileExplorer onSelectFolder={handleSelectFolder} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Pasta selecionada:</p>
              <div className="flex items-center bg-secondary/50 p-2 rounded-md">
                <span className="truncate">{folderPath}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">
                Adicione as extensões de arquivo para esta pasta:
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder=".pdf, .docx, etc."
                  value={extension}
                  onChange={(e) => setExtension(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddExtension}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {extensions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Extensões adicionadas:</p>
                <div className="flex flex-wrap gap-2">
                  {extensions.map((ext) => (
                    <div
                      key={ext}
                      className="flex items-center bg-secondary/50 px-2 py-1 rounded-md"
                    >
                      <span className="mr-1">{ext}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExtension(ext)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep('folder')}
              >
                Voltar
              </Button>
              <Button 
                type="submit" 
                disabled={extensions.length === 0}
              >
                {editingRule ? 'Salvar Alterações' : 'Salvar Regra'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FolderRulesModal;
