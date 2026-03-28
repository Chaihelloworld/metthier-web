'use client';

import { FC, memo, useEffect, useMemo, useState } from 'react';
import TaskBoard from '../components/Board/TaskBoard';
import TaskFormModal from '@/app/modules/Dashboard/components/TaskFormModal';
import useBoardStore from '../stores/useBoardStore';
import type { IBoardTask, BoardTaskStatus } from '../models/board.model';
import { BoardStatusEnum, BoardFilterEnum } from '../constants/board.constants';
import { STATUS_FILTERS, ModalModeEnum, type ModalMode } from '@/app/modules/Dashboard/constants/task.constants';
import type { ITask } from '@/app/modules/Dashboard/models/task.model';
import DialogUtils from '@/app/utils/DialogUtils';

const TaskBoardScreen: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalModeEnum.CREATE);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const tasks = useBoardStore((s) => s.tasks);
  const filterStatus = useBoardStore((s) => s.filterStatus);
  const { setFilterStatus, updateTaskStatus, fetchTasks, deleteTask } = useBoardStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const tasksByStatus = useMemo(() => {
    let filtered = tasks;
    if (filterStatus !== BoardFilterEnum.ALL) {
      filtered = tasks.filter((t) => t.status === filterStatus);
    }
    return {
      todo: filtered.filter((t) => t.status === BoardStatusEnum.TODO),
      inProgress: filtered.filter((t) => t.status === BoardStatusEnum.IN_PROGRESS),
      done: filtered.filter((t) => t.status === BoardStatusEnum.DONE),
    };
  }, [tasks, filterStatus]);

  const handleStatusChange = (taskId: number, newStatus: BoardTaskStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  const handleCardClick = (task: IBoardTask) => {
    setModalMode(ModalModeEnum.UPDATE);
    setEditingTask(task as ITask);
    setModalOpen(true);
  };

  const handleOpenCreate = () => {
    setModalMode(ModalModeEnum.CREATE);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleDropOutside = (taskId: number) => {
    DialogUtils.confirm(
      'Delete Task',
      'Are you sure you want to delete this task?',
      async () => {
        try {
          await deleteTask(taskId);
          DialogUtils.success('Deleted', 'Task has been deleted successfully.');
        } catch {
          DialogUtils.error('Error', 'Failed to delete task.');
        }
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-56px)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Board</h1>
            <p className="text-xs text-gray-500 mt-0.5">Metthier Project</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            + New Task
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilterStatus(value as BoardTaskStatus | 'all')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                filterStatus === value
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <TaskBoard
          tasksByStatus={tasksByStatus}
          onStatusChange={handleStatusChange}
          onCardClick={handleCardClick}
          onDropOutside={handleDropOutside}
        />

        <TaskFormModal
          open={modalOpen}
          onClose={handleCloseModal}
          mode={modalMode}
          task={editingTask}
          onSuccess={() => fetchTasks()}
        />
      </div>
    </div>
  );
};

export default memo(TaskBoardScreen);
