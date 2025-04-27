
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const [newChat, setNewChat] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16 flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r p-4">
          <Button 
            className="w-full mb-4"
            onClick={() => setNewChat(true)}
          >
            New Chat
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground mb-2">Recent Conversations</p>
            <div className="cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors">
              <p className="font-medium truncate">Daily Check-in</p>
              <p className="text-xs text-muted-foreground truncate">Hey there! How are you feeling today?</p>
            </div>
            <div className="cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors">
              <p className="font-medium truncate">Creative Ideas</p>
              <p className="text-xs text-muted-foreground truncate">Let's brainstorm some fun activities!</p>
            </div>
            <div className="cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors">
              <p className="font-medium truncate">Mindfulness Session</p>
              <p className="text-xs text-muted-foreground truncate">Take a deep breath and relax...</p>
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-grow">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat;
