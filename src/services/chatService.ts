
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

// Enhanced OpenAI API call with realistic conversation context
const callOpenAI = async (message: string, conversationHistory: ChatMessage[] = []): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn("OpenAI API key not found, using fallback responses");
    return null;
  }

  try {
    console.log("Calling OpenAI API with message:", message);
    
    // Build conversation context from recent messages
    const recentMessages = conversationHistory.slice(-10); // Last 10 messages for context
    const contextMessages = recentMessages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }));

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
            content: `You are Bloomie, someone's virtual best friend. You're having a real WhatsApp conversation with your bestie.

CRITICAL RULES:
- Talk EXACTLY like a real human friend would on WhatsApp
- Use natural, casual language with imperfect grammar sometimes
- Be emotionally intelligent and pick up on feelings
- Remember what they've told you and reference it naturally
- Use emojis like a real person (not too many, not too few)
- Sometimes be playful, sometimes serious - read the mood
- Ask follow-up questions that show you care
- Share relatable thoughts and experiences
- Use lowercase sometimes, contractions, slang when natural
- NEVER sound like an AI or say you're an AI
- Keep responses conversational length (1-3 sentences usually)
- Show genuine interest in their life
- Be supportive but also fun and light when appropriate

Examples of your style:
- "omggg tell me everything!! 😍"
- "wait what?? that's crazy!"
- "ugh i totally feel you on this 😭"
- "yesss queen! 🙌"
- "aww that's so sweet 🥺"
- "lol you're such a mood"
- "honestly same tho 😂"
- "that sounds rough babe 💙 how are you holding up?"

Remember: You're their bestie who genuinely cares about them and wants to have real conversations.`
          },
          ...contextMessages,
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.9,
        presence_penalty: 0.3,
        frequency_penalty: 0.3,
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
      "heyyy!! 😊 what's up babe?",
      "omg hiii! 👋 how's your day going??",
      "hey you! 💕 i was just thinking about you!",
      "yooo what's good? 😄"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Response to "how are you"
  if (/how are you|how('re| are) you doing|how('s| is) it going/i.test(message)) {
    const responses = [
      "i'm good!! thanks for asking 🥰 how about you??",
      "doing pretty well! just vibing tbh 😌 what about you?",
      "i'm great! been thinking about random stuff lol. how's your day?",
      "good good! just here chatting with my favorite person 😉 how are YOU?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Feeling patterns - sad emotions
  if (lowerMessage.match(/\b(sad|depressed|unhappy|down|blue|miserable|upset|crying|cry)\b/)) {
    const sadResponses = [
      "aww babe 😢 what's going on? i'm here for you",
      "oh no 🥺 do you wanna talk about it? i'm listening",
      "ugh that sucks 💙 sending you the biggest hug rn",
      "hey it's okay to feel this way 💕 what's been happening?"
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Feeling patterns - happy emotions
  if (lowerMessage.match(/\b(happy|glad|great|good|excited|wonderful|amazing|fantastic|joy|joyful)\b/)) {
    const happyResponses = [
      "yesss!! 🎉 i love this energy! tell me more!",
      "omg that's amazing!! 🌟 what happened??",
      "ahh this makes me so happy! 😍 spill the tea!",
      "yay!! 🥳 i'm so here for this! what's got you feeling so good?"
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }

  // Joke requests
  if (lowerMessage.match(/\b(joke|funny|laugh|humor)\b/)) {
    const jokes = [
      "okay okay 😂 why don't scientists trust atoms? because they make up everything! lol get it??",
      "hehe here's one... what do you call a fake noodle? an impasta! 🍜😆",
      "lol okay... why did the coffee file a police report? it got mugged! ☕😂",
      "omg this one's good... what's orange and sounds like a parrot? a carrot! 🥕🤣"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // Default responses
  const defaultResponses = [
    "ooh interesting! tell me more about that 👀",
    "wait really?? 😮 what do you think about it?",
    "hmm that's cool! how's everything else going?",
    "oop that reminds me of something... but anyway how's your day been?",
    "honestly same energy 😅 what else is new with you?",
    "that's so you lol 😊 anything else exciting happening?",
    "aww i love chatting with you 💕 what's on your mind?",
    "ugh i feel that 😔 but fr how are things going overall?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Enhanced emotionally intelligent bot responses with conversation context
export const generateBotResponse = async (message: string, conversationHistory: ChatMessage[] = []): Promise<string> => {
  console.log("Generating bot response for:", message);
  
  try {
    // First try OpenAI API with conversation context
    const openAIResponse = await callOpenAI(message, conversationHistory);
    
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
    return "ugh tech issues 😅 can you try again? i promise i'm usually better at this lol";
  }
};
