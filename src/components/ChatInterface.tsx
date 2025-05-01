
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Trash2, History, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addMessage, getChatHistory, generateBotResponse, ChatMessage } from "@/services/chatService";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface QuickReaction {
  emoji: string;
  label: string;
}

const QUICK_REACTIONS: QuickReaction[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😍', label: 'Love' },
  { emoji: '😴', label: 'Tired' },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showConfirmClearDialog, setShowConfirmClearDialog] = useState(false);
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

  const handleQuickReaction = async (reaction: QuickReaction) => {
    if (!currentUser) return;
    
    const reactionText = `${reaction.emoji} I'm feeling ${reaction.label.toLowerCase()} today.`;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.uid,
      sender: "user",
      text: reactionText,
      timestamp: new Date(),
    };
    
    // Add user message to UI
    setMessages((prev) => [...prev, userMessage]);
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
      console.error("Error handling quick reaction:", error);
      toast({
        title: "Error sending reaction",
        description: "Failed to send your reaction. Please try again.",
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
  
  const handleClearChat = async () => {
    // In a real app, you would call an API to clear chat history in the database
    setMessages([]);
    setShowConfirmClearDialog(false);
    
    // Add back welcome message
    if (currentUser) {
      const welcomeMessage: ChatMessage = {
        id: "welcome-new",
        userId: currentUser.uid,
        sender: "ai",
        text: "Chat cleared! How can I help you today? 😊",
        timestamp: new Date(),
      };
      
      setMessages([welcomeMessage]);
      await addMessage(currentUser.uid, {
        sender: "ai",
        text: welcomeMessage.text
      });
    }
    
    toast({
      title: "Chat cleared",
      description: "All chat messages have been removed.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEmojiClick = (emojiData: any) => {
    setInputText(prev => prev + emojiData.emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-muted-foreground font-nunito">Loading your conversation...</p>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-500">
            <div className="text-white rounded-full h-full w-full flex items-center justify-center text-sm font-semibold">
              B
            </div>
          </Avatar>
          <div>
            <h3 className="font-semibold font-nunito">Bloomie</h3>
            <p className="text-xs text-muted-foreground font-nunito">Your AI Friend</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1.5 items-center">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Chat History</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Chat History</DialogTitle>
                <DialogDescription>
                  View all your previous conversations with Bloomie
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                {messageGroups.map((group, groupIndex) => (
                  <div key={`group-${groupIndex}`}>
                    <div className="flex justify-center my-2">
                      <Badge variant="outline" className="bg-muted/50">
                        {group.date}
                      </Badge>
                    </div>
                    {group.messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-1`}
                      >
                        <div className="flex items-start max-w-[80%]">
                          {message.sender === "ai" && (
                            <Avatar className="h-8 w-8 mr-2 mt-1 bg-primary">
                              <div className="text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                                B
                              </div>
                            </Avatar>
                          )}
                          <div className={`px-3 py-2 rounded-lg ${
                            message.sender === "user" 
                              ? "bg-primary text-primary-foreground rounded-br-none" 
                              : "bg-muted rounded-bl-none"
                          }`}>
                            <p className="break-words whitespace-pre-wrap font-nunito">{message.text}</p>
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
              <DialogFooter>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setShowHistoryDialog(false);
                    setShowConfirmClearDialog(true);
                  }}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Messages
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1.5 items-center"
            onClick={() => setShowConfirmClearDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </Button>
        </div>
      </div>
      
      <AlertDialog open={showConfirmClearDialog} onOpenChange={setShowConfirmClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all chat messages?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your chat messages with Bloomie.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleClearChat}
              className="bg-red-500 hover:bg-red-600"
            >
              Clear Chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Quick Reaction Panel */}
      <div className="p-2 bg-white/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 backdrop-blur-sm">
        <div className="flex justify-center gap-2">
          {QUICK_REACTIONS.map(reaction => (
            <motion.button
              key={reaction.emoji}
              className="flex flex-col items-center justify-center p-2 rounded-lg transition-all hover:bg-muted"
              onClick={() => handleQuickReaction(reaction)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl mb-1">{reaction.emoji}</span>
              <span className="text-xs font-medium text-muted-foreground">{reaction.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <ScrollArea className="flex-grow p-4 h-[calc(100vh-220px)] bg-gradient-to-b from-indigo-50/40 to-blue-50/40 dark:from-gray-900/50 dark:to-gray-950/50">
        <div className="space-y-6 pb-[60px] max-w-3xl mx-auto" ref={scrollAreaRef}>
          {messageGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="mb-8 last:mb-2">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" className="bg-white/70 dark:bg-gray-800/70 shadow-sm px-3 py-1">
                  {group.date}
                </Badge>
              </div>
              
              <div className="space-y-6">
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
                          <Avatar className="h-8 w-8 bg-gradient-to-br from-indigo-400 to-purple-500">
                            <div className="text-white rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                              B
                            </div>
                          </Avatar>
                        </div>
                      )}
                      <motion.div 
                        className={`px-4 py-3 rounded-2xl shadow-sm ${
                          message.sender === "user" 
                            ? "bg-indigo-500 text-white rounded-tr-none" 
                            : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none"
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="break-words whitespace-pre-wrap text-sm leading-relaxed font-nunito">{message.text}</p>
                        <div className="text-right mt-1">
                          <span className={`text-[10px] ${
                            message.sender === "user" 
                              ? "text-white/70" 
                              : "text-muted-foreground"
                          }`}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </motion.div>
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
                <Avatar className="h-8 w-8 mr-2 mt-1 bg-gradient-to-br from-indigo-400 to-purple-500">
                  <div className="text-white rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                    B
                  </div>
                </Avatar>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex space-x-1.5 items-center">
                    <span className="text-sm font-nunito">Bloomie is typing</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t sticky bottom-0 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col space-y-2 max-w-3xl mx-auto">
          <div className="relative flex-grow flex">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="pr-12 rounded-full border-gray-200 dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
              disabled={isLoading}
            />
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <Smile className="h-5 w-5 text-muted-foreground hover:text-indigo-500 transition-colors" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="end">
                <div ref={emojiPickerRef}>
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={document.documentElement.classList.contains("dark") ? Theme.DARK : Theme.LIGHT}
                    width="100%"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground font-nunito">
              Send a message or express how you're feeling
            </div>
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="rounded-full shadow-sm gap-1.5"
              disabled={!inputText.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
