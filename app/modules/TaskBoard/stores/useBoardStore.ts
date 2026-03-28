import { create } from 'zustand';
import type { IBoardTask, BoardTaskStatus } from '../models/board.model';
import type { ICreateTaskPayload } from '@/app/modules/Dashboard/models/task.model';
import taskService from '@/app/services/taskService';
import useLoaderStore from '@/app/stores/useLoaderStore';

const loader = useLoaderStore.getState();

interface BoardState {
  tasks: IBoardTask[];
  filterStatus: BoardTaskStatus | 'all';
  error: string | null;
}

interface BoardActions {
  fetchTasks: () => Promise<void>;
  createTask: (payload: ICreateTaskPayload) => Promise<void>;
  updateTaskStatus: (id: number, status: BoardTaskStatus) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setFilterStatus: (status: BoardTaskStatus | 'all') => void;
}

const useBoardStore = create<BoardState & BoardActions>((set) => ({
  tasks: [],
  filterStatus: 'all',
  error: null,

  fetchTasks: async () => {
    loader.start();
    set({ error: null });
    try {
      const tasks = await taskService.fetchTasks();
      set({ tasks: tasks as IBoardTask[] });
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
      set((state) => ({ tasks: [...state.tasks, newTask as IBoardTask] }));
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
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      await taskService.deleteTask(id);
    } catch (e) {
      set({ error: (e as Error).message });
      throw e;
    } finally {
      loader.stop();
    }
  },

  setFilterStatus: (status) => set({ filterStatus: status }),
}));

export default useBoardStore;
