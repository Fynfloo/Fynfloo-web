// components/storefront/testimonial-strip.tsx
import { Testimonial } from '@/lib/storefront/mock-data';

export function TestimonialStrip({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
      <div className="flex gap-6 px-6 py-5 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {items.map((t) => (
          <figure
            key={t.id}
            className="min-w-[220px] max-w-xs border border-slate-800 rounded-2xl bg-slate-950 px-4 py-3 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-200">
                {t.avatarInitials}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-50">{t.name}</p>
                <p className="text-[11px] text-slate-400">{t.role}</p>
              </div>
            </div>
            <blockquote className="text-xs text-slate-300">
              “{t.quote}”
            </blockquote>
          </figure>
        ))}
      </div>
    </div>
  );
}
