import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Completion</span>
        <span className="font-semibold">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
