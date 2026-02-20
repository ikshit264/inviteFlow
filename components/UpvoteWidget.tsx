// components/UpvoteWidget.tsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function UpvoteWidget({ userId }: { userId: string }) {
    useEffect(() => {
        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'upvote-widget';
        widgetDiv.setAttribute('data-application-id', 'app_inviteflow_ikshit264');
        widgetDiv.setAttribute('data-user-id', userId);
        widgetDiv.setAttribute('data-position', 'right');
        widgetDiv.setAttribute('data-theme', 'light');
        document.body.appendChild(widgetDiv);

        return () => {
            document.body.removeChild(widgetDiv);
        };
    }, [userId]);

    return <Script src="https://upvote.entrext.com/widget.js" strategy="lazyOnload" />;
}
