import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from './lib/session'; // Adjust path if needed
import { cookies } from 'next/headers';


export async function middleware(request: NextRequest) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    const { pathname } = request.nextUrl;

    // Allow access to API routes for auth, static files, and Next.js internals
    const publicPaths = ['/login', '/api/auth/login'];
    if (publicPaths.includes(pathname) || pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.includes('.')) {
        // If logged in and trying to access /login, redirect to dashboard
        if (session.isLoggedIn && pathname === '/login') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // If not logged in and trying to access a protected route
    if (!session.isLoggedIn) {
        // Store the attempted URL to redirect back after login
        const loginUrl = new URL('/login', request.url);
        // loginUrl.searchParams.set('redirect_to', pathname); // Optional: redirect back
        return NextResponse.redirect(loginUrl);
    }

    // If logged in and trying to access /login, redirect to dashboard
    if (session.isLoggedIn && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth/status (example of a public API route if you had one)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets
         */
        '/((?!api/auth/status|_next/static|_next/image|favicon.ico|logo.svg|images/).*)', // Adjust logo.svg etc. if you add public assets
    ],
};