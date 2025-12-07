import { NextRequest, NextResponse } from 'next/server';
import { apiUrl } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;

  const backendRes = await fetch(
    `${apiUrl}/api/tenant/${encodeURIComponent(tenantId)}/dashboard`,
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
