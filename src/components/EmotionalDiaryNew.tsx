
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
import { 
  Smile, 
  Frown, 
  Angry, 
  Heart, 
  Moon, 
  Calendar as CalendarIcon, 
  Trash2, 
  Edit, 
  Loader2,
  Save,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

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

const MOOD_EMOJIS = [
  { emoji: '😊', label: 'Happy', color: 'bg-mood-happy' },
  { emoji: '😢', label: 'Sad', color: 'bg-mood-sad' },
  { emoji: '😡', label: 'Angry', color: 'bg-mood-angry' },
  { emoji: '😍', label: 'Love', color: 'bg-mood-love' },
  { emoji: '😴', label: 'Sleepy', color: 'bg-mood-sleepy' }
];

const EmotionalDiaryNew: React.FC<EmotionalDiaryNewProps> = ({ 
  entries = [], 
  onSave = () => {},
  onDelete = () => {}
}) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus textarea when edit mode is activated
    if (isEditMode && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditMode]);

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsCalendarOpen(false);
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
      setIsEditMode(false);
      setIsDialogOpen(true);
    } else {
      resetForm();
      setIsEditMode(true);
    }
  };

  const resetForm = () => {
    setText('');
    setTitle('');
    setMoodEmoji('😊');
    setCurrentEntryId(null);
    setIsEditMode(true);
  };

  const handleNewEntry = () => {
    setDate(new Date());
    resetForm();
  };

  const handleSave = async () => {
    if (!title.trim() || !text.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and your diary entry.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      await onSave({ 
        id: currentEntryId || undefined,
        date: formattedDate, 
        text,
        title,
        moodEmoji
      });
      
      toast({
        title: "Diary entry saved!",
        description: "Your thoughts have been recorded.",
      });
      
      setIsEditMode(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving diary entry:", error);
      toast({
        title: "Failed to save",
        description: "There was an error saving your diary entry.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentEntryId) return;
    
    setIsDeleting(true);
    
    try {
      await onDelete(currentEntryId);
      
      toast({
        title: "Entry deleted",
        description: "Your diary entry has been removed.",
      });
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error deleting diary entry:", error);
      toast({
        title: "Failed to delete",
        description: "There was an error deleting your diary entry.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setText(prevText => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleMoodSelect = (emoji: string) => {
    setMoodEmoji(emoji);
  };

  // Custom tile content to mark dates with entries
  const tileClassName = useCallback(
    ({ date }: { date: Date }) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const hasEntry = entries.some(entry =>
        format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate
      );

      return hasEntry ? "has-diary-entry" : null;
    },
    [entries]
  );

  const tileContent = useCallback(
    ({ date }: { date: Date }) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const entry = entries.find(entry => 
        format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate
      );
      
      if (entry?.moodEmoji) {
        return <div className="absolute -bottom-1 right-0">{entry.moodEmoji}</div>;
      }
      return null;
    },
    [entries]
  );

  const isToday = (someDate: Date) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  };

  const renderMoodIcon = (mood: string) => {
    switch (mood) {
      case '😊': return <Smile className="h-5 w-5 text-mood-happy" />;
      case '😢': return <Frown className="h-5 w-5 text-mood-sad" />;
      case '😡': return <Angry className="h-5 w-5 text-mood-angry" />;
      case '😍': return <Heart className="h-5 w-5 text-mood-love" />;
      case '😴': return <Moon className="h-5 w-5 text-mood-sleepy" />;
      default: return <Smile className="h-5 w-5 text-mood-happy" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <motion.h1 
          className="text-3xl font-bold font-nunito bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Emotional Diary
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mt-2 font-nunito"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Track how you feel. Bloomie is here to listen.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="order-2 md:order-1 md:w-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-md border-indigo-100/50 dark:border-indigo-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-900 dark:to-indigo-950/20">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold font-nunito">New Entry</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 items-center"
                    onClick={() => setIsCalendarOpen(true)}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {isToday(date) ? "Today" : format(date, "MMM d")}
                    </span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 relative">
              {/* Bloomie's encouraging message */}
              <motion.div 
                className="absolute -top-1 right-0 flex items-center gap-2 bg-pink-50/80 dark:bg-pink-950/20 rounded-lg p-2 text-xs italic text-muted-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-bloomie-purple to-bloomie-pink flex items-center justify-center text-white text-xs">B</div>
                <p>I'm here for you. What's on your mind today?</p>
              </motion.div>
              
              <div className="space-y-6 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">How are you feeling today?</label>
                  <div className="flex justify-between gap-2">
                    {MOOD_EMOJIS.map(({ emoji, label, color }) => (
                      <motion.button
                        key={emoji}
                        className={`flex flex-1 flex-col items-center justify-center p-3 rounded-xl transition-all ${
                          moodEmoji === emoji 
                            ? `${color} shadow-md ring-2 ring-primary/30` 
                            : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                        onClick={() => handleMoodSelect(emoji)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-2xl mb-1">{emoji}</span>
                        <span className="text-xs font-medium">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2 italic">Today's mood is important. Be honest 💖</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Title</label>
                    <Input
                      ref={titleInputRef}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What would you like to call today?"
                      className="border-indigo-100 dark:border-indigo-900/30 bg-white dark:bg-slate-900/80 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-muted-foreground">Your thoughts</label>
                      <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Smile className="h-4 w-4 mr-1" />
                            <span className="text-xs">Add Emoji</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="end">
                          <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            theme={document.documentElement.classList.contains("dark") ? Theme.DARK : Theme.LIGHT}
                            width="100%"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    {/* Enhanced journal-style text area */}
                    <div className="relative">
                      <Textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="min-h-[200px] border-indigo-100 dark:border-indigo-900/30 bg-white dark:bg-slate-900/80 rounded-lg journal-paper"
                        style={{
                          backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                          lineHeight: "32px",
                          paddingTop: "8px",
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)"
                        }}
                      />
                      
                      {/* Focus animation indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-primary/40 w-0 transition-all duration-300 rounded" 
                        style={{ width: text ? '90%' : '0' }} />
                      
                      {/* Encouraging microcopy */}
                      <p className="text-xs text-center text-muted-foreground mt-2 italic flex items-center justify-center gap-1">
                        <MessageSquare className="h-3 w-3" /> 
                        No pressure. Just write what you feel 💬
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <Button variant="outline" onClick={resetForm}>Clear</Button>
              <Button 
                onClick={handleSave} 
                disabled={!title.trim() || !text.trim() || isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Entry
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div 
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-md border-indigo-100/50 dark:border-indigo-900/30 overflow-hidden bg-gradient-to-br from-white to-pink-50/10 dark:from-slate-900 dark:to-pink-950/10">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold font-nunito">My Diary Calendar</h3>
              <p className="text-sm text-muted-foreground">Click on dates to view past entries</p>
            </CardHeader>
            <CardContent>
              <div className="diary-calendar-wrapper">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  tileClassName={tileClassName}
                  tileContent={tileContent}
                  className="rounded-lg shadow-sm border-0"
                  next2Label={null}
                  prev2Label={null}
                />
              </div>
            </CardContent>
          </Card>

          {entries.length > 0 && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="shadow-md border-indigo-100/50 dark:border-indigo-900/30 overflow-hidden bg-gradient-to-br from-white to-purple-50/10 dark:from-slate-900 dark:to-purple-950/10">
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-semibold font-nunito">Recent Mood Timeline</h3>
                </CardHeader>
                <CardContent>
                  {entries.length > 0 ? (
                    <div className="p-2">
                      <motion.div
                        className="flex flex-wrap gap-3 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                      >
                        {entries.slice(0, 7).map((entry, index) => (
                          <motion.div
                            key={entry.id || index}
                            className="flex flex-col items-center cursor-pointer"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => {
                              setDate(new Date(entry.date));
                              loadEntryForDate(new Date(entry.date));
                            }}
                          >
                            <div className="text-2xl mb-1">{entry.moodEmoji}</div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(entry.date), "MMM d")}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      No entries yet. Start logging your mood!
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isCalendarOpen && (
          <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Select Date</DialogTitle>
                <DialogDescription>
                  Choose a date to view or create an entry
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Calendar
                  onChange={handleDateChange as any}
                  value={date}
                  tileClassName={tileClassName}
                  tileContent={tileContent}
                  className="mx-auto rounded-lg"
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setIsCalendarOpen(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{title || "Diary Entry"}</span>
              <Badge variant="outline">
                {format(date, 'MMMM d, yyyy')}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-center items-center">
              <div className={`text-4xl p-4 rounded-full flex items-center justify-center ${
                moodEmoji === '😊' ? 'bg-mood-happy/20' :
                moodEmoji === '😢' ? 'bg-mood-sad/20' :
                moodEmoji === '😡' ? 'bg-mood-angry/20' :
                moodEmoji === '😍' ? 'bg-mood-love/20' :
                'bg-mood-sleepy/20'
              }`}>
                {moodEmoji}
              </div>
            </div>
            
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Entry title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mood</label>
                  <div className="flex justify-between gap-2">
                    {MOOD_EMOJIS.map(({ emoji, label }) => (
                      <button
                        key={emoji}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                          moodEmoji === emoji 
                            ? 'bg-primary/10 font-semibold' 
                            : 'hover:bg-primary/5'
                        }`}
                        onClick={() => handleMoodSelect(emoji)}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span className="text-xs mt-1">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Entry</label>
                    <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Smile className="h-4 w-4 mr-2" />
                          Add Emoji
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="end">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          theme={document.documentElement.classList.contains("dark") ? Theme.DARK : Theme.LIGHT}
                          width="100%"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 p-6 rounded-lg whitespace-pre-wrap min-h-[150px] border border-muted">
                {text || <span className="text-muted-foreground italic">No content for this entry</span>}
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            {isEditMode ? (
              <>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={!title.trim() || !text.trim() || isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
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
    </div>
  );
};

export default EmotionalDiaryNew;
