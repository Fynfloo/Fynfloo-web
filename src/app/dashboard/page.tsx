import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { requireAuth } from '@/lib/require-auth';

export default async function Page() {
  const user = await requireAuth();
  return <DashboardShell />;
}
