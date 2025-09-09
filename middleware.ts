import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Simple middleware - let client-side handle auth
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
