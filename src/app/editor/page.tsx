'use client';

import React from 'react';
import AuthGuard from '@/components/auth-guard';
import { EditorShell } from '@/components/editor/components/editorShell';

export default function EditorPage() {
  return (
    <AuthGuard>
      <EditorInner />
    </AuthGuard>
  );
}

function EditorInner() {
  return (
    <main>
      <EditorShell />
    </main>
  );
}
