import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';

  const res = await fetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: { cookie: cookieHeader },
    credentials: 'include',
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
