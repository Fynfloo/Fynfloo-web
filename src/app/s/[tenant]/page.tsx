// app/s/[tenant]/page.tsx
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

type Tenant = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  template: string | null;
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

export async function generateMetadata({
  params,
}: {
  params: { tenant: string };
}) {
  const tenant = await fetchTenant(params.tenant);
  if (!tenant) {
    return {
      title: 'Store not found',
    };
  }

  return {
    title: `${tenant.name} – Online Store`,
    description: `Shop at ${tenant.name}.`,
  };
}

export default async function StoreHome({
  params,
}: {
  params: { tenant: string };
}) {
  const tenant = await fetchTenant(params.tenant);
  if (!tenant) notFound();

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
        <p className="text-muted-foreground">
          Category: {tenant.category || 'General'} | Template:{' '}
          {tenant.template || 'default'}
        </p>
      </section>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <p className="text-sm text-muted-foreground">
          Product grid will go here (CraftJS / CMS driven).
        </p>
      </section>
    </main>
  );
}
