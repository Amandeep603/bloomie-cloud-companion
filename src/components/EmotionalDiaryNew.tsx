
import React, { useRef, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Import refactored components
import DiaryEntry from './diary/DiaryEntry';
import DiaryCalendar from './diary/DiaryCalendar';
import MoodTimeline from './diary/MoodTimeline';
import DiaryDialog from './diary/DiaryDialog';
import CalendarDialog from './diary/CalendarDialog';
import { DiaryProvider, useDiaryContext } from './diary/DiaryContext';
import { useDiaryEntries } from './diary/hooks/useDiaryEntries';

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface EmotionalDiaryNewProps {
  entries?: DiaryEntry[];
  onSave?: (entry: DiaryEntry) => Promise<void>; // Change to Promise<void>
  onDelete?: (entryId: string) => Promise<void>; // Change to Promise<void>
}

// Main component that wraps everything in the DiaryProvider
const EmotionalDiaryNew: React.FC<EmotionalDiaryNewProps> = ({ 
  entries = [], 
  onSave = async () => {}, // Add async to make it return a Promise
  onDelete = async () => {} // Add async to make it return a Promise
}) => {
  return (
    <DiaryProvider>
      <EmotionalDiaryContent 
        entries={entries} 
        onSave={onSave} 
        onDelete={onDelete} 
      />
    </DiaryProvider>
  );
};

// Content component that uses the DiaryContext
const EmotionalDiaryContent: React.FC<EmotionalDiaryNewProps> = ({ 
  entries = [], 
  onSave = async () => {}, // Add async to make it return a Promise
  onDelete = async () => {} // Add async to make it return a Promise
}) => {
  const {
    date,
    text,
    title,
    moodEmoji,
    isEditMode,
    currentEntryId,
    isDialogOpen,
    isCalendarOpen,
    showEmojiPicker,
    isSaving,
    isDeleting,
    setDate,
    setText,
    setTitle,
    setMoodEmoji,
    setIsEditMode,
    setIsDialogOpen,
    setIsCalendarOpen,
    setShowEmojiPicker,
    resetForm
  } = useDiaryContext();

  const titleInputRef = useRef<HTMLInputElement>(null);

  const { 
    loadEntryForDate,
    handleDateChange,
    handleSave,
    handleDelete,
  } = useDiaryEntries({
    entries,
    onSave,
    onDelete
  });

  // Focus textarea when edit mode is activated
  useEffect(() => {
    if (isEditMode && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditMode]);

  const handleNewEntry = () => {
    setDate(new Date());
    resetForm();
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setText((prevText) => prevText + emojiData.emoji); // Fix by using functional update
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

  return (
    <div className="max-w-6xl mx-auto p-4">
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

      {/* Main diary layout - side by side on desktop, stacked on mobile */}
      <div className="grid md:grid-cols-10 gap-6">
        {/* Calendar section - 40% width on desktop */}
        <motion.div 
          className="md:col-span-4 order-2 md:order-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DiaryCalendar 
            entries={entries} 
            date={date} 
            onDateChange={handleDateChange} 
          />
        </motion.div>

        {/* Entry section - 60% width on desktop */}
        <motion.div 
          className="md:col-span-6 order-1 md:order-2"
          initial={{ opacity: 0, x: 20 }}
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
              
              <DiaryEntry 
                title={title}
                text={text}
                moodEmoji={moodEmoji}
                onTextChange={setText}
                onTitleChange={setTitle}
                onMoodSelect={handleMoodSelect}
                onEmojiClick={handleEmojiClick}
                isSaving={isSaving}
                onSave={handleSave}
                onClear={resetForm}
              />
            </CardContent>
          </Card>
        </motion.div>

        {entries.length > 0 && (
          <MoodTimeline 
            entries={entries} 
            onEntryClick={(date) => {
              setDate(date);
              loadEntryForDate(date);
            }} 
          />
        )}
      </div>

      <AnimatePresence>
        {isCalendarOpen && (
          <CalendarDialog 
            isOpen={isCalendarOpen}
            onOpenChange={setIsCalendarOpen}
            date={date}
            onDateChange={handleDateChange}
            tileClassName={tileClassName}
            tileContent={tileContent}
          />
        )}
      </AnimatePresence>

      <DiaryDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        date={date}
        title={title}
        text={text}
        moodEmoji={moodEmoji}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onTitleChange={setTitle}
        onTextChange={setText}
        onMoodSelect={handleMoodSelect}
        currentEntryId={currentEntryId}
        onSave={handleSave}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        isSaving={isSaving}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
};

export default EmotionalDiaryNew;
