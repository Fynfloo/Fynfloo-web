import React from 'react';
import { ToolbarSection, ToolbarItem } from '@/components/toolbar';

export const SectionSettings = () => {
  return (
    <div className="">
      <ToolbarSection title="Section" props={['padding', 'bg', 'center']}>
        <ToolbarItem
          propKey="padding"
          type="select"
          label="Padding"
          placeholder="md"
          options={[
            { label: 'none', value: 'none' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
          ]}
        />
        <ToolbarItem
          propKey="bg"
          type="color"
          label="Background Color"
          placeholder="rgba(127, 34, 254, 0.05)"
        />
        <ToolbarItem
          propKey="center"
          type="select"
          label="Text Align"
          placeholder="left"
          options={[
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
          ]}
        />
      </ToolbarSection>
    </div>
  );
};
