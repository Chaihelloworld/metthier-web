'use client';

import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import TaskTable from '../components/Table/TaskTable';
import TaskFormModal from '../components/TaskFormModal';
import { useTaskStore } from '../stores/useTaskStore';
import type { ITask } from '../models/task.model';
import {
  STATUS_FILTERS,
  TaskStatusEnum,
  FilterStatusEnum,
  ModalModeEnum,
  type ModalMode,
} from '../constants/task.constants';
import DialogUtils from '@/app/utils/DialogUtils';

const Dashboard: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalModeEnum.CREATE);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const { setFilterStatus, deleteTask, fetchTasks } = useTaskStore();
  const tasks = useTaskStore((s) => s.tasks);
  const filterStatus = useTaskStore((s) => s.filterStatus);

  useEffect(() => {
    setFilterStatus(FilterStatusEnum.ALL);
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(
    () =>
      filterStatus === FilterStatusEnum.ALL
        ? tasks
        : tasks.filter((t) => t.status === filterStatus),
    [tasks, filterStatus]
  );

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === TaskStatusEnum.TODO).length,
      inProgress: tasks.filter((t) => t.status === TaskStatusEnum.IN_PROGRESS).length,
      done: tasks.filter((t) => t.status === TaskStatusEnum.DONE).length,
    }),
    [tasks]
  );

  const handleOpenCreate = useCallback(() => {
    setModalMode(ModalModeEnum.CREATE);
    setEditingTask(null);
    setModalOpen(true);
  }, []);

  const handleOpenUpdate = useCallback((task: ITask) => {
    setModalMode(ModalModeEnum.UPDATE);
    setEditingTask(task);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      DialogUtils.confirm(
        'Delete Task',
        'Are you sure you want to delete this task?',
        async () => {
          try {
            await deleteTask(id);
            DialogUtils.success('Deleted', 'Task has been deleted successfully.');
          } catch {
            DialogUtils.error('Error', 'Failed to delete task.');
          }
        }
      );
    },
    [deleteTask]
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          + New Task
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilterStatus(value)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filterStatus === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label} ({taskCounts[value]})
          </button>
        ))}
      </div>

      <TaskTable
        tasks={filteredTasks}
        onUpdate={handleOpenUpdate}
        onDelete={handleDelete}
      />

      <TaskFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        task={editingTask}
        onSuccess={() => fetchTasks()}
      />
    </div>
  );
};

export default memo(Dashboard);
