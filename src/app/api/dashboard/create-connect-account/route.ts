import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get('storeId');

  const cookieHeader = req.headers.get('cookie') || '';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/${storeId}/create-connect-account`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
      credentials: 'include',
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to create Stripe account' },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
