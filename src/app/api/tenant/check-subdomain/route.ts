import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8080';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subdomain = searchParams.get('subdomain');

  const cookieHeader = req.headers.get('cookie') || '';

  const res = await fetch(
    `${API_BASE}/api/tenant/check-subdomain?subdomain=${encodeURIComponent(
      subdomain || ''
    )}`,
    {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
      },
      credentials: 'include',
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
