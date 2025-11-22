import React from 'react';
import { styled } from 'styled-components';
import { useNode } from '@craftjs/core';
import { UserComponent } from '@craftjs/core';
import { ContainerSettings } from './container-settings';

export type ContainerProps = {
  children?: React.ReactNode;
  mode?: 'boxed' | 'wide' | 'full';
  padding?: 'none' | 'sm' | 'md';
  align?: 'center' | 'left' | 'right';
  className?: string;
};

const MAX_WIDTH_MAP = {
  boxed: '1200px',
  wide: '1600px',
  full: '100%',
};

type StyledContainerProps = {
  $mode?: ContainerProps['mode'];
  $padding?: ContainerProps['padding'];
  $align?: ContainerProps['align'];
};

const paddingX = {
  none: '0',
  sm: '1rem',
  md: '2rem',
};

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: ${({ $align }) =>
    $align === 'center'
      ? 'center'
      : $align === 'right'
      ? 'flex-end'
      : 'flex-start'};
  align-items: center;
  background: rgba(127, 34, 254, 0.1);
  max-width: ${({ $mode }) => MAX_WIDTH_MAP[$mode || 'boxed']};
  margin: 0 auto;
  padding-left: ${({ $padding }) => paddingX[$padding || 'sm']};
  padding-right: ${({ $padding }) => paddingX[$padding || 'sm']};
  box-sizing: border-box;
`;

export const Container: UserComponent<ContainerProps> = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { mode, padding, children, className, align } = props;

  return (
    <StyledContainer
      ref={(dom) => {
        if (dom) connect(drag(dom));
      }}
      $mode={mode}
      $padding={padding}
      $align={align}
      className={className}
    >
      {children}
    </StyledContainer>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    mode: 'boxed',
    padding: 'sm',
    align: 'center',
  },
  related: { toolbar: ContainerSettings },
};
