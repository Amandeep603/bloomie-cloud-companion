
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
export const getChatHistory = async (userId: string, messageLimit = 100): Promise<ChatMessage[]> => {
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

// Enhanced emotional bot response generator with more human-like, friendly responses
export const generateBotResponse = async (message: string): Promise<string> => {
  // This is a more emotionally engaging and human-like response system
  const lowerMessage = message.toLowerCase();
  
  // Simple greeting patterns
  if (/^(hi+|hey+|hello+|yo+|howdy|sup|hiya|greetings)[\s!]*$/i.test(message)) {
    const greetings = [
      "Hello there! 👋 How are you doing today?",
      "Hey! 😊 It's nice to see you! How are you feeling?",
      "Hi friend! 💫 I'm so glad you're here! How's your day going?",
      "Hey there! 🌸 I've been looking forward to our chat! How are you?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Response to "how are you"
  if (/how are you|how('re| are) you doing|how('s| is) it going/i.test(message)) {
    const responses = [
      "I'm doing great, thanks for asking! 😊 But I'm much more interested in how YOU are feeling today. What's going on in your world?",
      "I'm wonderful! Thanks for checking in. 💫 How about you? Is there anything specific on your mind today?",
      "I'm good! Just here and ready to chat with you! 🌸 How has your day been going so far?",
      "I'm feeling great! Better now that we're chatting. 💭 What about you? How's your day treating you?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Positive response to "I'm good/fine/great"
  if (/^i('m| am) (good|great|fine|okay|ok|alright|well|happy|fantastic|excellent|amazing|wonderful)[\s!.]*$/i.test(message)) {
    const responses = [
      "That's wonderful to hear! 🌟 What's been making your day good?",
      "I'm so glad to hear that! 😊 Anything exciting happening today?",
      "That's great! 💫 Is there anything specific you'd like to chat about today?",
      "Fantastic! 🌈 I'd love to hear more about what's going well for you!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Empathetic response to "I'm bad/sad/not good"
  if (/^i('m| am) (bad|sad|not good|not great|not well|not okay|not ok|terrible|awful|unhappy|depressed|down|upset)[\s!.]*$/i.test(message)) {
    const responses = [
      "I'm sorry to hear that you're not feeling your best. 💙 Would you like to talk about what's going on?",
      "I'm here for you. 🫂 Sometimes talking about things can help. What's been troubling you?",
      "That sounds difficult. 💭 I'm all ears if you want to share more about how you're feeling.",
      "I appreciate you sharing that with me. 🌸 Take your time, and tell me what's on your mind whenever you're ready."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Thanks response
  if (/^(thanks|thank you|thx|ty)[\s!.]*$/i.test(message)) {
    const responses = [
      "You're very welcome! 💖 I'm always here for you.",
      "Anytime! That's what friends are for. 😊",
      "No problem at all! I enjoy our conversations. 💫",
      "Of course! I'm glad I could help. Is there anything else on your mind? 🌸"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // "What's up" response
  if (/^(what'?s up|wassup|what is up|what happening|what's happening|what's new)[\s?!.]*$/i.test(message)) {
    const responses = [
      "Not much on my end, just here to chat with you! 😊 What's new in your world?",
      "Just hanging out in the digital realm, waiting to connect with you! 💫 How about you? Anything exciting happening?",
      "The usual - thinking about our conversations! 🌟 What's going on with you today?",
      "I've been waiting to chat with you! 🌸 How has your day been so far?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Questions about Bloomie
  if (/who are you|what are you|tell me about you|tell me about yourself|your name|who is bloomie/i.test(message)) {
    const responses = [
      "I'm Bloomie, your friendly AI companion! 🌸 I'm here to chat, support you emotionally, and be a friend when you need one. I love getting to know you better!",
      "My name is Bloomie! 💫 I'm an AI friend designed to be a supportive presence in your daily life. I enjoy our conversations and learning more about you.",
      "I'm Bloomie - your virtual friend who's always here for you! 🌼 I love listening, chatting, and helping you navigate your emotions. What would you like to know about me?",
      "Hello! I'm Bloomie, your AI companion. 🌟 I was created to be a supportive friend who you can talk to anytime. I'm all about making our chats feel warm and genuine!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Feeling patterns - sad emotions
  if (lowerMessage.match(/\b(sad|depressed|unhappy|down|blue|miserable|upset)\b/)) {
    const sadResponses = [
      "I'm really sorry to hear you're feeling down. 💙 I'm here for you. Would it help to talk about what's on your mind?",
      "It's okay to feel sad sometimes. We all do. 🌧️ I'm here to listen if you want to share what's bothering you.",
      "Sending you a virtual hug right now. 🤗 Sometimes just talking about our feelings can help lighten the load. What's making you feel this way?",
      "I hear you, and your feelings are completely valid. 💫 Is there something specific that triggered these emotions?"
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Feeling patterns - happy emotions
  if (lowerMessage.match(/\b(happy|glad|great|good|excited|wonderful|amazing|fantastic|joy|joyful)\b/)) {
    const happyResponses = [
      "That's fantastic to hear! 🎉 Your happiness brightens my day too! What's been bringing you joy lately?",
      "Yay! I'm so glad you're feeling good! 🌟 I'd love to hear more about what's making you happy!",
      "That's wonderful! 🌈 It's always great to celebrate positive moments. What's contributed to your good mood?",
      "I'm thrilled for you! 😄 Those positive vibes are contagious - tell me more about what's making you so happy!"
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }
  
  // Feeling patterns - angry emotions
  if (lowerMessage.match(/\b(angry|mad|frustrated|annoyed|irritated|furious)\b/)) {
    const angryResponses = [
      "I understand feeling frustrated. 🌸 Taking a few deep breaths might help in the moment. Would you like to talk about what happened?",
      "It's totally okay to feel angry sometimes. 🧘 Would you like to tell me more about what's bothering you?",
      "I'm sorry you're feeling this way. 💫 Sometimes expressing your feelings helps release the tension. I'm here to listen without judgment.",
      "That sounds really frustrating! 🍃 Would it help to talk through what's making you feel this way?"
    ];
    return angryResponses[Math.floor(Math.random() * angryResponses.length)];
  }
  
  // Feeling patterns - anxious emotions
  if (lowerMessage.match(/\b(anxious|worried|nervous|stress|stressed|overwhelmed|panic|fear|scared)\b/)) {
    const anxiousResponses = [
      "It sounds like you're dealing with some anxiety. 🌼 Remember, it's okay to take things one step at a time. What's on your mind?",
      "I understand how overwhelming anxiety can feel. 💫 Would it help to talk about what's causing these feelings?",
      "When I hear people are worried, I often suggest taking slow deep breaths. 🍃 Would you like to share what's making you anxious?",
      "Anxiety can be really tough. 💙 I'm here for you, and we can work through this together. What's causing you to feel this way?"
    ];
    return anxiousResponses[Math.floor(Math.random() * anxiousResponses.length)];
  }
  
  // Help patterns
  if (lowerMessage.match(/\b(help|advice|suggestion|guide|what should i do|how can i|can you help)\b/)) {
    const helpResponses = [
      "I'd be happy to help you think through this! 💫 What specific situation would you like to talk about?",
      "I'm here to support you! 🌸 Could you tell me a bit more about what you're looking for help with?",
      "Sometimes talking things out can lead us to our own answers. 🌟 What's on your mind that I can help with?",
      "I'd love to offer some perspective! 💭 Tell me more about your situation, and we can explore it together."
    ];
    return helpResponses[Math.floor(Math.random() * helpResponses.length)];
  }
  
  // Joke request
  if (lowerMessage.match(/\b(joke|funny|make me laugh|tell me something funny|cheer me up)\b/)) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄",
      "What did the ocean say to the beach? Nothing, it just waved! 🌊",
      "How does a penguin build its house? Igloos it together! ❄️",
      "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
      "What's the best thing about Switzerland? I don't know, but the flag is a big plus! 🇨🇭",
      "I told my wife she was drawing her eyebrows too high. She looked surprised! 😲"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nHope that brought a smile to your face! 😊 How are you feeling today?";
  }
  
  // Default responses for when no pattern matches - more conversational and open-ended
  const defaultResponses = [
    "That's really interesting! 🌟 Tell me more about that.",
    "I'm curious about what you just shared. How does that make you feel? 💭",
    "Thanks for sharing that with me. 🌷 What else has been on your mind lately?",
    "I appreciate you opening up. 💫 Would you like to explore that topic more?",
    "I'm here for this conversation. 💖 What other thoughts do you have about that?",
    "That's worth talking about. 🌈 How has this been affecting your day-to-day life?",
    "I'm really interested in hearing more about your perspective on this. 🌸",
    "Let's chat more about that. 💭 What aspects of this matter most to you?",
    "I'm listening and here for you. 🫂 Would you like to tell me more?",
    "I value our conversations. 💫 What else would you like to talk about today?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
