import { useAllProjects } from './useQueries';
import { useMemo } from 'react';

export function useProjects() {
  const { data: projects = [], isLoading } = useAllProjects();

  const projectsByStatus = useMemo(() => {
    return {
      Planning: projects.filter((p) => p.status === 'Planning'),
      'In Progress': projects.filter((p) => p.status === 'In Progress'),
      Completed: projects.filter((p) => p.status === 'Completed'),
    };
  }, [projects]);

  return { projectsByStatus, isLoading };
}
