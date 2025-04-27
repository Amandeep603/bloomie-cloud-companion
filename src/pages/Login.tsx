
import { LoginForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // If user is already logged in, redirect to the intended page or default to chat
  if (currentUser) {
    const destination = location.state?.from || "/chat";
    return <Navigate to={destination} />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container max-w-lg mx-auto">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
