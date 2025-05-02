
import React from 'react';
import { format } from 'date-fns';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Smile, 
  Trash2, 
  Edit, 
  Loader2,
  Save
} from "lucide-react";
import EmojiPicker, { Theme } from 'emoji-picker-react';

interface DiaryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  title: string;
  text: string;
  moodEmoji: string;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onTitleChange: (title: string) => void;
  onTextChange: (text: string) => void;
  onMoodSelect: (emoji: string) => void;
  currentEntryId: string | null;
  onSave: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  isSaving: boolean;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (value: boolean) => void;
  onEmojiClick: (emojiData: { emoji: string }) => void;
}

const MOOD_EMOJIS = [
  { emoji: '😊', label: 'Happy', color: 'bg-mood-happy' },
  { emoji: '😢', label: 'Sad', color: 'bg-mood-sad' },
  { emoji: '😡', label: 'Angry', color: 'bg-mood-angry' },
  { emoji: '😍', label: 'Love', color: 'bg-mood-love' },
  { emoji: '😴', label: 'Sleepy', color: 'bg-mood-sleepy' }
];

const DiaryDialog: React.FC<DiaryDialogProps> = ({
  isOpen,
  onOpenChange,
  date,
  title,
  text,
  moodEmoji,
  isEditMode,
  setIsEditMode,
  onTitleChange,
  onTextChange,
  onMoodSelect,
  currentEntryId,
  onSave,
  onDelete,
  isDeleting,
  isSaving,
  showEmojiPicker,
  setShowEmojiPicker,
  onEmojiClick,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                  onChange={(e) => onTitleChange(e.target.value)}
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
                      onClick={() => onMoodSelect(emoji)}
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
                        onEmojiClick={onEmojiClick}
                        theme={document.documentElement.classList.contains("dark") ? Theme.DARK : Theme.LIGHT}
                        width="100%"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Textarea
                  value={text}
                  onChange={(e) => onTextChange(e.target.value)}
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
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={onSave} 
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
                    onClick={onDelete}
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
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
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
  );
};

export default DiaryDialog;
