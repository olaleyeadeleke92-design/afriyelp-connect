import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import HomePage from "./pages/Home";
import ListingsPage from "./pages/Listings";
import BusinessProfilePage from "./pages/BusinessProfile";
import AddBusinessPage from "./pages/AddBusiness";
import ChatAssistantPage from "./pages/ChatAssistant";
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile";
import BusinessDashboard from "./pages/BusinessDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/business/:id" element={<BusinessProfilePage />} />
            <Route path="/business/:id/dashboard" element={<BusinessDashboard />} />
            <Route path="/add-business" element={<AddBusinessPage />} />
            <Route path="/chat" element={<ChatAssistantPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
