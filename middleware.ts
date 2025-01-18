import { getCookieSession, getSession } from '@/lib/session';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const API_ROUTE = '/api';
const PROTECTED_ROUTES = ['/claims', '/profile'];

export const middleware = async ({ headers, nextUrl }: NextRequest) => {
    // Check if route is protected
    if (PROTECTED_ROUTES.includes(nextUrl.pathname)) {
        const currentSession = await getCookieSession();
        // Check for valid session
        if (!currentSession) {
            // Redirect unauthed users
            return NextResponse.redirect(new URL('/login?forbidden=true', nextUrl));
        }
    }

    if (nextUrl.pathname.startsWith(API_ROUTE)) {
        const authorization = headers.get('Authorization');
        if (!authorization) {
            return NextResponse.json({ message: 'Missing Authorization' }, { status: 400 });
        }

        const session = await getSession(authorization);
        // Check for valid session
        if (!session || !session.userId) {
            // Redirect unauthed users
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    }

    // Render route
    return NextResponse.next();
};

// Routes middleware should *not* run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (API auth routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
