
import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Smile, Loader2, Save } from "lucide-react";

interface DiaryEntryProps {
  title: string;
  text: string;
  moodEmoji: string;
  onTextChange: (text: string) => void;
  onTitleChange: (title: string) => void;
  onMoodSelect: (emoji: string) => void;
  onEmojiClick: (emojiData: { emoji: string }) => void;
  isSaving: boolean;
  onSave: () => void;
  onClear: () => void;
}

const MOOD_EMOJIS = [
  { emoji: '😊', label: 'Happy', color: 'bg-mood-happy' },
  { emoji: '😢', label: 'Sad', color: 'bg-mood-sad' },
  { emoji: '😡', label: 'Angry', color: 'bg-mood-angry' },
  { emoji: '😍', label: 'Love', color: 'bg-mood-love' },
  { emoji: '😴', label: 'Sleepy', color: 'bg-mood-sleepy' }
];

const DiaryEntry: React.FC<DiaryEntryProps> = ({
  title,
  text,
  moodEmoji,
  onTextChange,
  onTitleChange,
  onMoodSelect,
  onEmojiClick,
  isSaving,
  onSave,
  onClear
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleEmojiPickerToggle = (open: boolean) => {
    setShowEmojiPicker(open);
  };

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    onEmojiClick(emojiData);
    setShowEmojiPicker(false);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-center text-muted-foreground italic mb-4 font-nunito">
        How are you feeling today? Bloomie is listening.
      </p>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-muted-foreground">How are you feeling today?</label>
        <div className="flex justify-between gap-2 mb-4">
          {MOOD_EMOJIS.map(({ emoji, label, color }) => (
            <button
              key={emoji}
              className={`flex flex-1 flex-col items-center justify-center p-3 rounded-xl transition-all ${
                moodEmoji === emoji 
                  ? `${color} shadow-md ring-2 ring-primary/30` 
                  : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800'
              }`}
              onClick={() => onMoodSelect(emoji)}
            >
              <span className="text-2xl mb-1">{emoji}</span>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">Title</label>
          <Input
            ref={titleInputRef}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="What would you like to call today?"
            className="border-indigo-100 dark:border-indigo-900/30 bg-white dark:bg-slate-900/80 rounded-lg shadow-sm"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-muted-foreground">Your thoughts</label>
            <Popover open={showEmojiPicker} onOpenChange={handleEmojiPickerToggle}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Smile className="h-4 w-4 mr-1" />
                  <span className="text-xs">Add Emoji</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="end">
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  theme={document.documentElement.classList.contains("dark") ? Theme.DARK : Theme.LIGHT}
                  width="100%"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Enhanced soft card-style writing area */}
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Write how you feel today..."
              className="min-h-[200px] bg-white dark:bg-slate-900/80 rounded-lg shadow-md border-indigo-100/50 dark:border-indigo-900/20 p-4 font-nunito transition-all hover:shadow-lg focus:shadow-lg"
              style={{
                boxShadow: "0 3px 8px rgba(0,0,0,0.05)"
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onClear}>Clear</Button>
        <Button 
          onClick={onSave} 
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
      </div>
    </div>
  );
};

export default DiaryEntry;
