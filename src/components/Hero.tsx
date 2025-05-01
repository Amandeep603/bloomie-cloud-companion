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
  
  // Avatar conversation dialogue with improved timing
  const conversation = [
    { speaker: "girl", message: "Hey, have you met Bloomie yet?" },
    { speaker: "boy", message: "Yes! Bloomie's like a virtual best friend." },
    { speaker: "girl", message: "I chat with her every day. She remembers how I feel and helps me grow!" },
    { speaker: "boy", message: "She even lets me write a daily diary — it tracks my mood!" },
    { speaker: "girl", message: "So cool! I feel like I'm never alone when Bloomie's around." }
  ];

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
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background Decorative Elements with Animation */}
      <motion.div 
        className="absolute top-20 -left-10 w-60 h-60 rounded-full bg-gradient-to-r from-bloomie-purple/20 to-bloomie-pink/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 -right-10 w-60 h-60 rounded-full bg-gradient-to-l from-bloomie-green/20 to-bloomie-yellow/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-40 h-40 rounded-full bg-gradient-to-b from-bloomie-yellow/15 to-bloomie-pink/15 blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* 3D Animated Avatars Scene with improved spacing */}
      <motion.div 
        className="relative mb-12 w-full max-w-5xl h-[400px] sm:h-[500px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Avatar Container with better spacing and responsive layout */}
        <div className={`${isMobile ? 'flex flex-col items-center gap-32' : 'relative'}`}>
          {/* Girl Avatar - Left Side */}
          <motion.div 
            className={`${isMobile 
              ? '' // No extra margin needed in stacked layout
              : 'absolute left-10 sm:left-20 lg:left-60 xl:left-80 top-0'} 
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
              : 'absolute right-10 sm:right-20 lg:right-60 xl:right-80 top-0'} 
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
            <motion.div
              key={`speech-${activeSpeaker}`}
              className={`absolute ${isMobile 
                ? 'top-[40%] left-1/2 transform -translate-x-1/2 max-w-[280px]' 
                : `top-36 sm:top-40 ${
                  conversation[activeSpeaker]?.speaker === "girl" 
                    ? "left-[80px] sm:left-[200px] lg:left-[240px]" 
                    : "right-[80px] sm:right-[200px] lg:right-[240px]"
                } max-w-[220px] sm:max-w-[320px]`}`}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`
                ${conversation[activeSpeaker]?.speaker === "girl" 
                  ? "bg-gradient-to-br from-bloomie-purple/10 to-bloomie-pink/10 border-bloomie-purple/20" 
                  : "bg-gradient-to-br from-bloomie-green/10 to-bloomie-yellow/10 border-bloomie-green/20"
                } 
                p-5 rounded-2xl shadow-lg border backdrop-blur-sm relative
              `}>
                {/* Improved typing animation */}
                <motion.p 
                  className="text-sm sm:text-base font-nunito"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {conversation[activeSpeaker]?.message}
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
                
                {/* Improved cloud-style tail */}
                <div 
                  className={`absolute -bottom-3 w-6 h-6 transform rotate-45 ${
                    conversation[activeSpeaker]?.speaker === "girl" 
                      ? "bg-gradient-to-br from-bloomie-purple/10 to-bloomie-pink/10 border-b border-r border-bloomie-purple/20" 
                      : "bg-gradient-to-br from-bloomie-green/10 to-bloomie-yellow/10 border-b border-r border-bloomie-green/20"
                  } ${
                    isMobile ? "left-1/2 -translate-x-1/2" : 
                    conversation[activeSpeaker]?.speaker === "girl" ? "left-8" : "right-8"
                  }`}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Connection Line Between Avatars - Hide on Mobile, improved animation */}
        {!isMobile && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 sm:w-40 md:w-80 h-1 bg-gradient-to-r from-bloomie-purple/30 via-primary/30 to-bloomie-green/30 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-bloomie-yellow rounded-full shadow-md shadow-bloomie-yellow/50"
              animate={{ 
                x: ['0%', '100%', '0%'],
                scale: [1, 1.4, 1]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
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
