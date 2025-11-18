'use client';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarLeft } from '@/components/viewport/sidebar-left/sidebar';
import { SidebarRight } from '@/components/viewport/sidebar-right/sidebar-right';
import { DashboardHeader } from '@/components/viewport/header/dashboard-header';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container } from '@/components/craft/container';
import { Text } from '@/components/selectors/text/index';
import { Button } from '@/components/selectors/button/index';

export default function Viewport({ children }: { children?: React.ReactNode }) {
  return (
    <Editor
      resolver={{
        Container,
        Text,
        Button,
      }}
      enabled={true}
    >
      <SidebarProvider className="flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <div className="shrink-0">
            <SidebarLeft />
          </div>

          <Frame>
            <Element
              canvas
              is={Container}
              className="grow p-6 md:overflow-y-auto md:p-12 "
            >
              {children}
            </Element>
          </Frame>
          <div className="shrink-0">
            <SidebarRight />
          </div>
        </div>
      </SidebarProvider>
    </Editor>
  );
}
