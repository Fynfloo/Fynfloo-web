'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type {
  FaqAccordionData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: FaqAccordionData };

function FaqAccordion({ data }: Props) {
  return (
    <SectionShell>
      <SectionHeading title={data.heading} />
      <div className="space-y-3 max-w-3xl">
        {data.items.map((item, i) => (
          <details key={i} className="rounded-2xl border border-black/10 p-4">
            <summary className="cursor-pointer text-sm font-medium">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): FaqAccordionData {
  return {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'How does this work?',
        answer:
          'Choose a template, customise your content, and publish instantly.',
      },
      {
        question: 'Can I edit my site later?',
        answer: 'Yes — everything is editable at any time.',
      },
      {
        question: 'Do I need technical skills?',
        answer: 'No, everything is designed to be simple and intuitive.',
      },
    ],
  };
}

registerSection({
  type: 'content.faqAccordion',
  label: 'FAQ',
  group: 'content',
  component: FaqAccordion,
  getDefaultData,
});

export default FaqAccordion;
