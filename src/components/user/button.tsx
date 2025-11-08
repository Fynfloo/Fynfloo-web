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

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'solid',
  size = 'sm',
  color = 'primary',
  padding,
  radius = 'md',
  onClick,
  className,
}) => {
  const bgColor =
    variant === 'solid'
      ? tokens.color[color as keyof typeof tokens.color]
      : 'transparent';
  const textColor =
    variant === 'solid'
      ? tokens.color.textOnPrimary
      : tokens.color[color as keyof typeof tokens.color] || color;

  const border =
    variant === 'outline'
      ? `2px solid ${tokens.color[color as keyof typeof tokens.color]}`
      : 'none';

  const sizePadding = padding
    ? padding
    : size === 'sm'
    ? `${tokens.spacing.sm} ${tokens.spacing.md}`
    : size === 'md'
    ? `${tokens.spacing.md} ${tokens.spacing.lg}`
    : `${tokens.spacing.lg} ${tokens.spacing.xl}`;

  const borderRadius =
    tokens.radius[radius as keyof typeof tokens.radius] || radius;

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        padding: sizePadding,
        borderRadius,
        fontWeight: tokens.font.weights.medium,
        cursor: 'pointer',
        border,
        backgroundColor: bgColor,
        color: textColor,
        transition: `all ${tokens.transition.normal} ease`,
      }}
    >
      {label}
    </button>
  );
};
