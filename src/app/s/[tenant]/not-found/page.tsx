// app/s/[tenantSlug]/not-found.tsx
export default function StorefrontNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center space-y-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">404</p>
      <h1 className="text-2xl font-semibold text-slate-50">
        We couldn&apos;t find that page.
      </h1>
      <p className="text-sm text-slate-400">
        The link may be broken or the page might have been moved. Try going back
        to the store home.
      </p>
    </div>
  );
}
