import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { verifyPassword } from '@/lib/authUtils';
import { sessionOptions, SessionData } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

interface AdminConfigRow extends RowDataPacket {
    id: number;
    username: string;
    password_hash: string;
}

export async function POST(req: NextRequest) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    const { username, password } = await req.json();

    if (username !== 'admin') {
        return NextResponse.json({ message: 'Invalid username.' }, { status: 401 });
    }

    if (!password) {
        return NextResponse.json({ message: 'Password is required.' }, { status: 400 });
    }

    try {
        const [rows] = await pool.query<AdminConfigRow[]>(
            'SELECT id, username, password_hash FROM AdminConfig WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Admin user not found. Please run setup.' }, { status: 401 });
        }

        const adminUser = rows[0];
        const isValidPassword = await verifyPassword(password, adminUser.password_hash);

        if (!isValidPassword) {
            return NextResponse.json({ message: 'Invalid password.' }, { status: 401 });
        }

        session.user = { id: adminUser.id, username: adminUser.username };
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}