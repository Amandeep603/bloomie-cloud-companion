
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, UserPlus, Phone } from "lucide-react";
import AnimatedAvatar from "@/components/AnimatedAvatar";
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
        className="flex-grow pt-24 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-3 font-nunito">Video Call with Bloomie</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl font-nunito">
            Connect face-to-face with your AI friend through our animated avatar video call technology.
          </p>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-7 gap-6'} max-w-7xl mx-auto`}>
            {/* Main video area - wider on desktop */}
            <div className={`${isMobile ? 'order-2 mb-6' : 'col-span-5'}`}>
              {!isCallStarted ? (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="font-nunito">Start a New Video Call</CardTitle>
                    <CardDescription className="font-nunito">
                      Connect with Bloomie in a private video call. Your room ID is unique to your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-6">
                    <motion.div 
                      className="w-32 h-32 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <Video className="h-16 w-16 text-primary-foreground" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <p className="mb-2 font-medium font-nunito">Your Private Room</p>
                      <p className="text-sm bg-muted p-3 rounded-md font-mono">{roomId}</p>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={startCall}
                        className="bg-green-600 hover:bg-green-700 px-8 font-nunito shadow-md hover:shadow-lg transition-all"
                      >
                        Start Video Call
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="w-full h-[600px] border border-primary/20 overflow-hidden shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-bloomie-purple/20 to-bloomie-green/20 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-nunito text-lg md:text-xl">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center"
                        >
                          Bloomie is ready to see you! 
                          <motion.span
                            animate={{ rotate: [0, 15, 0, -15, 0] }}
                            transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}
                            className="ml-2"
                          >
                            👋
                          </motion.span>
                        </motion.span>
                      </CardTitle>
                      <div className="bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-mono">{formatTime(callDuration)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <div className="h-full flex flex-col">
                    <div className="flex-grow relative overflow-hidden rounded-lg bg-black">
                      <iframe 
                        src={jitsiUrl}
                        allow="camera; microphone; fullscreen; display-capture; autoplay"
                        className="absolute inset-0 w-full h-full border-0"
                        title="Bloomie Video Call"
                      ></iframe>
                    </div>
                    
                    <div className="h-20 flex items-center justify-center space-x-4 mt-4">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-12 w-12"
                          onClick={() => {
                            setIsMuted(!isMuted);
                            toast({
                              title: isMuted ? "Microphone enabled" : "Microphone muted",
                              description: isMuted ? "Bloomie can hear you now" : "Bloomie can't hear you",
                            });
                          }}
                        >
                          {isMuted ? <MicOff /> : <Mic />}
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                      >
                        <Button
                          variant="destructive"
                          size="icon"
                          className="rounded-full h-16 w-16 shadow-lg"
                          onClick={endCall}
                        >
                          <Phone className="h-8 w-8 rotate-225" />
                        </Button>
                        
                        {/* Pulse effect */}
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-red-500"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          style={{ zIndex: -1 }}
                        />
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-12 w-12"
                          onClick={() => {
                            setIsVideoOff(!isVideoOff);
                            toast({
                              title: isVideoOff ? "Camera enabled" : "Camera disabled",
                              description: isVideoOff ? "Your camera is now on" : "Your camera is now off",
                            });
                          }}
                        >
                          {isVideoOff ? <VideoOff /> : <Video />}
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-12 w-12"
                          onClick={() => {
                            toast({
                              title: "Invite sent!",
                              description: "Your friend will receive an invitation to join this call.",
                            });
                          }}
                        >
                          <UserPlus />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
            
            {/* Side panel - narrower on desktop, full width below on mobile */}
            <div className={`${isMobile ? 'order-1 mb-4' : 'col-span-2'}`}>
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
                          "{CONVERSATION_PROMPTS[currentPrompt]}"
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
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default VideoCallPage;
