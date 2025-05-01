
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import EmotionalDiaryNew from "@/components/EmotionalDiaryNew";
import MoodTimeline from "@/components/MoodTimeline";
import { useAuth } from "@/contexts/AuthContext";
import { getDiaryEntries, addDiaryEntry, deleteDiaryEntry } from "@/services/diaryService";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface MoodEntry {
  date: Date;
  mood: string;
}

const Diary = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEntries = async () => {
      if (currentUser?.uid) {
        try {
          setIsLoading(true);
          const diaryEntries = await getDiaryEntries(currentUser.uid);
          
          // Convert the format to match the EmotionalDiary component
          const formattedEntries = diaryEntries.map(entry => ({
            id: entry.id,
            date: entry.date.toISOString().split('T')[0],
            text: entry.content,
            title: entry.title || "Diary Entry",
            moodEmoji: entry.mood || "😊"
          }));
          
          setEntries(formattedEntries);
          
          // Extract mood data for timeline
          const moodData = diaryEntries
            .map(entry => ({
              date: entry.date,
              mood: entry.mood || "😊"
            }))
            .sort((a, b) => a.date.getTime() - b.date.getTime());
            
          setMoodEntries(moodData);
        } catch (error) {
          console.error("Error fetching diary entries:", error);
          toast({
            title: "Error loading diary",
            description: "Could not load your diary entries. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEntries();
  }, [currentUser, toast]);

  const handleSaveEntry = async (entry: DiaryEntry) => {
    if (currentUser?.uid) {
      try {
        // Convert the entry to the format expected by the service
        const savedEntryId = await addDiaryEntry(currentUser.uid, {
          id: entry.id,
          mood: entry.moodEmoji || "😊",
          title: entry.title || "Diary Entry",
          content: entry.text,
          date: new Date(entry.date)
        });
        
        // Update local state with the new entry
        setEntries(prevEntries => {
          // Check if we're updating an existing entry
          const existingEntryIndex = prevEntries.findIndex(e => e.id === entry.id);
          if (existingEntryIndex !== -1) {
            const updatedEntries = [...prevEntries];
            updatedEntries[existingEntryIndex] = entry;
            return updatedEntries;
          } else {
            // It's a new entry, add with the returned ID
            const newEntry = {
              ...entry,
              id: savedEntryId
            };
            return [...prevEntries, newEntry];
          }
        });
        
        // Update mood timeline
        setMoodEntries(prev => {
          const newMoodEntry = {
            date: new Date(entry.date),
            mood: entry.moodEmoji || "😊"
          };
          
          // Check if we already have an entry for this date
          const existingIndex = prev.findIndex(
            m => m.date.toISOString().split('T')[0] === entry.date
          );
          
          if (existingIndex !== -1) {
            const updatedMoods = [...prev];
            updatedMoods[existingIndex] = newMoodEntry;
            return updatedMoods;
          } else {
            return [...prev, newMoodEntry].sort((a, b) => a.date.getTime() - b.date.getTime());
          }
        });
      } catch (error) {
        console.error("Error saving diary entry:", error);
        toast({
          title: "Error saving entry",
          description: "Could not save your diary entry. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (currentUser?.uid && entryId) {
      try {
        await deleteDiaryEntry(entryId);
        
        // Get the entry date before removing from state
        const entryToDelete = entries.find(entry => entry.id === entryId);
        
        // Update local state by removing the deleted entry
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
        
        // Also remove from mood timeline if it was the only entry for that date
        if (entryToDelete) {
          const entryDate = entryToDelete.date;
          setMoodEntries(prev => 
            prev.filter(mood => mood.date.toISOString().split('T')[0] !== entryDate)
          );
        }
      } catch (error) {
        console.error("Error deleting diary entry:", error);
        toast({
          title: "Error deleting entry",
          description: "Could not delete your diary entry. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-16 px-4 bg-gradient-to-br from-indigo-50/30 to-blue-50/30 dark:from-slate-900/30 dark:to-slate-800/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <div className="h-64 flex flex-col items-center justify-center">
                <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground font-nunito">Loading your diary entries...</p>
              </div>
            ) : (
              <EmotionalDiaryNew
                entries={entries} 
                onSave={handleSaveEntry} 
                onDelete={handleDeleteEntry}
              />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Diary;
