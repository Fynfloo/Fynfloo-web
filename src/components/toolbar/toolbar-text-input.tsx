'use client';

import { Input } from '@/components/ui/input';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

export type ToolbarTextInputProps = {
  label?: string;
  type: 'text' | 'number' | 'color' | 'bg';
  value: string | { r: number; g: number; b: number; a: number };
  onChange?: (value: string) => void;
};

export const ToolbarTextInput = ({
  onChange,
  value,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState<string>('');
  const [open, setOpen] = useState(false);

  const isColor = type === 'color' || type === 'bg';

  useEffect(() => {
    if (isColor && typeof value === 'object') {
      const { r, g, b, a } = value;
      setInternalValue(`rgba(${r}, ${g}, ${b}, ${a})`);
    } else {
      setInternalValue(String(value || ''));
    }
  }, [value, type]);

  return (
    <div className="w-full space-y-1">
      {label && <Label className="text-sm font-medium">{label}</Label>}

      {isColor ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full">
              <Input
                {...props}
                value={internalValue}
                readOnly
                className="cursor-pointer pl-10"
              />
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded border"
                style={{ background: internalValue }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <SketchPicker
              color={value as string}
              onChange={(color: ColorResult) => {
                const rgbaString = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
                setInternalValue(rgbaString);
                onChange?.(rgbaString);
              }}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Input
          {...props}
          type={type}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange?.(e.target.value);
          }}
        />
      )}
    </div>
  );
};
