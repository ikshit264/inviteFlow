import React from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';

export default function InfoPage() {
    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto grow">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                        Inside the <span className="text-if-purple">Design Engine</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        InviteFlow.ai isn't a template library. It's a dynamic rendering platform
                        that turns unstructured data into professional aesthetic designs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo">
                        <div className="w-12 h-12 bg-if-yellow border-2 border-black rounded-xl flex items-center justify-center mb-6">
                            <Zap className="text-black" />
                        </div>
                        <h2 className="text-2xl font-display font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We believe that event organizers should spend their time on hospitality,
                            not fighting with drag-and-drop tools. Our mission is to automate the
                            mundane parts of event design using context-aware AI.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo">
                        <div className="w-12 h-12 bg-if-purple text-white border-2 border-black rounded-xl flex items-center justify-center mb-6">
                            <Sparkles />
                        </div>
                        <h2 className="text-2xl font-display font-bold mb-4">The Technology</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Using Gemini-Flash, we analyze the tone, category, and logistics of your
                            even text. This data is fed into our proprietary "Themer" which matches
                            font palettes and layouts to your event's unique 'vibe'.
                        </p>
                    </div>
                </div>

                <div className="bg-black text-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo-lg text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Built for Humans.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        Whether you're planning a 1,000 person tech conference or a quiet dinner at home,
                        InviteFlow scales with you. No broken layers, no pixelated logos, just code-perfect designs.
                    </p>
                    <div className="flex justify-center gap-12 flex-wrap">
                        <div className="flex items-center gap-2 text-if-yellow font-bold uppercase tracking-widest text-sm">
                            <Shield size={18} /> Privacy First
                        </div>
                        <div className="flex items-center gap-2 text-if-pink font-bold uppercase tracking-widest text-sm">
                            <Heart size={18} /> Community Driven
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
