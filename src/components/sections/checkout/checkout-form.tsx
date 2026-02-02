'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  CheckoutFormData,
  SectionDefaultContext,
} from '@/lib/sections/types';
import { CheckoutSummary } from './checkout-summary';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutFlow } from './checkout-flow';

type Props = { data: CheckoutFormData };

function CheckoutForm({ data }: Props) {
  return (
    <SectionShell>
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)] lg:gap-12">
        <div className="space-y-10">
          {/* <CheckoutDelivery /> */}
          <CheckoutFlow />
        </div>

        <div className="md:sticky md:top-24 self-start">
          <CheckoutSummary />
        </div>
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
