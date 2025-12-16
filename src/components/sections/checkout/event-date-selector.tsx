'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';

import type {
  EventDateSelectorData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: EventDateSelectorData };

function EventDateSelector({ data }: Props) {
  return (
    <SectionShell>
      <label className="block text-sm font-medium mb-2">{data.heading}</label>
      <input type="date" className="rounded-full border px-3 py-2" />
    </SectionShell>
  );
}

function getDefaultData(): EventDateSelectorData {
  return {
    heading: 'Select Event Date',
  };
}

registerSection({
  type: 'checkout.eventDateSelector',
  label: 'Event date selector',
  group: 'checkout',
  component: EventDateSelector,
  getDefaultData,
});

export default EventDateSelector;
