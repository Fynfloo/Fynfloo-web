'use client';

import { createContext, useContext } from 'react';
import type { StoreType } from '@/app/hooks/use-user-stores';

const StoreContext = createContext<StoreType | null>(null);

export default function StoreContextProvider({
  store,
  children,
}: {
  store: StoreType;
  children: React.ReactNode;
}) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStoreContext() {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error('useStoreContext must be used within StoreContextProvider');
  return ctx;
}
