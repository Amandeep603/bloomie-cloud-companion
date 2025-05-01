
import React from "react";
import { motion } from "framer-motion";

const ConnectionLine = () => {
  return (
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
  );
};

export default ConnectionLine;
