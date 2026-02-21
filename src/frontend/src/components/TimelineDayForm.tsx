import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddTimelineDay } from '../hooks/useQueries';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TimelineDayFormProps {
  open: boolean;
  onClose: () => void;
}

export default function TimelineDayForm({ open, onClose }: TimelineDayFormProps) {
  const [date, setDate] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const addTimelineDay = useAddTimelineDay();

  const handleAddTopic = () => {
    if (topicInput.trim()) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput('');
    }
  };

  const handleRemoveTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || topics.length === 0) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const dateTime = new Date(date).getTime() * 1_000_000; // Convert to nanoseconds
      await addTimelineDay.mutateAsync({ date: BigInt(dateTime), topics });
      toast.success('Timeline day added successfully');
      onClose();
      setDate('');
      setTopics([]);
    } catch (error) {
      toast.error('Failed to add timeline day');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Timeline Day</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topics</Label>
            <div className="flex gap-2">
              <Input
                id="topic"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Enter a topic"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTopic}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {topic}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTopic(index)} />
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addTimelineDay.isPending}>
              {addTimelineDay.isPending ? 'Adding...' : 'Add Day'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
