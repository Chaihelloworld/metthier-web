export type BoardTaskStatus = 'todo' | 'inProgress' | 'done';

export interface IBoardTask {
  id: number;
  title: string;
  description: string;
  status: BoardTaskStatus;
  createdAt: string;
  updatedAt: string;
}
