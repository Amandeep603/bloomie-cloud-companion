
import React from "react";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  message: string;
  speaker: "girl" | "boy";
  isMobile?: boolean;
  position?: string;
  children?: React.ReactNode;
}

const SpeechBubble = ({ message, speaker, isMobile, position, children }: SpeechBubbleProps) => {
  // Use children if provided, otherwise use message
  const content = children || message;
  
  // Enhanced animation variants
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: speaker === "girl" ? -20 : 20, 
      x: speaker === "girl" ? -10 : 10,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.4 
      }
    },
    exit: { 
      opacity: 0, 
      y: speaker === "girl" ? 20 : -20,
      scale: 0.8,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.div
      className={`absolute ${isMobile 
        ? 'top-[40%] left-1/2 transform -translate-x-1/2 max-w-[280px]' 
        : `top-36 sm:top-40 ${
          speaker === "girl" 
            ? "left-[80px] sm:left-[180px] lg:left-[220px]" 
            : "right-[80px] sm:right-[180px] lg:right-[220px]"
        } max-w-[220px] sm:max-w-[280px]`}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={`
        ${speaker === "girl" 
          ? "bg-gradient-to-br from-bloomie-purple/15 to-bloomie-pink/15 border-bloomie-purple/20" 
          : "bg-gradient-to-br from-bloomie-green/15 to-bloomie-yellow/15 border-bloomie-green/20"
        } 
        p-5 rounded-2xl shadow-lg border backdrop-blur-sm relative
      `}>
        {/* Message content with improved typing animation */}
        <motion.p 
          className="text-sm sm:text-base font-nunito"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.2, duration: 0.3 }
          }}
        >
          {content}
        </motion.p>
        
        {/* Enhanced typing animation dots */}
        <motion.div 
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: 2, repeatType: "reverse" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                speaker === "girl" 
                  ? "bg-bloomie-purple" 
                  : "bg-bloomie-green"
              }`}
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                delay: i * 0.1 
              }}
            />
          ))}
        </motion.div>
        
        {/* Improved cloud-style tail */}
        <div 
          className={`absolute -bottom-3 w-6 h-6 transform rotate-45 ${
            speaker === "girl" 
              ? "bg-gradient-to-br from-bloomie-purple/10 to-bloomie-pink/10 border-b border-r border-bloomie-purple/20" 
              : "bg-gradient-to-br from-bloomie-green/10 to-bloomie-yellow/10 border-b border-r border-bloomie-green/20"
          } ${
            isMobile ? "left-1/2 -translate-x-1/2" : 
            speaker === "girl" ? "left-8" : "right-8"
          }`}
        ></div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
