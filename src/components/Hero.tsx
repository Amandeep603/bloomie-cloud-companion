
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedAvatar from "./AnimatedAvatar";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const { currentUser } = useAuth();
  const [activeSpeaker, setActiveSpeaker] = useState<number>(-1);
  const [conversationIndex, setConversationIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Avatar conversation dialogue with timed display
  const conversation = [
    { speaker: "girl", message: "Hey, have you met Bloomie yet?" },
    { speaker: "boy", message: "Yes! Bloomie's like a virtual best friend." },
    { speaker: "girl", message: "I chat with her every day. She remembers how I feel and helps me grow!" },
    { speaker: "boy", message: "She even lets me write a daily diary — it tracks my mood!" },
    { speaker: "girl", message: "So cool! I feel like I'm never alone when Bloomie's around." }
  ];

  // Control the conversation flow with timing
  useEffect(() => {
    const showNextMessage = () => {
      if (conversationIndex < conversation.length) {
        setActiveSpeaker(conversationIndex);
        
        setTimeout(() => {
          setConversationIndex(conversationIndex + 1);
        }, 3500); // Time before moving to next message
      } else {
        // Reset conversation after a pause
        setTimeout(() => {
          setActiveSpeaker(-1);
          setTimeout(() => {
            setConversationIndex(0);
          }, 500);
        }, 2000);
      }
    };
    
    showNextMessage();
  }, [conversationIndex]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute top-20 -left-10 w-40 h-40 rounded-full bg-bloomie-purple/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-bloomie-pink/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-20 h-20 rounded-full bg-bloomie-yellow/20 blur-2xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      {/* 3D Animated Avatars Scene */}
      <motion.div 
        className="relative mb-12 w-full max-w-4xl h-[400px] sm:h-[500px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Avatar Container with better spacing and responsive layout */}
        <div className={`${isMobile ? 'flex flex-col items-center justify-around h-full' : 'relative'}`}>
          {/* Girl Avatar - Left Side */}
          <motion.div 
            className={`${isMobile 
              ? 'mb-24' // Vertical spacing on mobile
              : 'absolute left-10 sm:left-20 lg:left-40 top-0'} 
              w-40 h-40 sm:w-60 sm:h-60`}
          >
            {/* Soft container for avatar */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-bloomie-purple/10 to-bloomie-pink/10 -z-10"
              animate={{ 
                boxShadow: ["0 0 0px rgba(157, 132, 183, 0.3)", "0 0 20px rgba(157, 132, 183, 0.5)", "0 0 0px rgba(157, 132, 183, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
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
              ? '' // No extra spacing needed for bottom avatar
              : 'absolute right-10 sm:right-20 lg:right-40 top-0'} 
              w-40 h-40 sm:w-60 sm:h-60`}
          >
            {/* Soft container for avatar */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-bloomie-green/10 to-bloomie-yellow/10 -z-10"
              animate={{ 
                boxShadow: ["0 0 0px rgba(181, 230, 179, 0.3)", "0 0 20px rgba(181, 230, 179, 0.5)", "0 0 0px rgba(181, 230, 179, 0.3)"]
              }}
              transition={{ duration: 3, delay: 1, repeat: Infinity }}
            />
            
            <AnimatedAvatar 
              gender="boy" 
              position="right"
              speaking={activeSpeaker !== -1 && conversation[activeSpeaker]?.speaker === "boy"}
            />
          </motion.div>
        </div>
        
        {/* Speech Bubble - Improved Animation and Styling */}
        <AnimatePresence mode="wait">
          {activeSpeaker !== -1 && (
            <motion.div
              key={`speech-${activeSpeaker}`}
              className={`absolute ${isMobile 
                ? 'top-[45%] left-1/2 transform -translate-x-1/2 max-w-[280px]' 
                : `top-32 sm:top-40 ${
                  conversation[activeSpeaker]?.speaker === "girl" 
                    ? "left-[80px] sm:left-[160px]" 
                    : "right-[80px] sm:right-[160px]"
                } max-w-[200px] sm:max-w-[280px]`}`}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm relative">
                <motion.p 
                  className="text-sm sm:text-base font-nunito"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {conversation[activeSpeaker]?.message}
                </motion.p>
                
                {/* Typing animation dots */}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        conversation[activeSpeaker]?.speaker === "girl" 
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
                
                {/* Speech bubble tail */}
                <div 
                  className={`absolute -bottom-2 w-4 h-4 bg-white/90 dark:bg-gray-800/90 rotate-45 border-b border-r border-gray-100 dark:border-gray-700 ${
                    isMobile ? "left-1/2 -translate-x-1/2" : conversation[activeSpeaker]?.speaker === "girl" ? "left-5" : "right-5"
                  }`}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Connection Line Between Avatars - Hide on Mobile */}
        {!isMobile && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 sm:w-40 md:w-60 h-1 bg-gradient-to-r from-primary/40 to-bloomie-purple/40 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-bloomie-yellow rounded-full"
              animate={{ 
                x: ['0%', '100%', '0%'],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Text Content */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-nunito">
          <span className="bg-clip-text text-transparent animated-gradient">Say Hello to Bloomie,</span> Your New AI Friend
        </h1>
        
        <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl mx-auto font-nunito">
          A lovable companion that understands your emotions, chats with you, and helps you bloom into your best self.
        </p>
      </motion.div>
      
      {/* Action Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {currentUser ? (
          <Link to="/chat">
            <Button size="lg" className="text-lg px-8 group font-nunito">
              Start Chatting
              <span className="ml-2 group-hover:rotate-12 transition-transform">🌸</span>
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button size="lg" className="text-lg px-8 group font-nunito">
              Meet Bloomie
              <span className="ml-2 group-hover:rotate-12 transition-transform">🌸</span>
            </Button>
          </Link>
        )}
        <Link to="/about">
          <Button size="lg" variant="outline" className="text-lg px-8 font-nunito">
            Learn More
          </Button>
        </Link>
      </motion.div>
      
      {/* Floating messages */}
      <motion.div
        className="absolute top-1/4 left-[10%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: [0, 1, 1, 0], x: [-50, 0, 0, 50] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm font-nunito">🌼 Chat with your Bloomie</p>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-[15%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: [0, 1, 1, 0], x: [50, 0, 0, -50] }}
        transition={{ duration: 8, delay: 3, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm font-nunito">🌸 Share your feelings openly</p>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-[10%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-50, 0, 0, 50] }}
        transition={{ duration: 8, delay: 6, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm font-nunito">🌟 Make every day special</p>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 left-[15%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: [0, 1, 1, 0], y: [50, 0, 0, -50] }}
        transition={{ duration: 8, delay: 9, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm font-nunito">💬 Talk freely, I'm here for you!</p>
      </motion.div>
    </div>
  );
};

export default Hero;
