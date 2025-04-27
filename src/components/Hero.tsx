
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
      
      {/* Animated Avatar Group */}
      <motion.div 
        className="relative mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Avatar */}
        <motion.div 
          className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-full flex items-center justify-center shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-36 h-36 md:w-52 md:h-52 bg-primary rounded-full flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-white text-5xl md:text-6xl font-nunito font-bold">B</div>
            
            {/* Face features animated */}
            <motion.div 
              className="absolute w-16 h-6 bg-white rounded-full top-[40%]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="flex justify-center space-x-8 mt-1">
                <motion.div 
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                <motion.div 
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Decorative Animated Elements */}
        <motion.div 
          className="absolute -top-3 -right-3 w-12 h-12 bg-bloomie-yellow rounded-full z-10 flex items-center justify-center"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.2 }}
        >
          <span className="text-xl">💭</span>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 -left-3 w-14 h-14 bg-bloomie-green rounded-full z-10 flex items-center justify-center"
          animate={{ 
            y: [0, 8, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          <span className="text-xl">💬</span>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 -right-8 w-16 h-16 bg-bloomie-pink rounded-full z-10 flex items-center justify-center"
          animate={{ 
            x: [0, 5, 0],
            y: [0, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <span className="text-xl">📓</span>
        </motion.div>
        
        <motion.div 
          className="absolute top-3/4 left-[70%] w-10 h-10 bg-bloomie-purple rounded-full z-10 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span className="text-lg">🎥</span>
        </motion.div>
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
