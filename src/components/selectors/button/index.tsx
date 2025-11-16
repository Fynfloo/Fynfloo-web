import { User } from '@/types/user';
import { UserComponent, useNode } from '@craftjs/core';
import cn from 'classnames';
import React from 'react';
import { styled } from 'styled-components';

type ButtonProps = {
  background?: Record<'r' | 'g' | 'b' | 'a', number>;
  color?: Record<'r' | 'g' | 'b' | 'a', number>;
  buttonStyle?: string;
  margin?: string[];
  text?: string;
  textComponent?: UserComponent<unknown>;
};

type StyledButtonProps = {
  $background?: Record<'r' | 'g' | 'b' | 'a', number>;
  $buttonStyle?: string;
  $margin?: string[];
};

const StyleButton = styled.button<StyledButtonProps>`
  background: ${(props) =>
    props.$buttonStyle === 'full'
      ? `rgba(${props.$background?.r}, ${props.$background?.g}, ${props.$background?.b}, ${props.$background?.a})`
      : 'transparent'};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.$buttonStyle === 'outline'
      ? `rgba(${props.$background?.r}, ${props.$background?.g}, ${props.$background?.b}, ${props.$background?.a})`
      : 'transparent'};
  margin: ${({ $margin }) =>
    `${$margin?.[0] || 0}px ${$margin?.[1] || 0}px ${$margin?.[2] || 0}px ${
      $margin?.[3] || 0
    }px`};
`;

export const Button: UserComponent<ButtonProps> = ({
  text,
  textComponent,
  color,
  buttonStyle,
  background,
  margin,
}: ButtonProps) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <StyleButton
      ref={(dom) => {
        if (dom) connect(dom);
      }}
      className={cn([
        'rounded w-full px-4 py-2',
        {
          'shadow-lg': buttonStyle === 'full',
        },
      ])}
      $buttonStyle={buttonStyle}
      $background={background}
      $margin={margin}
    ></StyleButton>
  );
};
