import { useProfile } from '../hooks/useQueries';
import { useAnalytics } from '../hooks/useAnalytics';
import OverviewCard from '../components/OverviewCard';
import ProgressBar from '../components/ProgressBar';
import WeeklyProgressChart from '../components/WeeklyProgressChart';
import CompletionPieChart from '../components/CompletionPieChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle2, Clock, ListTodo, Flame } from 'lucide-react';

export default function Dashboard() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { analytics, isLoading: analyticsLoading, weeklyData } = useAnalytics();

  if (profileLoading || analyticsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" message="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.name || 'Student'}!</h1>
        <p className="text-muted-foreground">Here's your progress overview</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Tasks"
          value={analytics.totalTasks}
          icon={ListTodo}
          iconColor="text-blue-500"
        />
        <OverviewCard
          title="Completed Tasks"
          value={analytics.completedTasks}
          icon={CheckCircle2}
          iconColor="text-green-500"
        />
        <OverviewCard
          title="Pending Tasks"
          value={analytics.pendingTasks}
          icon={Clock}
          iconColor="text-orange-500"
        />
        <OverviewCard title="Current Streak" value={`${analytics.currentStreak} days`} icon={Flame} iconColor="text-red-500" />
      </div>

      {/* Progress Bar */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Overall Progress</h2>
        <ProgressBar percentage={analytics.completionPercentage} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Weekly Progress</h2>
          <WeeklyProgressChart data={weeklyData} />
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Task Completion</h2>
          <CompletionPieChart completedCount={analytics.completedTasks} pendingCount={analytics.pendingTasks} />
        </div>
      </div>
    </div>
  );
}
