
import React from "react";
import { motion } from "framer-motion";
import BackgroundElements from "./hero/BackgroundElements";
import ConversationScene from "./hero/ConversationScene";
import HeroContent from "./hero/HeroContent";
import FloatingMessages from "./hero/FloatingMessages";

const Hero = () => {
  // Avatar conversation dialogue with improved timing
  const conversation = [
    { speaker: "boy" as const, message: "Have you tried talking to Bloomie about feeling stressed lately?" },
    { speaker: "girl" as const, message: "Yes! Bloomie was so understanding. She suggested some breathing exercises that really helped!" },
    { speaker: "boy" as const, message: "That's awesome! I love how she remembers things from our past conversations." },
    { speaker: "girl" as const, message: "Same! She even asked about that job interview I mentioned last week. It feels like chatting with a real friend." },
    { speaker: "boy" as const, message: "And her emoji reactions are so cute! 😊 Makes me feel like she's actually listening and cares." }
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Background elements */}
      <BackgroundElements />
      
      {/* Add more horizontal spacing between avatars and increase vertical spacing to text */}
      <div className="w-full">
        <ConversationScene conversation={conversation} />
      </div>
      
      {/* Hero content (text and buttons) with more spacing */}
      <div className="mt-6">
        <HeroContent />
      </div>
      
      {/* Floating messages */}
      <FloatingMessages />
    </div>
  );
};

export default Hero;
