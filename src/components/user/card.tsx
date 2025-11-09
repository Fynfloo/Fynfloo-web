'use client';

import React from 'react';
import { Text } from './text';
import { Button } from './button';
import { Container } from './container';
import { tokens } from '@/design-system/tokens';

type CardProps = {
  backgroundColor?: keyof typeof tokens.color;
  padding?: Partial<Record<'sm' | 'md' | 'lg', keyof typeof tokens.spacing>>;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
};

export const Card: React.FC<CardProps> = ({
  backgroundColor = 'surfaceAlt',
  padding = { sm: 'md', md: 'lg', lg: 'xl' },
  title = 'Title',
  subtitle = 'Subtitle',
  buttonLabel = 'Learn More',
}) => {
  return (
    <Container backgroundColor={backgroundColor} padding={padding}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.md,
        }}
      >
        <Text as="h3" size="lg" weight="bold" color="textPrimary">
          {title}
        </Text>
        <Text size="md" weight="normal" color="textSecondary">
          {subtitle}
        </Text>
        <div>
          <Button
            label={buttonLabel}
            variant="solid"
            color="primary"
            size="md"
          />
        </div>
      </div>
    </Container>
  );
};
