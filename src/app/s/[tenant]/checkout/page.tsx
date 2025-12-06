// app/s/[tenantSlug]/checkout/page.tsx
export default function CheckoutPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  // TODO: Payment UI integration (Stripe, Paddle, etc.)
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 grid gap-8 md:grid-cols-[3fr,2fr]">
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-slate-50">Checkout</h1>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-slate-200">1. Contact</h2>
          <input
            placeholder="Email"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-slate-200">
            2. Shipping address
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="First name"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            />
            <input
              placeholder="Last name"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            />
          </div>
          <input
            placeholder="Address line 1"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
          />
          <input
            placeholder="Address line 2 (optional)"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              placeholder="City"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            />
            <input
              placeholder="Postcode"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            />
            <input
              placeholder="Country"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-slate-200">3. Payment</h2>
          <div className="rounded-xl border border-slate-800 p-4 bg-slate-950/60 text-xs text-slate-400">
            Payment UI (Stripe, Paddle, etc.) will be integrated here.
          </div>
        </section>
      </div>

      <aside className="border border-slate-800 rounded-2xl p-4 bg-slate-950/60 space-y-4">
        <h2 className="text-sm font-semibold text-slate-50">Summary</h2>
        <div className="flex justify-between text-sm text-slate-300">
          <span>Subtotal</span>
          <span>£79.00</span>
        </div>
        <div className="flex justify-between text-sm text-slate-300">
          <span>Shipping</span>
          <span>Calculated next step</span>
        </div>
        <hr className="border-slate-800" />
        <div className="flex justify-between text-sm font-semibold text-slate-50">
          <span>Total</span>
          <span>£79.00</span>
        </div>

        <button className="w-full mt-4 rounded-full bg-slate-50 text-slate-950 px-5 py-2.5 text-sm font-medium hover:bg-slate-200">
          Pay now
        </button>
        <p className="text-[11px] text-slate-500">
          This is a placeholder. Real totals and payment intent will come from
          the backend.
        </p>
      </aside>
    </div>
  );
}
