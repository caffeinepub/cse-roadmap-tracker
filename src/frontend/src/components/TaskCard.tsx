import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { useMarkTaskComplete, useDeleteTask } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Task } from '../backend';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const markComplete = useMarkTaskComplete();
  const deleteTask = useDeleteTask();

  const handleToggleComplete = async () => {
    try {
      await markComplete.mutateAsync(task.id);
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(task.id);
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const priorityColors = {
    High: 'bg-red-500/10 text-red-500 border-red-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Low: 'bg-green-500/10 text-green-500 border-green-500/20',
  };

  return (
    <Card className={cn('transition-all hover:shadow-md', task.completed && 'opacity-60')}>
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} className="mt-1" />
            <div className="flex-1">
              <h3 className={cn('font-semibold', task.completed && 'line-through')}>{task.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={priorityColors[task.priority as keyof typeof priorityColors] || ''}>{task.priority}</Badge>
          <span className="text-xs text-muted-foreground">{formatDate(task.dueDate)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t p-3">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete} disabled={deleteTask.isPending}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
