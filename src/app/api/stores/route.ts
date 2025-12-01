import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';

  const res = await fetch(`${API_BASE}/api/stores`, {
    method: 'GET',
    headers: {
      cookie: cookieHeader,
    },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
