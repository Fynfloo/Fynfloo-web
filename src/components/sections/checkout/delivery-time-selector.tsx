'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  DeliveryTimeSelectorData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: DeliveryTimeSelectorData };

function DeliveryTimeSelector({ data }: Props) {
  return (
    <SectionShell>
      <label className="block text-sm font-medium mb-2">{data.heading}</label>
      <input type="datetime-local" className="rounded-full border px-3 py-2" />
    </SectionShell>
  );
}

function getDefaultData(): DeliveryTimeSelectorData {
  return {
    heading: 'Select your delivery time',
  };
}

registerSection({
  type: 'checkout.deliveryTimeSelector',
  label: 'Delivery time selector',
  group: 'checkout',
  component: DeliveryTimeSelector,
  getDefaultData,
});

export default DeliveryTimeSelector;
