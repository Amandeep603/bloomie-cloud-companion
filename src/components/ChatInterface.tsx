
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
};

const defaultMessages = [
  {
    id: "1",
    sender: "ai",
    text: "Hi there! I'm Bloomie, your friendly AI companion. How are you feeling today?",
    timestamp: new Date(),
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "I understand how you feel. Would you like to talk more about that?",
        "That's really interesting! Tell me more about your experience.",
        "I'm here for you. How can I help make your day better?",
        "Thanks for sharing that with me. How does that make you feel?",
        "I appreciate you telling me that. What would you like to chat about next?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] ${
                message.sender === "user" ? "user-bubble" : "ai-bubble"
              }`}
            >
              <div className="flex flex-col">
                <p>{message.text}</p>
                <span className="text-xs opacity-70 text-right mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="ai-bubble">
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
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full"
            disabled={!inputText.trim() || isTyping}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
