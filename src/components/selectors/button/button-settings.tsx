import React from 'react';
import { useNode } from '@craftjs/core';
import { ToolbarSection, ToolbarItem } from '@/components/toolbar';
import { ButtonVariant, ButtonSize } from '.';

export const ButtonSettings = () => {
  const variants: ButtonVariant[] = [
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ];
  // TODO: Support icons in button later
  const sizes: ButtonSize[] = [
    'default',
    'sm',
    'lg',
    // 'icon',
    // 'icon-sm',
    // 'icon-lg',
  ];
  return (
    <div className="">
      {/* Size */}
      <ToolbarSection
        title="Size"
        props={['size', 'variant', 'url', 'openInNewTab']}
      >
        <ToolbarItem
          propKey="size"
          type="select"
          label="Size"
          placeholder="default"
          options={sizes.map((size) => ({ label: size, value: size }))}
        />
        <ToolbarItem
          propKey="variant"
          type="select"
          label="Variant"
          placeholder="default"
          options={variants.map((variant) => ({
            label: variant,
            value: variant,
          }))}
        />
        <ToolbarItem
          propKey="url"
          type="text"
          label="URL"
          placeholder="https://example.com"
        />
        <ToolbarItem
          propKey="openInNewTab"
          type="checkbox"
          label="Open in new tab"
        />
      </ToolbarSection>
    </div>
  );
};
