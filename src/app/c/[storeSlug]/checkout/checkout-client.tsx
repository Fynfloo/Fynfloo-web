'use client';

import { RenderPage } from '@/components/storefront/render-page';
import { CheckoutProvider } from '@/lib/storefront/checkout-context';
import type { PageLayout } from '@/lib/sections/types';
import { useState, useEffect } from 'react';
import { apiUrl } from '@/lib/utils';

type Props = {
  storeSlug: string;
  layout: PageLayout;
};

export default function CheckoutClient({ storeSlug, layout }: Props) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    async function initPayment() {
      try {
        const res = await fetch(
          `${apiUrl}/api/storefront/checkout/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Store-Slug': storeSlug,
              'X-Cart-Token':
                document.cookie
                  .split('; ')
                  .find((c) => c.startsWith('cart_token='))
                  ?.split('=')[1] ?? '',
            },
            body: JSON.stringify({}),
          },
        );
        if (!res.ok) {
          throw new Error('Failed to initialize payment.');
        }

        const data = await res.json();
        setClientSecret(data.clientSecret);
        setOrderId(data.orderId);
      } catch (error) {
        console.error('Error initializing payment:', error);
      }
    }
    initPayment();
  }, [storeSlug]);
  return (
    <CheckoutProvider checkoutState={{ orderId, clientSecret }}>
      <RenderPage layout={layout} />
    </CheckoutProvider>
  );
}
