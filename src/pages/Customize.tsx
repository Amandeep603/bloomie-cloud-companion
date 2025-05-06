
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AvatarCustomizer from "@/components/AvatarCustomizer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader, Info } from "lucide-react";
import ThreeDAvatar from "@/components/features/ThreeDAvatar";
import { initAvaturnEditor, saveAvatarToUser, getUserAvatarMetadata } from "@/services/avaturnService";

const Customize = () => {
  const [activeTab, setActiveTab] = useState("2d");
  const [is3DLoading, setIs3DLoading] = useState(false);
  const [has3DAvatar, setHas3DAvatar] = useState(false);
  const [avatarThumbnail, setAvatarThumbnail] = useState<string | null>(null);
  
  const avaturnContainerRef = useRef<HTMLDivElement>(null);
  const avaturnEditor = useRef<any>(null);
  
  const { toast } = useToast();
  const { currentUser, userProfile } = useAuth();

  // Check if user has a 3D avatar
  useEffect(() => {
    const checkUserAvatar = async () => {
      if (!currentUser) return;
      
      try {
        const avatarData = await getUserAvatarMetadata(currentUser.uid);
        if (avatarData) {
          setHas3DAvatar(true);
          setAvatarThumbnail(avatarData.thumbnail);
        }
      } catch (error) {
        console.error("Error checking user avatar:", error);
      }
    };
    
    checkUserAvatar();
  }, [currentUser]);

  // Initialize Avaturn editor
  useEffect(() => {
    if (activeTab === "3d" && avaturnContainerRef.current && !avaturnEditor.current) {
      setIs3DLoading(true);
      
      try {
        // Mock initialization of Avaturn editor
        avaturnEditor.current = initAvaturnEditor("avaturn-container", {
          language: "en",
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          placeholder: "/ai-avatar-face.png"
        });
        
        // In a real implementation, we would add event listeners here
        avaturnEditor.current.addEventListener("avatarCreated", () => {
          toast({
            title: "3D Avatar Created",
            description: "Your 3D avatar has been created successfully!",
          });
          setHas3DAvatar(true);
        });
      } catch (error) {
        console.error("Error initializing Avaturn editor:", error);
        toast({
          title: "Error loading 3D avatar editor",
          description: "There was a problem loading the 3D avatar editor. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIs3DLoading(false);
      }
    }
    
    // Clean up
    return () => {
      if (avaturnEditor.current) {
        avaturnEditor.current.destroy();
        avaturnEditor.current = null;
      }
    };
  }, [activeTab, toast]);

  const handleSave3DAvatar = async () => {
    if (!currentUser || !avaturnEditor.current) return;
    
    try {
      setIs3DLoading(true);
      
      // Get avatar metadata
      const avatarMetadata = avaturnEditor.current.getAvatarMetadata();
      
      // Save to Firebase
      await saveAvatarToUser(currentUser.uid, avatarMetadata);
      setAvatarThumbnail(avatarMetadata.thumbnail);
      
      toast({
        title: "3D Avatar Saved",
        description: "Your 3D avatar has been saved successfully!",
      });
    } catch (error) {
      console.error("Error saving 3D avatar:", error);
      toast({
        title: "Error saving 3D avatar",
        description: "There was a problem saving your 3D avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIs3DLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Customize Bloomie</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Make Bloomie truly yours by customizing how your AI friend looks and feels.
          </p>
          
          <Tabs defaultValue="2d" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="2d">2D Avatar</TabsTrigger>
              <TabsTrigger value="3d">3D Avatar Creator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="2d" className="mt-0">
              <div className="bg-card rounded-xl shadow-sm border">
                <AvatarCustomizer />
              </div>
            </TabsContent>
            
            <TabsContent value="3d" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Create Your 3D Avatar</CardTitle>
                  <CardDescription>
                    Design a realistic 3D avatar that represents you
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      {has3DAvatar && avatarThumbnail ? (
                        <div className="border rounded-xl overflow-hidden h-80 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800">
                          <ThreeDAvatar
                            avatarUrl={avatarThumbnail}
                            className="w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="border rounded-xl overflow-hidden h-80 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
                          {is3DLoading ? (
                            <div className="text-center">
                              <Loader className="h-10 w-10 animate-spin mx-auto mb-4 text-primary/70" />
                              <p>Loading 3D Avatar Creator...</p>
                            </div>
                          ) : (
                            <div className="text-center p-6">
                              <Avatar className="h-24 w-24 mx-auto mb-4">
                                <AvatarFallback className="bg-primary/10 text-primary text-4xl">3D</AvatarFallback>
                              </Avatar>
                              <p className="text-lg font-medium mb-2">Create Your 3D Avatar</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Design a personalized 3D avatar that looks like you
                              </p>
                              <div className="flex justify-center">
                                <Button>Start Creating</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="border rounded-xl overflow-hidden h-80" id="avaturn-container" ref={avaturnContainerRef}>
                        <div className="p-6 h-full flex flex-col items-center justify-center bg-muted/50">
                          {is3DLoading ? (
                            <Loader className="h-8 w-8 animate-spin mb-4" />
                          ) : (
                            <div className="text-center">
                              <Info className="h-10 w-10 mx-auto mb-4 text-amber-500" />
                              <p className="text-lg font-medium mb-2">Avaturn Integration</p>
                              <p className="text-sm text-muted-foreground mb-6">
                                The Avaturn 3D avatar creator will be integrated here.
                                Currently showing a placeholder UI.
                              </p>
                              <div className="flex justify-center gap-3">
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    toast({
                                      title: "Demo Mode",
                                      description: "This is a demonstration of the Avaturn integration."
                                    });
                                  }}
                                >
                                  Customize Features
                                </Button>
                                <Button 
                                  onClick={handleSave3DAvatar}
                                  disabled={is3DLoading}
                                >
                                  {is3DLoading ? (
                                    <>
                                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                                      Saving...
                                    </>
                                  ) : "Save Avatar"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">About 3D Avatars</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Realistic Appearance</h4>
                          <p className="text-sm text-muted-foreground">Create avatars that look like you or your ideal self</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Full Customization</h4>
                          <p className="text-sm text-muted-foreground">Adjust facial features, hairstyles, accessories and more</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Use Everywhere</h4>
                          <p className="text-sm text-muted-foreground">Your avatar appears in chats, video calls, and across the app</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Customize;
