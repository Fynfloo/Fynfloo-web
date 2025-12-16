'use client';
import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  EnquiryCtaData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: EnquiryCtaData };

function EnquiryCta({ data }: Props) {
  return (
    <SectionShell variant="hero">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">{data.heading}</h2>
        <p className="text-muted-foreground">{data.body}</p>
        <a
          href={data.primaryHref}
          className="inline-flex rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm text-white"
        >
          {data.primaryLabel}
        </a>
      </div>
    </SectionShell>
  );
}

function getDefaultData(): EnquiryCtaData {
  return {
    heading: 'Let’s plan your event',
    body: 'Tell us about your event and we’ll take care of the rest.',
    primaryLabel: 'Make an enquiry',
    primaryHref: '/checkout',
  };
}

registerSection({
  type: 'events.enquiryCta',
  label: 'Enquiry CTA',
  group: 'events',
  component: EnquiryCta,
  getDefaultData,
});

export default EnquiryCta;
