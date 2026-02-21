import { useTimeline } from '../hooks/useTimeline';
import TimelineAccordion from '../components/TimelineAccordion';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import TimelineDayForm from '../components/TimelineDayForm';

export default function Timeline() {
  const { groupedTimeline, isLoading, toggleComplete } = useTimeline();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" message="Loading timeline..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground">Track your daily learning progress</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Day
        </Button>
      </div>

      <TimelineAccordion data={groupedTimeline} onToggleComplete={toggleComplete} />

      {showForm && <TimelineDayForm open={showForm} onClose={() => setShowForm(false)} />}
    </div>
  );
}
