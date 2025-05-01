
import React from "react";
import { motion } from "framer-motion";

const BackgroundElements = () => {
  return (
    <>
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
    </>
  );
};

export default BackgroundElements;
