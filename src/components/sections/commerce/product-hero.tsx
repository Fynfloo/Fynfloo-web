'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import { useProduct } from '@/lib/storefront/product-context';
import type {
  ProductHeroData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: ProductHeroData };

function ProductHero(_: Props) {
  const product = useProduct();

  return (
    <SectionShell>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl border">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg font-medium">£{product.price.toFixed(2)}</p>
          <button className="rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm text-white">
            Add to cart
          </button>
        </div>
      </div>
    </SectionShell>
  );
}

function getDefaultData(): ProductHeroData {
  return {
    showBreadcrumbs: true,
    showBadges: true,
  };
}

registerSection({
  type: 'commerce.productHero',
  label: 'Product hero',
  group: 'commerce',
  component: ProductHero,
  getDefaultData,
});

export default ProductHero;
