
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let timer: number | null = null;
    
    if (isCallActive) {
      timer = window.setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCallActive]);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    toast({
      title: "Video call started",
      description: "You are now in a call with Bloomie",
    });
  };
  
  const endCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone enabled" : "Microphone muted",
      description: isMuted ? "Bloomie can hear you now" : "Bloomie can't hear you",
    });
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      title: isVideoOff ? "Camera enabled" : "Camera disabled",
      description: isVideoOff ? "Your camera is now on" : "Your camera is now off",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow relative overflow-hidden bg-muted rounded-lg flex items-center justify-center">
        {isCallActive ? (
          <>
            {/* Bloomie's Video Feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-primary flex items-center justify-center animate-pulse-light">
                <div className="text-8xl">😊</div>
              </div>
            </div>
            
            {/* Call Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-background/70 backdrop-blur-sm ${isMuted ? "bg-destructive/90 text-destructive-foreground" : ""}`}
                onClick={toggleMute}
              >
                {isMuted ? <MicOff /> : <Mic />}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
                onClick={endCall}
              >
                <X />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-background/70 backdrop-blur-sm ${isVideoOff ? "bg-destructive/90 text-destructive-foreground" : ""}`}
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff /> : <Video />}
              </Button>
            </div>
            
            {/* Call Duration */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/70 backdrop-blur-sm py-1 px-3 rounded-full text-sm">
              {formatDuration(callDuration)}
            </div>
            
            {/* User's Video (Small) */}
            <div className="absolute bottom-20 right-4 w-24 h-24 rounded-lg bg-background/70 backdrop-blur-sm flex items-center justify-center">
              {isVideoOff ? (
                <VideoOff className="text-muted-foreground" />
              ) : (
                <div className="text-3xl">👤</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center mb-4 animate-float">
              <div className="text-4xl">😊</div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Video Call with Bloomie</h2>
            <p className="text-muted-foreground mb-6">
              Start a face-to-face conversation with your AI friend
            </p>
            <Button onClick={startCall}>Start Call</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
