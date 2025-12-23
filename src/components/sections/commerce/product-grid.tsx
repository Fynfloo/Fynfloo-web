'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type {
  ProductGridData,
  SectionDefaultContext,
} from '@/lib/sections/types';
import { useProductsListing } from '@/lib/storefront/products-listing-context';

type Props = { data: ProductGridData };

function ProductGrid({ data }: Props) {
  const listing = useProductsListing();

  const products = data.collectionHandle
    ? listing.byCollection[data.collectionHandle] ?? []
    : listing.all;

  return (
    <SectionShell>
      <SectionHeading
        title={data.heading}
        subtitle={data.subheading}
        eyebrow={undefined}
      />
      <div
        className={`grid gap-6 ${
          data.columns === 2
            ? 'grid-cols-2'
            : data.columns === 4
            ? 'grid-cols-2 md:grid-cols-4'
            : 'grid-cols-2 md:grid-cols-3'
        }`}
      >
        {products.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            {data.collectionHandle
              ? 'No products found in this collection.'
              : 'No products available yet.'}
          </div>
        ) : (
          products.map((p) => (
            <a
              key={p.id}
              href={`/product/${p.handle}`}
              className="group flex flex-col gap-3"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]?.url}
                  alt={p.images[0]?.alt || p.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1 text-sm">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  £{p.price.toFixed(2)}
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): ProductGridData {
  return {
    heading:
      ctx.pageKind === 'home'
        ? 'Featured picks'
        : ctx.businessType === 'food'
        ? 'All dishes'
        : 'All products',

    subheading:
      ctx.pageKind === 'home' ? 'A few easy ways to get started.' : undefined,
    collectionHandle: ctx.pageKind === 'home' ? 'featured' : null,
    layout: 'grid',
    columns: ctx.businessType === 'fashion' ? 4 : 3,
  };
}

registerSection({
  type: 'commerce.productGrid',
  label: 'Product grid',
  group: 'commerce',
  component: ProductGrid,
  getDefaultData,
});

export default ProductGrid;
