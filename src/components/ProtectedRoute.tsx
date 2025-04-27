
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const ProtectedRoute = ({ 
  children,
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }
  
  if (!currentUser) {
    // Store the current path to redirect back after login
    return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
