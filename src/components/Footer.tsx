
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t pt-10 pb-8 overflow-hidden">
      {/* Soft gradient background with pastel tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-900/10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center mb-8">
          {/* Animated icon with pulsating effect */}
          <motion.div 
            className="flex flex-col items-center mb-6 w-full"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-pink-400 fill-pink-200 mr-2" />
            </div>
            <p className="text-center text-lg text-muted-foreground font-nunito max-w-md">
              Thanks for spending time with Bloomie 💬 Your emotional companion.
            </p>
            <p className="text-sm text-muted-foreground/70 font-nunito italic mt-2">
              We're always here for you
            </p>
          </motion.div>
          
          {/* Footer Links */}
          <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground/80">
              <a href="/" className="hover:text-muted-foreground transition">Home</a>
              <a href="/diary" className="hover:text-muted-foreground transition">Diary</a>
              <a href="/chat" className="hover:text-muted-foreground transition">Chat</a>
              <a href="/about" className="hover:text-muted-foreground transition">About Bloomie</a>
              <a href="/terms" className="hover:text-muted-foreground transition">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground font-nunito">
            © {currentYear} Bloomie. Your virtual friend.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
