export type { Task, Project, MockTest, TimelineDay, UserProfile } from '../backend';

export interface Analytics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionPercentage: number;
  currentStreak: number;
}

export interface WeeklyData {
  day: string;
  completed: number;
}
