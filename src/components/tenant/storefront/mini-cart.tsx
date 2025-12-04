// components/storefront/mini-cart.tsx
'use client';

type MiniCartProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MiniCart({ open, onOpenChange }: MiniCartProps) {
  // Dummy items
  const items = [
    {
      id: 'p1',
      name: 'Midnight Desk Lamp',
      price: 79,
      qty: 1,
      image: '/tenant/images/midnight-desk-lamp.png',
    },
    {
      id: 'p2',
      name: 'Arc Wireless Mouse',
      price: 59,
      qty: 1,
      image: '/tenant/images/arc-wireless-mouse.png',
    },
  ];

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={() => onOpenChange(false)} />
      <aside className="w-full max-w-sm bg-slate-950 border-l border-slate-800 p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-50">Cart</h2>
          <button
            className="text-xs text-slate-400 hover:text-slate-200"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 border border-slate-800 rounded-2xl p-2"
            >
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-50">{item.name}</p>
                <p className="text-[11px] text-slate-400">
                  Qty {item.qty} · £{item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <footer className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full rounded-full bg-slate-50 text-slate-950 px-5 py-2.5 text-sm font-medium hover:bg-slate-200">
            Go to checkout
          </button>
          <p className="text-[11px] text-slate-500">
            This is a preview mini-cart. Real cart totals will appear after
            backend integration.
          </p>
        </footer>
      </aside>
    </div>
  );
}
