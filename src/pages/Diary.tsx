
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import EmotionalDiary from "@/components/EmotionalDiary";
import { useAuth } from "@/contexts/AuthContext";
import { getDiaryEntries, addDiaryEntry, deleteDiaryEntry } from "@/services/diaryService";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

const Diary = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
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
        await addDiaryEntry(currentUser.uid, {
          id: entry.id,
          mood: entry.moodEmoji || "😊",
          title: entry.title || "Diary Entry",
          content: entry.text,
          date: new Date(entry.date)
        });
        
        // Update local state with the new entry
        setEntries(prevEntries => {
          // Replace entry if it exists for this date, otherwise add it
          const existingEntryIndex = prevEntries.findIndex(e => e.date === entry.date);
          if (existingEntryIndex !== -1) {
            const updatedEntries = [...prevEntries];
            updatedEntries[existingEntryIndex] = entry;
            return updatedEntries;
          } else {
            return [...prevEntries, entry];
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
    if (currentUser?.uid) {
      try {
        await deleteDiaryEntry(entryId);
        
        // Update local state by removing the deleted entry
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
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
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Emotional Diary</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Track your moods and feelings over time. Bloomie will help you identify patterns and provide insights to improve your emotional wellbeing.
          </p>
          
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading your diary entries...</p>
            </div>
          ) : (
            <EmotionalDiary 
              entries={entries} 
              onSave={handleSaveEntry} 
              onDelete={handleDeleteEntry}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Diary;
