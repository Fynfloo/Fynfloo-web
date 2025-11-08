import React from 'react';
import { tokens } from '@/design-system/tokens';

type ButtonProps = {
  label: string;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: keyof typeof tokens.color | string;
  padding?: string;
  radius?: keyof typeof tokens.radius | string;
  onClick?: () => void;
  className?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label = 'Click',
      variant = 'solid',
      size = 'md',
      color = 'primary',
      padding,
      radius = 'md',
      onClick,
      className,
    },
    ref
  ) => {
    const tokenColor =
      tokens.color[color as keyof typeof tokens.color] || color;
    const bg = variant === 'solid' ? tokenColor : 'transparent';
    const txt = variant === 'solid' ? tokens.color.textOnPrimary : tokenColor;
    const border = variant === 'outline' ? `1px solid ${tokenColor}` : 'none';
    const sizePadding =
      padding ??
      (size === 'sm'
        ? `${tokens.spacing.sm} ${tokens.spacing.md}`
        : size === 'md'
        ? `${tokens.spacing.md} ${tokens.spacing.lg}`
        : `${tokens.spacing.lg} ${tokens.spacing.xl}`);
    const borderRadius =
      tokens.radius[radius as keyof typeof tokens.radius] || radius;

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={className}
        style={{
          padding: sizePadding,
          borderRadius: borderRadius,
          fontWeight: tokens.font.weights.medium,
          background: bg,
          color: txt,
          border,
          cursor: 'pointer',
          transition: `all ${tokens.transition.normal} ease`,
        }}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = 'Button';
