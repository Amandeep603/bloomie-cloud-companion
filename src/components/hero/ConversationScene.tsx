
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
      <div className="flex justify-center items-end px-8 md:px-12 lg:px-20 pt-20">
        {/* Added z-index control and increased top padding to make space for bubbles */}
        <div className="w-[38%] md:w-[38%] flex flex-col items-center gap-8 relative">
          {/* Boy's speech bubble positioned above avatar with increased z-index */}
          <div className="absolute -top-32 z-30">
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
          
          <div className="h-48 md:h-56 w-48 md:w-56 rounded-full overflow-hidden z-10">
            <AnimatedAvatar 
              gender="boy" 
              speaking={showMessage && currentMessage?.speaker === "boy"}
            />
          </div>
        </div>

        {/* Connection line between avatars with increased width */}
        <div className="w-[30%] md:w-[30%] px-8 flex justify-center">
          <ConnectionLine />
        </div>
        
        <div className="w-[38%] md:w-[38%] flex flex-col items-center gap-8 relative">
          {/* Girl's speech bubble positioned above avatar with increased z-index */}
          <div className="absolute -top-32 z-30">
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
          
          <div className="h-48 md:h-56 w-48 md:w-56 rounded-full overflow-hidden z-10">
            <AnimatedAvatar 
              gender="girl" 
              speaking={showMessage && currentMessage?.speaker === "girl"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationScene;
