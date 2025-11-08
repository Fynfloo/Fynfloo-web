'use client';

import React from 'react';
import * as Radix from '@radix-ui/themes';
import * as Slider from '@radix-ui/react-slider';
import { Button } from '@/components/user/button';
import { Text } from '@/components/user/text';
import { tokens } from '@/design-system/tokens';

export const SettingsPanel = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        padding: tokens.spacing.lg,
        marginTop: tokens.spacing.md,
        borderRadius: tokens.radius.md,
      }}
    >
      <Radix.Flex align="center" justify="between" mb="md">
        <Text size="md" weight="bold" color="textPrimary">
          Selected
        </Text>
        <div
          style={{
            backgroundColor: tokens.color.primary,
            color: tokens.color.textOnPrimary,
            fontSize: tokens.font.sizes.sm,
            borderRadius: tokens.radius.full,
            padding: '2px 10px',
          }}
        >
          Selected
        </div>
      </Radix.Flex>

      {/* Slider control */}
      <div style={{ marginBottom: tokens.spacing.lg }}>
        <Text
          size="sm"
          weight="medium"
          color="textSecondary"
          margin={`0 0 ${tokens.spacing.sm} 0`}
        >
          Padding
        </Text>
        <Slider.Root
          defaultValue={[20]}
          min={7}
          max={50}
          step={1}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '20px',
          }}
        >
          <Slider.Track
            style={{
              backgroundColor: tokens.color.border,
              position: 'relative',
              flexGrow: 1,
              height: '4px',
              borderRadius: tokens.radius.full,
            }}
          />
          <Slider.Range
            style={{
              position: 'absolute',
              backgroundColor: tokens.color.primary,
              height: '100%',
              borderRadius: tokens.radius.full,
            }}
          />
          <Slider.Thumb
            style={{
              display: 'block',
              width: '16px',
              height: '16px',
              backgroundColor: tokens.color.primary,
              borderRadius: '50%',
              border: `2px solid ${tokens.color.textOnPrimary}`,
              cursor: 'pointer',
            }}
          />
        </Slider.Root>
      </div>

      {/* Delete button */}
      <Button
        label="Delete"
        color="secondary"
        variant="outline"
        radius="md"
        size="sm"
      />
    </div>
  );
};
