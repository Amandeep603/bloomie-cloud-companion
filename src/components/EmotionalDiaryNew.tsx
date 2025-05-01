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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Trash2, Edit, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface EmotionalDiaryNewProps {
  entries?: DiaryEntry[];
  onSave?: (entry: DiaryEntry) => void;
  onDelete?: (entryId: string) => void;
}

const EmotionalDiaryNew: React.FC<EmotionalDiaryNewProps> = ({ 
  entries = [], 
  onSave = () => {},
  onDelete = () => {}
}) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Available moods
  const moodOptions = ['😊', '😢', '😡', '😍', '😴'];

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
      setIsEditMode(false);
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

  // Color mapping for mood emojis
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case '😊': return 'bg-mood-happy/20 border-mood-happy/30';
      case '😢': return 'bg-mood-sad/20 border-mood-sad/30';
      case '😡': return 'bg-mood-angry/20 border-mood-angry/30';
      case '😍': return 'bg-mood-love/20 border-mood-love/30';
      case '😴': return 'bg-mood-sleepy/20 border-mood-sleepy/30';
      default: return 'bg-blue-100/20 border-blue-100/30';
    }
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
            <div className="absolute -bottom-1 -right-1 text-xs">
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
      <Card className="w-full max-w-3xl border-indigo-100 dark:border-indigo-900/30 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50/70 to-blue-50/70 dark:from-indigo-950/20 dark:to-blue-950/20 pb-4 text-center">
          <h2 className="text-xl font-bold font-nunito">Emotional Diary</h2>
          <p className="text-sm text-muted-foreground font-nunito">Track your mood daily. Bloomie will help you reflect and grow.</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center space-x-3 mb-6">
            {moodOptions.map((mood) => (
              <motion.button
                key={mood}
                className={`relative rounded-full p-3 text-2xl shadow-sm border ${
                  moodEmoji === mood 
                    ? `${getMoodColor(mood)} ring-2 ring-offset-2 ring-blue-400/50` 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                } hover:scale-110 transition-all`}
                onClick={() => {
                  setMoodEmoji(mood);
                  if (isEditMode) {
                    // If already in edit mode with dialog open, just update the mood
                    return;
                  }
                  // Otherwise, start a new entry with this mood
                  resetForm();
                  setMoodEmoji(mood);
                  setDate(new Date());
                  setIsEditMode(true);
                  setIsDialogOpen(true);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {mood}
              </motion.button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-gray-100 dark:border-slate-800 shadow-sm">
              <CardContent className="p-3">
                <Calendar
                  onChange={onChange}
                  value={date}
                  className="w-full mx-auto rounded-lg shadow-sm font-nunito"
                  tileClassName={tileClassName}
                  tileContent={tileContent}
                  nextLabel="→"
                  prevLabel="←"
                  next2Label={null}
                  prev2Label={null}
                />
              </CardContent>
            </Card>
            
            <div className="flex flex-col space-y-4">
              <Card className="border-gray-100 dark:border-slate-800 shadow-sm h-full">
                <CardHeader className="py-3">
                  <h3 className="text-md font-semibold font-nunito">Start a new entry</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Today's Date:</span>
                      <Badge variant="outline" className="font-nunito">
                        {format(new Date(), 'MMMM d, yyyy')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-nunito">
                      Select a mood above or click the button below to start today's diary entry.
                    </p>
                    <Button 
                      className="w-full mt-4 font-nunito"
                      onClick={() => {
                        resetForm();
                        setDate(new Date());
                        setIsEditMode(true);
                        setIsDialogOpen(true);
                      }}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Write Today's Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-nunito">
              {isEditMode ? "Create/Edit Entry" : "View Diary Entry"} 
              <Badge variant="outline" className="ml-2 font-nunito">
                {format(date, 'MMMM d, yyyy')}
              </Badge>
            </DialogTitle>
            <DialogDescription className="font-nunito">
              {isEditMode 
                ? "Record your thoughts and feelings for this day." 
                : "This is your diary entry for the selected date."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Mood Selection in Dialog */}
            {isEditMode && (
              <div className="flex justify-center space-x-3 mb-2">
                {moodOptions.map((mood) => (
                  <motion.button
                    key={mood}
                    className={`relative rounded-full p-2 text-xl shadow-sm border ${
                      moodEmoji === mood 
                        ? `${getMoodColor(mood)} ring-2 ring-offset-1 ring-blue-400/50` 
                        : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                    } hover:scale-110 transition-all`}
                    onClick={() => setMoodEmoji(mood)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mood}
                  </motion.button>
                ))}
              </div>
            )}
            
            {/* Title input */}
            {isEditMode ? (
              <Input
                placeholder="Entry title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full font-nunito"
              />
            ) : (
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold font-nunito">{title || "Diary Entry"}</h3>
                <div className="text-2xl">{moodEmoji}</div>
              </div>
            )}
            
            {/* Entry content */}
            {isEditMode ? (
              <div>
                <Textarea
                  ref={textareaRef}
                  placeholder="Write your thoughts here..."
                  className="diary-textarea h-48 resize-none font-nunito"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            ) : (
              <div className={`${getMoodColor(moodEmoji)} p-4 rounded-md whitespace-pre-wrap min-h-[150px] font-nunito`}>
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
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-nunito">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!text.trim()} className="font-nunito">Save Entry</Button>
              </>
            ) : (
              <>
                <div>
                  {currentEntryId && (
                    <Button 
                      variant="destructive" 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="font-nunito"
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
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-nunito">
                    Close
                  </Button>
                  <Button onClick={() => setIsEditMode(true)} className="font-nunito">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmotionalDiaryNew;
