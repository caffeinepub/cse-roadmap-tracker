import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TimelineDay from './TimelineDay';
import { Badge } from '@/components/ui/badge';

interface TimelineData {
  [month: string]: {
    [week: string]: Array<{
      date: bigint;
      topics: string[];
      completed: boolean;
    }>;
  };
}

interface TimelineAccordionProps {
  data: TimelineData;
  onToggleComplete: (date: bigint) => void;
}

export default function TimelineAccordion({ data, onToggleComplete }: TimelineAccordionProps) {
  const months = Object.keys(data);

  if (months.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No timeline entries yet. Add your first day to get started!</p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="space-y-4">
      {months.map((month) => {
        const weeks = Object.keys(data[month]);
        const monthCompleted = weeks.every((week) => data[month][week].every((day) => day.completed));

        return (
          <AccordionItem key={month} value={month} className="rounded-lg border bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">{month}</span>
                {monthCompleted && <Badge variant="default">Completed</Badge>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <Accordion type="multiple" className="space-y-2">
                {weeks.map((week) => {
                  const days = data[month][week];
                  const weekCompleted = days.every((day) => day.completed);

                  return (
                    <AccordionItem key={week} value={week} className="rounded border">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{week}</span>
                          {weekCompleted && <Badge variant="secondary">Done</Badge>}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-2">
                        <div className="space-y-2">
                          {days.map((day) => (
                            <TimelineDay key={day.date.toString()} day={day} onToggleComplete={onToggleComplete} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
