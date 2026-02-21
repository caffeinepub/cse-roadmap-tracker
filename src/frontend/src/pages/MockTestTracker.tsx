import { useState } from 'react';
import { useMockTests } from '../hooks/useMockTests';
import TestCard from '../components/TestCard';
import TestForm from '../components/TestForm';
import ImprovementGraph from '../components/ImprovementGraph';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function MockTestTracker() {
  const { tests, isLoading } = useMockTests();
  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" message="Loading tests..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mock Test Tracker</h1>
          <p className="text-muted-foreground">Track your test scores and improvement</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Test
        </Button>
      </div>

      {tests.length > 0 && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Score Improvement</h2>
          <ImprovementGraph data={tests} />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tests.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">No tests recorded yet. Add your first test to track progress!</p>
          </div>
        ) : (
          tests.map((test) => (
            <TestCard
              key={test.id.toString()}
              test={test}
              onEdit={() => {
                setEditingTest(test);
                setShowForm(true);
              }}
            />
          ))
        )}
      </div>

      {showForm && (
        <TestForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingTest(null);
          }}
          test={editingTest}
        />
      )}
    </div>
  );
}
