
import { RegisterForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container max-w-lg mx-auto">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
