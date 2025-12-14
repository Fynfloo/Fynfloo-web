import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  CartSummaryData,
  SectionDefaultContext,
} from '@/lib/sections/types';
import { useCart } from '@/lib/storefront/cart-context';

type Props = { data: CartSummaryData };

function CartSummary({ data }: Props) {
  const cart = useCart();

  return (
    <SectionShell variant="muted" className="mt-4">
      <div className="space-y-3 text-sm">
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
        {data.showDiscountCode && (
          <div className="pt-2">
            <input
              type="text"
              placeholder="Discount code"
              className="w-full rounded-full border border-black/10 px-3 py-2 text-xs"
            />
          </div>
        )}
        <a
          href="/checkout"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-medium text-white"
        >
          Go to checkout
        </a>
      </div>
    </SectionShell>
  );
}

function getDefaultData(): CartSummaryData {
  return {
    showDiscountCode: true,
  };
}

registerSection({
  type: 'checkout.cartSummary',
  label: 'Cart summary',
  group: 'checkout',
  component: CartSummary,
  getDefaultData,
});

export default CartSummary;
