'use client';

import { memo, type FC, useCallback, useState, useRef } from 'react';
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import type { IBoardTask, BoardTaskStatus } from '../../models/board.model';
import { STATUS_COLUMN_ORDER } from '../../constants/board.constants';
import BoardColumn from './BoardColumn';
import BoardCard from './BoardCard';

interface IProps {
  tasksByStatus: Record<BoardTaskStatus, IBoardTask[]>;
  onStatusChange: (taskId: number, newStatus: BoardTaskStatus) => void;
  onCardClick?: (task: IBoardTask) => void;
  onDropOutside?: (taskId: number) => void;
}

const TaskBoard: FC<IProps> = ({ tasksByStatus, onStatusChange, onCardClick, onDropOutside }) => {
  const [activeTask, setActiveTask] = useState<IBoardTask | null>(null);
  const isDraggingRef = useRef(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const allTasks = Object.values(tasksByStatus).flat();

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      isDraggingRef.current = true;
      const task = allTasks.find((t) => t.id === event.active.id);
      setActiveTask(task ?? null);
    },
    [allTasks]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const wasDragging = isDraggingRef.current;
      isDraggingRef.current = false;
      setActiveTask(null);

      if (!wasDragging) return;

      const { active, over } = event;
      const taskId = active.id as number;

      // Drop outside any column → delete
      if (!over) {
        onDropOutside?.(taskId);
        return;
      }

      const activeStatus = active.data.current?.status as BoardTaskStatus;

      let targetStatus: BoardTaskStatus;
      if (STATUS_COLUMN_ORDER.includes(over.id as BoardTaskStatus)) {
        targetStatus = over.id as BoardTaskStatus;
      } else {
        targetStatus = over.data.current?.status as BoardTaskStatus;
      }

      if (!targetStatus) {
        onDropOutside?.(taskId);
        return;
      }

      if (activeStatus === targetStatus) return;

      onStatusChange(taskId, targetStatus);
    },
    [onStatusChange, onDropOutside]
  );

  const handleCardClick = useCallback(
    (task: IBoardTask) => {
      if (!isDraggingRef.current) {
        onCardClick?.(task);
      }
    },
    [onCardClick]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div ref={boardRef} className="grid grid-cols-3 gap-4">
        {STATUS_COLUMN_ORDER.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-90">
            <BoardCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default memo(TaskBoard);
