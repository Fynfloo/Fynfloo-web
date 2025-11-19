import { UserComponent, useNode } from '@craftjs/core';
import cn from 'classnames';
import React from 'react';
import { styled } from 'styled-components';
import { ButtonSettings } from './button-settings';
import { Text, TextProps } from '../text';
import { RGBA } from '@/types/selector-type';
import { rgbaToCss } from '@/lib/helper';

type ButtonProps = {
  background?: RGBA;
  color?: RGBA;
  buttonStyle?: string;
  margin?: string[];
  text?: string;
  textComponent?: Partial<TextProps>;
};

type StyledButtonProps = {
  $background?: RGBA;
  $buttonStyle?: string;
  $margin?: string[];
};

const StyleButton = styled.button<StyledButtonProps>`
  background: ${(props) =>
    props.$buttonStyle === 'full' && props.$background
      ? rgbaToCss(props.$background!)
      : 'transparent'};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.$buttonStyle === 'outline' && props.$background
      ? rgbaToCss(props.$background!)
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
    connectors: { connect, drag },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <StyleButton
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn([
        'rounded px-4 py-2',
        {
          'shadow-lg': buttonStyle === 'full',
        },
      ])}
      $buttonStyle={buttonStyle}
      $background={background}
      $margin={margin}
    >
      <Text {...textComponent} text={text || ''} color={color} />
    </StyleButton>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    background: { r: 0, g: 122, b: 255, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    buttonStyle: 'full',
    text: 'Button',
    margin: ['5', '0', '5', '0'],
    textComponent: {
      ...Text.craft.props,
      tagName: 'span',
      textAlign: 'center',
    },
  },
  related: {
    toolbar: ButtonSettings,
  },
};
