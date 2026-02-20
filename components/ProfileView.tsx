'use client';

import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, CreditCard, BarChart, ChevronLeft, Save, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProfileViewProps {
    user: User;
    totalEvents: number;
    onBack: () => void;
    onUpdateUser: (newName: string) => Promise<void>;
    onUpgrade: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, totalEvents, onBack, onUpdateUser, onUpgrade }) => {
    const [name, setName] = useState(user.name);
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleUpdate = async () => {
        if (!name.trim()) return;
        setIsUpdating(true);
        setMessage(null);
        try {
            await onUpdateUser(name);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8 px-4 md:px-0">
            <div className="flex items-center gap-4 mb-10">
                <button onClick={onBack} className="p-2 hover:bg-white rounded-xl transition-colors border-2 border-transparent hover:border-black shadow-sm bg-white md:bg-transparent">
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-4xl font-display font-bold">Profile Settings</h1>
                    <p className="text-gray-500">Manage your account and subscription</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-if-purple rounded-lg border-2 border-black text-white">
                                <UserIcon size={20} />
                            </div>
                            <h2 className="text-2xl font-bold font-display">Personal Details</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-4 bg-if-cream border-2 border-black rounded-xl focus:outline-none focus:shadow-neo transition-all font-bold text-lg"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-not-allowed font-medium text-gray-400"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-gray-300">Read Only</div>
                                </div>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-xl border-2 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
                                    {message.type === 'success' ? <CheckCircle2 size={18} /> : null}
                                    {message.text}
                                </div>
                            )}

                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating || name === user.name}
                                className="w-full py-4 bg-black text-white font-bold rounded-xl border-2 border-black shadow-neo hover:translate-y-px hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                            >
                                {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                {isUpdating ? 'Saving Changes...' : 'Save Profile Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-if-yellow rounded-lg border-2 border-black text-black">
                                <BarChart size={20} />
                            </div>
                            <h2 className="text-2xl font-bold font-display">Activity Overview</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-if-cream border-2 border-black rounded-2xl relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Sparkles size={100} />
                                </div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Events</p>
                                <p className="text-5xl font-display font-bold mt-2">{totalEvents}</p>
                                <p className="text-xs text-gray-400 mt-2 font-medium">Designs created by you</p>
                            </div>
                            <div className="p-8 bg-if-cream border-2 border-black rounded-2xl relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <CreditCard size={100} />
                                </div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Plan</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <p className="text-5xl font-display font-bold uppercase text-if-purple">{user.plan || 'FREE'}</p>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 font-medium">Standard limits applied</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plan & Upgrade */}
                <div className="space-y-8">
                    <div className={`border-2 border-black rounded-3xl p-8 shadow-neo flex flex-col items-center text-center overflow-hidden relative ${user.plan === 'PAID' ? 'bg-if-yellow text-black' : 'bg-black text-white'}`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-if-purple opacity-20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>

                        <div className={`p-4 rounded-full border-2 mb-6 relative z-10 ${user.plan === 'PAID' ? 'bg-black text-white border-black' : 'bg-if-purple text-white border-white'}`}>
                            <Sparkles size={32} />
                        </div>

                        <h2 className="text-3xl font-display font-bold mb-2 relative z-10">
                            {user.plan === 'PAID' ? 'Pro Account' : 'Upgrade to Pro'}
                        </h2>
                        <p className={`mb-8 max-w-[220px] relative z-10 font-medium ${user.plan === 'PAID' ? 'text-gray-700' : 'text-gray-400'}`}>
                            {user.plan === 'PAID'
                                ? 'You are enjoying all premium features and unlimited events.'
                                : 'Unlock unlimited events, higher guest limits and premium templates.'
                            }
                        </p>

                        <div className="text-5xl font-display font-bold mb-10 relative z-10">
                            {user.plan === 'PAID' ? 'PRO' : '$29'}
                            {user.plan !== 'PAID' && <span className="text-lg font-sans opacity-60">· once</span>}
                        </div>

                        {user.plan !== 'PAID' && (
                            <button
                                onClick={onUpgrade}
                                className="w-full py-4 bg-if-yellow text-black font-bold rounded-xl border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-px hover:shadow-none active:translate-y-[4px] transition-all relative z-10 text-xl font-display"
                            >
                                Get Pro Now
                            </button>
                        )}

                        <div className={`mt-8 space-y-4 text-left w-full relative z-10 border-t pt-8 ${user.plan === 'PAID' ? 'border-black/10' : 'border-white/20'}`}>
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <div className="w-5 h-5 rounded-full bg-if-purple flex items-center justify-center text-[10px] text-white">✓</div>
                                Unlimited Events
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <div className="w-5 h-5 rounded-full bg-if-purple flex items-center justify-center text-[10px] text-white">✓</div>
                                No Guest Caps
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <div className="w-5 h-5 rounded-full bg-if-purple flex items-center justify-center text-[10px] text-white">✓</div>
                                All Template Access
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <div className="w-5 h-5 rounded-full bg-if-purple flex items-center justify-center text-[10px] text-white">✓</div>
                                3x Export Quality
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
