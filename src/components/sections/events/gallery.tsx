'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type { GalleryData, SectionDefaultContext } from '@/lib/sections/types';

type Props = { data: GalleryData };

function Gallery({ data }: Props) {
  return (
    <SectionShell>
      <SectionHeading title={data.heading} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt || ''}
            className="rounded-2xl object-cover aspect-square"
          />
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(): GalleryData {
  return {
    heading: 'Event highlights',
    images: [
      { url: '/images/sections/event-gallery-1.jpg', alt: 'Event highlight 1' },
      { url: '/images/sections/event-gallery-2.jpg', alt: 'Event highlight 2' },
      { url: '/images/sections/event-gallery-3.jpg', alt: 'Event highlight 3' },
      { url: '/images/sections/event-gallery-4.jpg', alt: 'Event highlight 4' },
    ],
  };
}

registerSection({
  type: 'events.gallery',
  label: 'Gallery',
  group: 'events',
  component: Gallery,
  getDefaultData,
});

export default Gallery;
