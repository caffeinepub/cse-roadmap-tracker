import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { MockTest } from '../backend';

interface TestCardProps {
  test: MockTest;
  onEdit: () => void;
}

export default function TestCard({ test, onEdit }: TestCardProps) {
  const scorePercentage = Number(test.score);
  const scoreColor =
    scorePercentage >= 80 ? 'text-green-500' : scorePercentage >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="font-semibold">{test.name}</h3>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${scoreColor}`}>{test.score.toString()}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{formatDate(test.date)}</span>
          <Badge variant={scorePercentage >= 80 ? 'default' : 'secondary'}>
            {scorePercentage >= 80 ? 'Excellent' : scorePercentage >= 60 ? 'Good' : 'Needs Improvement'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
