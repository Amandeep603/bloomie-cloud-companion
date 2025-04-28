
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import EmotionalDiary from "@/components/EmotionalDiary";
import { useAuth } from "@/contexts/AuthContext";
import { getDiaryEntries, addDiaryEntry } from "@/services/diaryService";

interface DiaryEntry {
  date: string;
  text: string;
}

const Diary = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      if (currentUser?.uid) {
        try {
          const diaryEntries = await getDiaryEntries(currentUser.uid);
          
          // Convert the format to match the EmotionalDiary component
          const formattedEntries = diaryEntries.map(entry => ({
            date: entry.date.toISOString().split('T')[0],
            text: entry.content
          }));
          
          setEntries(formattedEntries);
        } catch (error) {
          console.error("Error fetching diary entries:", error);
        }
      }
    };

    fetchEntries();
  }, [currentUser]);

  const handleSaveEntry = async (entry: DiaryEntry) => {
    if (currentUser?.uid) {
      try {
        // Convert the entry to the format expected by the service
        await addDiaryEntry(currentUser.uid, {
          mood: "neutral", // Default mood as it's not currently captured
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
          <EmotionalDiary entries={entries} onSave={handleSaveEntry} />
        </div>
      </main>
    </div>
  );
};

export default Diary;
