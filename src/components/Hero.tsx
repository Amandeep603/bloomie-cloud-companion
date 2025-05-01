
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import AnimatedAvatar from "./AnimatedAvatar";

const Hero = () => {
  const { currentUser } = useAuth();
  
  // Avatar conversation dialogue
  const boyMessages = [
    "Yes! Bloomie's like a virtual best friend.",
    "She even lets me write a daily diary — it tracks my mood!",
  ];
  
  const girlMessages = [
    "Hey, have you met Bloomie yet?",
    "I chat with her every day. She remembers how I feel and helps me grow!",
    "So cool! I feel like I'm never alone when Bloomie's around."
  ];

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 -left-10 w-40 h-40 rounded-full bg-bloomie-purple/20 blur-3xl"></div>
      <div className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-bloomie-pink/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 rounded-full bg-bloomie-yellow/20 blur-2xl"></div>
      
      {/* 3D Animated Avatars Scene */}
      <motion.div 
        className="relative mb-12 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative h-[300px] sm:h-[400px] w-full">
          {/* Girl Avatar - First Speaker */}
          <AnimatedAvatar 
            gender="girl" 
            position="left" 
            message={girlMessages[0]} 
            delay={1}
          />

          {/* Boy Avatar - Second Speaker */}
          <AnimatedAvatar 
            gender="boy" 
            position="right" 
            message={boyMessages[0]} 
            delay={4}
          />
          
          {/* Add a delay and then show the next messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ delay: 8, duration: 8 }}
            className="absolute inset-0"
          >
            <AnimatedAvatar 
              gender="girl" 
              position="left" 
              message={girlMessages[1]} 
              delay={1}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ delay: 12, duration: 8 }}
            className="absolute inset-0"
          >
            <AnimatedAvatar 
              gender="boy" 
              position="right" 
              message={boyMessages[1]} 
              delay={1}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ delay: 16, duration: 8 }}
            className="absolute inset-0"
          >
            <AnimatedAvatar 
              gender="girl" 
              position="left" 
              message={girlMessages[2]} 
              delay={1}
            />
          </motion.div>

          {/* Connection Line Between Avatars */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-1 bg-gradient-to-r from-primary to-bloomie-purple rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-bloomie-yellow rounded-full"
              animate={{ 
                x: [-40, 40, -40],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        </div>
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
