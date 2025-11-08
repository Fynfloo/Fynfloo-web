'use client';

import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/user/text';
import { tokens } from '@/design-system/tokens';

export const Topbar = () => {
  return (
    <div
      style={{
        backgroundColor: '#cbe8e7',
        marginTop: tokens.spacing.lg,
        marginBottom: tokens.spacing.sm,
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          flexWrap: 'wrap',
        }}
      >
        {/* Left section: Switch + Label */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            cursor: 'pointer',
          }}
        >
          <Switch.Root
            defaultChecked
            id="enable-switch"
            style={{
              all: 'unset',
              width: '36px',
              height: '20px',
              backgroundColor: '#ccc',
              borderRadius: '9999px',
              position: 'relative',
              WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            }}
          >
            <Switch.Thumb
              style={{
                display: 'block',
                width: '16px',
                height: '16px',
                backgroundColor: 'white',
                borderRadius: '9999px',
                transition: 'transform 100ms',
                transform: 'translateX(2px)',
              }}
              className="data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white"
            />
          </Switch.Root>
          <Text size="sm" weight="medium">
            Enable
          </Text>
        </label>

        {/* Right section: Button */}
        <Button variant="outline" size="sm" color="secondary">
          Serialize JSON to console
        </Button>
      </div>
    </div>
  );
};
