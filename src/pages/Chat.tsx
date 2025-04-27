
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader, MessageSquare } from "lucide-react";

type ConversationPreview = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

const Chat = () => {
  const [newChat, setNewChat] = useState(false);
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  
  // Load recent conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser) return;
      
      try {
        setIsLoading(true);
        
        // This is a simple implementation - in a real app, you might have 
        // a separate "conversations" collection or a more sophisticated way
        // to group chat messages
        const chatsQuery = query(
          collection(db, "chats"),
          where("userId", "==", currentUser.uid),
          where("sender", "==", "user"),
          orderBy("timestamp", "desc"),
          limit(3)
        );
        
        const querySnapshot = await getDocs(chatsQuery);
        const recentConversations: ConversationPreview[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Generate a title based on the first few words of the message
          const words = data.text.split(' ');
          const title = words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
          
          recentConversations.push({
            id: doc.id,
            title: title,
            lastMessage: data.text.substring(0, 50) + (data.text.length > 50 ? '...' : ''),
            timestamp: (data.timestamp as Timestamp)?.toDate() || new Date()
          });
        });
        
        setConversations(recentConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
  }, [currentUser]);
  
  const startNewChat = () => {
    setNewChat(true);
    // In a real implementation, you might clear the current chat state
    // and prepare for a new conversation
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16 flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r p-4">
          <Button 
            className="w-full mb-4"
            onClick={startNewChat}
          >
            New Chat
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground mb-2">Recent Conversations</p>
            
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-4">
                <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground mt-2">No conversations yet</p>
                <p className="text-xs text-muted-foreground">Start a new chat to begin talking with Bloomie</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className="cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors"
                >
                  <p className="font-medium truncate">{conversation.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
              ))
            )}
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
