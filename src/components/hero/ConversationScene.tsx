
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechBubble from "./SpeechBubble";
import ConnectionLine from "./ConnectionLine";

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
        }, 500);
      }, 4000); // Longer display time for each message
      
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
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center items-end px-8 md:px-16 pt-8">
        <div className="w-[38%] md:w-[35%] flex flex-col items-center gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/avatar-girl.webp"
              alt="Girl Avatar"
              className="h-24 md:h-32 aspect-square object-cover rounded-full bg-gradient-to-br from-pink-200 to-violet-200 p-1 shadow-xl"
            />
          </motion.div>
          
          {/* Girl's speech bubble */}
          <AnimatePresence mode="wait">
            {showMessage && currentMessage?.speaker === "girl" && (
              <SpeechBubble 
                message={currentMessage.message} 
                speaker="girl" 
                position="top" 
                key={`girl-${currentMessageIndex}`}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Connection line between avatars */}
        <div className="w-[24%] md:w-[30%] px-4 flex justify-center">
          <ConnectionLine />
        </div>
        
        <div className="w-[38%] md:w-[35%] flex flex-col items-center gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/avatar-boy.webp"
              alt="Boy Avatar"
              className="h-24 md:h-32 aspect-square object-cover rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 p-1 shadow-xl"
            />
          </motion.div>
          
          {/* Boy's speech bubble */}
          <AnimatePresence mode="wait">
            {showMessage && currentMessage?.speaker === "boy" && (
              <SpeechBubble 
                message={currentMessage.message} 
                speaker="boy" 
                position="top" 
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
