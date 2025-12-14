'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type {
  ServicesListData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: ServicesListData };

function ServicesList({ data }: Props) {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Services"
        title={data.heading}
        subtitle={data.subheading}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {data.services.map((svc, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/5 p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-medium">{svc.name}</h3>
              {svc.badge && (
                <span className="inline-flex items-center rounded-full border border-black/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]">
                  {svc.badge}
                </span>
              )}
            </div>
            {svc.description && (
              <p className="text-xs text-muted-foreground">{svc.description}</p>
            )}
            {svc.priceLabel && (
              <p className="text-xs font-medium text-[var(--color-primary)]">
                {svc.priceLabel}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): ServicesListData {
  return {
    heading: 'Our core services',
    subheading:
      'Choose the level of support that fits your event and we’ll handle the details.',
    services: [
      {
        name: 'Full event styling',
        description:
          'From concept to execution, we design and deliver a complete look for your event.',
        priceLabel: 'From £500',
        badge: 'Most popular',
      },
      {
        name: 'Decor & props hire',
        description:
          'Hire individual pieces, props or backdrops to elevate your own setup.',
        priceLabel: 'From £150',
      },
      {
        name: 'On-the-day coordination',
        description:
          'We handle setup, styling and teardown on the day so you can enjoy your event.',
        priceLabel: 'From £350',
      },
    ],
  };
}

registerSection({
  type: 'events.servicesList',
  label: 'Services list',
  group: 'events',
  component: ServicesList,
  getDefaultData,
});

export default ServicesList;
