import * as React from 'react';
import { useNode } from '@craftjs/core';

interface TextProps {
  text: string;
  fontSize?: string | number;
}

export const Text = ({
  text,
  fontSize = 20,
}: {
  text: string;
  fontSize?: string | number;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
    >
      <p style={{ fontSize }}>{text}</p>
    </div>
  );
};

Text.craft = {
  rules: {
    canDrag: (node: Node & { data: { props: TextProps } }) =>
      node.data.props.text !== 'Drag',
  },
};
