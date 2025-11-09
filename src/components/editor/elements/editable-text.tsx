'use client';
import React from 'react';
import { useEditorStore } from '@/components/editor/core/store';
import { Text } from '@/components/user/text';

type Props = {
  nodeId?: string;
};

export const EditableText: React.FC<Props> = ({ nodeId }) => {
  const node = useEditorStore((s) => (nodeId ? s.nodes[nodeId] : undefined));
  if (!node) return null;
  const props = node.props || {};
  return (
    <Text as="p" {...props}>
      {props.text}
    </Text>
  );
};
