import React from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto grow">
                <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>

                    <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-if-yellow border-2 border-black rounded flex items-center justify-center text-sm">01</span>
                                Information We Collect
                            </h2>
                            <p>
                                We collect information you provide directly to us when you create an account, use our AI generation tools,
                                and communicate with us. This includes your name, email address, event details, and guest lists.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-if-purple text-white border-2 border-black rounded flex items-center justify-center text-sm">02</span>
                                How We Use Your Data
                            </h2>
                            <p>
                                Your data is used exclusively to provide and improve InviteFlow.ai services.
                                We use event details to train our AI for better design extraction (anonymized) and to render your
                                personalized invitations. We do not sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-if-pink border-2 border-black rounded flex items-center justify-center text-sm">03</span>
                                Data Security
                            </h2>
                            <p>
                                We implement industry-standard security measures to protect your unauthorized access to or
                                alteration, disclosure, or destruction of your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-green-400 border-2 border-black rounded flex items-center justify-center text-sm">04</span>
                                Your Rights
                            </h2>
                            <p>
                                You have the right to access, correct, or delete your personal information at any time.
                                You can manage your data directly through your dashboard or by contacting our support team.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t-2 border-gray-100 text-sm text-gray-500 italic">
                        Last updated: Feb 20, 2026
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
