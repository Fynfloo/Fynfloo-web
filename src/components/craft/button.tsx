// button.tsx — the craft-enabled component
import React, { ReactNode } from 'react';
import { useNode } from '@craftjs/core';

interface ButtonProps {
  children?: ReactNode;
  color?: string;
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

  const sizeStyles = {
    small: { padding: '4px 8px', fontSize: '12px' },
    medium: { padding: '8px 16px', fontSize: '14px' },
    large: { padding: '12px 20px', fontSize: '16px' },
  } as const;

  const variantStyles = {
    solid: { backgroundColor: color, border: 'none', color: 'white' },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${color}`,
      color,
    },
    ghost: { backgroundColor: 'transparent', border: 'none', color },
  } as const;

  return (
    <button
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        borderRadius: 6,
        cursor: 'pointer',
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {children || text}
    </button>
  );
};
