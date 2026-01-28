'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  CheckoutFormData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: CheckoutFormData };

function CheckoutForm({ data }: Props) {
  return (
    <SectionShell>
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-sm font-medium">Contact details</h2>
          <div>
            <input
              className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
              placeholder="Full name"
              name="name"
              autoComplete="name"
            />
          </div>
          <div>
            <input
              className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
              placeholder="Email"
              name="email"
              type="email"
              autoComplete="email"
            />
          </div>
          <div>
            <input
              className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
              placeholder="Phone (optional)"
              name="phone"
              autoComplete="tel"
            />
          </div>
        </div>

        {data.showShippingSection && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Shipping</h2>
            <div>
              <input
                className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
                placeholder="Address line 1"
                name="addressLine1"
              />
            </div>

            <input
              className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
              placeholder="Address line 2"
              name="addressLine2"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
                  placeholder="City"
                  name="city"
                />
              </div>
              <div>
                <input
                  className="w-full rounded-full border border-black/10 px-3 py-2 text-sm"
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
