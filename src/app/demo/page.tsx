'use client';

import React from 'react';
import AuthGuard from '@/components/auth-guard';
import App from '@/components/craft';
import { Theme } from '@radix-ui/themes';

export default function EditorPage() {
  return (
    <AuthGuard>
      <EditorInner />
    </AuthGuard>
  );
}

function EditorInner() {
  return (
    <main style={{ width: '100%' }}>
      <Theme>
        <App />
      </Theme>
    </main>
  );
}
