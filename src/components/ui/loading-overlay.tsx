'use client';

import { Loader2 } from 'lucide-react';

export function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Processing...
      </div>
    </div>
  );
}
