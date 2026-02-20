'use client';

import React from 'react';
import { X, Trophy, CheckCircle, Zap } from 'lucide-react';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md max-h-[90vh] bg-white border-4 border-black rounded-3xl shadow-neo-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col">
                {/* Header Image/Pattern */}
                <div className="h-24 bg-if-purple relative flex items-center justify-center overflow-hidden shrink-0">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-white rounded-full translate-x-1/3 translate-y-1/3"></div>
                    </div>
                    <Trophy className="text-white relative z-10" size={48} />
                </div>

                <div className="p-6 overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-display font-bold mb-1">Upgrade to Pro!</h2>
                        <p className="text-sm text-gray-500">You've reached the 3-event limit of the Free plan. Ready to unlock more magic?</p>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3 bg-if-cream p-4 rounded-2xl border-2 border-black/5">
                            <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                            <div>
                                <p className="font-bold">Unlimited Events</p>
                                <p className="text-sm text-gray-500">Create as many invitations as your heart desires.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-if-cream p-4 rounded-2xl border-2 border-black/5">
                            <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                            <div>
                                <p className="font-bold">Unlimited Guests</p>
                                <p className="text-sm text-gray-500">No caps on how many people you can invite.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-if-cream p-4 rounded-2xl border-2 border-black/5">
                            <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                            <div>
                                <p className="font-bold">Premium Templates</p>
                                <p className="text-sm text-gray-500">Get access to exclusive, state-of-the-art designs.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onUpgrade}
                        className="w-full py-4 bg-if-yellow text-black text-xl font-bold rounded-2xl border-2 border-black shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3"
                    >
                        <Zap size={24} fill="currentColor" /> Upgrade to Pro
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full mt-4 py-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;
