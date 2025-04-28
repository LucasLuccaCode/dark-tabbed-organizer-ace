
import React from "react";

type File = {
  id: string;
  name: string;
  preview: string;
};

type FileGalleryProps = {
  title: string;
  files: File[];
};

const FileGallery = ({ title, files }: FileGalleryProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-3 gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="aspect-square rounded-xl overflow-hidden bg-muted"
          >
            <img
              src={file.preview}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileGallery;
