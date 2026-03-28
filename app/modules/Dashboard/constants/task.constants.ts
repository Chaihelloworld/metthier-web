import type { TaskStatus } from '../models/task.model';

export const TaskStatusEnum = {
  TODO: 'todo' as TaskStatus,
  IN_PROGRESS: 'inProgress' as TaskStatus,
  DONE: 'done' as TaskStatus,
};

export const FilterStatusEnum = {
  ALL: 'all' as const,
  ...TaskStatusEnum,
};

export const ModalModeEnum = {
  CREATE: 'create' as const,
  UPDATE: 'update' as const,
};

export type ModalMode = (typeof ModalModeEnum)[keyof typeof ModalModeEnum];

export const TASK_STATUS_OPTIONS: Array<{ label: string; value: TaskStatus }> = [
  { label: 'To Do', value: TaskStatusEnum.TODO },
  { label: 'In Progress', value: TaskStatusEnum.IN_PROGRESS },
  { label: 'Done', value: TaskStatusEnum.DONE },
];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatusEnum.TODO]: 'To Do',
  [TaskStatusEnum.IN_PROGRESS]: 'In Progress',
  [TaskStatusEnum.DONE]: 'Done',
};

export const STATUS_FILTERS: Array<{ label: string; value: TaskStatus | 'all' }> = [
  { label: 'All', value: FilterStatusEnum.ALL },
  { label: 'To Do', value: TaskStatusEnum.TODO },
  { label: 'In Progress', value: TaskStatusEnum.IN_PROGRESS },
  { label: 'Done', value: TaskStatusEnum.DONE },
];
