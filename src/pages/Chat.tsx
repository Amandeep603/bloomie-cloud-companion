
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader, MessageSquare, Plus } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="flex-grow pt-16 flex bg-gradient-to-b from-blue-50/20 to-indigo-50/20 dark:from-slate-900/30 dark:to-slate-800/30">
        {/* Sidebar - Enhanced with animations and better styling */}
        <motion.div 
          className="hidden md:block w-64 border-r border-indigo-100 dark:border-slate-800 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            className="w-full mb-4 gap-2 shadow-sm font-nunito"
            onClick={startNewChat}
          >
            <Plus size={16} />
            New Chat
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground mb-2 font-nunito">Recent Conversations</p>
            
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-4">
                <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground mt-2 font-nunito">No conversations yet</p>
                <p className="text-xs text-muted-foreground mt-1 font-nunito">Start a new chat to begin talking with Bloomie</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((conversation, index) => (
                  <motion.div 
                    key={conversation.id}
                    className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg p-3 transition-colors border border-transparent hover:border-indigo-100 dark:hover:border-slate-700"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-medium truncate font-nunito">{conversation.title}</p>
                    <p className="text-xs text-muted-foreground truncate font-nunito">{conversation.lastMessage}</p>
                    <div className="flex justify-end mt-1">
                      <span className="text-[10px] text-muted-foreground font-nunito">
                        {conversation.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Chat Area */}
        <motion.div 
          className="flex-grow bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChatInterface />
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
