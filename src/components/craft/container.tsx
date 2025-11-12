import React from 'react';
import { useNode } from '@craftjs/core';
import { HexColorPicker } from 'react-colorful';
import { Label } from '@radix-ui/react-label';
import { Slider } from '@radix-ui/themes';

type ContainerProps = {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
};

export const Container = ({
  background,
  padding = 0,
  children,
}: {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        margin: '5px 0',
        background,
        padding: `${padding}px`,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div>
      <Label>Background</Label>
      <HexColorPicker
        color={background || '#000'}
        onChange={(color) =>
          setProp((props: ContainerProps) => (props.background = color))
        }
      />
      <Label style={{ marginTop: '10px' }}>Padding</Label>
      <Slider
        defaultValue={[padding as number]}
        onValueChange={(value) => {
          setProp((props: ContainerProps) => (props.padding = value[0]));
        }}
      />
    </div>
  );
};

export const ContainerDefaultProps: ContainerProps = {
  background: '#ffffff',
  padding: 20,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
