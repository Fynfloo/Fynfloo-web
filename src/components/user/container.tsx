import React from 'react';
import { tokens } from '@/design-system/tokens';

type ResponsivePadding =
  | keyof typeof tokens.spacing
  | string
  | number
  | {
      sm?: keyof typeof tokens.spacing | string | number;
      md?: keyof typeof tokens.spacing | string | number;
      lg?: keyof typeof tokens.spacing | string | number;
    };

type ContainerProps = {
  children?: React.ReactNode;
  padding?: ResponsivePadding;
  maxWidth?: string;
  backgroundColor?: keyof typeof tokens.color | string;
  center?: boolean;
  className?: string;
};

type SpacingKey = keyof typeof tokens.spacing;
type PaddingValue = SpacingKey | string | number;

export const Container: React.FC<ContainerProps> = ({
  children,
  padding = { sm: 'md', md: 'lg', lg: 'xl' },
  maxWidth = '1200px',
  backgroundColor = 'background',
  center = true,
  className,
}) => {
  const bgColor =
    tokens.color[backgroundColor as keyof typeof tokens.color] ||
    backgroundColor;

  const resolvePadding = (size: SpacingKey | string | number): string =>
    typeof size === 'number'
      ? `${size}px`
      : (tokens.spacing[size as SpacingKey] as string | undefined) || size;

  const paddingObj =
    typeof padding === 'object' && !Array.isArray(padding)
      ? padding
      : {
          sm: padding,
          md: padding,
          lg: padding,
        };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth,
        margin: center ? '0 auto' : undefined,
        backgroundColor: bgColor,
        boxSizing: 'border-box',
        padding: resolvePadding((paddingObj.sm as PaddingValue) ?? 'md'),
      }}
    >
      <div
        style={{
          width: '100%',
          paddingLeft: resolvePadding((paddingObj.md as PaddingValue) ?? 'lg'),
          paddingRight: resolvePadding((paddingObj.md as PaddingValue) ?? 'lg'),
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @media (min-width: ${tokens.breakpoint.md}) {
          div > div {
            padding-left: ${resolvePadding(
              (paddingObj.md as PaddingValue) ?? 'lg'
            )};
            padding-right: ${resolvePadding(
              (paddingObj.md as PaddingValue) ?? 'lg'
            )};
          }
        }
        @media (min-width: ${tokens.breakpoint.lg}) {
          div > div {
            padding-left: ${resolvePadding(
              (paddingObj.lg as PaddingValue) ?? 'xl'
            )};
            padding-right: ${resolvePadding(
              (paddingObj.lg as PaddingValue) ?? 'xl'
            )};
          }
        }
      `}</style>
    </div>
  );
};
