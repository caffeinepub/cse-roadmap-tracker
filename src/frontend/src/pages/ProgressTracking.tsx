import { useProgressMetrics } from '../hooks/useProgressMetrics';
import WeeklyPerformanceTrend from '../components/WeeklyPerformanceTrend';
import ProjectStatusChart from '../components/ProjectStatusChart';
import ImprovementGraph from '../components/ImprovementGraph';
import LoadingSpinner from '../components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function ProgressTracking() {
  const { metrics, isLoading } = useProgressMetrics();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" message="Loading progress data..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
        <p className="text-muted-foreground">Comprehensive view of your learning journey</p>
      </div>

      {/* Overall Completion */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Overall Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-6xl font-bold text-primary">{metrics.overallCompletion}%</p>
            <p className="mt-2 text-muted-foreground">of all tasks completed</p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyPerformanceTrend data={metrics.weeklyTrend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectStatusChart data={metrics.projectDistribution} />
          </CardContent>
        </Card>

        {metrics.testScores.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Test Score Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <ImprovementGraph data={metrics.testScores} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Average Test Score</p>
            <p className="mt-2 text-3xl font-bold">{metrics.averageTestScore}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="mt-2 text-3xl font-bold">{metrics.activeProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Timeline Completion</p>
            <p className="mt-2 text-3xl font-bold">{metrics.timelineCompletion}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
