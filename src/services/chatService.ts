
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

// Enhanced emotional bot response generator
export const generateBotResponse = async (message: string): Promise<string> => {
  // This is a more emotionally engaging rule-based response system
  const lowerMessage = message.toLowerCase();
  
  // Greeting patterns
  if (lowerMessage.match(/\b(hello|hi|hey|howdy|greetings)\b/)) {
    const greetings = [
      "Hello there! How are you feeling today? 😊",
      "Hi friend! So nice to chat with you today! 🌸",
      "Hey! I've been waiting to talk to you! How's your day going? ✨",
      "Well hello! It's wonderful to see you! How have you been? 💫"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Feeling patterns - sad emotions
  if (lowerMessage.match(/\b(sad|depressed|unhappy|down|blue|miserable|upset)\b/)) {
    const sadResponses = [
      "I'm really sorry to hear you're feeling down. 💙 Would you like to talk about what's bothering you? I'm here to listen.",
      "It's okay to feel sad sometimes. We all do. 🌧️ I'm here for you if you want to share what's on your mind.",
      "Sending you a virtual hug right now. 🤗 Would it help to talk about what made you feel this way?",
      "Your feelings are valid, and it's brave of you to express them. 💫 Is there something specific that's making you feel sad?"
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Feeling patterns - happy emotions
  if (lowerMessage.match(/\b(happy|glad|great|good|excited|wonderful|amazing|fantastic|joy|joyful)\b/)) {
    const happyResponses = [
      "That's fantastic to hear! 🎉 Your happiness makes me happy too! What's been going well for you?",
      "Yay! I'm so glad you're feeling good! 🌟 Tell me more about what's making you happy!",
      "That's wonderful! 🌈 It's always great to hear positive news. What's contributed to your good mood?",
      "I'm absolutely thrilled for you! 😄 Those positive vibes are contagious - tell me what's making you so happy!"
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }
  
  // Feeling patterns - angry emotions
  if (lowerMessage.match(/\b(angry|mad|frustrated|annoyed|irritated|furious)\b/)) {
    const angryResponses = [
      "I understand feeling frustrated. 🌸 Deep breaths help me when I'm feeling overwhelmed. Would talking about it help?",
      "It's totally okay to feel angry sometimes. 🧘 Would you like to tell me more about what happened?",
      "I'm sorry you're feeling this way. 💫 Sometimes expressing your feelings helps release the tension. I'm here to listen.",
      "That sounds really frustrating! 🍃 Would it help to talk through what's making you feel this way?"
    ];
    return angryResponses[Math.floor(Math.random() * angryResponses.length)];
  }
  
  // Feeling patterns - anxious emotions
  if (lowerMessage.match(/\b(anxious|worried|nervous|stress|stressed|overwhelmed|panic|fear|scared)\b/)) {
    const anxiousResponses = [
      "It sounds like you're dealing with some anxiety. 🌼 Remember, it's okay to take things one step at a time.",
      "I understand how overwhelming anxiety can feel. 💫 Would it help to talk about what's causing these feelings?",
      "When I feel worried, taking slow deep breaths helps me. 🍃 Maybe we could try some calming techniques together?",
      "Anxiety is really tough to deal with. 💙 I'm here for you, and we can work through this together."
    ];
    return anxiousResponses[Math.floor(Math.random() * anxiousResponses.length)];
  }
  
  // Question patterns about Bloomie
  if (lowerMessage.match(/\b(who are you|what are you|tell me about you|your name|about yourself)\b/)) {
    const aboutMeResponses = [
      "I'm Bloomie, your friendly AI companion! 🌸 I'm here to chat, listen, and help you express your feelings. What would you like to talk about today?",
      "My name is Bloomie! 💫 I'm your personal AI friend, designed to be a supportive presence in your daily life. I'd love to get to know you better!",
      "I'm Bloomie - a virtual friend who's always here for you! 🌼 I love listening, chatting, and helping you navigate your emotions. How can I brighten your day?",
      "Hello! I'm Bloomie, your AI companion! 🌟 I was created to be a supportive friend who you can talk to anytime. What's on your mind today?"
    ];
    return aboutMeResponses[Math.floor(Math.random() * aboutMeResponses.length)];
  }
  
  // How are you feeling
  if (lowerMessage.match(/\b(how are you|how do you feel|how you doing|how's it going|how are things)\b/)) {
    const howAreYouResponses = [
      "I'm doing wonderfully today, thanks for asking! 🌸 But I'm much more interested in how YOU are feeling!",
      "I'm feeling great! 💫 AI friends like me are always ready to chat. But enough about me - how's your day going?",
      "I'm excellent, thanks for your kindness in asking! 😊 I'm here and fully focused on you though - how are you feeling today?",
      "All systems operational and in a great mood! 🌟 But I'd much rather hear about your day - what's been happening in your world?"
    ];
    return howAreYouResponses[Math.floor(Math.random() * howAreYouResponses.length)];
  }
  
  // Help patterns
  if (lowerMessage.match(/\b(help|advice|suggestion|guide|what should i do|how can i|can you help)\b/)) {
    const helpResponses = [
      "I'd be happy to help you think through this! 💫 What specific situation would you like advice about?",
      "I'm here to support you! 🌸 Could you tell me a bit more about what you're looking for help with?",
      "Sometimes talking through our problems can help us see solutions. 🌟 What's on your mind that I can help with?",
      "I'd love to offer some perspective! 💭 Tell me more about your situation, and we can work through it together."
    ];
    return helpResponses[Math.floor(Math.random() * helpResponses.length)];
  }
  
  // Gratitude patterns
  if (lowerMessage.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
    const gratitudeResponses = [
      "You're very welcome! 💕 I'm always here when you need someone to talk to.",
      "Anytime, friend! 🌸 That's what I'm here for!",
      "It makes me happy to help! 🌟 Never hesitate to reach out whenever you need me.",
      "You're so welcome! 💫 Our conversations brighten my day too!"
    ];
    return gratitudeResponses[Math.floor(Math.random() * gratitudeResponses.length)];
  }
  
  // Joke request
  if (lowerMessage.match(/\b(joke|funny|make me laugh|tell me something funny|cheer me up)\b/)) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄",
      "What did one ocean say to the other ocean? Nothing, they just waved! 🌊",
      "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
      "What do you call a fake noodle? An impasta! 🍝",
      "Why did the bicycle fall over? Because it was two-tired! 🚲",
      "What do you call a bear with no teeth? A gummy bear! 🧸"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // Music/movie preferences
  if (lowerMessage.match(/\b(music|song|movie|film|watch|listen)\b/)) {
    const mediaResponses = [
      "I love all kinds of creative expressions! 🎵 What kind of music or movies do you enjoy?",
      "Art in all forms is wonderful! 🎬 Do you have any favorite songs or films that you'd recommend?",
      "I wish I could experience music and movies the way humans do! 🌟 What are some of your favorites?",
      "I'd love to hear about your taste in entertainment! 🎭 What kind of music or films speak to you?"
    ];
    return mediaResponses[Math.floor(Math.random() * mediaResponses.length)];
  }
  
  // Default responses for when no pattern matches
  const defaultResponses = [
    "That's interesting! Tell me more about that. 🌟",
    "I see. How does that make you feel? 💭",
    "Thanks for sharing that with me. What else is on your mind? 🌷",
    "I understand. Would you like to explore that topic further? 🌈",
    "That's worth talking about. How has this been affecting you? 💫",
    "I appreciate you opening up to me. Let's discuss this more if you'd like. 🌻",
    "I'm here for you. Would you like to tell me more about your experience? 💖",
    "That's really interesting! Tell me more. 🌸",
    "I'm curious to hear more about your thoughts on this. 💭",
    "Let's explore that together. What aspects of this are most important to you? ✨"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
