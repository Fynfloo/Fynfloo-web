'use client';

import React from 'react';
import { tokens } from '@/design-system/tokens';
import AuthGuard from '@/components/auth-guard';

import { Topbar } from '@/components/editor/topbar';
import { Toolbox } from '@/components/editor/toolbox';
import { Container } from '@/components/user/container';
import { SettingsPanel } from '@/components/editor/settingsPanel';
import { Card } from '@/components/user/card';
import { Text } from '@/components/user/text';

export default function EditorPage() {
  return (
    <AuthGuard>
      <EditorInner />
    </AuthGuard>
  );
}

function EditorInner() {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1200px',
        padding: tokens.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.lg,
      }}
    >
      {/* Title*/}
      <Text as="h1" size="xl" weight="bold" align="center" color="textPrimary">
        A super simple page editor
      </Text>

      {/* Topbar */}
      <Topbar />

      {/* Main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gap: tokens.spacing.lg,
          alignItems: 'start',
        }}
      >
        {/* Canvas Area */}
        <Container
          backgroundColor={tokens.color.backgroundAlt}
          padding={{ sm: 'md', md: 'lg', lg: 'xl' }}
        >
          <Card />
        </Container>

        {/* Sidebar (Toolbox + SettingsPanel) */}
        <div
          style={{
            backgroundColor: tokens.color.surface,
            borderRadius: tokens.radius.md,
            border: `1px solid ${tokens.color.border}`,
            padding: tokens.spacing.md,
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing.md,
            height: 'fit-content',
          }}
        >
          <Toolbox />
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}
