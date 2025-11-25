'use client';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarLeft } from '@/components/viewport/sidebar-left/sidebar';
import { SidebarRight } from '@/components/viewport/sidebar-right/sidebar-right';
import { DashboardHeader } from '@/components/viewport/header/dashboard-header';
import { useEditor } from '@craftjs/core';
import cn from 'classnames';
import { ViewportProvider } from './context/viewport-context';

export default function Viewport({ children }: { children?: React.ReactNode }) {
  const { enabled, connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <>
      <ViewportProvider>
        <SidebarProvider className="flex flex-col h-screen">
          <DashboardHeader />
          <div className="flex flex-1 min-h-0">
            <div className="shrink-0">
              <SidebarLeft />
            </div>
            <div className="page-container flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden width-full">
              <div
                className={cn([
                  'craftjs-renderer flex-1 min-h-0 min-w-0 overflow-hidden transition width-full',
                  enabled && 'bg-canvas-inner',
                ])}
                ref={(ref) => {
                  if (ref) {
                    connectors.select(connectors.hover(ref, ''), '');
                  }
                }}
              >
                {children}
              </div>
            </div>
            <div className="shrink-0">
              <SidebarRight />
            </div>
          </div>
        </SidebarProvider>
      </ViewportProvider>
    </>
  );
}
