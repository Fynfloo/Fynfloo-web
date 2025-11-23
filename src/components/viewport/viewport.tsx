'use client';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarLeft } from '@/components/viewport/sidebar-left/sidebar';
import { SidebarRight } from '@/components/viewport/sidebar-right/sidebar-right';
import { DashboardHeader } from '@/components/viewport/header/dashboard-header';
import { useEditor } from '@craftjs/core';
import cn from 'classnames';

export default function Viewport({ children }: { children?: React.ReactNode }) {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <>
      <SidebarProvider className="flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <div className="shrink-0">
            <SidebarLeft />
          </div>
          <div className="page-container overflow-auto grow h-full flex flex-col md:h-screen">
            <div
              className={cn([
                'craftjs-renderer flex-1 h-full w-full transition overflow-y-hidden overflow-x-hidden p-2 max-width: 100%',
                {
                  'bg-renderer-gray': enabled,
                },
              ])}
              ref={(ref) => {
                if (ref) {
                  connectors.select(connectors.hover(ref, ''), '');
                }
              }}
            >
              <div className="relative flex-col flex items-center pt-8">
                {children}
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <SidebarRight />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
