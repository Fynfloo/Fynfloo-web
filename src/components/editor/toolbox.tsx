'use client';

import React from 'react';
import * as Radix from '@radix-ui/themes';
import { Button } from '@/components/user/button';
import { Text } from '@/components/user/text';
import { tokens } from '@/design-system/tokens';

export const Toolbox = () => {
  return (
    <Radix.Flex
      direction="column"
      align="center"
      gap="md"
      style={{
        padding: tokens.spacing.lg,
        backgroundColor: tokens.color.surfaceAlt,
        borderRight: `1px solid ${tokens.color.border}`,

        width: '240px',
      }}
    >
      <Text size="lg" weight="bold" color="textPrimary">
        Drag to add
      </Text>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.sm,
        }}
      >
        <Button label="Button" variant="outline" color="primary" />
        <Button label="Text" variant="outline" color="secondary" />
        <Button label="Container" variant="outline" color="accent" />
        <Button label="Card" variant="outline" color="primary" />
      </div>
    </Radix.Flex>
  );
};
