'use client';

import { useEditor } from '@craftjs/core';
import React, { useState } from 'react';
import { styled } from 'styled-components';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { Toolbar } from '@/components/toolbar/index';

// TODO : we might not need the margin-right
export const SidebarDiv = styled.div<{ $enabled: boolean }>`
  width: '100%';
  opacity: ${(props) => (props.$enabled ? 1 : 0)};
  background: var(--background);
`;

export function SidebarRight() {
  const { selected } = useEditor((state, query) => {
    const enabled = state.options.enabled;
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }
    return { selected, enabled };
  });

  return (
    <Sidebar
      collapsible="none"
      className="sticky bg-background top-(--header-height) border-l h-[calc(100svh-var(--header-height))] overflow-auto"
    >
      <SidebarContent className=" overflow-auto space-y-4">
        {selected ? <Toolbar /> : <InactiveMessage />}
      </SidebarContent>
    </Sidebar>
  );
}

const InactiveMessage = () => (
  <div className="text-center text-sm text-muted-foreground py-20">
    <p>Click on a component to start editing.</p>
    <p className="mt-2 text-xs">
      Double click layers to rename elements, like Photoshop.
    </p>
  </div>
);
