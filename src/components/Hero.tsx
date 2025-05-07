
import React from "react";
import { motion } from "framer-motion";
import BackgroundElements from "./hero/BackgroundElements";
import ConversationScene from "./hero/ConversationScene";
import HeroContent from "./hero/HeroContent";
import FloatingMessages from "./hero/FloatingMessages";

const Hero = () => {
  // Enhanced avatar conversation dialogue
  const conversation = [
    { speaker: "girl" as const, message: "Hey! Have you tried Bloomie? It's like having a real friend to talk to!" },
    { speaker: "boy" as const, message: "Yes! I love how Bloomie listens and chats just like a real person 😊" },
    { speaker: "girl" as const, message: "And the avatars make it feel so alive!" },
    { speaker: "boy" as const, message: "I use it every day! Bloomie remembers things from our past conversations." },
    { speaker: "girl" as const, message: "Exactly! She asked about my job interview from last week. So thoughtful! 💕" }
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Background elements */}
      <BackgroundElements />
      
      {/* Add more spacing between avatars and place speech bubbles in front */}
      <div className="w-full z-10">
        <ConversationScene conversation={conversation} />
      </div>
      
      {/* Hero content (text and buttons) with more spacing */}
      <div className="mt-6 z-10">
        <HeroContent />
      </div>
      
      {/* Floating messages */}
      <FloatingMessages />
    </div>
  );
};

export default Hero;
