
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "https://github.com/", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com/", label: "Instagram" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Diary", path: "/diary" },
    { name: "Video Call", path: "/video" },
    { name: "About", path: "/about" }
  ];

  return (
    <footer className="relative border-t py-12 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-bloomie-purple/5 -z-10"></div>
      
      {/* Subtle background blobs */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-bloomie-pink/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-bloomie-yellow/5 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, delay: 2, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and tagline */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bloomie-purple to-primary flex items-center justify-center">
                <span className="text-base font-bold text-white">B</span>
              </div>
              <span className="font-nunito font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-bloomie-purple via-primary to-bloomie-pink">
                Bloomie
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs font-nunito">
              Built with <span className="text-red-400">💖</span> to be your virtual friend.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-medium mb-4 text-center md:text-left font-nunito">Quick Links</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-nunito hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social icons */}
          <div>
            <h3 className="font-medium mb-4 text-center md:text-left font-nunito">Connect</h3>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground font-nunito">
            © {currentYear} Bloomie. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center mt-2 gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
            <Link to="/terms" className="hover:text-muted-foreground transition-colors font-nunito">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-muted-foreground transition-colors font-nunito">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-muted-foreground transition-colors font-nunito">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
