import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function DailyPlanner() {
  const { tasks, isLoading } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [filters, setFilters] = useState({ priority: '', dateRange: null });

  const filteredTasks = tasks.filter((task) => {
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" message="Loading tasks..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Planner</h1>
          <p className="text-muted-foreground">Manage your tasks and stay organized</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TaskFilters filters={filters} onFiltersChange={setFilters} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">No tasks yet. Create your first task to get started!</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id.toString()}
              task={task}
              onEdit={() => {
                setEditingTask(task);
                setShowForm(true);
              }}
            />
          ))
        )}
      </div>

      {showForm && (
        <TaskForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          task={editingTask}
        />
      )}
    </div>
  );
}
