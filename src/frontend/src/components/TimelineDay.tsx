import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '../utils/dateUtils';

interface TimelineDayProps {
  day: {
    date: bigint;
    topics: string[];
    completed: boolean;
  };
  onToggleComplete: (date: bigint) => void;
}

export default function TimelineDay({ day, onToggleComplete }: TimelineDayProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
      <Checkbox checked={day.completed} onCheckedChange={() => onToggleComplete(day.date)} className="mt-1" />
      <div className="flex-1 space-y-2">
        <p className="font-medium">{formatDate(day.date)}</p>
        <div className="flex flex-wrap gap-2">
          {day.topics.map((topic, index) => (
            <Badge key={index} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
