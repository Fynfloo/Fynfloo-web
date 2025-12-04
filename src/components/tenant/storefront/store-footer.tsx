// components/storefront/store-footer.tsx
import { StorefrontTenant } from '@/lib/storefront/mock-data';

export function StoreFooter({ tenant }: { tenant: StorefrontTenant }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} {tenant.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <button className="hover:text-slate-300">Privacy</button>
          <button className="hover:text-slate-300">Terms</button>
          <button className="hover:text-slate-300">Contact</button>
        </div>
      </div>
    </footer>
  );
}
