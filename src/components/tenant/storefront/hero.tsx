import { StorefrontTenant } from '@/lib/storefront/mock-data';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function StoreHero({ tenant }: { tenant: StorefrontTenant }) {
  const baseHref = `/s/${tenant.slug}`;

  return (
    <section className="relative overflow-hidden border border-slate-800 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 sm:p-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-xs text-cyan-200 bg-cyan-500/10 border border-cyan-500/40 rounded-full px-3 py-1 w-fit">
            <Sparkles className="h-3 w-3" />
            New drop every Friday
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
            Hardware that feels as considered as your ideas.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl">
            {tenant.tagline} Neutral, tactile, and quietly opinionated pieces
            that make your desk feel like a studio again.
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={`${baseHref}/products`}
              className="rounded-full bg-slate-50 text-slate-950 px-5 py-2.5 text-sm font-medium hover:bg-slate-200"
            >
              Shop the collection
            </Link>
            <Link
              href={`${baseHref}/products`}
              className="rounded-full border border-slate-700 text-slate-200 px-5 py-2.5 text-sm hover:border-slate-500 hover:bg-slate-900"
            >
              View all products
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative aspect-[4/3] w-full rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.16),_transparent_60%)]" />
            <div className="absolute inset-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur">
              <div className="h-full w-full flex items-center justify-center text-slate-500 text-xs">
                Hero media placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
