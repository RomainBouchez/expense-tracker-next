// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react'; // For potential future use with session data

export default function DashboardPage() {
  const router = useRouter();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  // Placeholder for user data if needed, though middleware handles auth
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   // Example: fetch user data if not passed via props from a server component wrapper
  // }, []);

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
      } else {
        // Handle logout error (e.g., show a notification)
        console.error('Logout failed');
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    } finally {
      setIsLoadingLogout(false);
    }
  };

  return (
      <div className="min-h-screen bg-raycast-bg text-raycast-textPrimary p-4 sm:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <Button
              onClick={handleLogout}
              variant="secondary"
              size="md"
              isLoading={isLoadingLogout}
          >
            {isLoadingLogout ? 'Logging out...' : 'Logout'}
          </Button>
        </header>

        <main>
          <p className="text-raycast-textSecondary">Welcome to your Expense Tracker!</p>
          {/* Content will go here */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            <div className="bg-raycast-bgLighter p-6 rounded-xl border border-raycast-border">
              <h2 className="text-xl font-medium mb-2">Current Balance</h2>
              <p className="text-3xl font-semibold text-green-400">$0.00</p>
            </div>
            <div className="bg-raycast-bgLighter p-6 rounded-xl border border-raycast-border">
              <h2 className="text-xl font-medium mb-2">Total Expenses (This Month)</h2>
              <p className="text-3xl font-semibold text-red-400">$0.00</p>
            </div>
            <div className="bg-raycast-bgLighter p-6 rounded-xl border border-raycast-border">
              <h2 className="text-xl font-medium mb-2">Total Income (This Month)</h2>
              <p className="text-3xl font-semibold text-blue-400">$0.00</p>
            </div>
          </div>
        </main>
      </div>
  );
}