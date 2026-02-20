'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import EditEventWorkspace from '@/components/EditEventWorkspace';

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const handleBackToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <EditEventWorkspace
            eventId={id}
            onBackToDashboard={handleBackToDashboard}
        />
    );
}
