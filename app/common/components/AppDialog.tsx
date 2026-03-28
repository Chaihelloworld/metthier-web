'use client';

import { memo, type FC } from 'react';
import useDialogStore from '@/app/stores/useDialogStore';
import BaseModal from './BaseModal';

const TYPE_STYLES = {
  error: {
    icon: '!',
    iconBg: 'bg-red-100 text-red-600',
    button: 'bg-red-500 hover:bg-red-600',
  },
  success: {
    icon: '\u2713',
    iconBg: 'bg-green-100 text-green-600',
    button: 'bg-green-500 hover:bg-green-600',
  },
  warning: {
    icon: '!',
    iconBg: 'bg-yellow-100 text-yellow-600',
    button: 'bg-yellow-500 hover:bg-yellow-600',
  },
  info: {
    icon: 'i',
    iconBg: 'bg-blue-100 text-blue-600',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
  confirm: {
    icon: '?',
    iconBg: 'bg-red-100 text-red-600',
    button: 'bg-red-500 hover:bg-red-600',
  },
};

const AppDialog: FC = () => {
  const { open, type, title, description, onConfirm, closeDialog } = useDialogStore();
  const styles = TYPE_STYLES[type];

  const handleConfirm = () => {
    onConfirm?.();
    closeDialog();
  };

  return (
    <BaseModal open={open} onClose={closeDialog} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${styles.iconBg}`}>
          {styles.icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>

        {type === 'confirm' ? (
          <div className="flex gap-3 mt-6 w-full">
            <button
              onClick={closeDialog}
              className="flex-1 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 py-2 rounded-md text-sm font-medium text-white transition-colors ${styles.button}`}
            >
              Confirm
            </button>
          </div>
        ) : (
          <button
            onClick={closeDialog}
            className={`mt-6 w-full py-2 rounded-md text-sm font-medium text-white transition-colors ${styles.button}`}
          >
            OK
          </button>
        )}
      </div>
    </BaseModal>
  );
};

export default memo(AppDialog);
