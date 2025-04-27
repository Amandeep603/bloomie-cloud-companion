
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [jitsiApiReady, setJitsiApiReady] = useState(false);
  const [jitsiMeetApi, setJitsiMeetApi] = useState<any>(null);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Load Jitsi Meet API
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => setJitsiApiReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    if (!jitsiApiReady || !currentUser) {
      toast({
        title: "Can't start call",
        description: "Video call service is not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Create a unique room name based on the user's ID
    const roomName = `bloomie-${currentUser.uid.substring(0, 8)}`;
    
    try {
      // Initialize Jitsi Meet API
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: document.querySelector("#jitsi-container"),
        userInfo: {
          displayName: currentUser.displayName || "Bloomie User",
        },
        configOverwrite: {
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
      };
      
      // @ts-ignore - JitsiMeetAPI is loaded dynamically
      const api = new JitsiMeetExternalAPI(domain, options);
      setJitsiMeetApi(api);
      
      // Setup event listeners
      api.addEventListener("videoConferenceJoined", () => {
        setIsCallActive(true);
        setCallDuration(0);
        toast({
          title: "Video call started",
          description: "You are now in a call with Bloomie",
        });
      });
      
      api.addEventListener("videoConferenceLeft", () => {
        endCall();
      });
    } catch (error) {
      console.error("Error starting Jitsi call:", error);
      toast({
        title: "Call failed",
        description: "Could not start the video call. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const endCall = () => {
    if (jitsiMeetApi) {
      jitsiMeetApi.dispose();
      setJitsiMeetApi(null);
    }
    
    setIsCallActive(false);
    toast({
      title: "Call ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    });
    
    // Clear the container
    const container = document.querySelector("#jitsi-container");
    if (container) {
      container.innerHTML = "";
    }
  };

  const toggleMute = () => {
    if (jitsiMeetApi) {
      jitsiMeetApi.executeCommand("toggleAudio");
    }
    
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone enabled" : "Microphone muted",
      description: isMuted ? "Bloomie can hear you now" : "Bloomie can't hear you",
    });
  };

  const toggleVideo = () => {
    if (jitsiMeetApi) {
      jitsiMeetApi.executeCommand("toggleVideo");
    }
    
    setIsVideoOff(!isVideoOff);
    toast({
      title: isVideoOff ? "Camera enabled" : "Camera disabled",
      description: isVideoOff ? "Your camera is now on" : "Your camera is now off",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div id="jitsi-container" className="flex-grow relative overflow-hidden bg-muted rounded-lg flex items-center justify-center">
        {!isCallActive && (
          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center mb-4 animate-float">
              <div className="text-4xl">😊</div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Video Call with Bloomie</h2>
            <p className="text-muted-foreground mb-6">
              Start a face-to-face conversation with your AI friend
            </p>
            <Button 
              onClick={startCall} 
              disabled={!jitsiApiReady || !currentUser}
            >
              Start Call
            </Button>
          </div>
        )}
        
        {isCallActive && (
          <>
            {/* Call Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
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
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/70 backdrop-blur-sm py-1 px-3 rounded-full text-sm z-10">
              {formatDuration(callDuration)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
