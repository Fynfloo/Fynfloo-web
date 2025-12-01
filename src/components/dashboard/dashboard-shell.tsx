// components/dashboard/dashboard-shell.tsx
'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarLeft } from './sidebar';
import { DashboardHeader } from './dashboard-header';
import { DashboardContent } from './dashboard-content';

export function DashboardShell() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30 w-full">
        <DashboardHeader />
        <div className="flex flex-1 min-h-0">
          <SidebarLeft />
          <main className="flex-1 p-6 md:p-8">
            <DashboardContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
