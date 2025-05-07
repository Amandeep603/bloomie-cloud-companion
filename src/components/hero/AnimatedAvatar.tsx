
import React from "react";
import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  gender: "boy" | "girl";
  speaking: boolean;
}

const AnimatedAvatar = ({ gender, speaking }: AnimatedAvatarProps) => {
  const isGirl = gender === "girl";
  const avatarImage = isGirl 
    ? "/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png" 
    : "/lovable-uploads/a897f883-d1a0-4c7e-ad58-fa38f2730685.png";
  
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
          opacity: speaking ? [0.2, 0.5, 0.2] : 0.2
        }}
        transition={{ repeat: speaking ? Infinity : undefined, duration: speaking ? 1 : 2 }}
      />
      
      {/* Soft Outer Glow */}
      <motion.div 
        className={`absolute inset-0 rounded-full blur-md opacity-20 ${
          isGirl ? "bg-purple-400" : "bg-blue-400"
        }`}
        animate={{ 
          opacity: speaking ? [0.1, 0.2, 0.1] : 0.1
        }}
        transition={{ repeat: speaking ? Infinity : undefined, duration: 3, ease: "easeInOut" }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48">
          {/* Character */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={avatarImage}
              alt={isGirl ? "Girl Avatar" : "Boy Avatar"}
              className="w-full h-full object-cover"
            />
            
            {/* Visual indicator when speaking */}
            {speaking && (
              <motion.div
                className="absolute bottom-0 w-full h-1 bg-primary"
                animate={{ 
                  scaleX: [0.8, 1, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.8
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedAvatar;
