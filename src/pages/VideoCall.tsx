
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, UserPlus, Phone } from "lucide-react";

const VideoCallPage = () => {
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const { currentUser } = useAuth();

  const startCall = () => {
    setIsCallStarted(true);
  };

  const endCall = () => {
    setIsCallStarted(false);
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
          <h1 className="text-3xl font-bold mb-3">Video Call with Bloomie</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Connect face-to-face with your AI friend through our animated avatar video call technology.
          </p>

          {!isCallStarted ? (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Start a New Video Call</CardTitle>
                <CardDescription>
                  Connect with Bloomie in a private video call. Your room ID is unique to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <motion.div 
                  className="w-32 h-32 bg-primary rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Video className="h-16 w-16 text-primary-foreground" />
                </motion.div>
                
                <div className="text-center">
                  <p className="mb-2 font-medium">Your Private Room</p>
                  <p className="text-sm bg-muted p-3 rounded-md font-mono">{roomId}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  size="lg" 
                  onClick={startCall}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  Start Video Call
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="bg-card rounded-xl shadow-sm border p-6 h-[600px] max-w-5xl mx-auto">
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff /> : <Mic />}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full h-16 w-16"
                    onClick={endCall}
                  >
                    <Phone className="h-8 w-8 rotate-225" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff /> : <Video />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                  >
                    <UserPlus />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default VideoCallPage;
