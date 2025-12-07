import { NextRequest, NextResponse } from 'next/server';
import { rootDomain } from './lib/utils';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Ignore static files and API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Root domain or localhost: treat as platform app
  if (
    hostname === rootDomain ||
    hostname === `www.${rootDomain}` ||
    hostname === 'localhost'
  ) {
    return NextResponse.next();
  }

  // Subdomain: tenant.fynfloo.com → /s/[tenant]/*
  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenant = hostname.replace(`.${rootDomain}`, '');
    const url = req.nextUrl.clone();

    if (!url.pathname.startsWith(`/s/${tenant}`)) {
      url.pathname = `/s/${tenant}${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
