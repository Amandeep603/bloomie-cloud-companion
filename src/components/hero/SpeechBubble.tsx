
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
  
  // Enhanced animation variants for speech bubbles
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
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
      y: 10,
      scale: 0.8,
      transition: { duration: 0.3 } 
    }
  };

  // Position the speech bubbles next to the avatars' mouths, not covering their faces
  const positionClasses = speaker === "girl" 
    ? "left-[-120px] top-[50px] md:left-[-140px] md:top-[60px]" 
    : "right-[-120px] top-[50px] md:right-[-140px] md:top-[60px]";

  return (
    <motion.div
      className={`absolute ${positionClasses}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Rectangular speech bubble with tail */}
      <div className={`
        ${speaker === "girl" 
          ? "bg-[#f8f0ff] border-purple-200 text-gray-900" 
          : "bg-[#f0f8ff] border-blue-200 text-gray-900"
        } 
        p-3 rounded-[14px] shadow-sm border relative max-w-[220px] md:max-w-[250px]
      `}>
        {/* Message content */}
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
        
        {/* Speech bubble tail pointing to speaker */}
        <div className={`
          absolute ${speaker === "girl" 
            ? "right-[-6px] top-[15px] rotate-[135deg]" 
            : "left-[-6px] top-[15px] rotate-[315deg]"
          }
          h-3 w-3 transform
          ${speaker === "girl" 
            ? "bg-[#f8f0ff] border-r border-b border-purple-200" 
            : "bg-[#f0f8ff] border-r border-b border-blue-200"
          }
        `}></div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
