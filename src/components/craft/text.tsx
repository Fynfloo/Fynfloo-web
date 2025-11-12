import * as React from 'react';
import { useEffect } from 'react';
import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import {
  CraftComponent,
  ContentEditableEvent,
} from '../../types/craft-component';
import { Slider } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';

interface TextProps {
  text: string;
  fontSize?: string | number;
}

export const Text: CraftComponent<TextProps> = ({ text, fontSize = 20 }) => {
  const {
    connectors: { connect, drag },
    isActive,
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
    isActive: state.events.selected,
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

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <>
      <Label htmlFor="fontSizeSlider">Font size</Label>
      <Slider
        defaultValue={[(fontSize as number) || 7]}
        step={7}
        min={1}
        max={50}
        id="fontSizeSlider"
        onValueChange={(value) => {
          setProp((props: TextProps) => (props.fontSize = value[0]));
        }}
      />
    </>
  );
};

Text.craft = {
  props: {
    text: 'Hi',
    fontSize: 20,
  },
  rules: {
    canDrag: (node: Node & { data: { props: TextProps } }) =>
      node.data.props.text !== 'Drag',
  },
  related: {
    settings: TextSettings,
  },
};
