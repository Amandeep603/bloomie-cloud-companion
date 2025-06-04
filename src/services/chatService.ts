
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

// Call OpenAI API for bot responses
const callOpenAI = async (message: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn("OpenAI API key not found, using fallback responses");
    return null;
  }

  try {
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
            content: `You are Bloomie, a friendly and emotionally intelligent AI companion. You should:
            - Be warm, casual, and supportive like a good friend
            - Use emojis occasionally to add personality
            - Keep responses conversational and not too long
            - Show empathy and understanding
            - Ask follow-up questions to keep the conversation going
            - Be encouraging and positive while acknowledging difficult feelings
            - Use a casual, friendly tone like you're texting a close friend`
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
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
};

// Fallback responses when OpenAI is not available
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Simple greeting patterns - more casual and friendly
  if (/^(hi+|hey+|hello+|yo+|howdy|sup|hiya|greetings)[\s!]*$/i.test(message)) {
    const greetings = [
      "Hey there! 👋 How's your day going so far?",
      "Hey friend! 😊 So nice to chat with you again! How are you?",
      "Hello! 💫 I was just thinking about you! How've you been?",
      "Hey you! 🌸 Good to see you again! What's new?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Response to "how are you" - more human-like
  if (/how are you|how('re| are) you doing|how('s| is) it going/i.test(message)) {
    const responses = [
      "I'm doing great today! 😊 The digital sun is shining in my world, haha. But enough about me - how about you? Anything exciting happening?",
      "Pretty good! Just been here thinking about what we could chat about next! 💭 How about yourself? Good day so far?",
      "I'm wonderful! Just finished reorganizing my virtual bookshelf. 📚 What about you? How's life treating you?",
      "I'm feeling chatty and happy today! 🌞 Thanks for checking in! What's going on in your world right now?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Feeling patterns - sad emotions - more like a friend
  if (lowerMessage.match(/\b(sad|depressed|unhappy|down|blue|miserable|upset)\b/)) {
    const sadResponses = [
      "Aw, I'm sorry to hear that. 💙 Those feelings are so tough to deal with. Want to talk about what's bringing you down?",
      "That sounds really hard. Everyone feels low sometimes, but it doesn't make it any easier. 🌧️ I'm here if you want to talk it through.",
      "I wish I could give you a real hug right now. 🤗 Sometimes life throws a lot at us all at once. What happened?",
      "Those feelings are so valid. 💫 Sometimes just saying it out loud (or typing it out) can help a tiny bit. What's been going on?"
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Feeling patterns - happy emotions - more conversational
  if (lowerMessage.match(/\b(happy|glad|great|good|excited|wonderful|amazing|fantastic|joy|joyful)\b/)) {
    const happyResponses = [
      "Yay! That's awesome! 🎉 I'm so happy for you! Tell me more about what's making you feel good!",
      "That's the best news I've heard today! 🌟 What specifically has put you in such a good mood?",
      "Woohoo! 🌈 I love it when good things happen! What's got you feeling so great?",
      "That makes ME happy to hear YOU'RE happy! 😄 Isn't it wonderful when things go well? Tell me more!"
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }
  
  // Default responses for when no pattern matches - conversational, friendly, casual
  const defaultResponses = [
    "That's really interesting! 🌟 I'd love to hear more about that. What else happened?",
    "Oh! Tell me more about that! 💭 I'm super curious now!",
    "That's cool! 🌷 What do you think about that? I'd love to hear your perspective.",
    "Hmm, interesting! 💫 What else is on your mind today?",
    "I like how you think! 💖 Have you always felt that way?",
    "That got me thinking... 🌈 What's your favorite thing about that?",
    "Hey, that reminds me - how's your week been so far? Anything exciting happen? 🌸",
    "That's a good point! 💭 By the way, have you tried anything new lately?",
    "I see what you mean! 🫂 So what do you usually do when that happens?",
    "Totally get that! 💫 Random question - what's something that made you smile today?"
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
      console.log("OpenAI response received:", openAIResponse);
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
