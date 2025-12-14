'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type {
  TestimonialsBasicData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: TestimonialsBasicData };

function TestimonialsBasic({ data }: Props) {
  return (
    <SectionShell variant="muted">
      <SectionHeading title={data.heading} />
      <div className="grid gap-6 md:grid-cols-3">
        {data.testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-4 border border-black/5"
          >
            <p className="text-sm text-muted-foreground">“{t.quote}”</p>
            <div className="mt-3 text-xs font-medium">{t.name}</div>
            {t.role && (
              <div className="text-xs text-muted-foreground">{t.role}</div>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): TestimonialsBasicData {
  return {
    heading:
      ctx.businessType === 'events' ? 'Client feedback' : 'Loved by customers',
    testimonials: [
      {
        quote:
          ctx.businessType === 'events'
            ? 'They transformed our event completely.'
            : 'Everything was simple and seamless.',
        name: 'Alex M.',
      },
      {
        quote:
          ctx.businessType === 'food'
            ? 'Best food we’ve ordered locally.'
            : 'Beautiful design and easy to manage.',
        name: 'Jamie K.',
      },
      {
        quote: 'Highly recommended.',
        name: 'Sarah L.',
      },
    ],
  };
}

registerSection({
  type: 'content.testimonialsBasic',
  label: 'Testimonials',
  group: 'content',
  component: TestimonialsBasic,
  getDefaultData,
});

export default TestimonialsBasic;
