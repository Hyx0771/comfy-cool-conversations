import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import { EmbeddableWidget } from "./components/EmbeddableWidget";

const queryClient = new QueryClient();

// Check if we're in widget mode
const isWidgetMode = () => {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('widget') === 'true' || window.location.pathname === '/widget';
};

// Get widget configuration from URL parameters
const getWidgetConfig = () => {
  if (typeof window === 'undefined') return {};
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    mode: urlParams.get('mode') as 'faq' | 'quote' | 'support' || 'faq',
    theme: urlParams.get('theme') as 'light' | 'dark' || 'light',
    position: urlParams.get('position') as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' || 'bottom-right',
    primaryColor: urlParams.get('primaryColor') || '#007BFF',
    title: urlParams.get('title') || 'Clobol Support',
    subtitle: urlParams.get('subtitle') || 'Hoe kunnen we helpen?',
    welcomeMessage: urlParams.get('welcomeMessage') || 'Hoi! Waar kan ik je mee helpen?'
  };
};

const App = () => {
  // If we're in widget mode, render only the widget
  if (isWidgetMode()) {
    const config = getWidgetConfig();
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <EmbeddableWidget config={config} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Regular app mode
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallery/:galleryId" element={<Gallery />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
