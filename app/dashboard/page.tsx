'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import { User } from '@/types';
import Loading from '../loading';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    router.push('/auth');
                }
            } catch (err) {
                console.error(err);
                router.push('/auth');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleCreateNew = () => {
        router.push('/workspace');
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    const handleEventClick = (id: string) => {
        router.push(`/dashboard/event/${id}`);
    };

    if (loading) return <Loading />;
    if (!user) return null; // Prevent crash if user is null while redirecting

    return (
        <Dashboard
            user={user}
            onCreateNew={handleCreateNew}
            onLogout={handleLogout}
            onEventClick={handleEventClick}
        />
    );
}
