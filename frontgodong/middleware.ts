import { usePathname } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import path from 'path';

export function middleware(request: NextRequest) {
    // const pathname = usePathname();
  const pathname = request.nextUrl.pathname;
//   const router = useRouter();
//   const pathname = router.asPath;
  const isAuthenticated = request.cookies.has('auth_token');

  if (!isAuthenticated && pathname !== '/login' && pathname !== '/signup') {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isAuthenticated && (pathname.startsWith("/login") || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }
  if (isAuthenticated && (pathname.startsWith('/dashboard/') || pathname.startsWith('/admin/dashboard/'))) {
    console.error(pathname)
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};