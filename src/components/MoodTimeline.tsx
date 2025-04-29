
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import { motion } from "framer-motion";

interface MoodEntry {
  date: Date;
  mood: string;
}

interface MoodTimelineProps {
  moods: MoodEntry[];
}

const MoodTimeline: React.FC<MoodTimelineProps> = ({ moods }) => {
  if (moods.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">No mood entries yet. Start adding diary entries to track your moods!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">My Mood Timeline</h3>
      <ScrollArea className="h-28 bg-muted/20 rounded-lg">
        <div className="flex items-center space-x-4 p-4">
          {moods.map((entry, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center min-w-[60px] bg-background p-2 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl">{entry.mood}</div>
              <span className="text-xs text-muted-foreground mt-1">
                {format(entry.date, 'MMM d')}
              </span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MoodTimeline;
