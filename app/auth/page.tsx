'use client';

import AuthPage from '@/components/AuthPage';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

export default function Auth() {
    const router = useRouter();

    const handleLoginSuccess = (user: User) => {
        // In a real app, this would be handled by a session cookie or JWT
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/dashboard');
    };

    return (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
    );
}
