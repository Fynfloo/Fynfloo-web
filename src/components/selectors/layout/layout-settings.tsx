import React from 'react';
import { ToolbarSection, ToolbarItem } from '@/components/toolbar';
import { useNode } from '@craftjs/core';

export const LayoutSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));
  return (
    <ToolbarSection
      title="Layout Settings"
      props={['layout', 'columns', 'gap']}
    >
      <ToolbarItem
        propKey="layout"
        type="select"
        label="Layout Type"
        placeholder="flex"
        options={[
          { label: 'Flex', value: 'flex' },
          { label: 'Grid', value: 'grid' },
        ]}
      />
      {props.layout === 'grid' && (
        <ToolbarItem
          propKey="columns"
          type="number"
          label="Number of Columns"
          min={1}
          max={12}
        />
      )}
      <ToolbarItem
        propKey="gap"
        type="select"
        label="Gap Size"
        placeholder="md"
        options={[
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ]}
      />
    </ToolbarSection>
  );
};
