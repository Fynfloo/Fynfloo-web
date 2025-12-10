'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  HeroBasicData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: HeroBasicData };

function HeroBasic({ data }: Props) {
  return (
    <SectionShell variant="hero">
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
        <div className="space-y-4">
          {data.eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {data.eyebrow}
            </p>
          )}
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              {data.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-3">
            {data.primaryCtaLabel && data.primaryCtaHref && (
              <a
                href={data.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white"
              >
                {data.primaryCtaLabel}
              </a>
            )}
            {data.secondaryCtaLabel && data.secondaryCtaHref && (
              <a
                href={data.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium border border-black/10"
              >
                {data.secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
        {data.backgroundImage && (
          <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-3xl border border-black/5 aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.backgroundImage}
                alt={data.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function getDefaultData(ctx: SectionDefaultContext): HeroBasicData {
  if (ctx.businessType === 'events') {
    return {
      eyebrow: 'Event styling & rentals',
      title: 'Transform your next event into something unforgettable.',
      subtitle:
        'From decor to full-service setup, we help you create moments your guests will never forget.',
      primaryCtaLabel: 'View services',
      primaryCtaHref: '/services',
      secondaryCtaLabel: 'View gallery',
      secondaryCtaHref: '#gallery',
    };
  }

  if (ctx.businessType === 'food') {
    return {
      eyebrow: 'Fresh & delicious',
      title: 'Your new favourite place to order from.',
      subtitle:
        'Handpicked dishes, made to order with quality ingredients and bold flavours.',
      primaryCtaLabel: 'View menu',
      primaryCtaHref: '/menu',
    };
  }

  return {
    eyebrow: 'New arrivals',
    title: 'A calmer, more considered way to shop.',
    subtitle:
      'Curated products chosen for quality, longevity and everyday ease.',
    primaryCtaLabel: 'Shop now',
    primaryCtaHref: '/products',
    secondaryCtaLabel: 'Learn more',
    secondaryCtaHref: '/about',
  };
}

registerSection({
  type: 'hero.basic',
  label: 'Hero – basic',
  group: 'hero',
  component: HeroBasic,
  getDefaultData,
});

export default HeroBasic;
