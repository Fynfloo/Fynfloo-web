'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type {
  TextWithMediaData,
  SectionDefaultContext,
} from '@/lib/sections/types';
import clsx from 'clsx';

type Props = { data: TextWithMediaData };

function TextWithMedia({ data }: Props) {
  return (
    <SectionShell>
      <div
        className={clsx(
          'grid gap-8 md:grid-cols-2 items-center',
          data.imagePosition === 'left' && 'md:grid-flow-dense'
        )}
      >
        {data.image && (
          <div className="overflow-hidden rounded-3xl border border-black/5">
            <img
              src={data.image.url}
              alt={data.image.alt || data.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div>
          <SectionHeading eyebrow={data.eyebrow} title={data.title} />
          <p className="text-sm text-muted-foreground max-w-xl">{data.body}</p>
        </div>
      </div>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): TextWithMediaData {
  return {
    eyebrow:
      ctx.businessType === 'events'
        ? 'Our approach'
        : ctx.businessType === 'food'
        ? 'Freshly prepared'
        : 'Why choose us',

    title:
      ctx.businessType === 'events'
        ? 'Designed around your vision'
        : ctx.businessType === 'food'
        ? 'Quality ingredients, every time'
        : 'Thoughtfully built for modern businesses',

    body:
      ctx.businessType === 'events'
        ? 'We collaborate closely with you to deliver an event that reflects your style and goals.'
        : ctx.businessType === 'food'
        ? 'Our dishes are prepared daily using carefully sourced ingredients.'
        : 'Every detail is considered, from performance to presentation.',
    image: {
      url: '/images/sections/text-with-media-default.jpg',
      alt: 'Text with media default',
    },
    imagePosition: 'right',
  };
}

registerSection({
  type: 'content.textWithMedia',
  label: 'Text with Media',
  group: 'content',
  component: TextWithMedia,
  getDefaultData,
});

export default TextWithMedia;
