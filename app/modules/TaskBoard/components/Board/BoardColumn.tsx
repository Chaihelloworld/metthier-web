'use client';

import { memo, type FC } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { IBoardTask, BoardTaskStatus } from '../../models/board.model';
import { STATUS_COLUMN_CONFIG } from '../../constants/board.constants';
import BoardCard from './BoardCard';

interface IProps {
  status: BoardTaskStatus;
  tasks: IBoardTask[];
  onCardClick?: (task: IBoardTask) => void;
}

const BoardColumn: FC<IProps> = ({ status, tasks, onCardClick }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = STATUS_COLUMN_CONFIG[status];
  const taskIds = tasks.map((t) => t.id);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-md ${config.bg} min-h-[calc(100vh-220px)] ${
        isOver ? 'ring-2 ring-blue-300' : ''
      }`}
    >
      <div className={`px-3 py-2.5 ${config.headerBg} rounded-t-md`}>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
          <span className="text-xs font-bold tracking-wide text-gray-600">
            {config.label}
          </span>
          <span className="text-xs text-gray-400 ml-auto">
            {tasks.length}
          </span>
        </div>
      </div>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-1.5 p-1.5 flex-1">
          {tasks.map((task) => (
            <BoardCard key={task.id} task={task} onClick={onCardClick} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default memo(BoardColumn);
