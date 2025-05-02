
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useDiaryContext, DiaryEntry } from '../DiaryContext';
import { useToast } from "@/components/ui/use-toast";

interface UseDiaryEntriesProps {
  entries: DiaryEntry[];
  onSave?: (entry: DiaryEntry) => Promise<void>;
  onDelete?: (entryId: string) => Promise<void>;
}

export const useDiaryEntries = ({
  entries,
  onSave = async () => {},
  onDelete = async () => {},
}: UseDiaryEntriesProps) => {
  const { toast } = useToast();
  const {
    date,
    text,
    title,
    moodEmoji,
    currentEntryId,
    isDialogOpen,
    setDate,
    setText,
    setTitle,
    setMoodEmoji,
    setIsEditMode,
    setCurrentEntryId,
    setIsDialogOpen,
    setIsSaving,
    setIsDeleting,
    resetForm,
  } = useDiaryContext();

  // Load entry for selected date
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

  // Handle date change
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    loadEntryForDate(selectedDate);
  };

  // Handle save entry
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

  // Handle delete entry
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

  return {
    loadEntryForDate,
    handleDateChange,
    handleSave,
    handleDelete,
  };
};

export default useDiaryEntries;
