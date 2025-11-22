'use client';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

export type ToolbarNumberInputProps = {
  label?: string;
  type: string;
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

export const ToolbarNumberInput = ({
  onChange,
  value,
  label,
  type,
  min,
  max,
  ...props
}: ToolbarNumberInputProps) => {
  const [internalValue, setInternalValue] = useState<number>(0);
  useEffect(() => {
    setInternalValue(value);
  }, [value, type]);
  return (
    <div className="w-full space-y-1">
      {label && <Label className="text-xs font-normal">{label}</Label>}
      <Input
        {...props}
        type="number"
        value={internalValue}
        min={min}
        max={max}
        onChange={(e) => {
          setInternalValue(e.target.valueAsNumber);
          onChange && onChange(e.target.valueAsNumber);
        }}
      />
    </div>
  );
};
