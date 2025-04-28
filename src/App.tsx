
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Features from "./pages/Features";
import Chat from "./pages/Chat";
import Diary from "./pages/Diary";
import VideoCall from "./pages/VideoCall";
import Customize from "./pages/Customize";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

// Enhanced page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        duration: 0.3 
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <Login />
          </PageTransition>
        } />
        <Route path="/register" element={
          <PageTransition>
            <Register />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/features" element={
          <PageTransition>
            <Features />
          </PageTransition>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <PageTransition>
              <Chat />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/diary" element={
          <ProtectedRoute>
            <PageTransition>
              <Diary />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/video" element={
          <ProtectedRoute>
            <PageTransition>
              <VideoCall />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/customize" element={
          <ProtectedRoute>
            <PageTransition>
              <Customize />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/terms" element={
          <PageTransition>
            <Terms />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
