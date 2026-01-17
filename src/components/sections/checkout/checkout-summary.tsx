import type { CheckoutSummaryData } from '@/lib/sections/types';
import { useCart } from '@/lib/storefront/cart-context';
import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';

type Props = { data: CheckoutSummaryData };

function CheckoutSummary({ data }: Props) {
  const { cart } = useCart();

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <SectionShell variant="muted" className="mt-4">
      <div className="space-y-4 text-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-medium">
            Order summary ({cart.items.length})
          </span>
          <a
            href="/cart"
            className="text-xs underline opacity-70 hover:opacity-100"
          >
            Edit
          </a>
        </div>

        {/* Compact items list */}
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.image && (
                <img
                  src={item.image.url}
                  alt={item.image.alt ?? item.name}
                  className="h-10 w-10 rounded-lg border border-black/10 object-cover"
                />
              )}

              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium">{item.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  Qty {item.quantity}
                </div>
              </div>

              <div className="text-xs font-medium">
                £{item.lineTotal.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 pt-3 border-t border-black/10">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>£{cart.subtotal.toFixed(2)}</span>
          </div>

          {cart.shipping != null && (
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>£{cart.shipping.toFixed(2)}</span>
            </div>
          )}

          {cart.tax != null && (
            <div className="flex justify-between">
              <span>Tax</span>
              <span>£{cart.tax.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 border-t border-black/10">
            <span className="font-medium">Total</span>
            <span className="font-medium">£{cart.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pay button */}
        <button
          type="submit"
          form="checkout-form"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-medium text-white"
        >
          {data.payButtonLabel}
        </button>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
          <span aria-hidden>🔒</span>
          <span>Secure checkout • Encrypted payments</span>
        </div>
      </div>
    </SectionShell>
  );
}

function getDefaultData(): CheckoutSummaryData {
  return {
    payButtonLabel: 'Pay now',
  };
}

registerSection({
  type: 'checkout.checkoutSummary',
  label: 'Checkout summary',
  group: 'checkout',
  component: CheckoutSummary,
  getDefaultData,
});
