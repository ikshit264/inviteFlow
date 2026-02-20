'use client';

import { useRouter } from 'next/navigation';
import Workspace from '@/components/Workspace';

export default function WorkspacePage() {
    const router = useRouter();

    const handleBackToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <Workspace
            onBackToDashboard={handleBackToDashboard}
        />
    );
}
