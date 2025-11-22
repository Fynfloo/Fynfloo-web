import React from 'react';
import { ToolbarSection, ToolbarItem } from '@/components/toolbar';

export const ContainerSettings = () => {
  return (
    <ToolbarSection title="Container Settings" props={['mode', 'padding']}>
      <ToolbarItem
        propKey="mode"
        type="select"
        label="Mode"
        placeholder="boxed"
        options={[
          { label: 'Boxed (1200px)', value: 'boxed' },
          { label: 'Wide (1600px)', value: 'wide' },
          { label: 'Full Width', value: 'full' },
        ]}
      />
      <ToolbarItem
        propKey="padding"
        type="select"
        label="Horizontal Padding"
        placeholder="sm"
        options={[
          { label: 'none', value: 'none' },
          { label: 'sm', value: 'sm' },
          { label: 'md', value: 'md' },
        ]}
      />
      <ToolbarItem
        propKey="align"
        type="select"
        label="Alignment"
        placeholder="left"
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ]}
      />
    </ToolbarSection>
  );
};
