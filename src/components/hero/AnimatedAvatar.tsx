
import React from "react";
import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  gender: "boy" | "girl";
  speaking: boolean;
}

const AnimatedAvatar = ({ gender, speaking }: AnimatedAvatarProps) => {
  const isGirl = gender === "girl";
  
  return (
    <motion.div 
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Glow Effect */}
      <motion.div 
        className={`absolute inset-0 rounded-full opacity-30 ${
          isGirl ? "bg-bloomie-purple" : "bg-bloomie-green"
        }`}
        animate={{ 
          scale: speaking ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: speaking ? [0.2, 0.5, 0.2] : [0.2, 0.3, 0.2]
        }}
        transition={{ repeat: Infinity, duration: speaking ? 1 : 2 }}
      />
      
      {/* Soft Outer Glow */}
      <motion.div 
        className={`absolute inset-0 rounded-full blur-md opacity-20 ${
          isGirl ? "bg-bloomie-purple" : "bg-bloomie-green"
        }`}
        animate={{ 
          scale: [1.1, 1.2, 1.1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ 
          y: [0, -8, 0]
        }}
        transition={{ repeat: Infinity, duration: isGirl ? 4 : 3.5, ease: "easeInOut" }}
      >
        <div className="relative w-36 h-36 sm:w-40 sm:h-40">
          {/* Character */}
          <motion.div 
            className={`absolute inset-0 rounded-full flex items-center justify-center overflow-hidden ${
              isGirl ? "bg-gradient-to-br from-bloomie-purple to-bloomie-pink" : "bg-gradient-to-br from-bloomie-green to-bloomie-yellow"
            }`}
            animate={{ scale: speaking ? [1, 1.03, 1] : 1 }}
            transition={{ 
              repeat: speaking ? Infinity : undefined, 
              duration: 0.5 
            }}
          >
            <span className="text-6xl">{isGirl ? "👧" : "👦"}</span>
            
            {/* Enhanced Eyes - Blinking Animation */}
            <motion.div 
              className="absolute top-10 left-1/2 transform -translate-x-1/2 flex gap-5"
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
            
            {/* Mouth - Animated when speaking */}
            <motion.div
              className="absolute bottom-10 w-5 h-1.5 bg-black rounded-full"
              animate={speaking ? { 
                scaleY: [0.8, 1.5, 0.9, 1.3, 0.8],
                scaleX: [1, 0.8, 1.1, 0.9, 1]
              } : {}}
              transition={{ 
                repeat: speaking ? Infinity : undefined, 
                duration: 0.6
              }}
            />
            
            {/* Arms for more expression */}
            <motion.div 
              className={`absolute -right-3 top-1/3 w-10 h-3 rounded-full origin-left ${
                isGirl ? "bg-gradient-to-br from-bloomie-purple to-bloomie-pink" : "bg-gradient-to-br from-bloomie-green to-bloomie-yellow"
              }`}
              animate={{ 
                rotate: [0, -10, 0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className={`absolute -left-3 top-1/3 w-10 h-3 rounded-full origin-right ${
                isGirl ? "bg-gradient-to-br from-bloomie-purple to-bloomie-pink" : "bg-gradient-to-br from-bloomie-green to-bloomie-yellow"
              }`}
              animate={{ 
                rotate: [0, 10, 0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.5,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAvatar;
