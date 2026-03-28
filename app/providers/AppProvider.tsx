'use client';

import { type ReactNode } from 'react';
import AppDialog from '@/app/common/components/AppDialog';
import AppLoader from '@/app/common/components/AppLoader';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      {children}
      <AppLoader />
      <AppDialog />
    </>
  );
}
