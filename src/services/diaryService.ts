
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  doc,
  updateDoc,
  deleteDoc,
  query, 
  where, 
  orderBy, 
  getDocs,
  getDoc,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";

export type DiaryEntry = {
  id: string;
  userId: string;
  mood: string;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date | null;
};

// Add a new diary entry
export const addDiaryEntry = async (userId: string, entry: { mood: string, content: string, date: Date }) => {
  try {
    const docRef = await addDoc(collection(db, "diary"), {
      userId,
      mood: entry.mood,
      content: entry.content,
      date: entry.date,
      createdAt: serverTimestamp(),
      updatedAt: null
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding diary entry:", error);
    throw error;
  }
};

// Update an existing diary entry
export const updateDiaryEntry = async (entryId: string, updates: { mood?: string, content?: string }) => {
  try {
    const entryRef = doc(db, "diary", entryId);
    
    const updatedData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(entryRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating diary entry:", error);
    throw error;
  }
};

// Delete a diary entry
export const deleteDiaryEntry = async (entryId: string) => {
  try {
    await deleteDoc(doc(db, "diary", entryId));
    return true;
  } catch (error) {
    console.error("Error deleting diary entry:", error);
    throw error;
  }
};

// Get a single diary entry
export const getDiaryEntry = async (entryId: string): Promise<DiaryEntry | null> => {
  try {
    const docRef = doc(db, "diary", entryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId,
        mood: data.mood,
        content: data.content,
        date: (data.date as Timestamp).toDate(),
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate() : null
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting diary entry:", error);
    throw error;
  }
};

// Get all diary entries for a user
export const getDiaryEntries = async (userId: string): Promise<DiaryEntry[]> => {
  try {
    const diaryQuery = query(
      collection(db, "diary"),
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    
    const querySnapshot = await getDocs(diaryQuery);
    const entries: DiaryEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        userId: data.userId,
        mood: data.mood,
        content: data.content,
        date: (data.date as Timestamp).toDate(),
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate() : null
      });
    });
    
    return entries;
  } catch (error) {
    console.error("Error getting diary entries:", error);
    throw error;
  }
};
