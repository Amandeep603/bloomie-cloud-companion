
import React from "react";
import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  gender: "boy" | "girl";
  speaking: boolean;
}

const AnimatedAvatar = ({ gender, speaking }: AnimatedAvatarProps) => {
  const isGirl = gender === "girl";
  const avatarImage = isGirl 
    ? "/lovable-uploads/75fb7156-3c2c-4f58-b8fc-904c2d528aca.png" 
    : "/lovable-uploads/3f128cd2-2af7-4a4d-94de-a9a510d03e3b.png";
  
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
          isGirl ? "bg-purple-500" : "bg-blue-500"
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
          isGirl ? "bg-purple-400" : "bg-blue-400"
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
        <div className="relative w-40 h-40 sm:w-48 sm:h-48">
          {/* Character */}
          <motion.div 
            className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
            animate={{ scale: speaking ? [1, 1.03, 1] : 1 }}
            transition={{ 
              repeat: speaking ? Infinity : undefined, 
              duration: 0.5 
            }}
          >
            <img 
              src={avatarImage}
              alt={isGirl ? "Girl Avatar" : "Boy Avatar"}
              className="w-full h-full object-cover"
            />
            
            {/* Mouth - Animated when speaking */}
            {speaking && (
              <motion.div
                className="absolute bottom-10 w-8 h-2 bg-black rounded-full"
                animate={{ 
                  scaleY: [0.8, 1.5, 0.9, 1.3, 0.8],
                  scaleX: [1, 0.8, 1.1, 0.9, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.6
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAvatar;
