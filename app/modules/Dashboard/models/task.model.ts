export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface IUpdateTaskPayload extends Partial<ICreateTaskPayload> {
  id: number;
}
