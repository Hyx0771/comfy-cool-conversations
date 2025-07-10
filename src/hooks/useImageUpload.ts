import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UploadedImage {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  publicUrl: string;
}

interface ImageGallery {
  id: string;
  quoteId: string;
  customerName?: string;
  serviceType: string;
  images: UploadedImage[];
  createdAt: string;
  expiresAt?: string;
}

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadImages = async (
    files: File[],
    quoteId: string,
    customerName?: string,
    serviceType: string = 'general'
  ): Promise<ImageGallery | null> => {
    if (files.length === 0) return null;

    setIsUploading(true);
    
    try {
      // Create gallery record
      const { data: gallery, error: galleryError } = await supabase
        .from('quote_galleries')
        .insert({
          quote_id: quoteId,
          customer_name: customerName,
          service_type: serviceType,
        })
        .select()
        .single();

      if (galleryError) throw galleryError;

      const uploadedImages: UploadedImage[] = [];

      // Upload each file
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${gallery.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('quote-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('quote-images')
          .getPublicUrl(fileName);

        // Save image record to database
        const { data: imageRecord, error: imageError } = await supabase
          .from('quote_images')
          .insert({
            gallery_id: gallery.id,
            file_name: file.name,
            file_path: uploadData.path,
            file_size: file.size,
            mime_type: file.type,
          })
          .select()
          .single();

        if (imageError) throw imageError;

        uploadedImages.push({
          id: imageRecord.id,
          fileName: file.name,
          filePath: uploadData.path,
          fileSize: file.size,
          mimeType: file.type,
          publicUrl,
        });
      }

      const result: ImageGallery = {
        id: gallery.id,
        quoteId: gallery.quote_id,
        customerName: gallery.customer_name,
        serviceType: gallery.service_type,
        images: uploadedImages,
        createdAt: gallery.created_at,
        expiresAt: gallery.expires_at,
      };

      toast({
        title: "Afbeeldingen geüpload",
        description: `${files.length} afbeelding${files.length > 1 ? 'en' : ''} succesvol geüpload`,
      });

      return result;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload mislukt",
        description: "Er is een fout opgetreden bij het uploaden van de afbeeldingen",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const getGallery = async (galleryId: string): Promise<ImageGallery | null> => {
    try {
      const { data: gallery, error: galleryError } = await supabase
        .from('quote_galleries')
        .select('*')
        .eq('id', galleryId)
        .single();

      if (galleryError) throw galleryError;

      const { data: images, error: imagesError } = await supabase
        .from('quote_images')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('uploaded_at', { ascending: true });

      if (imagesError) throw imagesError;

      const imagesWithUrls: UploadedImage[] = images.map(img => {
        const { data: { publicUrl } } = supabase.storage
          .from('quote-images')
          .getPublicUrl(img.file_path);

        return {
          id: img.id,
          fileName: img.file_name,
          filePath: img.file_path,
          fileSize: img.file_size,
          mimeType: img.mime_type,
          publicUrl,
        };
      });

      return {
        id: gallery.id,
        quoteId: gallery.quote_id,
        customerName: gallery.customer_name,
        serviceType: gallery.service_type,
        images: imagesWithUrls,
        createdAt: gallery.created_at,
        expiresAt: gallery.expires_at,
      };
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return null;
    }
  };

  return {
    uploadImages,
    getGallery,
    isUploading,
  };
};