
import React from 'react';
import Calendar from 'react-calendar';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CalendarDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  onDateChange: (date: Date) => void;
  tileClassName: ({ date }: { date: Date }) => string | null;
  tileContent: ({ date }: { date: Date }) => React.ReactNode;
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  isOpen,
  onOpenChange,
  date,
  onDateChange,
  tileClassName,
  tileContent
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Date</DialogTitle>
          <DialogDescription>
            Choose a date to view or create an entry
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Calendar
            onChange={onDateChange as any}
            value={date}
            tileClassName={tileClassName}
            tileContent={tileContent}
            className="mx-auto rounded-lg"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
