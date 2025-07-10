-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-images', 'quote-images', true);

-- Create policies for the quote-images bucket
CREATE POLICY "Anyone can view quote images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'quote-images');

CREATE POLICY "Users can upload quote images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'quote-images');

-- Create a table to store quote image galleries
CREATE TABLE public.quote_galleries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id TEXT NOT NULL,
  customer_name TEXT,
  service_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days')
);

-- Create a table to store individual images in galleries
CREATE TABLE public.quote_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID NOT NULL REFERENCES public.quote_galleries(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.quote_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since these are for sharing)
CREATE POLICY "Quote galleries are publicly viewable" 
ON public.quote_galleries 
FOR SELECT 
USING (true);

CREATE POLICY "Quote images are publicly viewable" 
ON public.quote_images 
FOR SELECT 
USING (true);

-- Create policies for insertion (anyone can create galleries and images)
CREATE POLICY "Anyone can create quote galleries" 
ON public.quote_galleries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can create quote images" 
ON public.quote_images 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_quote_galleries_quote_id ON public.quote_galleries(quote_id);
CREATE INDEX idx_quote_images_gallery_id ON public.quote_images(gallery_id);
CREATE INDEX idx_quote_galleries_expires_at ON public.quote_galleries(expires_at);