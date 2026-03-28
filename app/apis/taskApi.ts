import axios from 'axios';
import type { ITask, ICreateTaskPayload, IUpdateTaskPayload } from '@/app/modules/Dashboard/models/task.model';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

const getTasks = async () => {
  const { data } = await api.get<ITask[]>('/tasks');
  return data;
};

const createTask = async (payload: ICreateTaskPayload) => {
  const { data } = await api.post<ITask>('/tasks', payload);
  return data;
};

const updateTask = async ({ id, ...payload }: IUpdateTaskPayload) => {
  const { data } = await api.patch<ITask>(`/tasks/${id}`, payload);
  return data;
};

const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};

const taskApi = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskApi;
