'use client';

import React from 'react';
import { Button } from '@/components/user/button';
import { useEditorStore } from '../core/store';

type Props = { nodeId?: string };

export const EditableButton: React.FC<Props> = ({ nodeId }) => {
  const node = useEditorStore((s) => (nodeId ? s.nodes[nodeId] : undefined));
  if (!node) return null;
  const props = node.props || {};
  return (
    <Button
      label={props.label as string}
      variant={props.variant as typeof Button.prototype.variant}
      size={props.size as typeof Button.prototype.size}
      color={props.color as typeof Button.prototype.color}
    />
  );
};
