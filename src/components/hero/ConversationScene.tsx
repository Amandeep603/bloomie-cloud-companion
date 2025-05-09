
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechBubble from "./SpeechBubble";
import ConnectionLine from "./ConnectionLine";
import AnimatedAvatar from "./AnimatedAvatar";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the conversation props type
type Speaker = "girl" | "boy";
type ConversationItem = {
  speaker: Speaker;
  message: string;
};

interface ConversationSceneProps {
  conversation: ConversationItem[];
}

const ConversationScene = ({ conversation }: ConversationSceneProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const isMobile = useIsMobile();

  // Control the message display timing
  useEffect(() => {
    if (currentMessageIndex < conversation.length) {
      // Show message with a slight delay
      const showTimer = setTimeout(() => {
        setShowMessage(true);
      }, 500);
      
      // Move to next message
      const nextTimer = setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
        }, 800); // Longer transition between messages
      }, 4500); // Longer display time for each message
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(nextTimer);
      };
    } else {
      // Reset conversation after completing
      const resetTimer = setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          setCurrentMessageIndex(0);
        }, 500);
      }, 2000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex, conversation.length]);

  const currentMessage = conversation[currentMessageIndex % conversation.length];

  // Improved layout with more spacing to prevent bubble-avatar overlap
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 mb-16">
      {/* Main container with avatars facing each other - increased gap */}
      <div className="flex justify-center items-center gap-40 md:gap-60 lg:gap-72 px-4 md:px-8">
        {/* Girl Avatar (Left Side) with increased space */}
        <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] z-10">
          <AnimatedAvatar 
            gender="girl" 
            speaking={showMessage && currentMessage?.speaker === "girl"}
          />
          {/* Girl's speech bubble */}
          <AnimatePresence mode="wait">
            {showMessage && currentMessage?.speaker === "girl" && (
              <SpeechBubble 
                message={currentMessage.message} 
                speaker="girl" 
                key={`girl-${currentMessageIndex}`}
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Digital connection between avatars */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ConnectionLine />
        </div>
        
        {/* Boy Avatar (Right Side) with increased space */}
        <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] z-10">
          <AnimatedAvatar 
            gender="boy" 
            speaking={showMessage && currentMessage?.speaker === "boy"}
          />
          {/* Boy's speech bubble */}
          <AnimatePresence mode="wait">
            {showMessage && currentMessage?.speaker === "boy" && (
              <SpeechBubble 
                message={currentMessage.message} 
                speaker="boy" 
                key={`boy-${currentMessageIndex}`}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ConversationScene;
