'use client';
import {
  Laptop,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useViewport, DEVICES } from '../context/viewport-context';
import { cn } from '@/lib/utils';

export function DashboardHeader() {
  const { device, setDevice, zoom, zoomIn, zoomOut, resetZoom } = useViewport();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
        {/* Device switching */}
        <div className="flex items-center gap-1 border rounded-md bg-card p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(device === 'desktop' && 'bg-accent')}
            onClick={() => setDevice('desktop')}
          >
            <Laptop className="mr-1 h-4 w-4" />
            {DEVICES.desktop.label}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(device === 'tablet' && 'bg-accent')}
            onClick={() => setDevice('tablet')}
          >
            <Tablet className="mr-1 h-4 w-4" />
            Tablet
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(device === 'mobile' && 'bg-accent')}
            onClick={() => setDevice('mobile')}
          >
            <Smartphone className="mr-1 h-4 w-4" />
            Mobile
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-4 h-6" />

        {/* Zoom controls */}
        <div className="flex items-center gap-2 border rounded-md bg-card p-1 px-3">
          <Button size="icon-sm" variant="ghost" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>

          <span className="w-12 text-center text-xs">
            {(zoom * 100).toFixed(0)}%
          </span>

          <Button size="icon-sm" variant="ghost" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button size="icon-sm" variant="ghost" onClick={resetZoom}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto" />
      </div>
    </header>
  );
}
