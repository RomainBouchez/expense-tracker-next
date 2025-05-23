// src/app/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'admin', password }), // Username is fixed
            });

            if (res.ok) {
                router.push('/'); // Redirect to dashboard on successful login
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed. Please check your password.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-raycast-bg">
            <Card className="w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-raycast-textPrimary mb-6">
                    Expense Tracker Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            label="Username"
                            id="username"
                            type="text"
                            value="admin"
                            readOnly
                            className="bg-raycast-bgDarker cursor-not-allowed" // Assuming bgDarker is defined in tailwind.config
                        />
                    </div>
                    <div>
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            error={error ? ' ' : undefined} // To make space for the error message below
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 text-center -mt-2">{error}</p>
                    )}

                    <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}