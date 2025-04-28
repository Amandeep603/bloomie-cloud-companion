
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
  title: string;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date | null;
};

// Add a new diary entry
export const addDiaryEntry = async (userId: string, entry: { 
  id?: string, 
  mood: string, 
  title: string, 
  content: string, 
  date: Date 
}) => {
  try {
    // Check for existing entry on this date to avoid duplicates
    const dateStr = entry.date.toISOString().split('T')[0];
    const existingQuery = query(
      collection(db, "diary"),
      where("userId", "==", userId),
      where("dateString", "==", dateStr)
    );
    
    const existingSnapshot = await getDocs(existingQuery);
    
    // If we have an ID, we're updating an existing entry
    if (entry.id) {
      await updateDoc(doc(db, "diary", entry.id), {
        mood: entry.mood,
        title: entry.title,
        content: entry.content,
        updatedAt: serverTimestamp()
      });
      return entry.id;
    } 
    // If we found an existing entry for this date, update it
    else if (!existingSnapshot.empty) {
      const existingDoc = existingSnapshot.docs[0];
      await updateDoc(doc(db, "diary", existingDoc.id), {
        mood: entry.mood,
        title: entry.title,
        content: entry.content,
        updatedAt: serverTimestamp()
      });
      return existingDoc.id;
    } 
    // No existing entry, create a new one
    else {
      const docRef = await addDoc(collection(db, "diary"), {
        userId,
        mood: entry.mood,
        title: entry.title,
        content: entry.content,
        date: entry.date,
        dateString: dateStr, // Store date as string for easier querying
        createdAt: serverTimestamp(),
        updatedAt: null
      });
      return docRef.id;
    }
  } catch (error) {
    console.error("Error adding diary entry:", error);
    throw error;
  }
};

// Update an existing diary entry
export const updateDiaryEntry = async (entryId: string, updates: { 
  mood?: string, 
  title?: string, 
  content?: string 
}) => {
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
        title: data.title || "Diary Entry",
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

// Get a diary entry by date
export const getDiaryEntryByDate = async (userId: string, date: Date): Promise<DiaryEntry | null> => {
  try {
    const dateStr = date.toISOString().split('T')[0];
    
    const entryQuery = query(
      collection(db, "diary"),
      where("userId", "==", userId),
      where("dateString", "==", dateStr)
    );
    
    const querySnapshot = await getDocs(entryQuery);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        userId: data.userId,
        mood: data.mood || "😊",
        title: data.title || "Diary Entry",
        content: data.content,
        date: (data.date as Timestamp).toDate(),
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate() : null
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting diary entry by date:", error);
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
        mood: data.mood || "😊",
        title: data.title || "Diary Entry",
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

// Get mood statistics
export const getMoodStatistics = async (userId: string, startDate: Date, endDate: Date) => {
  try {
    const diaryQuery = query(
      collection(db, "diary"),
      where("userId", "==", userId),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      orderBy("date", "asc")
    );
    
    const querySnapshot = await getDocs(diaryQuery);
    const moodCounts: Record<string, number> = {};
    const moodTrend: {date: Date, mood: string}[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const mood = data.mood;
      
      // Count moods
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      
      // Track mood trend
      moodTrend.push({
        date: (data.date as Timestamp).toDate(),
        mood: mood
      });
    });
    
    return {
      moodCounts,
      moodTrend
    };
  } catch (error) {
    console.error("Error getting mood statistics:", error);
    throw error;
  }
};
