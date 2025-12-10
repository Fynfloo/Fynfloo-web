'use client';

import { createContext, useContext } from 'react';
import type { Store } from '@/lib/storefront/types';
import type { ThemeSettings } from '@/lib/storefront/types';

type StoreContextValue = {
  store: Store;
  theme: ThemeSettings;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({
  value,
  children,
}: {
  value: StoreContextValue;
  children: React.ReactNode;
}) {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStoreContext() {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error('useStoreContext must be used within StoreProvider');
  return ctx;
}
