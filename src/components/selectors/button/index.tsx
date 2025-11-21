import { UserComponent, useNode } from '@craftjs/core';
import cn from 'classnames';
import React from 'react';
import { styled } from 'styled-components';
import { ButtonSettings } from './button-settings';
import { Text, TextProps } from '../text';
import { RGBA } from '@/types/selector-type';
import { rgbaToCss } from '@/lib/helper';
import { useMemo } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'dark'
  | 'light';

export type ButtonStyle = 'full' | 'outline' | 'ghost' | 'link';

type ButtonProps = {
  variant?: ButtonVariant;
  buttonStyle?: ButtonStyle;
  margin?: string[];
  padding?: string[];
  radius?: number;
  shadow?: number;
  width?: 'auto' | 'full';
  url?: string;
  openInNewTab?: boolean;
  text?: string;
  textComponent?: Partial<TextProps>;
};

type StyledButtonProps = {
  $background?: RGBA;
  $hoverBackground?: RGBA;
  $hoverColor?: RGBA;
  $color?: RGBA;
  $buttonStyle?: ButtonStyle;
  $margin?: string[];
  $padding?: string[];
  $radius?: number;
  $shadow?: number;
  $width?: string;
};

const ButtonThemes: Record<
  ButtonVariant,
  { background: RGBA; color: RGBA; hoverBackground: RGBA; hoverColor: RGBA }
> = {
  primary: {
    background: { r: 0, g: 122, b: 255, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    hoverBackground: { r: 0, g: 105, b: 220, a: 1 },
    hoverColor: { r: 255, g: 255, b: 255, a: 1 },
  },
  secondary: {
    background: { r: 108, g: 117, b: 125, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    hoverBackground: { r: 90, g: 98, b: 104, a: 1 },
    hoverColor: { r: 255, g: 255, b: 255, a: 1 },
  },
  success: {
    background: { r: 40, g: 167, b: 69, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    hoverBackground: { r: 33, g: 138, b: 57, a: 1 },
    hoverColor: { r: 255, g: 255, b: 255, a: 1 },
  },
  danger: {
    background: { r: 220, g: 53, b: 69, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    hoverBackground: { r: 200, g: 45, b: 58, a: 1 },
    hoverColor: { r: 255, g: 255, b: 255, a: 1 },
  },
  warning: {
    background: { r: 255, g: 193, b: 7, a: 1 },
    color: { r: 0, g: 0, b: 0, a: 1 },
    hoverBackground: { r: 220, g: 170, b: 0, a: 1 },
    hoverColor: { r: 0, g: 0, b: 0, a: 1 },
  },
  dark: {
    background: { r: 52, g: 58, b: 64, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    hoverBackground: { r: 35, g: 40, b: 44, a: 1 },
    hoverColor: { r: 255, g: 255, b: 255, a: 1 },
  },
  light: {
    background: { r: 248, g: 249, b: 250, a: 1 },
    color: { r: 0, g: 0, b: 0, a: 1 },
    hoverBackground: { r: 225, g: 226, b: 228, a: 1 },
    hoverColor: { r: 0, g: 0, b: 0, a: 1 },
  },
};

const StyleButton = styled.button<StyledButtonProps>`
  background: ${({ $buttonStyle, $background }) =>
    $buttonStyle === 'full' && $background
      ? rgbaToCss($background)
      : 'transparent'};
  color: ${({ $color }) => ($color ? rgbaToCss($color) : 'inherit')};
  border: 2px solid
    ${({ $buttonStyle, $background }) =>
      $buttonStyle === 'outline' && $background
        ? rgbaToCss($background)
        : 'transparent'};
  width: ${({ $width }) => ($width === 'full' ? '100%' : 'auto')};
  margin: ${({ $margin }) =>
    `${$margin?.[0] || 0}px ${$margin?.[1] || 0}px ${$margin?.[2] || 0}px ${
      $margin?.[3] || 0
    }px`};
  padding: ${({ $padding }) =>
    `${$padding?.[0] || 10}px ${$padding?.[1] || 20}px`};
  border-radius: ${({ $radius }) => `${$radius || 4}px`};
  box-shadow: ${({ $shadow }) =>
    $shadow ? `0px 2px ${$shadow}px rgba(0,0,0,0.2)` : 'none'};
  transition: all 0.15s ease-in-out;

  &:hover {
    background: ${({ $buttonStyle, $hoverBackground, $background }) =>
      $hoverBackground
        ? rgbaToCss($hoverBackground)
        : $buttonStyle === 'outline' || $buttonStyle === 'ghost'
        ? rgbaToCss({ ...$background!, a: 0.1 })
        : undefined};
    color: ${({ $hoverColor }) =>
      $hoverColor ? rgbaToCss($hoverColor) : undefined};
  }
`;

export const Button: UserComponent<ButtonProps> = ({
  variant = 'primary',
  buttonStyle = 'full',
  margin,
  padding,
  radius,
  shadow,
  width,
  url,
  openInNewTab,
  text,
  textComponent,
}: ButtonProps) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({ selected: node.events.selected }));

  // Automatically derive colors from variant + buttonStyle
  const { background, color, hoverBackground, hoverColor } = useMemo(() => {
    const theme = ButtonThemes[variant];
    switch (buttonStyle) {
      case 'full':
        return theme;
      case 'outline':
        return {
          background: { r: 0, g: 0, b: 0, a: 0 },
          color: theme.background,
          hoverBackground: { ...theme.background, a: 0.1 },
          hoverColor: theme.background,
        };
      case 'ghost':
        return {
          background: { r: 0, g: 0, b: 0, a: 0 },
          color: theme.background,
          hoverBackground: { ...theme.background, a: 0.05 },
          hoverColor: theme.background,
        };
      case 'link':
        return {
          background: { r: 0, g: 0, b: 0, a: 0 },
          color: theme.background,
          hoverBackground: { r: 0, g: 0, b: 0, a: 0 },
          hoverColor: { ...theme.background, a: 0.3 },
        };
      default:
        return theme;
    }
  }, [variant, buttonStyle]);

  const content = (
    <StyleButton
      ref={(dom) => {
        if (dom) connect(dom);
      }}
      className={cn(['font-medium'])}
      $buttonStyle={buttonStyle}
      $background={background}
      $hoverBackground={hoverBackground}
      $hoverColor={hoverColor}
      $color={color}
      $margin={margin}
      $padding={padding}
      $radius={radius}
      $shadow={shadow}
      $width={width}
    >
      <Text {...textComponent} text={text || ''} color={color} />
    </StyleButton>
  );

  return url ? (
    <a
      href={url}
      target={openInNewTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    content
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    text: 'Button',
    variant: 'primary',
    buttonStyle: 'full',
    margin: ['5', '0', '5', '0'],
    padding: ['10', '20'],
    radius: 6,
    shadow: 8,
    width: 'auto',
    url: '',
    openInNewTab: false,
    textComponent: {
      ...Text.craft.props,
      tagName: 'span',
      textAlign: 'center',
    },
  },
  related: { toolbar: ButtonSettings },
};
