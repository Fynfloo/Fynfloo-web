import * as React from 'react';
import { useEffect } from 'react';
import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import {
  CraftComponent,
  ContentEditableEvent,
} from '../../types/craft-component';

interface TextProps {
  text: string;
  fontSize?: string | number;
}

export const Text: CraftComponent<TextProps> = ({ text, fontSize = 20 }) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  const [editable, setEditable] = React.useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(false);
  }, [hasSelectedNode]);

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      onClick={(e) => setEditable(true)}
    >
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e: ContentEditableEvent) => {
          const value = e.target.value.replace(/<\/?[^>]+(>|$)/g, '');
          setProp((props: TextProps) => {
            props.text = value;
          });
        }}
        tagName="p"
        style={{ fontSize, margin: 0, padding: 0 }}
      />
    </div>
  );
};

Text.craft = {
  rules: {
    canDrag: (node: Node & { data: { props: TextProps } }) =>
      node.data.props.text !== 'Drag',
  },
};
