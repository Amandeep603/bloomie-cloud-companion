
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
            <h2>1. Introduction</h2>
            <p>Welcome to Bloomie ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the Bloomie website, mobile application, and services (collectively, the "Service").</p>
            
            <h2>2. Acceptance of Terms</h2>
            <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
            
            <h2>3. Privacy Policy</h2>
            <p>Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.</p>
            
            <h2>4. User Accounts</h2>
            <p>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
            
            <h2>5. Content</h2>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content you post on or through the Service.</p>
            
            <h2>6. Prohibited Uses</h2>
            <p>You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service in any way that violates any applicable law or regulation.</p>
            
            <h2>7. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.</p>
            
            <h2>8. Limitation of Liability</h2>
            <p>In no event shall Bloomie, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
            
            <h2>9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes.</p>
            
            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
