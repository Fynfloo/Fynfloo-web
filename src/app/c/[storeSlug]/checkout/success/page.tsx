'use client';

import { clearCartTokenClient } from '@/lib/storefront/cartToken.client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/lib/storefront/cart-context';

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { setCart } = useCart();

  useEffect(() => {
    // Clear browser cart identity so we don't revive old carts
    clearCartTokenClient();

    // 2) Optimistically clear UI cart immediately
    setCart({ id: '', items: [], subtotal: 0, total: 0 });

    // 3) Refresh to re-run any server components/ layouts
    // (prevents stale SSR/cart state)
    router.refresh();
  }, [router, setCart]);

  const sessionId = params.get('session_id');
  return (
    <div className="mx-auto max-w-lg py-20 text-center space-y-4">
      <h1 className="text-2xl font-semibold">Payment successful 🎉</h1>
      <p className="text-sm text-muted-foreground">
        Thanks! Your order is confirmed.
        {sessionId ? (
          <>
            {' '}
            <span className="font-mono text-xs opacity-80">
              Session: {sessionId}
            </span>
          </>
        ) : null}
      </p>

      <button
        onClick={() => router.push('/')}
        className="inline-block rounded-full bg-black px-4 py-2 text-sm text-white"
      >
        Continue shopping
      </button>
    </div>
  );
}
