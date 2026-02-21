import { useAllTasks, useAllProjects, useAllMockTests, useTimeline } from './useQueries';
import { useMemo } from 'react';

export function useProgressMetrics() {
  const { data: tasks = [] } = useAllTasks();
  const { data: projects = [] } = useAllProjects();
  const { data: tests = [] } = useAllMockTests();
  const { data: timeline = [] } = useTimeline();

  const metrics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const overallCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Weekly trend
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyTrend = days.map((day) => ({
      day,
      completed: Math.floor(Math.random() * 8), // Placeholder
    }));

    // Project distribution
    const projectDistribution = [
      { name: 'Planning', value: projects.filter((p) => p.status === 'Planning').length },
      { name: 'In Progress', value: projects.filter((p) => p.status === 'In Progress').length },
      { name: 'Completed', value: projects.filter((p) => p.status === 'Completed').length },
    ];

    // Test scores
    const testScores = tests;

    // Average test score
    const averageTestScore =
      tests.length > 0 ? Math.round(tests.reduce((sum, t) => sum + Number(t.score), 0) / tests.length) : 0;

    // Active projects
    const activeProjects = projects.filter((p) => p.status === 'In Progress').length;

    // Timeline completion
    const completedDays = timeline.filter((d) => d.completed).length;
    const timelineCompletion = timeline.length > 0 ? Math.round((completedDays / timeline.length) * 100) : 0;

    return {
      overallCompletion,
      weeklyTrend,
      projectDistribution,
      testScores,
      averageTestScore,
      activeProjects,
      timelineCompletion,
    };
  }, [tasks, projects, tests, timeline]);

  const isLoading = false;

  return { metrics, isLoading };
}
