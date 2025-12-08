// components/dashboard/dashboard-shell.tsx
'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarLeft } from './sidebar';
import { DashboardHeader } from './dashboard-header';

export function DashboardShell({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30 w-full">
        <SidebarLeft />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
