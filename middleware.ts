import { getSession } from '@/lib/session';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/claims', '/settings', '/profile'];

export const middleware = async (request: NextRequest) => {
    const isProtectedRoute = PROTECTED_ROUTES.includes(request.nextUrl.pathname);

    // 1. Check if route is protected
    if (isProtectedRoute) {
        const session = await getSession();
        // 2. Check for valid session
        if (session === null) {
            // 3.Redirect unauthed users
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }

    // 4. Render route
    return NextResponse.next();
}

// Routes middleware should *not* run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image).*)']
}