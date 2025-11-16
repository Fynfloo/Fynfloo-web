import classNames from 'classnames';
import React from 'react';
import { styled } from 'styled-components';
import { ChevronDown } from 'lucide-react';

const SidebarItemDiv = styled.div<{ $visible?: boolean; $height?: string }>`
  height: ${(props) =>
    props.$visible && props.$height && props.$height !== 'full'
      ? `${props.$height}`
      : 'auto'};
  flex: ${(props) =>
    props.$visible && props.$height && props.$height === 'full'
      ? '1'
      : 'unset'};
  color: var(--foreground);
  border-bottom: 1px transparent solid;
  border-color: ${(props) =>
    props.$visible ? 'var(--border)' : 'transparent'};
`;

// TODO: add size
// const Chevron = styled.a<{ $visible: boolean }>`
//   transform: rotate(${(props) => (props.$visible ? 180 : 0)}deg);
// `;

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon: React.ReactNode;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

// TODO: if we will need SVG filling
const HeaderDiv = styled.div`
  color: var(--foreground);
  height: var(--header-height);
`;

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange,
  className,
}) => {
  return (
    <SidebarItemDiv
      $visible={visible}
      $height={height}
      className={classNames('flex flex-col', className)}
    >
      <HeaderDiv
        onClick={() => {
          if (onChange) {
            onChange(!visible);
          }
        }}
        className={`cursor-pointer bg-white border-border last:border-b-0 flex items-center px-2 ${
          visible ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex-1 flex items-center">
          {icon}
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{ transform: visible ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </HeaderDiv>
      {visible && <div className="w-full flex-1 overflow-auto">{children}</div>}
    </SidebarItemDiv>
  );
};
