import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Assistant from "./pages/Assistant";
import Widget from "./pages/Widget";
import EmbedScript from "./pages/EmbedScript";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardAnalytics from "./pages/dashboard/DashboardAnalytics";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardChatbots from "./pages/dashboard/DashboardChatbots";
import DashboardChatbotConfig from "./pages/dashboard/DashboardChatbotConfig";
import DashboardTeam from "./pages/dashboard/DashboardTeam";
import DashboardBilling from "./pages/dashboard/DashboardBilling";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/widget" element={<Widget />} />
            <Route path="/embed.js" element={<EmbedScript />} />
            <Route path="/gallery/:galleryId" element={<Gallery />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="analytics" element={<DashboardAnalytics />} />
              <Route path="chatbots" element={<DashboardChatbots />} />
              <Route path="chatbots/:id/configure" element={<DashboardChatbotConfig />} />
              <Route path="team" element={<DashboardTeam />} />
              <Route path="billing" element={<DashboardBilling />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
