
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedAvatar from "@/components/AnimatedAvatar";

interface BloomieCornerProps {
  isCallStarted: boolean;
  currentPrompt: number;
  callDuration: number;
  conversationPrompts: string[];
}

const BloomieCorner = ({ 
  isCallStarted, 
  currentPrompt, 
  callDuration,
  conversationPrompts 
}: BloomieCornerProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-nunito text-lg">Bloomie's Corner</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Animated Avatar */}
        <div className="w-32 h-32 mb-6">
          <AnimatedAvatar 
            gender="girl" 
            position="left" 
            speaking={isCallStarted && callDuration % 10 < 5}
          />
        </div>
        
        {/* Conversation prompts */}
        {isCallStarted && (
          <motion.div 
            className="bg-muted p-4 rounded-lg w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-2 font-nunito">Try asking:</p>
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentPrompt}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-medium text-primary font-nunito"
              >
                "{conversationPrompts[currentPrompt]}"
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
        
        {!isCallStarted && (
          <motion.div
            className="space-y-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-center font-nunito">
              Start a video call to chat with your AI friend face-to-face!
            </p>
            
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium mb-1 font-nunito">During your call you can:</p>
              <ul className="text-sm space-y-2">
                <motion.li 
                  className="flex items-center font-nunito"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="mr-2">🎯</span> Share your daily goals
                </motion.li>
                <motion.li 
                  className="flex items-center font-nunito"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="mr-2">💬</span> Talk about your feelings
                </motion.li>
                <motion.li 
                  className="flex items-center font-nunito"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="mr-2">🌱</span> Get personalized advice
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default BloomieCorner;
