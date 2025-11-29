// app/s/[tenant]/dashboard/page.tsx

import { fetchMetrics } from '@/lib/fetchMetrics';
import { fetchTenant } from '@/lib/fetchTenant';
import { notFound } from 'next/navigation';

export default async function TenantDashboardPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  const currentTenant = await fetchTenant(tenant);
  if (!currentTenant) {
    notFound();
  }

  const data = await fetchMetrics(currentTenant.id);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {currentTenant.name} Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Store: {currentTenant.slug}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Orders</p>
          <p className="mt-2 text-2xl font-bold">{data.metrics.ordersCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Users</p>
          <p className="mt-2 text-2xl font-bold">{data.metrics.usersCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="mt-2 text-2xl font-bold">
            ₦{data.metrics.revenue.toLocaleString()}
          </p>
        </div>
      </section>
    </div>
  );
}
