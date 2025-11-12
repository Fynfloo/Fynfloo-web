// button.tsx — the craft-enabled component
import React, { ReactNode } from 'react';
import { useNode } from '@craftjs/core';
import { RadioGroup } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';

interface ButtonProps {
  children?: ReactNode;
  color?: 'black' | 'blue' | 'red' | 'green';
  size?: 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outlined' | 'ghost';
  text?: string;
}

export const Button = ({
  children,
  color = 'black',
  size = 'medium',
  variant = 'solid',
  text,
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const colorStyles = {
    black: '#000000',
    blue: '#1E90FF',
    red: '#FF4500',
    green: '#32CD32',
  } as const;

  const sizeStyles = {
    small: { padding: '4px 8px', fontSize: '12px' },
    medium: { padding: '8px 16px', fontSize: '14px' },
    large: { padding: '12px 20px', fontSize: '16px' },
  } as const;

  const variantStyles = {
    solid: {
      backgroundColor: colorStyles[color],
      border: 'none',
      color: 'white',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${colorStyles[color]}`,
      color: colorStyles[color],
    },
    ghost: {
      backgroundColor: 'transparent',
      border: 'none',
      color: colorStyles[color],
    },
  } as const;

  return (
    <button
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {children || text}
    </button>
  );
};

const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <RadioGroup.Root
        defaultValue={props.size}
        name="Size"
        onValueChange={(value) =>
          setProp(
            (props: ButtonProps) => (props.size = value as ButtonProps['size'])
          )
        }
      >
        <Label htmlFor="">Size</Label>
        <RadioGroup.Item value="small">Small</RadioGroup.Item>
        <RadioGroup.Item value="medium">Medium</RadioGroup.Item>
        <RadioGroup.Item value="large">Large</RadioGroup.Item>
      </RadioGroup.Root>

      <RadioGroup.Root
        defaultValue={props.variant}
        name="Variant"
        onValueChange={(value) =>
          setProp(
            (props: ButtonProps) =>
              (props.variant = value as ButtonProps['variant'])
          )
        }
      >
        <Label htmlFor="">Variant</Label>
        <RadioGroup.Item value="solid">Solid</RadioGroup.Item>
        <RadioGroup.Item value="outlined">Outlined</RadioGroup.Item>
        <RadioGroup.Item value="ghost">Ghost</RadioGroup.Item>
      </RadioGroup.Root>

      <RadioGroup.Root
        defaultValue={props.color}
        name="Color"
        onValueChange={(value) =>
          setProp(
            (props: ButtonProps) =>
              (props.color = value as ButtonProps['color'])
          )
        }
      >
        <Label htmlFor="">Color</Label>
        <RadioGroup.Item value="black">Black</RadioGroup.Item>
        <RadioGroup.Item value="blue">Blue</RadioGroup.Item>
        <RadioGroup.Item value="red">Red</RadioGroup.Item>
        <RadioGroup.Item value="green">Green</RadioGroup.Item>
      </RadioGroup.Root>
    </div>
  );
};

Button.craft = {
  props: {
    size: 'small',
    variant: 'solid',
    color: 'black',
    text: 'Click me',
  },
  related: {
    settings: ButtonSettings,
  },
};
