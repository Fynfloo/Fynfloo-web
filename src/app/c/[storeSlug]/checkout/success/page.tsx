'use client';

import { useSearchParams } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  return (
    <div className="mx-auto max-w-lg py-20 text-center space-y-4">
      <h1 className="text-2xl font-semibold">Payment successful 🎉</h1>
      <p className="text-sm text-muted-foreground">
        Your order has been placed successfully.
      </p>
      {orderId && <p className="text-xs opacity-70">Order ID: {orderId}</p>}
      <a
        href="/"
        className="inline-block rounded-full bg-black px-4 py-2 text-sm text-white"
      >
        Continue shopping
      </a>
    </div>
  );
}
