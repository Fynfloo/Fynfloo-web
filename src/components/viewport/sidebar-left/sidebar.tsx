'use client';
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
import { UIButton } from '@/components/craft/ui-button';
import { Element, useEditor } from '@craftjs/core';
import { Button } from '@/components/selectors/button';

const items = [
  {
    title: 'Grid',
  },
  {
    title: 'Flex',
  },
  {
    title: 'Heading',
  },
  {
    title: 'Text',
  },
  {
    title: 'Button',
  },
  {
    title: 'Card',
  },
  {
    title: 'Container',
  },
];

export function SidebarLeft() {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <Sidebar
      collapsible="icon"
      className="bg-background top-(--header-height) h-[calc(100svh-var(--header-height))]"
    >
      <SidebarContent>
        {/* Group 1 */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-md mb-4 mt-2">
            Components
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <UIButton
                ref={(ref) => {
                  if (ref) create(ref, <Button />);
                }}
                className="mb-4 w-full"
              >
                Button
              </UIButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
