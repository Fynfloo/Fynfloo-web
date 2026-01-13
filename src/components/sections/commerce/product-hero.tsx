'use client';

import React, { useState } from 'react';
import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import { useProduct } from '@/lib/storefront/product-context';
import type { ProductHeroData } from '@/lib/sections/types';
import { useStoreContext } from '@/lib/storefront/store-context';
import { useCart } from '@/lib/storefront/cart-context';
import { addToCartClient } from '@/lib/storefront/fetch-storefront-data';

type Props = { data: ProductHeroData };

function ProductHero(_: Props) {
  const product = useProduct();
  const { store } = useStoreContext();
  const { setCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    try {
      setLoading(true);
      const cart = await addToCartClient(product.id, 1);
      setCart(cart);
    } catch (err) {
      alert('Failed to add to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
          <button
            disabled={loading}
            onClick={handleAddToCart}
            className="rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add to cart'}
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
