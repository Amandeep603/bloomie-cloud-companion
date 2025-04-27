
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { availableAvatars, updateUserAvatar } from "@/services/avatarService";
import { Check, Loader } from "lucide-react";

const AvatarCustomizer = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("human");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser, userProfile } = useAuth();

  // Set initial avatar from user profile
  useEffect(() => {
    if (userProfile?.avatarUrl) {
      const matchingAvatar = availableAvatars.find(
        avatar => avatar.url === userProfile.avatarUrl
      );
      if (matchingAvatar) {
        setSelectedAvatar(matchingAvatar.id);
        setActiveTab(matchingAvatar.category);
      }
    }
  }, [userProfile]);

  const handleSaveAvatar = async () => {
    if (!selectedAvatar || !currentUser) return;
    
    setIsLoading(true);
    try {
      const success = await updateUserAvatar(currentUser.uid, selectedAvatar);
      
      if (success) {
        toast({
          title: "Avatar updated",
          description: "Your new avatar has been saved successfully!",
        });
      } else {
        throw new Error("Failed to update avatar");
      }
    } catch (error) {
      console.error("Error saving avatar:", error);
      toast({
        title: "Error saving avatar",
        description: "There was a problem updating your avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Group avatars by category
  const avatarsByCategory = availableAvatars.reduce((acc, avatar) => {
    if (!acc[avatar.category]) {
      acc[avatar.category] = [];
    }
    acc[avatar.category].push(avatar);
    return acc;
  }, {} as Record<string, typeof availableAvatars>);

  return (
    <div className="p-6">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage 
              src={selectedAvatar ? availableAvatars.find(a => a.id === selectedAvatar)?.url : undefined} 
              alt="Your avatar" 
            />
            <AvatarFallback className="text-4xl">
              {userProfile?.displayName?.[0] || "B"}
            </AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-2xl font-bold mb-1">Choose Your Avatar</h2>
        <p className="text-muted-foreground">
          Select an avatar that represents you or your mood today
        </p>
      </div>

      <Tabs defaultValue="human" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="human">People</TabsTrigger>
          <TabsTrigger value="animal">Animals</TabsTrigger>
          <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
        </TabsList>
        
        {Object.entries(avatarsByCategory).map(([category, avatars]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {avatars.map(avatar => (
                <Card 
                  key={avatar.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedAvatar === avatar.id 
                      ? "ring-2 ring-primary" 
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                >
                  <CardContent className="p-4 relative flex flex-col items-center">
                    {selectedAvatar === avatar.id && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <Avatar className="h-16 w-16 mb-2">
                      <AvatarImage src={avatar.url} alt={avatar.name} />
                      <AvatarFallback>AVT</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-center font-medium">{avatar.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-10 flex justify-center">
        <Button 
          onClick={handleSaveAvatar} 
          disabled={!selectedAvatar || isLoading}
          className="px-8"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> 
              Saving...
            </>
          ) : "Save Avatar"}
        </Button>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
