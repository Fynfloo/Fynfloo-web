// app/s/[tenant]/page.tsx
import { getStorefrontData } from '@/lib/storefront/get-storefront-data';
import { StoreHero } from '@/components/tenant/storefront/hero';
import { Section } from '@/components/tenant/storefront/section';
import { ProductGrid } from '@/components/tenant/storefront/product-grid';

export default async function StorefrontHome({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const data = await getStorefrontData(tenant);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-10">
      <StoreHero tenant={data.tenant} />

      <Section
        title="Featured picks"
        description="A rotating edit of desk-friendly essentials."
      >
        <ProductGrid
          products={data.featuredProducts}
          baseHref={`/s/${tenant}/products`}
        />
      </Section>
    </div>
  );
}
