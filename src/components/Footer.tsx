
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t pt-8 pb-6 overflow-hidden">
      {/* Soft gradient background with pastel tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-900/10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center mb-6">
          {/* Centered message with heart animation */}
          <motion.div 
            className="flex flex-col items-center space-y-3"
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
            <p className="text-center text-muted-foreground font-nunito max-w-md">
              Thank you for spending time with Bloomie 💖
            </p>
            <p className="text-sm text-muted-foreground/70 font-nunito italic">
              Bloomie is always here for you
            </p>
          </motion.div>
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
