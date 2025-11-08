import React from 'react';
import { Text } from './text';
import { Button } from './button';
import { Container } from './container';
import { tokens } from '@/design-system/tokens';

type ResponsivePadding = {
  sm?: keyof typeof tokens.spacing | string;
  md?: keyof typeof tokens.spacing | string;
  lg?: keyof typeof tokens.spacing | string;
};

type CardProps = {
  backgroundColor?: keyof typeof tokens.color | string;
  padding?: ResponsivePadding;
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
    <Container
      backgroundColor={backgroundColor}
      padding={padding}
      className="card-wrapper"
    >
      <div
        className="card-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.md,
        }}
      >
        <Text size="lg" weight="bold" color="textPrimary">
          {title}
        </Text>
        <Text size="md" weight="normal" color="textSecondary">
          {subtitle}
        </Text>
        <div className="card-actions">
          <Button
            label={buttonLabel}
            variant="solid"
            color="primary"
            radius="md"
            size="sm"
          />
        </div>
      </div>
    </Container>
  );
};
