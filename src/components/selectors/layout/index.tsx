import React from 'react';
import { styled } from 'styled-components';
import { useNode } from '@craftjs/core';
import { UserComponent } from '@craftjs/core';
import { LayoutSettings } from './layout-settings';

export type LayoutProps = {
  layout?: 'flex' | 'grid';
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
};

const GAP_MAP = {
  sm: '0.75rem',
  md: '1.25rem',
  lg: '2rem',
};

type StyledLayoutProps = {
  $layout?: LayoutProps['layout'];
  $columns?: LayoutProps['columns'];
  $gap?: LayoutProps['gap'];
};

const StyledLayout = styled.div<StyledLayoutProps>`
  width: 100%;
  background: rgba(34, 211, 238, 0.1);
  min-height: 50px;
  display: ${({ $layout }) => ($layout === 'flex' ? 'flex' : 'grid')};
  gap: ${({ $gap }) => GAP_MAP[$gap || 'md']};

  ${({ $layout, $columns }) =>
    $layout === 'grid'
      ? `
        grid-template-columns: repeat(${$columns || 3}, 1fr);

        @media (max-width: 1024px) {
          grid-template-columns: repeat(${Math.max(
            2,
            ($columns || 3) - 1
          )}, 1fr);
        }
        @media (max-width: 640px) {
          grid-template-columns: 1fr;
        }
  `
      : `
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    `}
`;

export const Layout: UserComponent<LayoutProps> = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <StyledLayout
      ref={(dom: HTMLDivElement) => {
        if (dom) connect(drag(dom));
      }}
      $layout={props.layout}
      $columns={props.columns}
      $gap={props.gap}
    >
      {props.children}
    </StyledLayout>
  );
};

Layout.craft = {
  displayName: 'Layout',
  props: {
    layout: 'flex',
    columns: 3,
    gap: 'md',
  },
  related: { toolbar: LayoutSettings },
};
