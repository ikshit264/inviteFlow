import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Envelope Base */}
            <rect x="10" y="25" width="80" height="50" rx="4" stroke="currentColor" strokeWidth="6" className="text-black" />

            {/* Envelope Flap Lines */}
            <path d="M10 25L50 55L90 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="text-black" />

            {/* AI Spark / Bolt Overlay */}
            <path
                d="M65 10L55 40H75L45 90L55 55H35L65 10Z"
                fill="#8B5CF6" /* if-purple */
                stroke="black"
                strokeWidth="4"
                strokeLinejoin="round"
            />
        </svg>
    );
};
