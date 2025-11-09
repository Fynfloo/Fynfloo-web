'use client';
import React from 'react';
import { useEditorStore } from '@/components/editor/core/store';
import { Container } from '@/components/user/container';

type Props = { nodeId?: string; children?: React.ReactNode };

export const EditableContainer: React.FC<Props> = ({ nodeId, children }) => {
  const node = useEditorStore((s) => (nodeId ? s.nodes[nodeId] : undefined));
  if (!node) return <Container>{children}</Container>;
  const props = node.props || {};
  return (
    <Container
      backgroundColor={
        props.backgroundColor as typeof Container.prototype.backgroundColor
      }
      padding={props.padding as typeof Container.prototype.padding}
      maxWidth={props.maxWidth as typeof Container.prototype.maxWidth}
    >
      {children}
    </Container>
  );
};
