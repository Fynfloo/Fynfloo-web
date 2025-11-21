import { UserComponent, useNode } from '@craftjs/core';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { styled } from 'styled-components';
import { ButtonSettings } from './button-settings';
import { Text, TextProps } from '../text';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

// TODO: Support icons in button later
export type ButtonSize =
  | 'default'
  | 'sm'
  | 'lg'
  | 'icon'
  | 'icon-sm'
  | 'icon-lg';

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
}

interface ButtonProps {
  text?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  textComponent?: TextProps;
  url?: string;
  openInNewTab?: boolean;
}

const StyleButton = styled.a<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  outline: none;
  cursor: pointer;

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return `
      background-color: var(--primary);
      color: var(--primary-foreground);
      &:hover {
      background-color: oklch(from var(--primary) l c h / 0.9);
      }
      `;

      case 'destructive':
        return `
        background-color: var(--destructive);
        color: white;
        &:hover {
          background-color: oklch(from var(--destructive) l c h / 0.9);
          }
          &:focus-visible {
          box-shadow: 0 0 0 3px oklch(from var(--destructive) l c h / 0.2);
          }`;

      case 'outline':
        return `
        border: 1px solid var(--border);
        background-color: var(--background);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        &:hover {
          background-color: var(--accent);
          color: var(--accent-foreground);
        }`;
      case 'secondary':
        return `
        background-color: var(--secondary);
        color: var(--secondary-foreground);
        &:hover {
          background-color: oklch(from var(--secondary) l c h / 0.8);
        }`;
      case 'ghost':
        return `
        background-color: transparent;
        &:hover {
          background-color: var(--accent);
          color: var(--accent-foreground);
        }`;
      case 'link':
        return `
        background-color: transparent;
        color: var(--primary);
        text-decoration: underline;
        &:hover {
        text-decoration: underline;
        }`;
      default:
        return ``;
    }
  }}

  ${({ $size }) => {
    switch ($size) {
      case 'default':
        return 'height: 2.25rem; padding: 0 1rem;';
      case 'sm':
        return 'height: 2rem; padding: 0 0.75rem; gap: 0.375rem;';
      case 'lg':
        return 'height: 2.5rem; padding: 0 1.5rem;';
      // case 'icon':
      //   return 'width: 2.25rem; height: 2.25rem;';
      // case 'icon-sm':
      //   return 'width: 2rem; height: 2rem;';
      // case 'icon-lg':
      //   return 'width: 2.5rem; height: 2.5rem;';
      default:
        return '';
    }
  }}
`;

export const Button: UserComponent<ButtonProps> = ({
  text,
  variant = 'default',
  size = 'default',
  textComponent,
  url,
  openInNewTab = false,
}) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({ selected: node.events.selected }));

  return (
    <StyleButton
      ref={(dom: unknown) => {
        if (dom) connect(dom as HTMLElement);
      }}
      href={url || undefined}
      target={url && openInNewTab ? '_blank' : undefined}
      rel={url && openInNewTab ? 'noopener noreferrer' : undefined}
      as={url ? 'a' : 'button'}
      $variant={variant}
      $size={size}
    >
      <Text {...textComponent} text={text || ''} />
    </StyleButton>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    text: 'Button',
    variant: 'default',
    size: 'default',
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
