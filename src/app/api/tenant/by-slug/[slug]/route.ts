import { NextRequest, NextResponse } from 'next/server';
import { apiUrl } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const backendRes = await fetch(
    `${apiUrl}/api/tenant/by-slug/${encodeURIComponent(slug)}`,
    {
      method: 'GET',
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
      credentials: 'include',
    }
  );
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
