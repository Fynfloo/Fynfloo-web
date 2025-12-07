import { NextRequest, NextResponse } from 'next/server';
import { apiUrl } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const backendRes = await fetch(`${apiUrl}/api/stores`, {
    method: 'GET',
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
    credentials: 'include',
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
