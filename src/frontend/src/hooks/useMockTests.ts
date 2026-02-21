import { useAllMockTests } from './useQueries';
import { useMemo } from 'react';

export function useMockTests() {
  const { data: tests = [], isLoading } = useAllMockTests();

  const sortedTests = useMemo(() => {
    return [...tests].sort((a, b) => Number(a.date - b.date));
  }, [tests]);

  return { tests: sortedTests, isLoading };
}
