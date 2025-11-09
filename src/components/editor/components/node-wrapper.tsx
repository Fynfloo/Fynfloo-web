'use client';
import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useEditorStore } from '../core/store';

export const NodeWrapper: React.FC<{
  nodeId: string;
  children?: React.ReactNode;
}> = ({ nodeId, children }) => {
  const { selectedId, selectNode } = useEditorStore();
  const { attributes, listeners, setNodeRef } = useDraggable({ id: nodeId });
  const { setNodeRef: setDropRef } = useDroppable({ id: nodeId });
  const isSelected = selectedId === nodeId;

  const refCb = (el: HTMLElement | null) => {
    setNodeRef(el);
    setDropRef(el);
  };

  return (
    <div
      ref={refCb}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(nodeId);
      }}
      style={{
        outline: isSelected ? `2px solid ${'#0070ff'}` : 'none',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};
