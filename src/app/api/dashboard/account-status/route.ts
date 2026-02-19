import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get('storeId');

  const cookieHeader = req.headers.get('cookie') || '';
  if (!storeId) {
    return NextResponse.json(
      { error: 'Missing storeId parameter' },
      { status: 400 },
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/${storeId}/connect-status`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
      credentials: 'include',
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch account status' },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
