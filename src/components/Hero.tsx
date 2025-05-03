
import React from "react";
import { motion } from "framer-motion";
import BackgroundElements from "./hero/BackgroundElements";
import ConversationScene from "./hero/ConversationScene";
import HeroContent from "./hero/HeroContent";
import FloatingMessages from "./hero/FloatingMessages";

const Hero = () => {
  // Avatar conversation dialogue with improved timing
  const conversation = [
    { speaker: "girl" as const, message: "Hey, have you met Bloomie yet?" },
    { speaker: "boy" as const, message: "Yes! Bloomie's like a virtual best friend." },
    { speaker: "girl" as const, message: "I chat with her every day. She remembers how I feel and helps me grow!" },
    { speaker: "boy" as const, message: "She even lets me write a daily diary — it tracks my mood!" },
    { speaker: "girl" as const, message: "So cool! I feel like I'm never alone when Bloomie's around." }
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* Background elements */}
      <BackgroundElements />
      
      {/* Add more horizontal spacing between avatars and reduce vertical spacing to text */}
      <div className="mb-4 w-full">
        <ConversationScene conversation={conversation} />
      </div>
      
      {/* Hero content (text and buttons) with reduced vertical spacing */}
      <HeroContent />
      
      {/* Floating messages */}
      <FloatingMessages />
    </div>
  );
};

export default Hero;
