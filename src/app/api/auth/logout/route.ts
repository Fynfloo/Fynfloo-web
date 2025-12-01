import { NextResponse, NextRequest } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';

  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
