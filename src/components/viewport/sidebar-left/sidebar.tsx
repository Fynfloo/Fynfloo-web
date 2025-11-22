'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { UIButton } from '@/components/craft/ui-button';
import { Element, useEditor } from '@craftjs/core';
import { Button } from '@/components/selectors/button';
import { Section } from '@/components/selectors/section';
import { Container } from '@/components/selectors/container';
import { Layout } from '@/components/selectors/layout';
//import { Container } from '@/components/craft/container';

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
              <UIButton
                ref={(ref) => {
                  if (ref) create(ref, <Element is={Section} canvas />);
                }}
                className="mb-4 w-full"
              >
                Section
              </UIButton>
              <UIButton
                ref={(ref) => {
                  if (ref) create(ref, <Element is={Container} canvas />);
                }}
                className="mb-4 w-full"
              >
                Container
              </UIButton>
              <UIButton
                ref={(ref) => {
                  if (ref) create(ref, <Element is={Layout} canvas />);
                }}
                className="mb-4 w-full"
              >
                Layout
              </UIButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
