import { IronSessionOptions } from 'iron-session';
import { User } from '@/types'; // We'll define this soon

console.log("SESSION_SECRET from env in session.ts:", process.env.SESSION_SECRET);

export interface SessionData {
    user?: User; // Or just isLoggedIn: boolean for this simple case
    isLoggedIn?: boolean;
}

export const sessionOptions: IronSessionOptions = {
    password: process.env.SESSION_SECRET as string, // Ensure it's set in .env.local
    cookieName: 'expense-tracker-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
};

// Helper to get session data in Route Handlers and Server Components
// This is a common pattern, but you can also use getIronSession directly
// For App Router, you usually use getIronSession with cookies()
// import { getIronSession } from 'iron-session';
// import { cookies } from 'next/headers';
// const session = await getIronSession<SessionData>(cookies(), sessionOptions);