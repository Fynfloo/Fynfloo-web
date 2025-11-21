import { useNode, useEditor } from '@craftjs/core';
import React, { JSX } from 'react';
import ContentEditable from 'react-contenteditable';
import { RGBA } from '@/types/selector-type';

export type TextProps = {
  tagName?: keyof JSX.IntrinsicElements;
  fontSize?: string | number;
  textAlign?: string;
  fontWeight?: string;
  color?: RGBA;
  shadow?: number;
  text: string;
  margin?: string[] | number[];
};

export const Text = ({
  tagName: Tag = 'p',
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
  text,
  margin,
}: TextProps) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ContentEditable
      innerRef={connect}
      html={text}
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }}
      tagName={Tag}
      style={{
        width: '100%',
        margin: `${margin?.[0] || 0}px ${margin?.[1] || 0}px ${
          margin?.[2] || 0
        }px ${margin?.[3] || 0}px`,
        // color: `rgba(${color?.r || 0}, ${color?.g || 0}, ${color?.b || 0}, ${
        //   color?.a || 1
        // })`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight,
        textAlign,
      }}
    />
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    tagName: 'p',
    fontSize: '15',
    textAlign: 'left',
    fontWeight: '500',
    color: { r: 0, g: 0, b: 0, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: 'Edit text',
  },
};
