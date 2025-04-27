
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export type AvatarOption = {
  id: string;
  name: string;
  url: string;
  category: "human" | "animal" | "fantasy";
};

// Array of available avatars
export const availableAvatars: AvatarOption[] = [
  {
    id: "human1",
    name: "Friendly Smile",
    url: "https://api.dicebear.com/7.x/personas/svg?seed=happy&mouth=smile&backgroundColor=b6e3f4",
    category: "human"
  },
  {
    id: "human2",
    name: "Professional",
    url: "https://api.dicebear.com/7.x/personas/svg?seed=professional&backgroundColor=d1d4f9",
    category: "human"
  },
  {
    id: "human3",
    name: "Creative",
    url: "https://api.dicebear.com/7.x/personas/svg?seed=creative&backgroundColor=c0aede",
    category: "human"
  },
  {
    id: "human4",
    name: "Thoughtful",
    url: "https://api.dicebear.com/7.x/personas/svg?seed=thoughtful&backgroundColor=ffdfbf",
    category: "human"
  },
  {
    id: "human5",
    name: "Cheerful",
    url: "https://api.dicebear.com/7.x/personas/svg?seed=cheerful&backgroundColor=ffadad",
    category: "human"
  },
  {
    id: "animal1",
    name: "Friendly Fox",
    url: "https://api.dicebear.com/7.x/thumbs/svg?seed=fox&shapeColor=orange",
    category: "animal"
  },
  {
    id: "animal2",
    name: "Cute Cat",
    url: "https://api.dicebear.com/7.x/thumbs/svg?seed=cat&shapeColor=gray",
    category: "animal"
  },
  {
    id: "animal3",
    name: "Happy Dog",
    url: "https://api.dicebear.com/7.x/thumbs/svg?seed=dog&shapeColor=brown",
    category: "animal"
  },
  {
    id: "fantasy1",
    name: "Magical",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=magic&colors=purple",
    category: "fantasy"
  },
  {
    id: "fantasy2",
    name: "Robot Friend",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=robot&colors=blue",
    category: "fantasy"
  }
];

// Update the user's avatar
export const updateUserAvatar = async (userId: string, avatarId: string): Promise<boolean> => {
  try {
    const selectedAvatar = availableAvatars.find(avatar => avatar.id === avatarId);
    
    if (!selectedAvatar) {
      throw new Error("Invalid avatar selection");
    }
    
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      avatarUrl: selectedAvatar.url
    });
    
    return true;
  } catch (error) {
    console.error("Error updating user avatar:", error);
    return false;
  }
};

// Get the user's avatar URL
export const getUserAvatar = async (userId: string): Promise<string> => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists() && docSnap.data().avatarUrl) {
      return docSnap.data().avatarUrl;
    }
    
    // Default avatar if none is set
    return availableAvatars[0].url;
  } catch (error) {
    console.error("Error getting user avatar:", error);
    return availableAvatars[0].url;
  }
};
