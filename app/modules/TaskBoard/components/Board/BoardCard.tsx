'use client';

import { memo, type FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { IBoardTask } from '../../models/board.model';

interface IProps {
  task: IBoardTask;
  onClick?: (task: IBoardTask) => void;
}

const BoardCard: FC<IProps> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { status: task.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerUp={() => onClick?.(task)}
      className="rounded bg-white p-3 shadow-sm hover:bg-gray-50 border border-transparent hover:border-blue-400 transition-all cursor-grab active:cursor-grabbing active:shadow-lg"
    >
      <p className="text-sm text-gray-900 leading-snug">{task.title}</p>
      {task.description && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
          MTH-{task.id}
        </span>
      </div>
    </div>
  );
};

export default memo(BoardCard);
