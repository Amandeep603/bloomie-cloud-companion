
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedAvatar from "../AnimatedAvatar";
import SpeechBubble from "./SpeechBubble";
import ConnectionLine from "./ConnectionLine";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConversationSceneProps {
  conversation: {
    speaker: "girl" | "boy";
    message: string;
  }[];
}

const ConversationScene = ({ conversation }: ConversationSceneProps) => {
  const [activeSpeaker, setActiveSpeaker] = useState<number>(-1);
  const [conversationIndex, setConversationIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Control the conversation flow with timing
  useEffect(() => {
    // Reset function for conversation
    const resetConversation = () => {
      setActiveSpeaker(-1);
      setTimeout(() => {
        setConversationIndex(0);
      }, 1000);
    };

    // Show next message function
    const showNextMessage = () => {
      if (conversationIndex < conversation.length) {
        setActiveSpeaker(conversationIndex);
        
        // Longer delay between messages for better readability
        setTimeout(() => {
          setConversationIndex(conversationIndex + 1);
        }, 4000); // Increased time between messages
      } else {
        // Reset conversation after a longer pause
        setTimeout(() => {
          resetConversation();
        }, 3000);
      }
    };
    
    showNextMessage();
  }, [conversationIndex, conversation.length]);

  return (
    <motion.div 
      className="relative mb-8 w-full max-w-5xl h-[400px] sm:h-[500px]" // Reduced margin-bottom from mb-12 to mb-8
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Avatar Container with better spacing and responsive layout */}
      <div className={`${isMobile ? 'flex flex-col items-center gap-24' : 'relative'}`}> {/* Reduced gap from gap-32 to gap-24 on mobile */}
        {/* Girl Avatar - Left Side */}
        <motion.div 
          className={`${isMobile 
            ? '' // No extra margin needed in stacked layout
            : 'absolute left-10 sm:left-20 lg:left-40 xl:left-60 top-0'} 
            w-40 h-40 sm:w-56 sm:h-56`}
        >
          {/* Soft container for avatar - improved glow */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-bloomie-purple/15 to-bloomie-pink/15 -z-10"
            animate={{ 
              boxShadow: ["0 0 0px rgba(157, 132, 183, 0.2)", "0 0 30px rgba(157, 132, 183, 0.4)", "0 0 0px rgba(157, 132, 183, 0.2)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <AnimatedAvatar 
            gender="girl" 
            position="left" 
            speaking={activeSpeaker !== -1 && conversation[activeSpeaker]?.speaker === "girl"}
          />
        </motion.div>

        {/* Boy Avatar - Right Side */}
        <motion.div 
          className={`${isMobile 
            ? '' // Stacked layout on mobile
            : 'absolute right-10 sm:right-20 lg:right-40 xl:right-60 top-0'} 
            w-40 h-40 sm:w-56 sm:h-56`}
        >
          {/* Soft container for avatar - improved glow */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-bloomie-green/15 to-bloomie-yellow/15 -z-10"
            animate={{ 
              boxShadow: ["0 0 0px rgba(181, 230, 179, 0.2)", "0 0 30px rgba(181, 230, 179, 0.4)", "0 0 0px rgba(181, 230, 179, 0.2)"]
            }}
            transition={{ duration: 4, delay: 2, repeat: Infinity }}
          />
          
          <AnimatedAvatar 
            gender="boy" 
            position="right"
            speaking={activeSpeaker !== -1 && conversation[activeSpeaker]?.speaker === "boy"}
          />
        </motion.div>
      </div>
      
      {/* Speech Bubble - Improved cloud-style design and animation */}
      <AnimatePresence mode="wait">
        {activeSpeaker !== -1 && (
          <SpeechBubble 
            message={conversation[activeSpeaker].message}
            speaker={conversation[activeSpeaker].speaker}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
      
      {/* Connection Line Between Avatars - Hide on Mobile */}
      {!isMobile && <ConnectionLine />}
    </motion.div>
  );
};

export default ConversationScene;
