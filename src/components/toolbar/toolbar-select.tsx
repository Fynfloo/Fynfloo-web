'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useNode } from '@craftjs/core';
import { useEffect, useState } from 'react';

export type ToolbarSelectProps = {
  placeholder?: string;
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

export function ToolbarSelect({
  placeholder,
  value,
  options,
  label,
  onChange,
}: ToolbarSelectProps) {
  const [internalValue, setInternalValue] = useState<string>('');

  useEffect(() => {
    setInternalValue(value || '');
  }, [value, options]);
  return (
    <div className="w-full space-y-1">
      {label && <Label className="text-xs font-normal">{label}</Label>}
      <Select
        value={internalValue}
        onValueChange={(val) => {
          setInternalValue(val);
          onChange?.(val);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
