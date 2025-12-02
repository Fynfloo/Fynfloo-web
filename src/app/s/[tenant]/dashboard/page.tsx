// app/s/[tenant]/dashboard/page.tsx
import { notFound } from 'next/navigation';
import { fetchTenantBySlug } from '@/lib/fetch-tenant-by-slug';
import { fetchTenantMetrics } from '@/lib/fetch-tenant-metrics';
import { rootDomain } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, ShoppingBag, Users } from 'lucide-react';

export default async function TenantDashboardPage({
  params,
}: {
  params: { tenant: string };
}) {
  const tenantSlug = params.tenant;
  const tenant = await fetchTenantBySlug(tenantSlug);

  if (!tenant) notFound();

  const metrics = await fetchTenantMetrics(tenant.id);

  return (
    <div className="space-y-8">
      {/* Metrics Section */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.metrics.ordersCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Customers / Staff</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.metrics.usersCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Revenue (₦)</CardTitle>
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₦{metrics.metrics.revenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Placeholder for future widgets */}
      <section className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Coming soon…
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="list-disc list-inside">
              <li>Add products</li>
              <li>Connect payments</li>
              <li>Customize theme</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
