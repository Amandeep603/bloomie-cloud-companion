
import React from "react";
import { motion } from "framer-motion";

const ConnectionLine = () => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 max-w-[80%] bg-gradient-to-r from-bloomie-purple/20 via-primary/30 to-bloomie-green/20 rounded-full"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 0.8 }}
      transition={{ delay: 0.5, duration: 1.2 }}
    >
      {/* Animated particle moving along the connection line */}
      <motion.div 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2.5 h-2.5 bg-bloomie-yellow rounded-full shadow-md shadow-bloomie-yellow/50"
        animate={{ 
          x: ['0%', '100%', '0%'],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Additional smaller particles */}
      <motion.div 
        className="absolute top-1/2 left-[20%] transform -translate-y-1/2 w-1.5 h-1.5 bg-primary/70 rounded-full blur-[1px]"
        animate={{ 
          x: ['0%', '200%', '0%'],
          y: [0, -8, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10, 
          delay: 1,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-[70%] transform -translate-y-1/2 w-1.5 h-1.5 bg-bloomie-green/70 rounded-full blur-[1px]"
        animate={{ 
          x: ['-100%', '100%', '-100%'],
          y: [0, 8, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 12, 
          delay: 2,
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  );
};

export default ConnectionLine;
