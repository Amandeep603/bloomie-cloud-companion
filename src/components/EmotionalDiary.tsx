
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Smile, Calendar as CalendarIcon, Trash2, Edit, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface EmotionalDiaryProps {
  entries?: DiaryEntry[];
  onSave?: (entry: DiaryEntry) => void;
  onDelete?: (entryId: string) => void;
}

const EmotionalDiary: React.FC<EmotionalDiaryProps> = ({ 
  entries = [], 
  onSave = () => {},
  onDelete = () => {}
}) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus textarea when edit mode is activated
    if (isEditMode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditMode]);

  const onChange = (selectedDate: Date) => {
    setDate(selectedDate);
    loadEntryForDate(selectedDate);
  };

  const loadEntryForDate = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const existingEntry = entries.find(entry => entry.date === formattedDate);
    
    if (existingEntry) {
      setText(existingEntry.text || '');
      setTitle(existingEntry.title || '');
      setMoodEmoji(existingEntry.moodEmoji || '😊');
      setCurrentEntryId(existingEntry.id || null);
      setIsDialogOpen(true);
    } else {
      resetForm();
      setIsEditMode(true);
      setIsDialogOpen(true);
    }
  };

  const resetForm = () => {
    setText('');
    setTitle('');
    setMoodEmoji('😊');
    setCurrentEntryId(null);
    setIsEditMode(false);
  };

  const handleSave = () => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    onSave({ 
      id: currentEntryId || undefined,
      date: formattedDate, 
      text,
      title: title || 'Diary Entry',
      moodEmoji
    });
    
    toast({
      title: "Diary entry saved!",
      description: "Your thoughts have been recorded.",
    });
    
    setIsDialogOpen(false);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    if (currentEntryId) {
      setIsDeleting(true);
      onDelete(currentEntryId);
      
      setTimeout(() => {
        setIsDeleting(false);
        setIsDialogOpen(false);
        toast({
          title: "Entry deleted",
          description: "Your diary entry has been removed.",
        });
      }, 500);
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setText(prevText => prevText + emojiData.emoji);
  };

  const handleMoodEmojiClick = (emojiData: { emoji: string }) => {
    setMoodEmoji(emojiData.emoji);
    setShowMoodPicker(false);
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

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const tileContent = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      if (view !== 'month') return null;
      
      const formattedDate = format(date, 'yyyy-MM-dd');
      const entry = entries.find(entry => 
        format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate
      );
      
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {isToday(date) && (
            <div className="absolute inset-0 bg-primary/10 rounded-full" />
          )}
          {entry?.moodEmoji && (
            <div className="absolute bottom-0 right-0 text-xs">
              {entry.moodEmoji}
            </div>
          )}
        </div>
      );
    },
    [entries]
  );

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Emotional Diary</h2>
      
      <Card className="w-full max-w-md mb-6">
        <CardContent className="p-3">
          <Calendar
            onChange={onChange}
            value={date}
            className="w-full mx-auto rounded-lg shadow-sm"
            tileClassName={tileClassName}
            tileContent={tileContent}
            nextLabel="→"
            prevLabel="←"
            next2Label={null}
            prev2Label={null}
          />
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isEditMode ? "Create/Edit Entry" : "View Diary Entry"} 
              <Badge variant="outline" className="ml-2">
                {format(date, 'MMMM d, yyyy')}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Record your thoughts and feelings for this day." 
                : "This is your diary entry for the selected date."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Title input */}
            {isEditMode ? (
              <Input
                placeholder="Entry title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title || "Diary Entry"}</h3>
                <div className="text-2xl">{moodEmoji}</div>
              </div>
            )}
            
            {/* Mood emoji picker */}
            {isEditMode && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Mood:</span>
                <Popover open={showMoodPicker} onOpenChange={setShowMoodPicker}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <span className="mr-2">{moodEmoji}</span>
                      <span>Select Mood</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" side="bottom" align="start">
                    <EmojiPicker
                      onEmojiClick={handleMoodEmojiClick}
                      theme={document.documentElement.classList.contains("dark") ? "dark" as Theme : "light" as Theme}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            {/* Entry content */}
            {isEditMode ? (
              <div>
                <Textarea
                  ref={textareaRef}
                  placeholder="Write your thoughts here..."
                  className="diary-textarea h-48 resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Add Emoji
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" side="top" align="end">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme={document.documentElement.classList.contains("dark") ? "dark" as Theme : "light" as Theme}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : (
              <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap min-h-[150px]">
                {text || (
                  <span className="text-muted-foreground italic">
                    No content for this entry.
                  </span>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            {isEditMode ? (
              <>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!text.trim()}>Save Entry</Button>
              </>
            ) : (
              <>
                <div>
                  {currentEntryId && (
                    <Button 
                      variant="destructive" 
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Delete
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => setIsEditMode(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button 
        className="mt-4"
        onClick={() => {
          resetForm();
          setDate(new Date());
          setIsEditMode(true);
          setIsDialogOpen(true);
        }}
      >
        <CalendarIcon className="h-4 w-4 mr-2" />
        New Entry
      </Button>
    </div>
  );
};

export default EmotionalDiary;
