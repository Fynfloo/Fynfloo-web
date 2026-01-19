import { useCart } from '@/lib/storefront/cart-context';
import { apiUrl } from '@/lib/utils';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { SectionShell } from '../core/section-shell';
import { stripePromise } from '@/lib/stripe/stripe-client';
import { registerSection } from '@/lib/sections/registry';

function PaymentForm({
  clientSecret,
  orderId,
}: {
  clientSecret: string;
  orderId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
      },
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed. try again.');
      setLoading(false);
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      <p className="text-[11px] text-muted-foreground text-center">
        🔒 Secure payment powered by Stripe
      </p>
    </form>
  );
}

function PaymentMethods() {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initPayment() {
      try {
        const res = await fetch(
          `${apiUrl}/api/storefront/checkout/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Store-Slug': window.location.hostname.split('.')[0],
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
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load payment.',
        );
      }
    }
    initPayment();
  }, [cart]);

  return (
    <SectionShell>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!clientSecret || !orderId ? (
        <p className="text-sm text-muted-foreground">Loading secure payment…</p>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} orderId={orderId} />
        </Elements>
      )}
    </SectionShell>
  );
}

registerSection({
  type: 'checkout.paymentMethods',
  label: 'Payment methods',
  group: 'checkout',
  component: PaymentMethods,
  getDefaultData: () => ({}),
});

export default PaymentMethods;
