import React from 'react';
import { useNode } from '@craftjs/core';
import { ToolbarSection, ToolbarItem } from '@/components/toolbar';
import { ButtonVariant, ButtonStyle } from '.';

export const ButtonSettings = () => {
  const variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'dark',
    'light',
  ];
  const styles: ButtonStyle[] = ['full', 'outline', 'ghost', 'link'];
  return (
    <div className="">
      {/* Colors */}
      {/* <ToolbarSection
        title="Colors"
        props={['background', 'color', 'hoverBackground', 'hoverColor']}
      >
        <ToolbarItem propKey="background" type="bg" label="Background" />
        <ToolbarItem propKey="color" type="color" label="Text Color" />
        <ToolbarItem
          propKey="hoverBackground"
          type="bg"
          label="Hover Background"
        />
        <ToolbarItem propKey="hoverColor" type="color" label="Hover Text" />
      </ToolbarSection> */}

      {/* Button Style */}
      <ToolbarSection title="Button Style" props={['buttonStyle']}>
        <ToolbarItem
          propKey="buttonStyle"
          type="select"
          label="Style"
          placeholder="full"
          options={styles.map((style) => ({ label: style, value: style }))}
        />
      </ToolbarSection>

      {/* Variant */}
      <ToolbarSection title="Variant" props={['variant']}>
        <ToolbarItem
          propKey="variant"
          type="select"
          label="Variant"
          placeholder="primary"
          options={variants.map((variant) => ({
            label: variant,
            value: variant,
          }))}
        />
      </ToolbarSection>

      {/* Size / Layout Section */}
      <ToolbarSection
        title="Layout"
        props={['width', 'padding', 'margin', 'radius', 'shadow']}
      >
        <ToolbarItem propKey="width" type="text" label="Width (auto/full)" />
        <ToolbarItem
          propKey="padding"
          type="text"
          label="Padding [top, right]"
        />
        <ToolbarItem
          propKey="margin"
          type="text"
          label="Margin [top, right, bottom, left]"
        />
        <ToolbarItem propKey="radius" type="number" label="Border Radius" />
        <ToolbarItem propKey="shadow" type="number" label="Shadow Depth" />
      </ToolbarSection>

      {/* Link Section */}
      <ToolbarSection title="Link" props={['url', 'openInNewTab']}>
        <ToolbarItem propKey="url" type="text" label="URL" />
        <ToolbarItem
          propKey="openInNewTab"
          type="text"
          label="Open in new tab"
        />
      </ToolbarSection>

      {/* Text Section */}
      <ToolbarSection title="Text" props={['text', 'textComponent']}>
        <ToolbarItem propKey="text" type="text" label="Button Text" />
      </ToolbarSection>
    </div>
  );
};
