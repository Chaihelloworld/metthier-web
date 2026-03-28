'use client';

import { memo, type FC } from 'react';
import type { ITask } from '../../models/task.model';
import TaskTableRow from './TaskTableRow';

interface IProps {
  tasks: ITask[];
  onUpdate: (task: ITask) => void;
  onDelete: (id: number) => void;
}

const TaskTable: FC<IProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskTableRow
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <p className="text-center text-gray-400 py-12">No tasks found</p>
      )}
    </div>
  );
};

export default memo(TaskTable);
