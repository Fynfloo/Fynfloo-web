import React from 'react';
import { requireAuth } from '@/lib/require-auth';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <DashboardShell>{children}</DashboardShell>;
}
