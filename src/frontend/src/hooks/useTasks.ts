import { useAllTasks } from './useQueries';
import { useMemo } from 'react';

export function useTasks() {
  const { data: tasks = [], isLoading } = useAllTasks();

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // Sort by due date, then by priority
      if (a.dueDate !== b.dueDate) {
        return Number(a.dueDate - b.dueDate);
      }
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return (
        (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) -
        (priorityOrder[b.priority as keyof typeof priorityOrder] || 3)
      );
    });
  }, [tasks]);

  return { tasks: sortedTasks, isLoading };
}
