import type { BoardTaskStatus } from '../models/board.model';

export const BoardStatusEnum = {
  TODO: 'todo' as BoardTaskStatus,
  IN_PROGRESS: 'inProgress' as BoardTaskStatus,
  DONE: 'done' as BoardTaskStatus,
};

export const BoardFilterEnum = {
  ALL: 'all' as const,
  ...BoardStatusEnum,
};

export const STATUS_COLUMN_ORDER: BoardTaskStatus[] = [
  BoardStatusEnum.TODO,
  BoardStatusEnum.IN_PROGRESS,
  BoardStatusEnum.DONE,
];

export const STATUS_COLUMN_CONFIG: Record<BoardTaskStatus, { label: string; bg: string; headerBg: string; dot: string }> = {
  [BoardStatusEnum.TODO]: {
    label: 'TO DO',
    bg: 'bg-gray-100',
    headerBg: 'bg-gray-200/60',
    dot: 'bg-gray-400',
  },
  [BoardStatusEnum.IN_PROGRESS]: {
    label: 'IN PROGRESS',
    bg: 'bg-blue-50',
    headerBg: 'bg-blue-100/60',
    dot: 'bg-blue-500',
  },
  [BoardStatusEnum.DONE]: {
    label: 'DONE',
    bg: 'bg-green-50',
    headerBg: 'bg-green-100/60',
    dot: 'bg-green-500',
  },
};
