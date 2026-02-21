import { useAllTasks } from './useQueries';
import { useMemo } from 'react';

export function useAnalytics() {
  const { data: tasks = [], isLoading } = useAllTasks();

  const analytics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate streak (simplified - count consecutive days with completed tasks)
    const currentStreak = 3; // Placeholder

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage,
      currentStreak,
    };
  }, [tasks]);

  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      completed: Math.floor(Math.random() * 10), // Placeholder - should calculate from actual task completion dates
    }));
  }, []);

  return { analytics, weeklyData, isLoading };
}
