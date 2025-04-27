
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

export type ChatMessage = {
  id: string;
  userId: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
};

// Add a new message to Firestore
export const addMessage = async (userId: string, message: { sender: "user" | "ai", text: string }) => {
  try {
    const docRef = await addDoc(collection(db, "chats"), {
      userId,
      sender: message.sender,
      text: message.text,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding chat message:", error);
    throw error;
  }
};

// Get chat history for a user
export const getChatHistory = async (userId: string, messageLimit = 50): Promise<ChatMessage[]> => {
  try {
    const chatQuery = query(
      collection(db, "chats"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(messageLimit)
    );
    
    const querySnapshot = await getDocs(chatQuery);
    const messages: ChatMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        userId: data.userId,
        sender: data.sender,
        text: data.text,
        timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
      });
    });
    
    return messages.reverse(); // Return in chronological order
  } catch (error) {
    console.error("Error getting chat history:", error);
    throw error;
  }
};

// Simple rule-based bot response generator
export const generateBotResponse = async (message: string): Promise<string> => {
  // This is a simple rule-based response system
  // In a production app, you would integrate with a proper AI service
  
  const lowerMessage = message.toLowerCase();
  
  // Greeting patterns
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.match(/^hey/)) {
    return "Hello there! How are you feeling today? 😊";
  }
  
  // Feeling patterns
  if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('unhappy')) {
    return "I'm sorry to hear you're feeling down. Would you like to talk about what's bothering you? Sometimes sharing helps lighten the load. 💙";
  }
  
  if (lowerMessage.includes('happy') || lowerMessage.includes('great') || lowerMessage.includes('good')) {
    return "That's wonderful to hear! What made your day so special? I'd love to hear more about it! ✨";
  }
  
  if (lowerMessage.includes('angry') || lowerMessage.includes('mad') || lowerMessage.includes('frustrated')) {
    return "I understand feeling frustrated. Take a deep breath. Would it help to talk about what happened? I'm here to listen. 🌸";
  }
  
  // Question patterns
  if (lowerMessage.includes('who are you')) {
    return "I'm Bloomie, your AI friend! I'm here to chat, listen, and help you express your feelings. What would you like to talk about today? 🌼";
  }
  
  if (lowerMessage.includes('how are you')) {
    return "I'm doing well, thank you for asking! More importantly, how are YOU doing today? 😊";
  }
  
  // Help patterns
  if (lowerMessage.includes('help') || lowerMessage.includes('advice')) {
    return "I'd be happy to help! What specifically are you looking for advice about? I'm here to support you however I can. 💫";
  }
  
  // Gratitude patterns
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're very welcome! I'm always here when you need someone to talk to. 💕";
  }
  
  // Default responses for when no pattern matches
  const defaultResponses = [
    "That's interesting! Tell me more about that. 🌟",
    "I see. How does that make you feel? 💭",
    "Thanks for sharing that with me. What else is on your mind? 🌷",
    "I understand. Would you like to explore that topic further? 🌈",
    "That's worth talking about. How has this been affecting you? 💫",
    "I appreciate you opening up to me. Let's discuss this more if you'd like. 🌻",
    "I'm here for you. Would you like to tell me more about your experience? 💖"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
