import React from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarLeft } from '@/components/sidebar';
import { SidebarRight } from '@/components/sidebar-right';
import { DashboardHeader } from '@/components/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider className="flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <SidebarLeft />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
              <div className="bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl" />
            </div>
          </SidebarInset>
          <SidebarRight />
        </div>
      </SidebarProvider>
    </div>
  );
}
