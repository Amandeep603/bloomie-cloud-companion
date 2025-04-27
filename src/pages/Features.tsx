
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Video, User } from "lucide-react";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-6">Features</h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
            Discover all the ways Bloomie can support your emotional wellbeing and become your daily companion.
          </p>
          
          <div className="space-y-16">
            {/* AI Chat Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">AI Chat Companion</h2>
                <p className="text-muted-foreground mb-4">
                  Have meaningful conversations with Bloomie anytime. Whether you need someone to listen, 
                  want advice, or just want to chat, Bloomie is always available.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Judgment-free conversations
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Personalized responses
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Available 24/7
                  </li>
                </ul>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted p-4 border-b">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-primary rounded-full"></div>
                      <div className="font-medium">Bloomie</div>
                    </div>
                    <div className="ai-bubble">
                      How are you feeling today? I'm here to listen.
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex justify-end">
                      <div className="user-bubble">
                        I'm feeling a bit overwhelmed with work today.
                      </div>
                    </div>
                    <div className="ai-bubble">
                      I understand that feeling. Let's break down what's causing the overwhelm and find some strategies to help you manage it.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Emotional Diary Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <Card className="overflow-hidden shadow-md">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      <div className="flex flex-col items-center p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <span className="text-2xl mb-1">😀</span>
                        <span className="text-xs font-medium">Happy</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <span className="text-2xl mb-1">😌</span>
                        <span className="text-xs font-medium">Calm</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ring-2 ring-primary">
                        <span className="text-2xl mb-1">😐</span>
                        <span className="text-xs font-medium">Neutral</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                        <span className="text-2xl mb-1">😔</span>
                        <span className="text-xs font-medium">Sad</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                        <span className="text-2xl mb-1">😠</span>
                        <span className="text-xs font-medium">Angry</span>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">April 27, 2025</div>
                      <div className="font-medium">Today was mostly productive, but I had some stress in the afternoon meeting...</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Emotional Diary</h2>
                <p className="text-muted-foreground mb-4">
                  Track your mood and emotions daily with guided reflections. Over time, Bloomie will help you identify patterns and provide insights to improve your emotional wellbeing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Daily mood tracking
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Guided reflection prompts
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Pattern recognition over time
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Video Call Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Video Call</h2>
                <p className="text-muted-foreground mb-4">
                  Enjoy face-to-face time with your AI friend through our animated avatar video calls. 
                  A more immersive way to connect with Bloomie.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Expressive animated avatars
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Real-time conversations
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Add more personality to your chats
                  </li>
                </ul>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0 relative h-64">
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center animate-pulse-light">
                      <div className="text-4xl">😊</div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center">
                      <Mic className="h-4 w-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="h-4 w-4 text-white" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center">
                      <Video className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Avatar Customization Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <div className="w-28 h-28 bg-bloomie-pink rounded-full flex items-center justify-center">
                      <div className="text-6xl">😎</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Avatar Customization</h2>
                <p className="text-muted-foreground mb-4">
                  Make Bloomie truly yours by customizing how your AI friend looks and feels. 
                  Choose colors, expressions, and more to personalize your experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Multiple color options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Different expressions and styles
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Create your perfect companion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
