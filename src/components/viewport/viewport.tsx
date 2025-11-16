import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarLeft } from '@/components/viewport/sidebar-left/sidebar';
import { SidebarRight } from '@/components/viewport/sidebar-right/sidebar-right';
import { DashboardHeader } from '@/components/viewport/header/dashboard-header';

export default function Viewport({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <SidebarLeft />
        <div className="grow p-6 md:overflow-y-auto md:p-12"></div>
        <SidebarRight />
      </div>
    </SidebarProvider>
  );
}
