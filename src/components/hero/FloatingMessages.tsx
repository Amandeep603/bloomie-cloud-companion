
import React from "react";
import { motion } from "framer-motion";

const FloatingMessages = () => {
  return (
    <>
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
    </>
  );
};

export default FloatingMessages;
