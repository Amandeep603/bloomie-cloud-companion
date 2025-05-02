
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
      className="relative mb-2 w-full max-w-5xl h-[400px] sm:h-[500px]" // Further reduced margin-bottom 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Avatar Container with improved spacing */}
      <div className={`${isMobile ? 'flex flex-col items-center gap-12' : 'relative'}`}> {/* Further reduced gap on mobile */}
        {/* Girl Avatar - Left Side */}
        <motion.div 
          className={`${isMobile 
            ? '' // No extra margin needed in stacked layout
            : 'absolute left-6 sm:left-12 lg:left-32 xl:left-48 top-0'} 
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
            : 'absolute right-6 sm:right-12 lg:right-32 xl:right-48 top-0'} 
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
