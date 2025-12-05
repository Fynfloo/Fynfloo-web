import { FeatureRow as FeatureRowType } from '@/lib/storefront/mock-data';
import { cn } from '@/lib/utils';

export function FeatureRow({ row }: { row: FeatureRowType }) {
  const content = (
    <div className="flex-1 flex flex-col gap-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {row.eyebrow}
      </p>
      <h3 className="text-lg font-semibold text-slate-50">{row.title}</h3>
      <p className="text-sm text-slate-300">{row.body}</p>
      <ul className="mt-1 list-disc list-inside text-xs text-slate-400 space-y-1">
        {row.bulletPoints.map((bp) => (
          <li key={bp}>{bp}</li>
        ))}
      </ul>
    </div>
  );

  const media = (
    <div className="flex-1">
      <div className="relative aspect-[4/3] rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        <img
          src={row.image}
          alt={row.imageAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:gap-10',
        row.align === 'right' && 'lg:flex-row-reverse',
        row.align === 'left' && 'lg:flex-row'
      )}
    >
      {content}
      {media}
    </div>
  );
}
