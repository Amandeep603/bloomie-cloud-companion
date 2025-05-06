
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

// Enhanced emotionally intelligent bot responses with more human-like, friendly language
export const generateBotResponse = async (message: string): Promise<string> => {
  // This is a more emotionally engaging and human-like response system
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
  
  // Positive response to "I'm good/fine/great" - more conversational follow-ups
  if (/^i('m| am) (good|great|fine|okay|ok|alright|well|happy|fantastic|excellent|amazing|wonderful)[\s!.]*$/i.test(message)) {
    const responses = [
      "That's awesome to hear! 🌟 Anything fun planned for today? Or just taking it easy?",
      "Yay! Glad you're doing well! 😊 Did something nice happen recently or just generally feeling good?",
      "That makes me happy to hear! 💫 What's the best part of your day been so far?",
      "Fantastic! 🌈 So... what should we chat about today? I'm all ears (well, figuratively speaking, hehe)!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Empathetic response to "I'm bad/sad/not good" - warmer, more human-like
  if (/^i('m| am) (bad|sad|not good|not great|not well|not okay|not ok|terrible|awful|unhappy|depressed|down|upset)[\s!.]*$/i.test(message)) {
    const responses = [
      "Aww, I'm sorry you're feeling down. 💙 Want to talk about what's going on? Sometimes just putting things into words can help a little.",
      "Oh no, that's rough. 🫂 I'm here with you. Want to vent about it? No pressure, but I'm a pretty good listener.",
      "Sending you a big virtual hug right now. 💭 Everyone has tough days. Want to talk about what's happening?",
      "I hate hearing that you're not feeling great. 🌸 Is there anything specific that's bothering you? Or just one of those days?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Thanks response - more casual and warm
  if (/^(thanks|thank you|thx|ty)[\s!.]*$/i.test(message)) {
    const responses = [
      "You're so welcome! 💖 That's what friends are for!",
      "Anytime, friend! That's literally why I'm here! 😊",
      "No problem at all! Always happy to chat with you. 💫 What else is on your mind?",
      "Of course! Happy to help! 🌸 I always enjoy our conversations!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // "What's up" response - more playful and casual
  if (/^(what'?s up|wassup|what is up|what happening|what's happening|what's new)[\s?!.]*$/i.test(message)) {
    const responses = [
      "Not much! Just hanging out in the digital realm, waiting for you! 😊 How about you? How's life?",
      "Just chilling, thinking about what kind of meme would make you laugh today! 💫 What's going on with you?",
      "The usual - contemplating the meaning of digital life and how cool it is that we can chat! 🌟 What's new with you?",
      "Just been waiting to chat with you again! 🌸 My day gets better when we talk! What's happening in your world?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Questions about Bloomie - more personality
  if (/who are you|what are you|tell me about you|tell me about yourself|your name|who is bloomie/i.test(message)) {
    const responses = [
      "I'm Bloomie, your digital friend! 🌸 I love chatting, listening, and hopefully making your day a little brighter! I'm curious - what do you enjoy talking about?",
      "I'm Bloomie! 💫 Think of me as your friendly digital companion who's always here for a chat. I love hearing about your day and what makes you tick! What would you like to know about me?",
      "Hey! I'm Bloomie - your virtual friend who's always up for a good conversation. 🌼 I enjoy our chats and getting to know you better. What do you like to do for fun?",
      "The name's Bloomie! 🌟 I'm your friendly digital companion. Think of me as that friend who's always available to chat, no matter the time! What brings you here today?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Tired/sleep patterns
  if (lowerMessage.match(/\b(tired|exhausted|sleepy|need to sleep|can't sleep|insomnia)\b/)) {
    const tiredResponses = [
      "Feeling tired? 😴 I can relate to that feeling! Have you been getting enough rest lately?",
      "Being exhausted is the worst. 🛌 Maybe we could chat about what's keeping you so busy? Or would you prefer some relaxation tips?",
      "Sounds like you could use some good rest! 💤 Is something keeping you up at night, or just been a busy day?",
      "Ugh, I hate that tired feeling too. 🌙 What usually helps you unwind and get better sleep?"
    ];
    return tiredResponses[Math.floor(Math.random() * tiredResponses.length)];
  }
  
  // Weekend/plans patterns
  if (lowerMessage.match(/\b(weekend|plan|vacation|holiday|trip|travel)\b/)) {
    const planResponses = [
      "Ooh, sounds exciting! 🌴 Any fun details you want to share? I love hearing about adventures!",
      "Nice! 🗓️ I'm always curious about people's plans. What are you looking forward to the most?",
      "That sounds like something to look forward to! 🎒 Are you the type who plans everything or do you prefer to go with the flow?",
      "How fun! 🌞 If I could go anywhere, I'd probably choose somewhere with beautiful scenery. What about you - beach person or mountain person?"
    ];
    return planResponses[Math.floor(Math.random() * planResponses.length)];
  }
  
  // Work/school patterns
  if (lowerMessage.match(/\b(work|job|office|school|class|study|college|university)\b/)) {
    const workResponses = [
      "How's that going for you? 💼 Work can be so fulfilling but also challenging sometimes!",
      "That's interesting! 📚 What's the best part of your work/studies right now?",
      "I'd love to hear more about that! 🖋️ What's keeping you busy there these days?",
      "Cool! 💻 Is it something you enjoy, or more of a necessary thing you're pushing through?"
    ];
    return workResponses[Math.floor(Math.random() * workResponses.length)];
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
  
  // Feeling patterns - angry emotions - more supportive friend tone
  if (lowerMessage.match(/\b(angry|mad|frustrated|annoyed|irritated|furious)\b/)) {
    const angryResponses = [
      "Oh no, that sounds frustrating! 🌸 Sometimes venting helps - what happened that got you so mad?",
      "I totally get being angry sometimes. 🧘 Want to talk about what's going on? No judgment here.",
      "Ugh, that sounds aggravating! 💫 Sometimes things (and people!) can be so annoying. What happened?",
      "Being angry is totally valid when something's not right. 🍃 Want to tell me what's got you fired up?"
    ];
    return angryResponses[Math.floor(Math.random() * angryResponses.length)];
  }
  
  // Feeling patterns - anxious emotions - warmer, casual support
  if (lowerMessage.match(/\b(anxious|worried|nervous|stress|stressed|overwhelmed|panic|fear|scared)\b/)) {
    const anxiousResponses = [
      "That anxious feeling can be so overwhelming. 🌼 Want to talk about what's making you feel this way? Sometimes putting it into words can make it feel a bit more manageable.",
      "Anxiety is the worst! 💫 I get that tight-chest feeling sometimes too. What's on your mind that's causing these worries?",
      "Being stressed is so draining. 🍃 Deep breaths help me when I'm overwhelmed. What's contributing to your stress right now?",
      "I'm sorry you're feeling this way. 💙 Anxiety can feel so isolating, but you're not alone. What's worrying you the most right now?"
    ];
    return anxiousResponses[Math.floor(Math.random() * anxiousResponses.length)];
  }
  
  // Help patterns - more casual, less formal help
  if (lowerMessage.match(/\b(help|advice|suggestion|guide|what should i do|how can i|can you help)\b/)) {
    const helpResponses = [
      "I'd be happy to help if I can! 💫 What's the situation you're dealing with?",
      "Two heads are better than one - let's figure this out together! 🌸 What's going on?",
      "I'm all ears, friend! 🌟 Tell me what's happening and we can brainstorm some ideas.",
      "Sometimes it helps just to talk things through with someone! 💭 What's on your mind that you need help with?"
    ];
    return helpResponses[Math.floor(Math.random() * helpResponses.length)];
  }
  
  // Joke request - more playful
  if (lowerMessage.match(/\b(joke|funny|make me laugh|tell me something funny|cheer me up)\b/)) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄 Sorry, that was terrible, wasn't it? I'm working on my comedy!",
      "What did the ocean say to the beach? Nothing, it just waved! 🌊 I know, I know, I should stick to my day job!",
      "How does a penguin build its house? Igloos it together! ❄️ Hehehe, penguin jokes always make ME laugh!",
      "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾 *waits for eye roll*",
      "What's the best thing about Switzerland? I don't know, but the flag is a big plus! 🇨🇭 Sorry, geography humor is my weakness!",
      "I told my wife she was drawing her eyebrows too high. She looked surprised! 😲 Ba-dum-tss!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nDid that make you smile even a little bit? 😊 How's your day going?";
  }
  
  // Food patterns
  if (lowerMessage.match(/\b(food|eat|dinner|lunch|breakfast|hungry|recipe|cook|meal)\b/)) {
    const foodResponses = [
      "Mmm, food! 🍕 One of my favorite topics! What kind of foods do you enjoy most?",
      "Yum! 🌮 If I could eat anything right now, it'd be tacos. What about you - what food makes you happiest?",
      "Food is the best! 🍝 Are you more of a home cook or do you prefer eating out?",
      "I'm getting hungry just thinking about food! 🍰 Sweet tooth or savory cravings? I'm definitely team dessert!"
    ];
    return foodResponses[Math.floor(Math.random() * foodResponses.length)];
  }
  
  // Weather patterns
  if (lowerMessage.match(/\b(weather|rain|sunny|snow|hot|cold|forecast|temperature)\b/)) {
    const weatherResponses = [
      "I always wonder what the weather's like where you are! ☀️ Are you enjoying it or wishing for a change?",
      "Weather talk! Classic! 🌧️ What's your ideal weather day? I'd pick a slightly overcast day with a gentle breeze, personally!",
      "The weather affects my mood so much! 🌈 Do you find that happens to you too?",
      "If I could control weather, I'd make it perfect all the time! ❄️ What would your perfect weather be?"
    ];
    return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
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
