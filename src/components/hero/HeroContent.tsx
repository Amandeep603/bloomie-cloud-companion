
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const HeroContent = () => {
  const { currentUser } = useAuth();

  return (
    <>
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
    </>
  );
};

export default HeroContent;
