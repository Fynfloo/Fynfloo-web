import { ProductBadge } from '@/lib/storefront/mock-data';
import { cn } from '@/lib/utils';

export function ProductBadgePill({ badge }: { badge?: ProductBadge }) {
  if (!badge) return null;
  return (
    <span
      className={cn(
        'text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border',
        badge === 'new' && 'border-emerald-400 text-emerald-300',
        badge === 'bestseller' && 'border-amber-400 text-amber-300',
        badge === 'limited' && 'border-fuchsia-400 text-fuchsia-300'
      )}
    >
      {badge}
    </span>
  );
}
