'use client';

import { memo, type FC } from 'react';
import useLoaderStore from '@/app/stores/useLoaderStore';

const AppLoader: FC = () => {
  const loading = useLoaderStore((s) => s.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    </div>
  );
};

export default memo(AppLoader);
