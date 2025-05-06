
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Trash2, History, MessageCircle, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addMessage, getChatHistory, generateBotResponse, ChatMessage } from "@/services/chatService";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

  // Function to determine if a message should display timestamp
  // In WhatsApp style, only show time for last message in consecutive messages from same sender
  const shouldShowTime = (message: ChatMessage, index: number, messages: ChatMessage[]) => {
    const nextMessage = messages[index + 1];
    return !nextMessage || nextMessage.sender !== message.sender;
  };

  // Function to determine if a message should display the avatar
  const shouldShowAvatar = (message: ChatMessage, index: number, messages: ChatMessage[]) => {
    const prevMessage = messages[index - 1];
    return !prevMessage || prevMessage.sender !== message.sender;
  };

  // Function to group consecutive messages from the same sender
  const getMessageGroupClass = (message: ChatMessage, index: number, messages: ChatMessage[]) => {
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];
    
    // First message in a group
    if (!prevMessage || prevMessage.sender !== message.sender) {
      return message.sender === "ai" ? "rounded-tr-2xl rounded-br-2xl rounded-bl-lg" : "rounded-tl-2xl rounded-bl-2xl rounded-br-lg";
    }
    
    // Last message in a group
    if (!nextMessage || nextMessage.sender !== message.sender) {
      return message.sender === "ai" ? "rounded-tr-2xl rounded-br-lg rounded-bl-2xl" : "rounded-tl-2xl rounded-bl-lg rounded-br-2xl";
    }
    
    // Middle message in a group
    return message.sender === "ai" ? "rounded-tr-2xl rounded-bl-2xl" : "rounded-tl-2xl rounded-br-2xl";
  };

  return (
    <div className="h-full flex flex-col">
      {/* WhatsApp-style header */}
      <div className="flex items-center justify-between p-3 bg-emerald-600 text-white shadow-sm">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src="/ai-avatar-face.png" alt="Bloomie" />
            <AvatarFallback className="bg-emerald-700 text-white">B</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold font-nunito">Bloomie</h3>
            <p className="text-xs text-white/80 font-nunito">Online</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700 rounded-full">
                <History className="h-5 w-5" />
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
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage src="/ai-avatar-face.png" alt="Bloomie" />
                              <AvatarFallback className="bg-emerald-600 text-white text-xs">B</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`px-3 py-2 rounded-lg ${
                            message.sender === "user" 
                              ? "bg-emerald-500 text-white rounded-br-none" 
                              : "bg-white dark:bg-gray-800 rounded-bl-none"
                          }`}>
                            <p className="break-words whitespace-pre-wrap font-nunito">{message.text}</p>
                            <span className={`text-[10px] ${
                              message.sender === "user" 
                                ? "text-white/70" 
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
            variant="ghost"
            size="icon"
            className="text-white hover:bg-emerald-700 rounded-full"
            onClick={() => setShowConfirmClearDialog(true)}
          >
            <Trash2 className="h-5 w-5" />
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
      
      {/* WhatsApp-style chat area with background */}
      <ScrollArea 
        className="flex-grow p-3 h-[calc(100vh-220px)] bg-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+CiAgPGRlZnM+CiAgICA8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPgogICAgICA8cGF0aCBmaWxsPSJyZ2JhKDAgMCAwIDAuMDIpIiBkPSJNMCAwaDEwdjEwSDB6Ii8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNmVmZDgiLz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+Cjwvc3ZnPg==')]"
      >
        <div className="space-y-4 pb-[80px] max-w-3xl mx-auto" ref={scrollAreaRef}>
          {messageGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="mb-6">
              <div className="flex justify-center mb-4">
                <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/80 shadow-sm px-3 py-1">
                  {group.date}
                </Badge>
              </div>
              
              <div className="space-y-1">
                {group.messages.map((message, msgIndex) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} ${
                      !shouldShowAvatar(message, msgIndex, group.messages) ? "pl-10" : ""
                    }`}
                  >
                    <div className="flex items-start max-w-[75%]">
                      {message.sender === "ai" && shouldShowAvatar(message, msgIndex, group.messages) && (
                        <Avatar className="h-8 w-8 mr-1 mt-1 flex-shrink-0">
                          <AvatarImage src="/ai-avatar-face.png" alt="Bloomie" />
                          <AvatarFallback className="bg-emerald-600 text-white text-xs">B</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div 
                        className={`px-3 py-2 ${getMessageGroupClass(message, msgIndex, group.messages)} shadow-sm ${
                          message.sender === "user" 
                            ? "bg-emerald-500 text-white ml-1" 
                            : "bg-white dark:bg-gray-800"
                        }`}
                      >
                        <p className="break-words whitespace-pre-wrap text-sm leading-relaxed font-nunito">{message.text}</p>
                        
                        {shouldShowTime(message, msgIndex, group.messages) && (
                          <div className="flex justify-end items-center gap-1 mt-1">
                            <span className={`text-[10px] ${
                              message.sender === "user" 
                                ? "text-white/70" 
                                : "text-muted-foreground"
                            }`}>
                              {formatTime(message.timestamp)}
                            </span>
                            {message.sender === "user" && (
                              <Check className="h-3 w-3 text-white/70" />
                            )}
                          </div>
                        )}
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
              className="flex justify-start mt-4 pl-10"
            >
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
      </ScrollArea>
      
      {/* WhatsApp-style input area */}
      <div className="p-2 border-t sticky bottom-0 bg-[#f0f2f5] dark:bg-gray-800">
        <div className="flex space-x-2 max-w-3xl mx-auto">
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Smile className="h-5 w-5" />
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

          <div className="relative flex-grow">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              className="rounded-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800"
              disabled={isLoading}
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700"
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
