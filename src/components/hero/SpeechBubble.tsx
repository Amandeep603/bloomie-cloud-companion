
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
  
  // Enhanced animation variants for comic-style thought bubbles
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
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
      y: -10,
      scale: 0.8,
      transition: { duration: 0.3 } 
    }
  };

  // Position the speech bubble directly above the avatar's head
  return (
    <motion.div
      className={`absolute top-[-120px] left-1/2 transform -translate-x-1/2 max-w-[280px]`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Comic-style cloud bubble with improved contrast and lighter background */}
      <div className={`
        ${speaker === "girl" 
          ? "bg-[#f8f0ff] border-purple-300 text-gray-900" 
          : "bg-[#f0f8ff] border-blue-300 text-gray-900"
        } 
        p-5 rounded-[30px] shadow-lg border-2 relative
      `}>
        {/* Cloud-like shape with scalloped edges using pseudo-elements */}
        <div className={`absolute -top-3 -left-3 w-6 h-6 rounded-full 
          ${speaker === "girl" ? "bg-[#f8f0ff] border-2 border-purple-300" : "bg-[#f0f8ff] border-2 border-blue-300"}`}></div>
        <div className={`absolute -top-5 left-5 w-5 h-5 rounded-full 
          ${speaker === "girl" ? "bg-[#f8f0ff] border-2 border-purple-300" : "bg-[#f0f8ff] border-2 border-blue-300"}`}></div>
        <div className={`absolute -top-2 right-6 w-4 h-4 rounded-full 
          ${speaker === "girl" ? "bg-[#f8f0ff] border-2 border-purple-300" : "bg-[#f0f8ff] border-2 border-blue-300"}`}></div>
        
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
        
        {/* Speech bubble tail pointing to speaker - positioned at bottom center */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2
          w-12 h-12 overflow-hidden`}>
          <div className={`
            w-12 h-12 rotate-45 relative top-[-6px] 
            ${speaker === "girl" 
              ? "bg-[#f8f0ff] border-r-2 border-b-2 border-purple-300" 
              : "bg-[#f0f8ff] border-r-2 border-b-2 border-blue-300"}
          `}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
