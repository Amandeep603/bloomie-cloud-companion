
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Hero = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 -left-10 w-40 h-40 rounded-full bg-bloomie-purple/20 blur-3xl"></div>
      <div className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-bloomie-pink/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 rounded-full bg-bloomie-yellow/20 blur-2xl"></div>
      
      {/* 3D Animated Avatars Scene */}
      <motion.div 
        className="relative mb-8 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative h-[300px] sm:h-[400px] w-full">
          {/* Boy Avatar */}
          <motion.div 
            className="absolute left-10 sm:left-20 lg:left-40 top-0 w-40 h-40 sm:w-60 sm:h-60"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-bloomie-green rounded-full opacity-20"></div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                  {/* Boy Character */}
                  <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-6xl">👦</span>
                  </div>
                  {/* Animated Arms */}
                  <motion.div 
                    className="absolute -right-4 top-1/4 w-10 h-3 bg-primary rounded-full origin-left"
                    animate={{ rotate: [0, 20, 0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  ></motion.div>
                </div>
              </motion.div>
              {/* Speech Bubble */}
              <motion.div 
                className="absolute -top-12 -right-12 sm:-right-20 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <p className="text-sm whitespace-nowrap">👋 Hello there!</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Girl Avatar */}
          <motion.div 
            className="absolute right-10 sm:right-20 lg:right-40 top-0 w-40 h-40 sm:w-60 sm:h-60"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-bloomie-pink rounded-full opacity-20"></div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                  {/* Girl Character */}
                  <div className="absolute inset-0 bg-bloomie-purple rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-6xl">👧</span>
                  </div>
                  {/* Animated Arms */}
                  <motion.div 
                    className="absolute -left-4 top-1/4 w-10 h-3 bg-bloomie-purple rounded-full origin-right"
                    animate={{ rotate: [0, -20, 0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2.7 }}
                  ></motion.div>
                </div>
              </motion.div>
              {/* Speech Bubble */}
              <motion.div 
                className="absolute -top-16 -left-12 sm:-left-28 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <p className="text-sm whitespace-nowrap">I'm Bloomie! 🌸</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Connection Line Between Avatars */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-1 bg-gradient-to-r from-primary to-bloomie-purple rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
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
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent animated-gradient">Say Hello to Bloomie,</span> Your New AI Friend
        </h1>
        
        <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
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
            <Button size="lg" className="text-lg px-8 group">
              Start Chatting
              <span className="ml-2 group-hover:rotate-12 transition-transform">🌸</span>
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button size="lg" className="text-lg px-8 group">
              Meet Bloomie
              <span className="ml-2 group-hover:rotate-12 transition-transform">🌸</span>
            </Button>
          </Link>
        )}
        <Link to="/about">
          <Button size="lg" variant="outline" className="text-lg px-8">
            Learn More
          </Button>
        </Link>
      </motion.div>
      
      {/* Floating messages */}
      <motion.div
        className="absolute top-1/4 left-[10%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: [0, 1, 1, 0], x: [-50, 0, 0, 50] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm">🌼 Chat with your Bloomie</p>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-[15%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: [0, 1, 1, 0], x: [50, 0, 0, -50] }}
        transition={{ duration: 8, delay: 3, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm">🌸 Share your feelings openly</p>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-[10%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-50, 0, 0, 50] }}
        transition={{ duration: 8, delay: 6, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm">🌟 Make every day special</p>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 left-[15%] bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: [0, 1, 1, 0], y: [50, 0, 0, -50] }}
        transition={{ duration: 8, delay: 9, repeat: Infinity, repeatDelay: 5 }}
      >
        <p className="text-sm">💬 Talk freely, I'm here for you!</p>
      </motion.div>
    </div>
  );
};

export default Hero;
