
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addMessage, getChatHistory, generateBotResponse, ChatMessage } from "@/services/chatService";
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();

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
        const history = await getChatHistory(currentUser.uid);
        
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
      } finally {
        setIsLoadingHistory(false);
      }
    };
    
    loadChatHistory();
  }, [currentUser]);

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  if (isLoadingHistory) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading your conversation...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] p-3 rounded-2xl shadow-sm ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                <div className="flex flex-col">
                  <p className="break-words">{message.text}</p>
                  <span className={`text-xs ${
                    message.sender === "user" 
                      ? "opacity-70" 
                      : "text-muted-foreground"
                    } text-right mt-1`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted p-3 rounded-2xl">
              <div className="flex space-x-1 items-center">
                <span className="text-sm text-muted-foreground">Bloomie is thinking</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      <div className="p-4 border-t relative">
        <div className="flex space-x-2">
          <div className="relative flex-grow flex">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="pr-12 rounded-full"
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
                className="absolute right-0 bottom-14 z-50"
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full"
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
