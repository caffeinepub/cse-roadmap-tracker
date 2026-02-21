import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddMockTest } from '../hooks/useQueries';
import { toast } from 'sonner';
import { MockTest } from '../backend';

interface TestFormProps {
  open: boolean;
  onClose: () => void;
  test?: MockTest | null;
}

export default function TestForm({ open, onClose, test }: TestFormProps) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [date, setDate] = useState('');

  const addMockTest = useAddMockTest();

  useEffect(() => {
    if (test) {
      setName(test.name);
      setScore(test.score.toString());
      setDate(new Date(Number(test.date) / 1_000_000).toISOString().split('T')[0]);
    } else {
      setName('');
      setScore('');
      setDate('');
    }
  }, [test]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !score || !date) {
      toast.error('Please fill in all fields');
      return;
    }

    const scoreNum = parseInt(score);
    if (scoreNum < 0 || scoreNum > 100) {
      toast.error('Score must be between 0 and 100');
      return;
    }

    try {
      const dateTime = new Date(date).getTime() * 1_000_000;
      await addMockTest.mutateAsync({
        name,
        score: BigInt(scoreNum),
        date: BigInt(dateTime),
      });
      toast.success('Test added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add test');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{test ? 'Edit Test' : 'Add New Test'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Test Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Score (0-100) *</Label>
            <Input
              id="score"
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addMockTest.isPending}>
              {addMockTest.isPending ? 'Saving...' : test ? 'Update' : 'Add Test'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
