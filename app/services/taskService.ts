import taskApi from '@/app/apis/taskApi';
import type { ITask, ICreateTaskPayload, IUpdateTaskPayload, TaskStatus } from '@/app/modules/Dashboard/models/task.model';

const fetchTasks = async () => {
  return await taskApi.getTasks();
};

const createTask = async (payload: ICreateTaskPayload): Promise<ITask> => {
  return await taskApi.createTask(payload);
};

const updateTask = async (payload: IUpdateTaskPayload) => {
  return await taskApi.updateTask(payload);
};

const updateTaskStatus = async (id: number, status: TaskStatus) => {
  await taskApi.updateTask({ id, status });
};

const deleteTask = async (id: number) => {
  await taskApi.deleteTask(id);
};

const taskService = {
  fetchTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};

export default taskService;
