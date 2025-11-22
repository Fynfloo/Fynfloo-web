import React from 'react';
import { styled } from 'styled-components';
import { RGBA } from '@/types/selector-type';
import { UserComponent, useNode, Element } from '@craftjs/core';
import { SectionSettings } from './section-settings';

export type SectionProps = {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bg?: RGBA;
  center?: 'center' | 'left';
  children?: React.ReactNode;
};

const paddingMap = {
  none: '0',
  sm: '1rem 0',
  md: '2rem 0',
  lg: '4rem 0',
};

type StyledSectionProps = {
  $padding?: SectionProps['padding'];
  $bg?: RGBA;
  $center?: string;
};

const StyledSection = styled.section<StyledSectionProps>`
  width: 100%;
  display: block;
  padding: ${({ $padding }) => paddingMap[$padding || 'md']};
  background: ${({ $bg }) =>
    $bg ? `rgba(${$bg.r}, ${$bg.g}, ${$bg.b}, ${$bg.a})` : 'transparent'};
  text-align: ${({ $center }) => ($center === 'center' ? 'center' : 'left')};
`;

export const Section: UserComponent<SectionProps> = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { padding, bg, center, children } = props;

  return (
    <StyledSection
      ref={(dom: HTMLDivElement) => {
        if (dom) connect(drag(dom));
      }}
      $padding={padding}
      $bg={bg}
      $center={center}
    >
      {children}
    </StyledSection>
  );
};

Section.craft = {
  displayName: 'Section',
  props: {
    padding: 'md',
    bg: { r: 127, g: 34, b: 254, a: 0.05 },
    center: 'left',
  },
  related: { toolbar: SectionSettings },
};
