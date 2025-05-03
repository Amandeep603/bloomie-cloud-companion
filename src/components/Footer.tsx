
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t pt-10 pb-8 overflow-hidden">
      {/* Soft gradient background with pastel tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-900/10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Redesigned playful Bloomie logo on the left */}
          <div className="flex items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="flex items-center gap-2">
                {/* Playful animated Bloomie logo */}
                <div className="relative h-10 w-10">
                  {/* Animated flower/heart shape behind the letter */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                  
                  {/* Smiling face in the center */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
                    animate={{ 
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    😊
                  </motion.div>
                </div>
                
                {/* Animated text for Bloomie */}
                <motion.div
                  className="font-bold text-xl relative"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Gradient text */}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-extrabold">
                    Bloomie
                  </span>
                  
                  {/* Small decorative elements */}
                  <motion.span 
                    className="absolute -top-2 -right-2 text-xs text-pink-400"
                    animate={{ 
                      y: [0, -3, 0],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    ✿
                  </motion.span>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* Content on the right */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            {/* Animated message with pulsating effect */}
            <motion.div 
              className="flex flex-col items-center md:items-end"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <p className="text-center md:text-right text-lg text-muted-foreground font-nunito max-w-md">
                Thanks for spending time with Bloomie 💬 Your emotional companion.
              </p>
              <p className="text-sm text-muted-foreground/70 font-nunito italic mt-2">
                We're always here for you
              </p>
            </motion.div>
            
            {/* Footer Links */}
            <div className="w-full flex justify-center md:justify-end">
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-sm text-muted-foreground/80">
                <Link to="/" className="hover:text-muted-foreground transition">Home</Link>
                <Link to="/diary" className="hover:text-muted-foreground transition">Diary</Link>
                <Link to="/chat" className="hover:text-muted-foreground transition">Chat</Link>
                <Link to="/about" className="hover:text-muted-foreground transition">About Bloomie</Link>
                <Link to="/terms" className="hover:text-muted-foreground transition">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/40 text-center mt-6">
          <p className="text-xs text-muted-foreground font-nunito">
            © {currentYear} Bloomie. Your virtual friend.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
