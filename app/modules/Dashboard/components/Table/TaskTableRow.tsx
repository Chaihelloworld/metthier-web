'use client';

import { memo, type FC } from 'react';
import type { ITask } from '../../models/task.model';
import { STATUS_LABELS } from '../../constants/task.constants';

interface IProps {
  task: ITask;
  onUpdate: (task: ITask) => void;
  onDelete: (id: number) => void;
}

const TaskTableRow: FC<IProps> = ({ task, onUpdate, onDelete }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm">{task.title}</td>
      <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
        {task.description}
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-gray-600">{STATUS_LABELS[task.status]}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1">
          <button
            onClick={() => onUpdate(task)}
            className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
            title="Update"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default memo(TaskTableRow);
