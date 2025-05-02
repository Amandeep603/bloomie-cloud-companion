
import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DiaryEntry {
  id?: string;
  date: string;
  text: string;
  title?: string;
  moodEmoji?: string;
}

interface DiaryCalendarProps {
  entries: DiaryEntry[];
  date: Date;
  onDateChange: (date: Date) => void;
}

const DiaryCalendar: React.FC<DiaryCalendarProps> = ({ entries, date, onDateChange }) => {
  // Custom tile content to mark dates with entries
  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const hasEntry = entries.some(entry =>
      format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate
    );

    return hasEntry ? "has-diary-entry" : null;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const entry = entries.find(entry => 
      format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate
    );
    
    if (entry?.moodEmoji) {
      return <div className="absolute -bottom-1 right-0">{entry.moodEmoji}</div>;
    }
    return null;
  };

  return (
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
              onChange={onDateChange as any}
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
    </motion.div>
  );
};

export default DiaryCalendar;
