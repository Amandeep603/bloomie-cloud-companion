
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { format } from 'date-fns';

export interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface DiaryContextType {
  date: Date;
  text: string;
  title: string;
  moodEmoji: string;
  isEditMode: boolean;
  currentEntryId: string | null;
  isDialogOpen: boolean;
  isCalendarOpen: boolean;
  showEmojiPicker: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  setDate: (date: Date) => void;
  setText: (text: string | ((prevText: string) => string)) => void; // Update to accept function
  setTitle: (title: string) => void;
  setMoodEmoji: (emoji: string) => void;
  setIsEditMode: (mode: boolean) => void;
  setCurrentEntryId: (id: string | null) => void;
  setIsDialogOpen: (open: boolean) => void;
  setIsCalendarOpen: (open: boolean) => void;
  setShowEmojiPicker: (show: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  setIsDeleting: (deleting: boolean) => void;
  resetForm: () => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const useDiaryContext = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiaryContext must be used within a DiaryProvider');
  }
  return context;
};

interface DiaryProviderProps {
  children: ReactNode;
}

export const DiaryProvider: React.FC<DiaryProviderProps> = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const [isEditMode, setIsEditMode] = useState(true);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const resetForm = () => {
    setText('');
    setTitle('');
    setMoodEmoji('😊');
    setCurrentEntryId(null);
    setIsEditMode(true);
  };

  const value = {
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
    setCurrentEntryId,
    setIsDialogOpen,
    setIsCalendarOpen,
    setShowEmojiPicker,
    setIsSaving,
    setIsDeleting,
    resetForm,
  };

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>;
};

export default DiaryProvider;
