import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Task, Project, MockTest, TimelineDay, UserProfile } from '../backend';

// Profile Queries
export function useProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

// Task Queries
export function useAllTasks() {
  const { actor, isFetching } = useActor();

  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; description: string; dueDate: bigint; priority: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createTask(data.title, data.description, data.dueDate, data.priority);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      description: string;
      dueDate: bigint;
      priority: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateTask(data.id, data.title, data.description, data.dueDate, data.priority);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useDeleteTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useMarkTaskComplete() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.markTaskComplete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Project Queries
export function useAllProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; githubLink: string; techStack: string[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addProject(data.name, data.githubLink, data.techStack);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Mock Test Queries
export function useAllMockTests() {
  const { actor, isFetching } = useActor();

  return useQuery<MockTest[]>({
    queryKey: ['mockTests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMockTests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMockTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; score: bigint; date: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addMockTest(data.name, data.score, data.date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mockTests'] });
    },
  });
}

// Timeline Queries
export function useTimeline() {
  const { actor, isFetching } = useActor();

  return useQuery<TimelineDay[]>({
    queryKey: ['timeline'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTimeline();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTimelineDay() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { date: bigint; topics: string[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addTimelineDay(data.date, data.topics);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
  });
}
