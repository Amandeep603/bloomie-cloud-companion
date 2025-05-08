
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Video, User, Mic, X } from "lucide-react";
import ThreeDAvatar from "@/components/features/ThreeDAvatar";
import { motion } from "framer-motion";

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
                  <div className="bg-gradient-to-r from-violet-500/90 to-indigo-500/90 p-3 border-b flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
                      <img src="/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png" alt="Bloomie" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-white">Bloomie</div>
                    <div className="ml-auto flex items-center">
                      <img src="/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png" alt="Bloomie Logo" className="h-5 opacity-90" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-b from-violet-50/30 to-indigo-50/30 dark:from-slate-900/30 dark:to-slate-800/30 p-4">
                    <div className="flex mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 mr-2 overflow-hidden flex items-center justify-center">
                        <img src="/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png" alt="Bloomie" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                        <p className="text-sm">Hey there! How are you feeling today? 😊</p>
                        <span className="text-[10px] text-muted-foreground float-right">2:30 PM</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mb-3">
                      <div className="bg-primary/90 text-white p-3 rounded-lg rounded-br-none shadow-sm max-w-[85%]">
                        <p className="text-sm">Kinda stressed 😕</p>
                        <span className="text-[10px] text-white/70 float-right">2:31 PM</span>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 mr-2 overflow-hidden flex items-center justify-center">
                        <img src="/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png" alt="Bloomie" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                        <p className="text-sm">Aww, I'm here for you 💛 Let's talk it out. What's on your mind today?</p>
                        <span className="text-[10px] text-muted-foreground float-right">2:31 PM</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-2 text-primary/50">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">Bloomie is typing...</div>
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
            
            {/* Video Call Feature - Enhanced for realistic video call appearance */}
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
              <Card className="overflow-hidden shadow-md">
                <CardContent className="p-0 relative">
                  {/* Improved video call header */}
                  <div className="bg-gray-900 p-2.5 border-b border-gray-800 flex items-center justify-between">
                    <div className="text-white text-sm font-medium">Bloomie Video Call</div>
                    <div className="text-xs text-gray-400">12:42</div>
                  </div>
                  
                  {/* Enhanced video call container with more realistic appearance */}
                  <div className="bg-gray-800 h-[400px] relative">
                    {/* Main video (Bloomie) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/10 to-purple-100/10 backdrop-blur-[2px]"></div>
                        <img 
                          src="/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png" 
                          alt="Bloomie Video" 
                          className="h-[85%] w-auto object-contain transform translate-y-[5%]"
                        />
                        <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center space-x-1">
                          <span>Bloomie</span>
                        </div>
                        <div className="absolute top-3 right-3 flex space-x-1">
                          <div className="bg-black/40 w-6 h-6 rounded-full flex items-center justify-center">
                            <Mic className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Small PIP video (User) */}
                    <div className="absolute bottom-4 right-4 w-32 h-44 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                      <div className="w-full h-full bg-gradient-to-b from-blue-50/10 to-blue-100/10 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-[#f0f8ff]/10 backdrop-blur-[2px]"></div>
                        <img 
                          src="/lovable-uploads/a897f883-d1a0-4c7e-ad58-fa38f2730685.png" 
                          alt="User Video" 
                          className="h-[85%] w-auto object-contain transform translate-y-[5%]"
                        />
                        <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                          You
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced call controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                      <X className="h-6 w-6 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Video className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Avatar Customization Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    {/* Static avatar with no background */}
                    <img
                      src="/lovable-uploads/3c16cc42-78e6-4498-a8f3-f1212b65df2c.png"
                      alt="3D Avatar"
                      className="w-4/5 h-4/5 object-contain"
                    />
                  </div>
                </motion.div>
                <div className="text-center mt-4 text-lg font-medium">
                  Create your own 3D digital friend
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Create Your Own 3D Avatar</h2>
                <p className="text-muted-foreground mb-4">
                  Design your own realistic 3D avatar using our advanced customization technology. 
                  Choose facial features, expressions, and styles to personalize your digital companion.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Realistic 3D human avatars
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Detailed facial customization
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Use your avatar across all Bloomie features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Express emotions through your digital persona
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
