'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

export type DeviceKey = 'desktop' | 'tablet' | 'mobile';

export const DEVICES: Record<DeviceKey, { label: string; width: number }> = {
  desktop: { label: 'Desktop', width: 1200 },
  tablet: { label: 'Tablet', width: 768 },
  mobile: { label: 'Mobile', width: 375 },
};

type ViewportContextValue = {
  device: DeviceKey;
  setDevice: (v: DeviceKey) => void;

  zoom: number;
  setZoom: (z: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};

const ViewportContext = createContext<ViewportContextValue | null>(null);

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<DeviceKey>('desktop');
  const [zoom, setZoom] = useState<number>(1);

  const value = useMemo(
    () => ({
      device,
      setDevice,
      zoom,
      setZoom,
      zoomIn: () => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2))),
      zoomOut: () => setZoom((z) => Math.max(0.2, +(z - 0.1).toFixed(2))),
      resetZoom: () => setZoom(1),
    }),
    [device, zoom]
  );
  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  const ctx = useContext(ViewportContext);
  if (!ctx) {
    throw new Error('useViewport must be used within a ViewportProvider');
  }
  return ctx;
}
