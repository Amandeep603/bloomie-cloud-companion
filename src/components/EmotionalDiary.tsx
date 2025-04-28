
import React, { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Smile } from "lucide-react";

interface DiaryEntry {
  date: string;
  text: string;
}

interface EmotionalDiaryProps {
  entries?: DiaryEntry[];
  onSave?: (entry: DiaryEntry) => void;
}

const EmotionalDiary: React.FC<EmotionalDiaryProps> = ({ 
  entries = [], 
  onSave = () => {} 
}) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { toast } = useToast()

  const onChange = (date: Date) => {
    setDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const existingEntry = entries.find(entry => entry.date === formattedDate);
    if (existingEntry) {
      setText(existingEntry.text);
    } else {
      setText('');
    }
  };

  const handleSave = () => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    onSave({ date: formattedDate, text });
    toast({
      title: "Diary entry saved!",
      description: "Your thoughts have been recorded.",
    })
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setText(prevText => prevText + emojiData.emoji);
  };

  // Custom tile content to mark dates with entries
  const tileClassName = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      // Only mark day tiles
      if (view !== 'month') return null;
      
      const formattedDate = format(date, 'yyyy-MM-dd');
      const hasEntry = entries.some(entry =>
        format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate
      );

      return hasEntry ? "has-diary-entry" : null;
    },
    [entries]
  );

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Emotional Diary</h2>
      <Calendar
        onChange={onChange}
        value={date}
        className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-md"
        tileClassName={tileClassName}
      />
      <div className="w-full max-w-md">
        <Textarea
          placeholder="Write your thoughts here..."
          className="diary-textarea mb-4 h-48 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between items-center mb-4">
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Add Emoji
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" side="bottom" align="start">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={document.documentElement.classList.contains("dark") ? "dark" as Theme : "light" as Theme}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleSave} className="ml-2">Save Entry</Button>
        </div>
      </div>
    </div>
  );
};

export default EmotionalDiary;
