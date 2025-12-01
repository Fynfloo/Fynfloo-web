// app/s/[tenant]/dashboard/page.tsx
import { notFound } from 'next/navigation';
import { fetchTenantBySlug } from '@/lib/fetch-tenant-by-slug';
import { fetchTenantMetrics } from '@/lib/fetch-tenant-metrics';
import { rootDomain } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, ShoppingBag, Users, Globe2, Settings } from 'lucide-react';

export default async function TenantDashboardPage({
  params,
}: {
  params: { tenant: string };
}) {
  const tenantSlug = params.tenant;
  const tenant = await fetchTenantBySlug(tenantSlug);

  if (!tenant) {
    notFound();
  }

  const data = await fetchTenantMetrics(tenant.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            {tenant.name} Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Store domain:{' '}
            <span className="font-mono">
              {tenant.slug}.{rootDomain}
            </span>
          </p>
          {tenant.category && (
            <p className="text-xs text-muted-foreground mt-1">
              Category: {tenant.category}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href={`https://${tenant.slug}.${rootDomain}`} target="_blank">
              <Globe2 className="h-4 w-4 mr-2" />
              View storefront
            </a>
          </Button>
          <Button variant="default" asChild>
            <a href={`/s/${tenant.slug}/settings`}>
              <Settings className="h-4 w-4 mr-2" />
              Store settings
            </a>
          </Button>
        </div>
      </header>

      {/* Metrics */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.ordersCount}</div>
            <p className="text-xs text-muted-foreground">
              All-time orders for this store (placeholder).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers / staff
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.usersCount}</div>
            <p className="text-xs text-muted-foreground">
              Members linked to this tenant (owners, staff, etc.).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (₦)</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{data.metrics.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Placeholder for total revenue analytics.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Future sections (products, orders etc.) */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Activity feed coming soon – orders, inventory updates, staff logins,
            etc.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Getting started checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>Connect a payment provider</li>
              <li>Add your first products</li>
              <li>Customize your storefront theme</li>
              <li>Set up domain & SEO basics</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
