'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  CheckoutFormData,
  SectionDefaultContext,
} from '@/lib/sections/types';


type Props = { data: CheckoutFormData };

function CheckoutForm({ data }: Props) {
  // TODO: Wire to real checkout submit handler
  return (
    <SectionShell>
      <form
        id="checkout-form"
        className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Contact details</h2>
            <div className="grid gap-3">
              <input
                className="rounded-full border border-black/10 px-3 py-2 text-sm"
                placeholder="Full name"
                name="name"
              />
              <input
                className="rounded-full border border-black/10 px-3 py-2 text-sm"
                placeholder="Email"
                name="email"
                type="email"
              />
              <input
                className="rounded-full border border-black/10 px-3 py-2 text-sm"
                placeholder="Phone (optional)"
                name="phone"
              />
            </div>
          </div>

          {data.showShippingSection && (
            <div className="space-y-2">
              <h2 className="text-sm font-medium">Shipping</h2>
              <div className="grid gap-3">
                <input
                  className="rounded-full border border-black/10 px-3 py-2 text-sm"
                  placeholder="Address line 1"
                  name="addressLine1"
                />
                <input
                  className="rounded-full border border-black/10 px-3 py-2 text-sm"
                  placeholder="Address line 2"
                  name="addressLine2"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="rounded-full border border-black/10 px-3 py-2 text-sm"
                    placeholder="City"
                    name="city"
                  />
                  <input
                    className="rounded-full border border-black/10 px-3 py-2 text-sm"
                    placeholder="Postcode"
                    name="postcode"
                  />
                </div>
              </div>
            </div>
          )}

          {data.showNotesField && (
            <div className="space-y-2">
              <h2 className="text-sm font-medium">Order notes</h2>
              <textarea
                className="min-h-[80px] w-full rounded-2xl border border-black/10 px-3 py-2 text-sm"
                placeholder="Tell us anything important about your order..."
                name="notes"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white"
          >
            Pay now
          </button>
          <p className="text-[11px] text-muted-foreground">
            Payments are processed securely. You&apos;ll receive an email
            confirmation once your order is complete.
          </p>
        </div>
      </form>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): CheckoutFormData {
  return {
    showShippingSection: ctx.businessType !== 'events',
    showBillingSection: false,
    showNotesField: true,
  };
}

registerSection({
  type: 'checkout.checkoutForm',
  label: 'Checkout form',
  group: 'checkout',
  component: CheckoutForm,
  getDefaultData,
});

export default CheckoutForm;
