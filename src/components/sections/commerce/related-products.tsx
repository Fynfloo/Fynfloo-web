'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type {
  RelatedProductsData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: RelatedProductsData };

function RelatedProducts({ data }: Props) {
  return (
    <SectionShell variant="muted">
      <SectionHeading title={data.heading} />
      <div className="grid grid-cols md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-2xl bg-white border border-black/5"
          />
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(): RelatedProductsData {
  return {
    heading: 'Related Products',
  };
}

registerSection({
  type: 'commerce.relatedProducts',
  label: 'Related products',
  group: 'commerce',
  component: RelatedProducts,
  getDefaultData,
});

export default RelatedProducts;
