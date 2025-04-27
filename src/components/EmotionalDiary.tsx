
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { addDiaryEntry, getDiaryEntries, updateDiaryEntry, deleteDiaryEntry, DiaryEntry } from "@/services/diaryService";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Edit, Save, Loader } from "lucide-react";

const moodOptions = [
  { icon: "😀", label: "Happy", color: "bg-green-100 dark:bg-green-900/30" },
  { icon: "😌", label: "Calm", color: "bg-blue-100 dark:bg-blue-900/30" },
  { icon: "😐", label: "Neutral", color: "bg-gray-100 dark:bg-gray-800" },
  { icon: "😔", label: "Sad", color: "bg-indigo-100 dark:bg-indigo-900/30" },
  { icon: "😠", label: "Angry", color: "bg-red-100 dark:bg-red-900/30" },
];

const EmotionalDiary = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [diaryEntry, setDiaryEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Load diary entries when user is authenticated
  useEffect(() => {
    const loadEntries = async () => {
      if (!currentUser) return;
      
      try {
        setIsLoading(true);
        const userEntries = await getDiaryEntries(currentUser.uid);
        setEntries(userEntries);
      } catch (error) {
        console.error("Error loading diary entries:", error);
        toast({
          title: "Error loading entries",
          description: "Could not load your diary entries. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEntries();
  }, [currentUser, toast]);

  // Check if entry exists for selected date
  useEffect(() => {
    if (!selectedDate || !entries.length) return;
    
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const existingEntry = entries.find(entry => 
      format(entry.date, "yyyy-MM-dd") === dateStr
    );
    
    if (existingEntry) {
      setSelectedMood(existingEntry.mood);
      setDiaryEntry(existingEntry.content);
      setCurrentEntryId(existingEntry.id);
    } else {
      setSelectedMood(null);
      setDiaryEntry("");
      setCurrentEntryId(null);
    }
    setIsEditing(false);
  }, [selectedDate, entries]);

  const handleSaveEntry = async () => {
    if (!currentUser || !selectedDate) return;
    
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (currentEntryId && !isEditing) {
        // If we're viewing an existing entry and not in edit mode
        setIsEditing(true);
        return;
      }
      
      if (currentEntryId && isEditing) {
        // Update existing entry
        await updateDiaryEntry(currentEntryId, {
          mood: selectedMood,
          content: diaryEntry
        });
        
        // Update local entries
        setEntries(prev => prev.map(entry => 
          entry.id === currentEntryId 
            ? { ...entry, mood: selectedMood, content: diaryEntry, updatedAt: new Date() }
            : entry
        ));
        
        toast({
          title: "Diary entry updated",
          description: `Your entry for ${format(selectedDate, 'MMM dd, yyyy')} has been updated.`,
        });
      } else {
        // Create new entry
        const entryId = await addDiaryEntry(currentUser.uid, {
          mood: selectedMood,
          content: diaryEntry,
          date: selectedDate
        });
        
        // Add to local entries
        const newEntry: DiaryEntry = {
          id: entryId,
          userId: currentUser.uid,
          mood: selectedMood,
          content: diaryEntry,
          date: selectedDate,
          createdAt: new Date(),
          updatedAt: null
        };
        
        setEntries(prev => [...prev, newEntry]);
        setCurrentEntryId(entryId);
        
        toast({
          title: "Diary entry saved",
          description: `Your entry for ${format(selectedDate, 'MMM dd, yyyy')} has been recorded.`,
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving diary entry:", error);
      toast({
        title: "Error saving entry",
        description: "Could not save your diary entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEntry = async () => {
    if (!currentEntryId) return;
    
    try {
      setIsLoading(true);
      await deleteDiaryEntry(currentEntryId);
      
      // Remove from local entries
      setEntries(prev => prev.filter(entry => entry.id !== currentEntryId));
      
      // Reset form
      setSelectedMood(null);
      setDiaryEntry("");
      setCurrentEntryId(null);
      
      toast({
        title: "Diary entry deleted",
        description: `Your entry for ${format(selectedDate!, 'MMM dd, yyyy')} has been deleted.`,
      });
    } catch (error) {
      console.error("Error deleting diary entry:", error);
      toast({
        title: "Error deleting entry",
        description: "Could not delete your diary entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Today"}'s Mood
          </CardTitle>
          {currentEntryId && !isEditing && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete diary entry?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This entry will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteEntry} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">How are you feeling?</h3>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${mood.color} ${
                    selectedMood === mood.label
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:ring-1 hover:ring-primary/50"
                  }`}
                  onClick={() => !isLoading && (isEditing || !currentEntryId) && setSelectedMood(mood.label)}
                  disabled={isLoading || (!isEditing && currentEntryId !== null)}
                >
                  <span className="text-2xl mb-1">{mood.icon}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Write about your day</h3>
            <Textarea
              placeholder="What happened today? How did it make you feel?"
              className="min-h-[150px]"
              value={diaryEntry}
              onChange={(e) => setDiaryEntry(e.target.value)}
              disabled={isLoading || (!isEditing && currentEntryId !== null)}
            />
          </div>

          <Button 
            onClick={handleSaveEntry} 
            className="w-full"
            disabled={isLoading || (!selectedMood && !currentEntryId)}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {currentEntryId ? "Updating..." : "Saving..."}
              </>
            ) : currentEntryId && !isEditing ? (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Entry
              </>
            ) : currentEntryId && isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              "Save Entry"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionalDiary;
