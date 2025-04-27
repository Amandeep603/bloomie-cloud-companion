
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addMessage, getChatHistory, generateBotResponse, ChatMessage } from "@/services/chatService";

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

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
            text: "Hi there! I'm Bloomie, your friendly AI companion. How are you feeling today?",
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
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] p-3 rounded-2xl ${
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}
            >
              <div className="flex flex-col">
                <p>{message.text}</p>
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
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="rounded-full"
            disabled={isLoading}
          />
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
