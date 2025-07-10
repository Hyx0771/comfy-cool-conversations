import { useState } from 'react';
import { useImageUpload } from './useImageUpload';

export const useImageHandling = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedGalleryId, setUploadedGalleryId] = useState<string | null>(null);

  const { uploadImages, isUploading } = useImageUpload();

  const clearFiles = () => {
    setSelectedFiles([]);
  };

  const clearGallery = () => {
    setUploadedGalleryId(null);
  };

  return {
    selectedFiles,
    setSelectedFiles,
    uploadedGalleryId,
    setUploadedGalleryId,
    isUploading,
    uploadImages,
    clearFiles,
    clearGallery
  };
};