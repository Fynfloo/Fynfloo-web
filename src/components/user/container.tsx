import React from 'react';
import { tokens } from '@/design-system/tokens';

type ContainerProps = {
  children?: React.ReactNode;
  padding?: {
    sm?: keyof typeof tokens.spacing | string;
    md?: keyof typeof tokens.spacing | string;
    lg?: keyof typeof tokens.spacing | string;
  };
  maxWidth?: string;
  backgroundColor?: keyof typeof tokens.color | string;
  center?: boolean;
  className?: string;
};

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

  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth,
        margin: center ? '0 auto' : undefined,
        backgroundColor: bgColor,
        boxSizing: 'border-box',
        padding:
          tokens.spacing[padding.sm as keyof typeof tokens.spacing] ||
          padding.sm,
      }}
    >
      <div
        style={{
          width: '100%',
          paddingLeft: `calc(${
            tokens.spacing[padding.md as keyof typeof tokens.spacing] ||
            padding.md
          })`,
          paddingRight: `calc(${
            tokens.spacing[padding.md as keyof typeof tokens.spacing] ||
            padding.md
          })`,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @media (min-width: ${tokens.breakpoint.md}) {
          div > div {
            padding-left: ${tokens.spacing[
              padding.md as keyof typeof tokens.spacing
            ] || padding.md};
            padding-right: ${tokens.spacing[
              padding.md as keyof typeof tokens.spacing
            ] || padding.md};
          }
        }
        @media (min-width: ${tokens.breakpoint.lg}) {
          div > div {
            padding-left: ${tokens.spacing[
              padding.lg as keyof typeof tokens.spacing
            ] || padding.lg};
            padding-right: ${tokens.spacing[
              padding.lg as keyof typeof tokens.spacing
            ] || padding.lg};
          }
        }
      `}</style>
    </div>
  );
};
