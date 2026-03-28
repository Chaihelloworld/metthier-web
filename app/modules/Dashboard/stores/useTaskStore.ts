import { create } from 'zustand';
import type { ITask, ICreateTaskPayload, IUpdateTaskPayload, TaskStatus } from '../models/task.model';
import taskService from '@/app/services/taskService';
import useLoaderStore from '@/app/stores/useLoaderStore';

const loader = useLoaderStore.getState();

interface TaskState {
  tasks: ITask[];
  selectedTask: ITask | null;
  filterStatus: TaskStatus | 'all';
  error: string | null;
}

interface TaskActions {
  // Action → Service → API
  fetchTasks: () => Promise<void>;
  createTask: (payload: ICreateTaskPayload) => Promise<void>;
  updateTask: (payload: IUpdateTaskPayload) => Promise<void>;
  updateTaskStatus: (id: number, status: TaskStatus) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;

  // Local state
  setSelectedTask: (task: ITask | null) => void;
  setFilterStatus: (status: TaskStatus | 'all') => void;
}

export const useTaskStore = create<TaskState & TaskActions>((set, get) => ({
  // State
  tasks: [],
  selectedTask: null,
  filterStatus: 'all',
  error: null,

  // Action → Service → API
  fetchTasks: async () => {
    loader.start();
    set({ error: null });
    try {
      const tasks = await taskService.fetchTasks();
      set({ tasks });
    } catch (e) {
      set({ error: (e as Error).message });
    } finally {
      loader.stop();
    }
  },

  createTask: async (payload) => {
    loader.start();
    set({ error: null });
    try {
      const newTask = await taskService.createTask(payload);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (e) {
      set({ error: (e as Error).message });
      throw e;
    } finally {
      loader.stop();
    }
  },

  updateTask: async (payload) => {
    loader.start();
    set({ error: null });
    try {
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === payload.id
            ? { ...t, ...payload, updatedAt: new Date().toISOString() }
            : t
        ),
      }));
      await taskService.updateTask(payload);
    } catch (e) {
      set({ error: (e as Error).message });
      throw e;
    } finally {
      loader.stop();
    }
  },

  updateTaskStatus: async (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      ),
    }));
    try {
      await taskService.updateTaskStatus(id, status);
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  deleteTask: async (id) => {
    loader.start();
    set({ error: null });
    try {
      const { selectedTask } = get();
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        selectedTask: selectedTask?.id === id ? null : selectedTask,
      }));
      await taskService.deleteTask(id);
    } catch (e) {
      set({ error: (e as Error).message });
      throw e;
    } finally {
      loader.stop();
    }
  },

  // Local state
  setSelectedTask: (task) => set({ selectedTask: task }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}));
