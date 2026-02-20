'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PublicNavbarProps {
    onLogin?: () => void;
    onGetStarted?: () => void;
}

const PublicNavbar: React.FC<PublicNavbarProps> = ({ onLogin, onGetStarted }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b-2 border-black py-4' : 'bg-transparent py-6'} px-6 md:px-12`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg border-2 border-transparent group-hover:border-if-purple group-hover:bg-if-purple transition-all shadow-neo">
                        <Sparkles size={20} fill="currentColor" />
                    </div>
                    <span className="font-display font-bold text-2xl tracking-tighter">InviteFlow.ai</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-bold text-sm">
                    <Link href="/#features" className="hover:text-if-purple transition-colors">How it Works</Link>
                    <Link href="/#pricing" className="hover:text-if-purple transition-colors">Pricing</Link>
                    {onLogin ? (
                        <button onClick={onLogin} className="hover:text-if-purple transition-colors">Log In</button>
                    ) : (
                        <Link href="/auth" className="hover:text-if-purple transition-colors">Log In</Link>
                    )}
                    {onGetStarted ? (
                        <button
                            onClick={onGetStarted}
                            className="bg-if-yellow border-2 border-black px-6 py-2 rounded-lg shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:shadow-none transition-all"
                        >
                            Start Building
                        </button>
                    ) : (
                        <Link
                            href="/auth"
                            className="bg-if-yellow border-2 border-black px-6 py-2 rounded-lg shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:shadow-none transition-all"
                        >
                            Start Building
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
