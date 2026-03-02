// components/UpvoteWidget.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

/**
 * AI-PROOF UNIVERSAL NEXT.JS WIDGET
 * 
 * Instructions: 
 * 1. Place this file in your components folder.
 * 2. Add <UpvoteWidget /> to your root layout.
 * 
 * Features:
 * - Cache Bypass: Prevents stale "logged-in" states after logout.
 * - Tab Sync: Automatically unmounts if you log out in another tab.
 * - Nuclear Cleanup: Forcefully removes all script-injected DOM elements.
 * - Keyed Remounting: Ensures a clean state for every user.
 */
export default function UpvoteWidget() {
    const [userData, setUserData] = useState<{ id: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const fetchSession = useCallback(async () => {
        try {
            // Using /api/auth/me (Ensure this matches your backend endpoint)
            const res = await fetch('/api/auth/me', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                if (data.user?.email) {
                    setUserData({ id: data.user.id || '', email: data.user.email });
                    return;
                }
            }
            setUserData(null);
        } catch {
            setUserData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSession();

        // 1. Sync on route changes (login/logout redirects)
        // 2. Sync on manual auth events
        // 3. Sync on window focus (detects logouts from other tabs)
        window.addEventListener('auth-change', fetchSession);
        window.addEventListener('focus', fetchSession);
        
        return () => {
            window.removeEventListener('auth-change', fetchSession);
            window.removeEventListener('focus', fetchSession);
        };
    }, [pathname, fetchSession]);

    useEffect(() => {
        // NUCLEAR CLEANUP: Clear every trace of the widget on logout
        const cleanup = () => {
            const selectors = [
                '.upvote-widget-container', 
                '#upvote-widget-root', 
                'iframe[src*="upvote"]',
                '.upvote-feedback-widget'
            ];
            selectors.forEach(s => document.querySelectorAll(s).forEach(el => el.remove()));
            // @ts-ignore
            if (window.UpVote) delete window.UpVote;
        };

        if (!userData?.email) {
            cleanup();
        }

        return cleanup; // Extra safety on unmount
    }, [userData]); 

    if (loading || !userData?.email) return null;

    return (
        <>
            <div 
                key={userData.email} // Forces fresh mount on user change
                className="upvote-widget"
                data-application-id="69a41f203a9a405a41b02afc"
                data-user-id={userData.id}
                data-email={userData.email}
                data-position="right"
                data-theme="light"
            />
            <Script src="http://upvote.entrext.com/widget.js" strategy="afterInteractive" />
        </>
    );
}
