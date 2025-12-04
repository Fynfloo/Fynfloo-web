// app/s/[tenant]/page.tsx
import { getStorefrontData } from '@/lib/storefront/get-storefront-data';
import { StoreHero } from '@/components/tenant/storefront/hero';

export default async function StorefrontHome({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const data = await getStorefrontData(tenant);
  <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-10">
    <StoreHero tenant={data.tenant} />
  </div>;
}
