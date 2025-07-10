import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Calendar, User, Wrench } from 'lucide-react';
import { SERVICE_DISPLAY_NAMES } from '@/utils/messageTemplates';

interface ImageGallery {
  id: string;
  quoteId: string;
  customerName?: string;
  serviceType: string;
  images: Array<{
    id: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    publicUrl: string;
  }>;
  createdAt: string;
  expiresAt?: string;
}

const Gallery = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const navigate = useNavigate();
  const { getGallery } = useImageUpload();
  const [gallery, setGallery] = useState<ImageGallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (galleryId) {
      fetchGallery();
    }
  }, [galleryId]);

  const fetchGallery = async () => {
    if (!galleryId) return;
    
    setLoading(true);
    const galleryData = await getGallery(galleryId);
    setGallery(galleryData);
    setLoading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const downloadImage = (imageUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Galerij laden...</p>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🖼️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Galerij niet gevonden</h1>
          <p className="text-muted-foreground mb-6">
            Deze galerij bestaat niet of is verlopen.
          </p>
          <Button onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Terug naar hoofdpagina
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(gallery.createdAt)}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                ❄️ Clobol - Foto Galerij
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {gallery.customerName && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{gallery.customerName}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary">
                    {SERVICE_DISPLAY_NAMES[gallery.serviceType] || gallery.serviceType}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {gallery.images.length} afbeelding{gallery.images.length !== 1 ? 'en' : ''}
              </p>
              {gallery.expiresAt && (
                <p className="text-xs text-muted-foreground">
                  Verloopt op {formatDate(gallery.expiresAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {gallery.images.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-lg font-semibold mb-2">Geen afbeeldingen</h3>
              <p className="text-muted-foreground text-center">
                Er zijn nog geen afbeeldingen toegevoegd aan deze galerij.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.images.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative group cursor-pointer">
                  <img
                    src={image.publicUrl}
                    alt={image.fileName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onClick={() => setSelectedImage(image.publicUrl)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.publicUrl, image.fileName);
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate mb-1">{image.fileName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(image.fileSize)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-full max-h-full relative">
            <img
              src={selectedImage}
              alt="Vergrote weergave"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-primary/5 border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            Powered by <strong>Clobol ❄️</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            Voor vragen of een offerte: <strong>+31658769652</strong> | <strong>info@clobol.nl</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;