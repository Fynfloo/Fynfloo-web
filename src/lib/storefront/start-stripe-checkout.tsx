import { apiUrl } from '@/lib/utils';

export async function startStripeCheckout(storeSlug: string) {
  const res = await fetch(`${apiUrl}/api/payments/checkout/create-checkout-session`, {
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
  });

  if (!res.ok) throw new Error('Failed to start checkout');

  const data = await res.json();
  window.location.href = data.url;
}
