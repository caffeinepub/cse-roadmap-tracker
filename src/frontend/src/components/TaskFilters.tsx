import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TaskFiltersProps {
  filters: {
    priority: string;
    dateRange: any;
  };
  onFiltersChange: (filters: any) => void;
}

export default function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border bg-card p-4">
      <div className="flex-1 space-y-2">
        <Label>Priority</Label>
        <Select
          value={filters.priority}
          onValueChange={(value) => onFiltersChange({ ...filters, priority: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
