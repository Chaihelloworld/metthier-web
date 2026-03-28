'use client';

import { memo, type FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { ITask, ICreateTaskPayload } from '../models/task.model';
import { useTaskStore } from '../stores/useTaskStore';
import BaseModal from '@/app/common/components/BaseModal';
import useDialogStore from '@/app/stores/useDialogStore';
import {
  TaskStatusEnum,
  ModalModeEnum,
  TASK_STATUS_OPTIONS,
  type ModalMode,
} from '../constants/task.constants';

interface IProps {
  open: boolean;
  onClose: () => void;
  mode: ModalMode;
  task?: ITask | null;
  onSuccess?: () => void;
}

const DEFAULT_VALUES: ICreateTaskPayload = {
  title: '',
  description: '',
  status: TaskStatusEnum.TODO,
};

const TaskFormModal: FC<IProps> = ({ open, onClose, mode, task, onSuccess }) => {
  const { createTask, updateTask } = useTaskStore();
  const { showDialog } = useDialogStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ICreateTaskPayload>({ defaultValues: DEFAULT_VALUES });

  useEffect(() => {
    if (!open) return;
    if (mode === ModalModeEnum.UPDATE && task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [open, mode, task, reset]);

  const onSubmit = async (data: ICreateTaskPayload) => {
    try {
      if (mode === ModalModeEnum.UPDATE && task) {
        await updateTask({ id: task.id, ...data });
      } else {
        await createTask(data);
      }
      showDialog({
        type: 'success',
        title: mode === ModalModeEnum.CREATE ? 'Task Created' : 'Task Updated',
        description: mode === ModalModeEnum.CREATE
          ? 'Task has been created successfully.'
          : 'Task has been updated successfully.',
      });
      reset(DEFAULT_VALUES);
      onClose();
      onSuccess?.();
    } catch (e) {
      showDialog({
        type: 'error',
        title: 'Something went wrong',
        description: (e as Error).message,
      });
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={mode === ModalModeEnum.CREATE ? 'Create Task' : 'Update Task'}
      size="md"
      footer={
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isSubmitting
            ? 'Saving...'
            : mode === ModalModeEnum.CREATE
              ? 'Create Task'
              : 'Save Changes'}
        </button>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Task description"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TASK_STATUS_OPTIONS.map(({ label, value }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            )}
          />
        </div>
      </form>
    </BaseModal>
  );
};

export default memo(TaskFormModal);
