import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  if (!token) {
    if (pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.rewrite(url);
    }
  }

  if (role.value !== 'admin') {
    if (pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
