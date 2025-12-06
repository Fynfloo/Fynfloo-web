// app/s/[tenantSlug]/account/register/page.tsx
export default function RegisterPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">Create account</h1>
        <p className="text-sm text-slate-400">
          A faster checkout and order history at your fingertips.
        </p>
      </div>

      <form className="space-y-4">
        <input
          placeholder="Name"
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        />

        <button className="w-full rounded-full bg-slate-50 text-slate-950 px-5 py-2.5 text-sm font-medium hover:bg-slate-200">
          Create account
        </button>
      </form>
    </div>
  );
}
