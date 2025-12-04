import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rootDomain } from './lib/utils';

const PROTECTED = ['/dashboard', '/settings', '/account', '/editor', '/admin'];

// ---------------------------
// Silent Refresh
// ---------------------------

async function attemptSilentRefresh(req: NextRequest) {
  const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

  const backendRes = await fetch(refreshUrl, {
    method: 'POST',
    headers: {
      cookie: req.headers.get('cookie') ?? '',
      'User-Agent': req.headers.get('user-agent') ?? '',
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!backendRes.ok) return null;

  const cookies = backendRes.headers.getSetCookie();
  if (!cookies.length) return null;

  const redirectUrl = new URL(req.url);
  const resp = NextResponse.redirect(redirectUrl);

  cookies.forEach((c) => resp.headers.append('set-cookie', c));

  return resp;
}

// ---------------------------
// Subdomain extraction
// ---------------------------

function extractSubdomain(req: NextRequest): string | null {
  const hostname = req.headers.get('host')?.split(':')[0] || '';

  // LOCAL DEV (lvh.me)
  if (hostname.endsWith('.lvh.me')) {
    const sub = hostname.replace('.lvh.me', '');
    return sub === 'app' ? null : sub;
  }

  // PROD
  const root = rootDomain.replace(/^www\./, '');
  if (hostname === root || hostname === `www.${root}`) return null;

  if (hostname.endsWith(`.${root}`)) {
    return hostname.replace(`.${root}`, '');
  }

  return null;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;
  const sub = extractSubdomain(req);

  if (sub) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${sub}`, req.url));
    }
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.rewrite(new URL(`/s/${sub}/dashboard`, req.url));
    }
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/check-email') ||
    pathname.startsWith('/confirmed') ||
    pathname.startsWith('/confirm-email');

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protected routes → require token
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const refreshed = await attemptSilentRefresh(req);
      if (refreshed) return refreshed;

      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Match all paths except static assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
