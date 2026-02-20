'use client';

import { useEffect, useState } from 'react';
import UpvoteWidget from './UpvoteWidget';

export default function UpvoteWidgetWrapper() {
    const [userId, setUserId] = useState<string>('anonymous');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    if (data.user?.id) {
                        setUserId(data.user.id);
                    }
                }
            } catch {
                // User not logged in, keep "anonymous"
            }
        };

        fetchUser();
    }, []);

    return <UpvoteWidget userId={userId} />;
}
