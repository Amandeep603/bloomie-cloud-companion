
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

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
  const { toast } = useToast();

  const handleSaveEntry = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Diary entry saved",
      description: `Your mood for ${format(selectedDate!, 'MMM dd, yyyy')} has been recorded.`,
    });
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
        <CardHeader>
          <CardTitle>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Today"}'s Mood
          </CardTitle>
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
                  onClick={() => setSelectedMood(mood.label)}
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
            />
          </div>

          <Button onClick={handleSaveEntry} className="w-full">
            Save Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionalDiary;
