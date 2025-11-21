import { useNode } from '@craftjs/core';
import * as React from 'react';
import { ToolbarTextInput } from './toolbar-text-input';
import { RGBA } from '@/types/selector-type';
import { ToolbarSelect } from './toolbar-select';

export type ToolbarItemProps = {
  label?: string;
  propKey: string;
  index?: number;
  options?: { label: string; value: string }[];
  placeholder?: string;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: RGBA) => void;
};

export const ToolbarItem = ({
  propKey,
  label,
  options,
  placeholder,
  index = 0,
  children,
  type,
  onChange,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }));

  const value = Array.isArray(propValue) ? propValue[index] : propValue;

  return (
    <div className="w-full space-y-1 text-muted-foreground text-xs">
      {['text', 'number', 'color', 'bg'].includes(type) ? (
        <ToolbarTextInput
          {...props}
          type={type}
          value={value}
          label={label}
          onChange={(value) => {
            setProp((props: Record<string, unknown>) => {
              // if (Array.isArray(propValue)) {
              //   props[propKey][index] = onChange ? onChange(value) : value;
              // } else {
              props[propKey] = onChange ? onChange(value) : value;
              // }
            }, 500);
          }}
        />
      ) : type === 'select' ? (
        <ToolbarSelect
          {...props}
          value={value as string}
          placeholder={placeholder}
          options={options || []}
          label={label}
          onChange={(value: string) => {
            setProp((props: Record<string, unknown>) => {
              props[propKey] = value;
            }, 500);
          }}
        />
      ) : null}
    </div>
  );
};
