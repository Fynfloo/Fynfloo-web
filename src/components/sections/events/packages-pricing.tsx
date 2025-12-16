'use client';

import { SectionShell } from '../core/section-shell';
import { registerSection } from '@/lib/sections/registry';
import type {
  PackagesPricingData,
  SectionDefaultContext,
} from '@/lib/sections/types';

type Props = { data: PackagesPricingData };

function PackagesPricing({ data }: Props) {
  return (
    <SectionShell>
      <div className="grid gap-6 md:grid-cols-3">
        {data.packages.map((pkg, i) => (
          <div key={i} className="rounded-2xl border p-4 space-y-2">
            <h3 className="font-medium">{pkg.name}</h3>
            <p className="text-sm text-[var(--color-primary)]">
              {pkg.priceLabel}
            </p>
            <p className="text-sm text-muted-foreground">{pkg.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(): PackagesPricingData {
  return {
    heading: 'Packages',
    packages: [
      {
        name: 'Basic',
        priceLabel: 'From £300',
        description: 'Perfect for small events.',
      },
      {
        name: 'Premium',
        priceLabel: 'From £800',
        description: 'Full styling and coordination.',
      },
      {
        name: 'Custom',
        priceLabel: 'Get a quote',
        description: 'Tailored to your needs.',
      },
    ],
  };
}

registerSection({
  type: 'events.packagesPricing',
  label: 'Packages pricing',
  group: 'events',
  component: PackagesPricing,
  getDefaultData,
});

export default PackagesPricing;
