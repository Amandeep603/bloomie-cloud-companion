
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechBubble from "./SpeechBubble";
import ConnectionLine from "./ConnectionLine";
import AnimatedAvatar from "./AnimatedAvatar";

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

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 mb-16">
      <div className="flex justify-center items-end px-8 md:px-12 lg:px-20 pt-12">
        {/* Boy's avatar and speech bubble */}
        <div className="w-[44%] md:w-[44%] flex flex-col items-center relative">
          <div className="h-48 md:h-56 w-48 md:w-56 rounded-full overflow-hidden z-10 relative">
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

        {/* Connection line between avatars */}
        <div className="w-[12%] md:w-[12%] px-4 flex justify-center">
          <ConnectionLine />
        </div>
        
        {/* Girl's avatar and speech bubble */}
        <div className="w-[44%] md:w-[44%] flex flex-col items-center relative">
          <div className="h-48 md:h-56 w-48 md:w-56 rounded-full overflow-hidden z-10 relative">
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
        </div>
      </div>
    </div>
  );
};

export default ConversationScene;
