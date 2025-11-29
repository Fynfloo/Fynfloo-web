// app/api/tenant/by-slug/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8080';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookieHeader = req.headers.get('cookie') || '';
  const { slug } = await params;

  const res = await fetch(
    `${API_BASE}/api/tenant/by-slug/${encodeURIComponent(slug)}`,
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
