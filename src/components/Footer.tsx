
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
    <footer className="relative border-t py-8 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-bloomie-purple/5 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo and tagline */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bloomie-purple to-primary flex items-center justify-center">
                <span className="text-sm font-bold text-white">B</span>
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
          <div className="mb-4 md:mb-0">
            <h3 className="text-sm font-medium mb-2 text-center md:text-left font-nunito">Quick Links</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors font-nunito hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social icons */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
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
        
        <div className="pt-4 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground font-nunito">
            © {currentYear} Bloomie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
