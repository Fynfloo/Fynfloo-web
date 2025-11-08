import { tokens } from '@/design-system/tokens';
import React, { ElementType, ComponentPropsWithoutRef } from 'react';

export type PolymorphicProps<T extends ElementType> = {
  as?: T;
  text?: string;
  size?: keyof typeof tokens.font.sizes;
  weight?: keyof typeof tokens.font.weights;
  color?: keyof typeof tokens.color | string;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'color'>;

export const Text = React.forwardRef(
  <T extends ElementType = 'p'>(
    {
      as,
      text,
      children,
      size,
      weight,
      color,
      align = 'left',
      style,
      ...rest
    }: PolymorphicProps<T>,
    ref: React.Ref<any>
  ) => {
    const Tag = (as ?? ('p' as ElementType)) as ElementType;

    return (
      <Tag
        ref={ref}
        {...(rest as any)}
        style={{
          fontFamily: tokens.font.family.base,
          fontSize: size ? tokens.font.sizes[size] : undefined,
          fontWeight: weight ? tokens.font.weights[weight] : undefined,
          color: color ? (tokens.color as any)[color] || color : undefined,
          textAlign: align,
          ...style,
        }}
      >
        {text ?? children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';
