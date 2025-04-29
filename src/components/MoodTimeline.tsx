
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

  // Group moods by month for better organization
  const groupedByMonth: Record<string, MoodEntry[]> = {};
  
  moods.forEach(entry => {
    const monthYear = format(entry.date, 'MMM yyyy');
    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }
    groupedByMonth[monthYear].push(entry);
  });

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">My Mood Timeline</h3>
      <ScrollArea className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/30 rounded-xl shadow-inner">
        <div className="p-4">
          {Object.entries(groupedByMonth).map(([month, entries], monthIndex) => (
            <div key={month} className="mb-6 last:mb-2">
              <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{month}</div>
              <div className="flex items-center space-x-3">
                {entries.map((entry, index) => (
                  <motion.div 
                    key={`${monthIndex}-${index}`} 
                    className="flex flex-col items-center bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 p-3 rounded-xl shadow-md border border-blue-100 dark:border-slate-700 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="text-3xl mb-1">{entry.mood}</div>
                    <span className="text-xs font-medium bg-blue-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                      {format(entry.date, 'd')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MoodTimeline;
