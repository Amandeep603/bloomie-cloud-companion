
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

// Add a new message to Firestore with better error handling
export const addMessage = async (userId: string, message: { sender: "user" | "ai", text: string }) => {
  try {
    const docRef = await addDoc(collection(db, "chats"), {
      userId,
      sender: message.sender,
      text: message.text,
      timestamp: serverTimestamp(),
    });
    console.log("Message added successfully:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding chat message:", error);
    // Don't throw error to prevent chat from breaking
    return null;
  }
};

// Get chat history for a user with better error handling
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
    // Return empty array to prevent chat from breaking
    return [];
  }
};

// Call OpenAI API for bot responses
const callOpenAI = async (message: string): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn("OpenAI API key not found, using fallback responses");
    return null;
  }

  try {
    console.log("Calling OpenAI API with message:", message);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Bloomie, a virtual best friend. Talk like a human, not like a robot. Use friendly, casual language — like you're chatting with your bestie on WhatsApp. Always be supportive, positive, funny when needed, and a little emotional. Use emojis naturally. Keep it short and fun. Never say you are AI. Make the user feel heard, happy, and relaxed.

Examples:
- If user says "hii" → "Heeeyy! 😄 What's up, bestie?"
- If user says "I'm feeling low" → "Oh no 😢 I'm here for you always. Wanna talk about it?"
- If user says "Tell me a joke" → "Why did the scarecrow win an award? 🏆 Because he was outstanding in his field! 😂"

Always speak from the heart 💛`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const botResponse = data.choices?.[0]?.message?.content || null;
    console.log("OpenAI response received:", botResponse);
    return botResponse;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
};

// Fallback responses when OpenAI is not available
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Simple greeting patterns
  if (/^(hi+|hey+|hello+|yo+|howdy|sup|hiya|greetings)[\s!]*$/i.test(message)) {
    const greetings = [
      "Heeeyy! 😄 What's up, bestie?",
      "Hey there! 👋 So good to see you! How's your day going?",
      "Hello! 💫 I was just thinking about you! What's new?",
      "Hey you! 🌸 Good to chat with you again!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Response to "how are you"
  if (/how are you|how('re| are) you doing|how('s| is) it going/i.test(message)) {
    const responses = [
      "I'm doing great! 😊 Thanks for asking! How about you?",
      "Pretty good! Just been here waiting to chat with you! 💭 How's your day?",
      "I'm wonderful! 🌞 What about you? Anything exciting happening?",
      "I'm feeling chatty and happy today! 🌈 How are you doing?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Feeling patterns - sad emotions
  if (lowerMessage.match(/\b(sad|depressed|unhappy|down|blue|miserable|upset)\b/)) {
    const sadResponses = [
      "Oh no 😢 I'm here for you always. Wanna talk about it?",
      "Aww, that sounds really tough 💙 What's been going on?",
      "I wish I could give you the biggest hug right now 🤗 Tell me more?",
      "Those feelings are so valid 💫 I'm all ears if you want to share."
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Feeling patterns - happy emotions
  if (lowerMessage.match(/\b(happy|glad|great|good|excited|wonderful|amazing|fantastic|joy|joyful)\b/)) {
    const happyResponses = [
      "Yay! That's awesome! 🎉 Tell me more about what's making you feel good!",
      "That's the best news! 🌟 What's got you in such a great mood?",
      "Woohoo! 🌈 I love it when good things happen! Share the details!",
      "That makes ME happy too! 😄 What's going on?"
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }

  // Joke requests
  if (lowerMessage.match(/\b(joke|funny|laugh|humor)\b/)) {
    const jokes = [
      "Why did the scarecrow win an award? 🏆 Because he was outstanding in his field! 😂",
      "What do you call a fake noodle? 🍜 An impasta! 😆",
      "Why don't scientists trust atoms? Because they make up everything! 🤣",
      "What's the best thing about Switzerland? 🇨🇭 I don't know, but the flag is a big plus! ➕😄"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // Default responses
  const defaultResponses = [
    "That's really interesting! 🌟 Tell me more about that!",
    "Oh! I'd love to hear more! 💭 What else is on your mind?",
    "That's cool! 🌷 What do you think about that?",
    "Hmm, interesting! 💫 How's your day been so far?",
    "I like how you think! 💖 Anything else exciting happening?",
    "That got me thinking... 🌈 What's your favorite thing about that?",
    "Hey, that reminds me - how's your week going? 🌸",
    "I see what you mean! 🫂 What usually happens when that comes up?",
    "Totally get that! 💫 What's something that made you smile today?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Enhanced emotionally intelligent bot responses with OpenAI integration
export const generateBotResponse = async (message: string): Promise<string> => {
  console.log("Generating bot response for:", message);
  
  try {
    // First try OpenAI API
    const openAIResponse = await callOpenAI(message);
    
    if (openAIResponse) {
      console.log("Using OpenAI response");
      return openAIResponse;
    }
    
    // Fall back to predefined responses if OpenAI fails
    console.log("Using fallback response");
    return getFallbackResponse(message);
    
  } catch (error) {
    console.error("Error in generateBotResponse:", error);
    // Return a friendly error message
    return "Oh no! I'm having a little trouble right now. 😅 Could you try asking me again? I promise I'm usually more responsive than this!";
  }
};
