import { useTimeline as useTimelineQuery } from './useQueries';
import { useMemo } from 'react';
import { groupTimelineByDate } from '../utils/dateUtils';

export function useTimeline() {
  const { data: timeline = [], isLoading } = useTimelineQuery();

  const groupedTimeline = useMemo(() => {
    return groupTimelineByDate(timeline);
  }, [timeline]);

  const toggleComplete = async (date: bigint) => {
    // This would need backend support to update timeline day completion
    console.log('Toggle complete for date:', date);
  };

  return { groupedTimeline, isLoading, toggleComplete };
}
