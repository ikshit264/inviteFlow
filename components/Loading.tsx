import React from 'react';
import { Sparkles } from 'lucide-react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-if-cream flex flex-col items-center justify-center z-[100] animate-in fade-in duration-500">
            <div className="relative">
                {/* Main Logo Box */}
                <div className="w-24 h-24 bg-black text-white flex items-center justify-center rounded-[2.5rem] shadow-neo animate-bounce">
                    <Sparkles size={48} className="text-if-purple animate-pulse" fill="currentColor" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-if-yellow border-2 border-black rounded-full animate-ping opacity-20"></div>
                <div className="absolute -bottom-8 -left-12 w-16 h-16 bg-if-pink border-2 border-black rounded-[2.5rem] rotate-12 animate-bounce [animation-delay:0.25s]"></div>
                <div className="absolute top-1/2 -left-16 w-10 h-10 bg-if-purple border-2 border-black rounded-3xl -rotate-12 animate-pulse [animation-delay:0.5s]"></div>

                {/* Orbiting particles */}
                <div className="absolute top-0 left-0 w-full h-full border-4 border-dashed border-if-purple/20 rounded-full animate-[spin_8s_linear_infinite] scale-150"></div>
            </div>

            <div className="mt-20 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center">
                    <h1 className="font-display font-bold text-5xl tracking-tighter mb-1">
                        InviteFlow<span className="text-if-purple">.ai</span>
                    </h1>
                    <div className="h-1.5 w-12 bg-if-purple rounded-full"></div>
                </div>

                {/* Premium Progress Bar */}
                <div className="w-64 h-3 bg-white border-2 border-black rounded-full overflow-hidden shadow-neo-sm relative">
                    <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-if-purple via-if-pink to-if-purple animate-progress-loading"></div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] animate-pulse">Syncing Design Engine</p>
                    <div className="flex gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 bg-if-purple rounded-full animate-bounce [animation-delay:0s]"></div>
                        <div className="w-1.5 h-1.5 bg-if-purple rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-if-purple rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
