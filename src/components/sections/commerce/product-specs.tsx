'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import { useProduct } from '@/lib/storefront/product-context';
import type {
  ProductSpecsData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: ProductSpecsData };

function ProductSpecs({ data }: Props) {
  const product = useProduct();

  return (
    <SectionShell>
      {data.showDescription && (
        <p className="max-w-3xl text-sm text-muted-foreground">
          {product.description}
        </p>
      )}
    </SectionShell>
  );
}

function getDefaultData(): ProductSpecsData {
  return {
    showDescription: true,
    showDetailsList: false,
  };
}

registerSection({
  type: 'commerce.productSpecs',
  label: 'Product specs',
  group: 'commerce',
  component: ProductSpecs,
  getDefaultData,
});

export default ProductSpecs;
