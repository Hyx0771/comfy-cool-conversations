
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create quote_galleries table
CREATE TABLE public.quote_galleries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id TEXT NOT NULL,
    customer_name TEXT,
    service_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create quote_images table
CREATE TABLE public.quote_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gallery_id UUID REFERENCES public.quote_galleries(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.quote_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for quote galleries)
CREATE POLICY "Quote galleries are publicly viewable" 
ON public.quote_galleries FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create quote galleries" 
ON public.quote_galleries FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Quote images are publicly viewable" 
ON public.quote_images FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create quote images" 
ON public.quote_images FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for quote images
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-images', 'quote-images', true);

-- Create storage policies
CREATE POLICY "Anyone can upload quote images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'quote-images');
CREATE POLICY "Quote images are publicly viewable" ON storage.objects FOR SELECT USING (bucket_id = 'quote-images');
