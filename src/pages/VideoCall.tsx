
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import StartCallCard from "@/components/videocall/StartCallCard";
import ActiveCallCard from "@/components/videocall/ActiveCallCard";
import BloomieCorner from "@/components/videocall/BloomieCorner";
import { useIsMobile } from "@/hooks/use-mobile";

const CONVERSATION_PROMPTS = [
  "Tell Bloomie how your day went",
  "Ask Bloomie for advice on something you're struggling with",
  "Share a recent accomplishment with Bloomie",
  "Talk about your goals for this week",
  "Tell Bloomie how you're feeling right now",
];

const VideoCallPage = () => {
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Rotate through conversation prompts
  useEffect(() => {
    if (isCallStarted) {
      const interval = setInterval(() => {
        setCurrentPrompt((prev) => (prev + 1) % CONVERSATION_PROMPTS.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isCallStarted]);

  // Track call duration
  useEffect(() => {
    let timer: number;
    if (isCallStarted) {
      timer = window.setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      window.clearInterval(timer);
    };
  }, [isCallStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallStarted(true);
    toast({
      title: "Video call started",
      description: "You're now connected with Bloomie!",
    });
  };

  const endCall = () => {
    setIsCallStarted(false);
    setCallDuration(0);
    toast({
      title: "Call ended",
      description: "Thanks for chatting with Bloomie!",
    });
  };

  const toggleMute = (newMuteState: boolean) => {
    setIsMuted(newMuteState);
    toast({
      title: newMuteState ? "Microphone muted" : "Microphone enabled",
      description: newMuteState ? "Bloomie can't hear you" : "Bloomie can hear you now",
    });
  };

  const toggleVideo = (newVideoOffState: boolean) => {
    setIsVideoOff(newVideoOffState);
    toast({
      title: newVideoOffState ? "Camera disabled" : "Camera enabled",
      description: newVideoOffState ? "Your camera is now off" : "Your camera is now on",
    });
  };

  // Create a unique room ID based on user ID
  const getRoomId = () => {
    if (!currentUser) return "bloomie-guest-room";
    return `bloomie-${currentUser.uid.substring(0, 8)}`;
  };

  const roomId = getRoomId();
  const jitsiUrl = `https://meet.jit.si/${roomId}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main 
        className="flex-grow pt-16 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-6xl"> {/* Added max-width for better centering */}
          <h1 className="text-3xl font-bold mb-3 font-nunito">Video Call with Bloomie</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl font-nunito">
            Connect face-to-face with your AI friend through our animated avatar video call technology.
          </p>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-7 gap-6'} mx-auto`}>
            {/* Main video area - wider on desktop */}
            <div className={`${isMobile ? 'order-2' : 'col-span-5'}`}>
              {!isCallStarted ? (
                <StartCallCard roomId={roomId} startCall={startCall} />
              ) : (
                <ActiveCallCard 
                  jitsiUrl={jitsiUrl}
                  callDuration={callDuration}
                  isMuted={isMuted}
                  isVideoOff={isVideoOff}
                  formatTime={formatTime}
                  endCall={endCall}
                  toggleMute={toggleMute}
                  toggleVideo={toggleVideo}
                />
              )}
            </div>
            
            {/* Side panel - narrower on desktop, full width below on mobile */}
            <div className={`${isMobile ? 'order-1 mb-2' : 'col-span-2'}`}>
              <BloomieCorner 
                isCallStarted={isCallStarted}
                currentPrompt={currentPrompt}
                callDuration={callDuration}
                conversationPrompts={CONVERSATION_PROMPTS}
              />
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default VideoCallPage;
