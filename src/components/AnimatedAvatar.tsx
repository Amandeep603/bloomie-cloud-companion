
import React from "react";
import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  gender: "boy" | "girl";
  position: "left" | "right";
  speaking?: boolean;
}

const AnimatedAvatar = ({ gender, position, speaking = false }: AnimatedAvatarProps) => {
  return (
    <motion.div 
      className="relative w-full h-full"
      initial={{ x: position === "left" ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background Glow Effect */}
      <motion.div 
        className={`absolute inset-0 rounded-full opacity-20 ${
          gender === "boy" ? "bg-bloomie-green" : "bg-bloomie-pink"
        }`}
        animate={{ 
          scale: speaking ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: speaking ? [0.2, 0.4, 0.2] : [0.2, 0.25, 0.2]
        }}
        transition={{ repeat: Infinity, duration: speaking ? 1 : 2 }}
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
          <motion.div 
            className={`absolute inset-0 rounded-full flex items-center justify-center overflow-hidden ${
              gender === "boy" ? "bg-primary" : "bg-bloomie-purple"
            }`}
            animate={{ scale: speaking ? [1, 1.03, 1] : 1 }}
            transition={{ 
              repeat: speaking ? Infinity : undefined, 
              duration: 0.5 
            }}
          >
            <span className="text-6xl">{gender === "boy" ? "👦" : "👧"}</span>
            
            {/* Eyes - Blinking Animation */}
            <motion.div 
              className="absolute top-12 left-1/2 transform -translate-x-1/2 flex gap-5"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatDelay: Math.random() * 2 + 1, 
                duration: 0.15 
              }}
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </motion.div>
            
            {/* Mouth animation - Enhanced for more natural movement */}
            {speaking ? (
              <motion.div 
                className="absolute bottom-12 w-8 h-4 bg-black rounded-full overflow-hidden"
                animate={{ 
                  scaleY: [0.5, 1.2, 0.5, 0.8, 0.5],
                  scaleX: [0.8, 0.6, 0.8, 0.7, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              >
                <div className="w-full h-2/3 bg-red-400 absolute bottom-0 rounded-full"></div>
              </motion.div>
            ) : (
              <motion.div 
                className="absolute bottom-12 w-6 h-1.5 bg-black rounded-full"
                animate={{ width: [6, 8, 6] }}
                transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.2 }}
              />
            )}
          </motion.div>
          
          {/* Animated Arms */}
          <motion.div 
            className={`absolute ${position === "left" ? "-right-4" : "-left-4"} top-1/4 w-10 h-3 rounded-full origin-${position === "left" ? "left" : "right"} ${
              gender === "boy" ? "bg-primary" : "bg-bloomie-purple"
            }`}
            animate={{ 
              rotate: speaking 
                ? position === "left" ? [0, 15, -5, 10, 0] : [0, -15, 5, -10, 0] 
                : position === "left" ? [0, 10, 0] : [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: speaking ? 2 : 3,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAvatar;
