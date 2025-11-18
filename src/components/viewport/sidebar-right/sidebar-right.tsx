'use client';

import { useEditor } from '@craftjs/core';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Pencil } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Toolbar } from '@/components/toolbar/index';
import { SidebarItem } from './siderbar-item';

// TODO : we might not need the margin-right
export const SidebarDiv = styled.div<{ $enabled: boolean }>`
  width: '100%';
  opacity: ${(props) => (props.$enabled ? 1 : 0)};
  background: var(--background);
`;

// const items = [
//   {
//     title: 'Home',
//     url: '#',
//     icon: Home,
//   },
//   {
//     title: 'Inbox',
//     url: '#',
//     icon: Inbox,
//   },
//   {
//     title: 'Calendar',
//     url: '#',
//     icon: Calendar,
//   },
//   {
//     title: 'Search',
//     url: '#',
//     icon: Search,
//   },
//   {
//     title: 'Settings',
//     url: '#',
//     icon: Settings,
//   },
// ];

export function SidebarRight() {
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [layersVisible, setLayerVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <Sidebar
      collapsible="none"
      className="sticky bg-background top-(--header-height) border-l h-[calc(100svh-var(--header-height))]"
    >
      <SidebarContent>
        {/* Group 1 */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarDiv $enabled={enabled} className="transition bg-background">
              <div className="flex flex-col h-full">
                <SidebarItem
                  icon={<Pencil />}
                  title="Customize"
                  height={!layersVisible ? 'full' : '50%'}
                  visible={toolbarVisible}
                  onChange={(val) => setToolbarVisible(val)}
                  className="overflow-auto"
                >
                  <Toolbar />
                </SidebarItem>
              </div>
            </SidebarDiv>
            {/* <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
