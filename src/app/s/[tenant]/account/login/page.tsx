// app/s/[tenantSlug]/account/login/page.tsx
export default async function LoginPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  return (
    <div className="mx-auto max-w-md px-4 py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">Sign in</h1>
        <p className="text-sm text-slate-400">
          Access your orders, saved items, and preferences.
        </p>
      </div>

      <form className="space-y-4">
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
          Continue
        </button>
      </form>

      <p className="text-xs text-slate-400 text-center">
        New here?{' '}
        <a
          href={`/s/${tenant}/account/register`}
          className="text-slate-100 underline underline-offset-2"
        >
          Create an account
        </a>
      </p>
    </div>
  );
}
