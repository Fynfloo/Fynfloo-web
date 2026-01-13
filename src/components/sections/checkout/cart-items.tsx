'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type { CartItemsData } from '@/lib/sections/types';
import { useCart } from '@/lib/storefront/cart-context';

type Props = { data: CartItemsData };

function CartItems({ data }: Props) {
  const { cart } = useCart();
  console.log('CartItems cart:', cart);

  if (!cart || cart.items.length === 0) {
    return (
      <SectionShell>
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      </SectionShell>
    );
  }

  return (
    <SectionShell>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b border-black/5 pb-4"
          >
            {data.showThumbnails && item.image && (
              <div className="h-16 w-16 overflow-hidden rounded-xl border border-black/5 bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image.url}
                  alt={item.image.alt ?? item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                Qty {item.quantity}
              </div>
            </div>
            <div className="text-xs">
              {data.showLineTotals
                ? `£${item.lineTotal.toFixed(2)}`
                : `£${item.price?.toFixed(2)}`}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(): CartItemsData {
  return {
    showThumbnails: true,
    showLineTotals: true,
  };
}

registerSection({
  type: 'checkout.cartItems',
  label: 'Cart items',
  group: 'checkout',
  component: CartItems,
  getDefaultData,
});

export default CartItems;
