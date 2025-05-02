
import React from 'react';
import { format } from 'date-fns';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface MoodTimelineProps {
  entries: DiaryEntry[];
  onEntryClick: (date: Date) => void;
}

const MoodTimeline: React.FC<MoodTimelineProps> = ({ entries, onEntryClick }) => {
  if (!entries || entries.length === 0) return null;

  return (
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
                  onClick={() => onEntryClick(new Date(entry.date))}
                >
                  <div className="text-2xl mb-1">{entry.moodEmoji}</div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(entry.date), "MMM d")}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MoodTimeline;
