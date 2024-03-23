import { NextRequest, NextResponse } from 'next/server';
import { getTokenId } from './configs/auth';
import { withAuth } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
  console.log(1);
  // return NextResponse.redirect(new URL('/home', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login'],
};
