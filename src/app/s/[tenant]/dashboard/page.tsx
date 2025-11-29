// app/s/[tenant]/dashboard/page.tsx
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

type Tenant = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  template: string | null;
};

type DashboardMetrics = {
  metrics: {
    ordersCount: number;
    usersCount: number;
    revenue: number;
  };
};

async function fetchTenant(tenantSlug: string): Promise<Tenant | null> {
  const cookieHeader = cookies().toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/tenant/by-slug/${tenantSlug}`,
    {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load tenant');
  return res.json();
}

async function fetchMetrics(tenantId: string): Promise<DashboardMetrics> {
  const cookieHeader = cookies().toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/tenant/${tenantId}/dashboard`,
    {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    }
  );

  if (res.status === 401) {
    // not logged in → send back to login
    redirect('/login');
  }

  if (!res.ok) {
    throw new Error('Failed to load metrics');
  }

  return res.json();
}

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
