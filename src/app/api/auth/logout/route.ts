import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export async function POST(req: NextRequest) { // POST is generally safer for actions that change state
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
    // No need to await session.save() after destroy if you're just clearing it
    // but if you were setting properties to undefined, you would need to save.

    // Redirecting from an API route is tricky.
    // It's better to let the client-side handle the redirect after a successful logout.
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}