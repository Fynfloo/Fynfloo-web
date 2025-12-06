import Link from 'next/link';

// app/s/[tenantSlug]/cart/page.tsx
export default async function CartPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const items = [
    {
      id: 'p1',
      name: 'Midnight Desk Lamp',
      price: 79,
      qty: 1,
      image: '/tenant/images/midnight-desk-lamp.png',
    },
  ];

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-50">Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-slate-800 rounded-2xl p-3"
            >
              <div className="h-20 w-20 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-medium text-slate-50">
                    {item.name}
                  </h2>
                  <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-slate-50">
                  £{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {!items.length && (
            <p className="text-sm text-slate-400">
              Your cart is empty. Start by adding something from the store.
            </p>
          )}
        </div>
      </div>

      <aside className="border border-slate-800 rounded-2xl p-4 bg-slate-950/60 space-y-4">
        <h2 className="text-sm font-semibold text-slate-50">Order summary</h2>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-slate-500">
          Shipping and taxes are calculated at checkout.
        </p>
        <Link
          href={`/s/${tenant}/checkout`}
          className="block text-center rounded-full bg-slate-50 text-slate-950 px-5 py-2.5 text-sm font-medium hover:bg-slate-200"
        >
          Go to checkout
        </Link>
      </aside>
    </div>
  );
}
