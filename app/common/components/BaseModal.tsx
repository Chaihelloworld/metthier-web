'use client';

import { memo, type FC, type ReactNode, useCallback, useEffect } from 'react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface IBaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlay?: boolean;
}

const SIZE_MAP: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const BaseModal: FC<IBaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <div
        className={`relative w-full ${SIZE_MAP[size]} bg-white rounded-xl shadow-2xl mx-4 max-h-[90vh] flex flex-col`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
            >
              &times;
            </button>
          </div>
        )}

        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div className="px-6 py-4 border-t border-gray-100">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default memo(BaseModal);
