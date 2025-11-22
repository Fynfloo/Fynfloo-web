import React from 'react';
import { ToolbarSection, ToolbarItem } from '@/components/toolbar';

export const SectionSettings = () => {
  return (
    <div className="">
      <ToolbarSection title="Padding" props={['padding']}>
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
      </ToolbarSection>
      <ToolbarSection title="Background Color" props={['bg']}>
        <ToolbarItem
          propKey="bg"
          type="color"
          label="Background Color"
          placeholder="rgba(255, 255, 255, 1)"
        />
      </ToolbarSection>
      <ToolbarSection title="Text Alignment" props={['center']}>
        <ToolbarItem propKey="center" type="toggle" label="Center Align Text" />
      </ToolbarSection>
    </div>
  );
};
