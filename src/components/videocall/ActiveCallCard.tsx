
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, Video, VideoOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ActiveCallCardProps {
  jitsiUrl: string;
  callDuration: number;
  isMuted: boolean;
  isVideoOff: boolean;
  formatTime: (seconds: number) => string;
  endCall: () => void;
  toggleMute: (isMuted: boolean) => void;
  toggleVideo: (isVideoOff: boolean) => void;
}

const ActiveCallCard = ({
  jitsiUrl,
  callDuration,
  isMuted,
  isVideoOff,
  formatTime,
  endCall,
  toggleMute,
  toggleVideo
}: ActiveCallCardProps) => {
  const { toast } = useToast();

  return (
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
                toggleMute(!isMuted);
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
                toggleVideo(!isVideoOff);
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
  );
};

export default ActiveCallCard;
