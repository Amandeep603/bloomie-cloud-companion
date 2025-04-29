import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addMessage, getChatHistory, generateBotResponse, ChatMessage } from "@/services/chatService";
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Click outside emoji picker handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!currentUser) return;
      
      try {
        setIsLoadingHistory(true);
        const history = await getChatHistory(currentUser.uid, 100);
        
        if (history.length === 0) {
          // If no chat history, add a welcome message
          const welcomeMessage: ChatMessage = {
            id: "welcome",
            userId: currentUser.uid,
            sender: "ai",
            text: "Hi there! I'm Bloomie, your friendly AI companion. How are you feeling today? 😊",
            timestamp: new Date(),
          };
          
          setMessages([welcomeMessage]);
          await addMessage(currentUser.uid, {
            sender: "ai",
            text: welcomeMessage.text
          });
        } else {
          setMessages(history);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        toast({
          title: "Error loading chat history",
          description: "Failed to load your previous conversations. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingHistory(false);
      }
    };
    
    loadChatHistory();
  }, [currentUser, toast]);

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentUser) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.uid,
      sender: "user",
      text: inputText,
      timestamp: new Date(),
    };
    
    // Add user message to UI
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    try {
      // Save user message to Firestore
      await addMessage(currentUser.uid, {
        sender: "user",
        text: userMessage.text
      });
      
      // Generate bot response
      const responseText = await generateBotResponse(userMessage.text);
      
      // Create AI message
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: currentUser.uid,
        sender: "ai",
        text: responseText,
        timestamp: new Date(),
      };
      
      // Add AI message to UI
      setMessages((prev) => [...prev, aiMessage]);
      
      // Save AI message to Firestore
      await addMessage(currentUser.uid, {
        sender: "ai",
        text: aiMessage.text
      });
    } catch (error) {
      console.error("Error handling message:", error);
      toast({
        title: "Error sending message",
        description: "Failed to send your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEmojiClick = (emojiData: any) => {
    setInputText(prev => prev + emojiData.emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: ChatMessage[] }[] = [];
    let currentDate = "";
    let currentMessages: ChatMessage[] = [];
    
    messages.forEach(message => {
      const messageDate = formatDate(message.timestamp);
      
      if (messageDate !== currentDate) {
        if (currentMessages.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentMessages
          });
        }
        currentDate = messageDate;
        currentMessages = [message];
      } else {
        currentMessages.push(message);
      }
    });
    
    if (currentMessages.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentMessages
      });
    }
    
    return groups;
  };

  if (isLoadingHistory) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading your conversation...</p>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-sm font-semibold">
              B
            </div>
          </Avatar>
          <div>
            <h3 className="font-semibold">Bloomie</h3>
            <p className="text-xs text-muted-foreground">Your AI Friend</p>
          </div>
        </div>
        
        <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Chat History</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Chat History</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              {messageGroups.map((group, groupIndex) => (
                <div key={`group-${groupIndex}`}>
                  <div className="flex justify-center my-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {group.date}
                    </span>
                  </div>
                  {group.messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-1`}
                    >
                      <div className="flex items-start max-w-[80%]">
                        {message.sender === "ai" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                              B
                            </div>
                          </Avatar>
                        )}
                        <div className={`px-3 py-2 rounded-lg ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground rounded-br-none" 
                            : "bg-muted rounded-bl-none"
                        }`}>
                          <p className="break-words whitespace-pre-wrap">{message.text}</p>
                          <span className={`text-[10px] ${
                            message.sender === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          } float-right ml-2 mt-1`}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <ScrollArea className="flex-grow p-4 h-[calc(100vh-180px)]">
        <div className="space-y-6 pb-[60px]" ref={scrollAreaRef}>
          {messageGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="mb-6">
              <div className="flex justify-center mb-4">
                <span className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground font-medium">
                  {group.date}
                </span>
              </div>
              
              <div className="space-y-3">
                {group.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start max-w-[80%] md:max-w-[70%]">
                      {message.sender === "ai" && (
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <Avatar className="h-8 w-8">
                            <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                              B
                            </div>
                          </Avatar>
                        </div>
                      )}
                      <div 
                        className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground rounded-br-none" 
                            : "bg-card border border-border/50 rounded-bl-none"
                        }`}
                      >
                        <p className="break-words whitespace-pre-wrap text-sm">{message.text}</p>
                        <div className="text-right mt-1">
                          <span className={`text-[10px] ${
                            message.sender === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mt-4"
            >
              <div className="flex items-start">
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                    B
                  </div>
                </Avatar>
                <div className="bg-muted border border-border/50 px-4 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1.5 items-center">
                    <span className="text-sm text-muted-foreground">Bloomie is typing</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-primary typing-animation"></div>
                      <div className="w-2 h-2 rounded-full bg-primary typing-animation" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary typing-animation" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t sticky bottom-0 bg-background">
        <div className="flex space-x-2 relative">
          <div className="relative flex-grow flex">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="pr-12 rounded-full shadow-sm"
              disabled={isLoading}
            />
            <Button
              type="button"
              onClick={toggleEmojiPicker}
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Smile className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Button>
            
            {showEmojiPicker && (
              <div 
                ref={emojiPickerRef}
                className="absolute right-0 bottom-14 z-50 shadow-lg"
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full shadow-sm"
            disabled={!inputText.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
