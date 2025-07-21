
-- Create authentication and dashboard pages table for the SaaS platform
CREATE TABLE public.dashboard_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chatbot configurations table for advanced settings
CREATE TABLE public.chatbot_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  welcome_message TEXT,
  brand_colors JSONB DEFAULT '{"primary": "#007BFF", "secondary": "#6C757D"}',
  logo_url TEXT,
  custom_css TEXT,
  features JSONB DEFAULT '{"quote_flow": true, "support_chat": true, "faq": true}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.dashboard_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_configurations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for dashboard_pages (public read access)
CREATE POLICY "Dashboard pages are publicly viewable" ON public.dashboard_pages
  FOR SELECT USING (is_public = true);

CREATE POLICY "Authenticated users can manage dashboard pages" ON public.dashboard_pages
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for chatbot_configurations
CREATE POLICY "Users can view organization chatbot configurations" ON public.chatbot_configurations
  FOR SELECT USING (
    chatbot_id IN (
      SELECT id FROM public.chatbots WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create chatbot configurations" ON public.chatbot_configurations
  FOR INSERT WITH CHECK (
    chatbot_id IN (
      SELECT id FROM public.chatbots WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update chatbot configurations" ON public.chatbot_configurations
  FOR UPDATE USING (
    chatbot_id IN (
      SELECT id FROM public.chatbots WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can delete chatbot configurations" ON public.chatbot_configurations
  FOR DELETE USING (
    chatbot_id IN (
      SELECT id FROM public.chatbots WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_chatbot_configurations_chatbot_id ON public.chatbot_configurations(chatbot_id);
CREATE INDEX idx_dashboard_pages_slug ON public.dashboard_pages(slug);
CREATE INDEX idx_dashboard_pages_is_public ON public.dashboard_pages(is_public);

-- Create triggers for updated_at
CREATE TRIGGER handle_dashboard_pages_updated_at
  BEFORE UPDATE ON public.dashboard_pages
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_chatbot_configurations_updated_at
  BEFORE UPDATE ON public.chatbot_configurations
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Insert default dashboard pages
INSERT INTO public.dashboard_pages (title, slug, content, is_public) VALUES 
('Dashboard Home', 'home', 'Welcome to your SaaS dashboard', false),
('Analytics', 'analytics', 'View your chatbot analytics and insights', false),
('Settings', 'settings', 'Manage your account and chatbot settings', false);
