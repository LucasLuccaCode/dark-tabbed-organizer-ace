
import { Clock, Image, Video, File, Folder } from "lucide-react";
import StorageDisplay from "./StorageDisplay";
import CategoryIcon from "./CategoryIcon";
import FileGallery from "./FileGallery";

const RecentTab = () => {
  // Dados de exemplo
  const imageFiles = [
    { id: "1", name: "Image 1", preview: "/placeholder.svg" },
    { id: "2", name: "Image 2", preview: "/placeholder.svg" },
    { id: "3", name: "Image 3", preview: "/placeholder.svg" },
  ];

  const videoFiles = [
    { id: "4", name: "Video 1", preview: "/placeholder.svg" },
    { id: "5", name: "Video 2", preview: "/placeholder.svg" },
    { id: "6", name: "Video 3", preview: "/placeholder.svg" },
  ];

  return (
    <div className="space-y-6 p-4 pb-20">
      <StorageDisplay available="32 GB" used="96 GB" percentage={75} />

      <div className="grid grid-cols-4 gap-3 mb-6">
        <CategoryIcon icon={<Image size={24} />} color="bg-app-blue" />
        <CategoryIcon icon={<Video size={24} />} color="bg-app-cyan" />
        <CategoryIcon icon={<File size={24} />} color="bg-app-purple" />
        <CategoryIcon icon={<Folder size={24} />} color="bg-app-pink" />
        
        <CategoryIcon icon={<File size={24} />} color="bg-app-red" />
        <CategoryIcon icon={<Clock size={24} />} color="bg-app-orange" />
        <CategoryIcon icon={<Image size={24} />} color="bg-app-green" />
        <CategoryIcon icon={<File size={24} />} color="bg-primary" />
      </div>

      <FileGallery title="Images" files={imageFiles} />
      <FileGallery title="Video" files={videoFiles} />
    </div>
  );
};

export default RecentTab;
