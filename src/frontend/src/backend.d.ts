import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Task {
    id: bigint;
    title: string;
    completed: boolean;
    dueDate: Time;
    description: string;
    priority: string;
}
export interface MockTest {
    id: bigint;
    date: Time;
    name: string;
    score: bigint;
}
export type Time = bigint;
export interface Project {
    id: bigint;
    status: string;
    githubLink: string;
    name: string;
    techStack: Array<string>;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface TimelineDay {
    date: Time;
    completed: boolean;
    topics: Array<string>;
}
export interface backendInterface {
    addMockTest(name: string, score: bigint, date: Time): Promise<MockTest>;
    addProject(name: string, githubLink: string, techStack: Array<string>): Promise<Project>;
    addTimelineDay(date: Time, topics: Array<string>): Promise<TimelineDay>;
    createTask(title: string, description: string, dueDate: Time, priority: string): Promise<Task>;
    deleteTask(id: bigint): Promise<void>;
    getAllMockTests(): Promise<Array<MockTest>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllTasks(): Promise<Array<Task>>;
    getProfile(): Promise<UserProfile>;
    getTimeline(): Promise<Array<TimelineDay>>;
    markTaskComplete(id: bigint): Promise<void>;
    updateTask(id: bigint, title: string, description: string, dueDate: Time, priority: string): Promise<Task>;
}
