import React, { JSX } from 'react';
import { tokens } from '@/design-system/tokens';

type TextProps = {
  text?: string;
  as?: keyof JSX.IntrinsicElements; // e.g., 'p', 'span', 'div', h1', etc.
  size?: keyof typeof tokens.font.sizes; // e.g., 'xs', 'sm', 'md', 'lg', etc.
  weight?: keyof typeof tokens.font.weights; // e.g., 'normal', 'medium', 'bold'
  color?: keyof typeof tokens.color | string; // e.g., 'primary', 'secondary', or any valid CSS color
  align?: 'left' | 'center' | 'right';
  margin?: string | number;
  className?: string;
  children?: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({
  text,
  as: Tag = 'p',
  size = 'md',
  weight = 'normal',
  color = 'textPrimary',
  align = 'left',
  margin = 0,
  className,
  children,
}) => {
  const fontSize = tokens.font.sizes[size];
  const fontWeight = tokens.font.weights[weight];
  const textColor = tokens.color[color as keyof typeof tokens.color] || color;

  return (
    <Tag
      className={className}
      style={{
        fontSize,
        fontWeight,
        color: textColor,
        textAlign: align,
        fontFamily: tokens.font.family.base,
        margin,
      }}
    >
      {text ?? children}
    </Tag>
  );
};
