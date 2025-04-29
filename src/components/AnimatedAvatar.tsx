
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  gender: "boy" | "girl";
  position: "left" | "right";
  message: string;
  delay?: number;
}

const AnimatedAvatar = ({ gender, position, message, delay = 0 }: AnimatedAvatarProps) => {
  const [speaking, setSpeaking] = useState(false);
  
  // Simulate speaking animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpeaking(true);
      
      // Stop speaking after a while
      const stopTimer = setTimeout(() => {
        setSpeaking(false);
      }, 3000);
      
      return () => clearTimeout(stopTimer);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div 
      className={`absolute ${position === "left" ? "left-10 sm:left-20 lg:left-40" : "right-10 sm:right-20 lg:right-40"} top-0 w-40 h-40 sm:w-60 sm:h-60`}
      initial={{ x: position === "left" ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: delay * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-full h-full">
        <div 
          className={`absolute inset-0 rounded-full opacity-20 ${
            gender === "boy" ? "bg-bloomie-green" : "bg-bloomie-pink"
          }`}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            y: [0, -8, 0],
            rotate: position === "left" ? [0, 2, 0] : [0, -2, 0]
          }}
          transition={{ repeat: Infinity, duration: position === "left" ? 4 : 3.5, ease: "easeInOut" }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48">
            {/* Character */}
            <div 
              className={`absolute inset-0 rounded-full flex items-center justify-center overflow-hidden ${
                gender === "boy" ? "bg-primary" : "bg-bloomie-purple"
              }`}
            >
              <span className="text-6xl">{gender === "boy" ? "👦" : "👧"}</span>
              
              {/* Mouth animation */}
              {speaking && (
                <motion.div 
                  className="absolute bottom-12 w-8 h-2 bg-black rounded-full"
                  initial={{ scaleY: 0.5 }}
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                />
              )}
            </div>
            
            {/* Animated Arms */}
            <motion.div 
              className={`absolute ${position === "left" ? "-right-4" : "-left-4"} top-1/4 w-10 h-3 rounded-full origin-${position === "left" ? "left" : "right"} ${
                gender === "boy" ? "bg-primary" : "bg-bloomie-purple"
              }`}
              animate={{ rotate: position === "left" ? [0, 20, 0, 20, 0] : [0, -20, 0, -20, 0] }}
              transition={{ repeat: Infinity, duration: position === "left" ? 2.5 : 2.7 }}
            />
          </div>
        </motion.div>
        
        {/* Speech Bubble */}
        <motion.div 
          className={`absolute -top-12 ${position === "left" ? "-right-12 sm:-right-20" : "-left-12 sm:-left-28"} bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md z-10`}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ delay: delay * 0.2 + 1, duration: 0.5 }}
        >
          <p className="text-sm whitespace-nowrap">{message}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedAvatar;
