import React from 'react';
import { styled } from 'styled-components';
import { useNode } from '@craftjs/core';
import { UserComponent } from '@craftjs/core';

export type CanvasProps = {
  children?: React.ReactNode;
  mode?: 'boxed' | 'wide' | 'full';
  padding?: 'none' | 'sm' | 'md';
  className?: string;
};

const MAX_WIDTH_MAP = {
  boxed: '1200px',
  wide: '1600px',
  full: '100%',
};

type StyledCanvasProps = {
  $mode?: CanvasProps['mode'];
  $padding?: CanvasProps['padding'];
};

const paddingX = {
  none: '0',
  sm: '1rem',
  md: '2rem',
};

const StyledCanvas = styled.div<StyledCanvasProps>`
  width: 100%;
  min-height: 20px;
  background: rgba(127, 34, 254, 0.1);
  max-width: ${({ $mode }) => MAX_WIDTH_MAP[$mode || 'boxed']};
  margin: 0 auto;
  padding-left: ${({ $padding }) => paddingX[$padding || 'sm']};
  padding-right: ${({ $padding }) => paddingX[$padding || 'sm']};
  box-sizing: border-box;
`;

export const Canvas: UserComponent<CanvasProps> = (props) => {
  const {
    connectors: { connect },
  } = useNode();

  const { mode, padding, children, className } = props;

  return (
    <StyledCanvas
      ref={(dom: HTMLDivElement) => {
        if (dom) connect(dom);
      }}
      $mode={mode}
      $padding={padding}
      className={className}
    >
      {children}
    </StyledCanvas>
  );
};

Canvas.craft = {
  displayName: 'Canvas',
  props: {
    mode: 'boxed',
    padding: 'sm',
  },
};
