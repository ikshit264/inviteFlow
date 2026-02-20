import { Metadata } from 'next';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import useCases from '@/lib/seo-data/use-cases.json';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'All Use Cases | InviteFlow.ai',
    description: 'Explore the diverse ways InviteFlow.ai automates event invitation design for weddings, corporate events, parties, and more.',
    alternates: {
        canonical: `${process.env.BASE_URL || 'https://inviteflow.ai'}/use-cases`,
    },
};

export default function UseCasesIndexPage() {
    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto grow w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Explore Use Cases
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See how InviteFlow.ai adapts to every event type, from intimate gatherings to massive corporate functions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {useCases.map((uc) => (
                        <Link
                            key={uc.slug}
                            href={`/use-cases/${uc.slug}`}
                            className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all group flex flex-col"
                        >
                            <h2 className="text-2xl font-bold mb-4 font-display group-hover:text-if-purple transition-colors">
                                {uc.title}
                            </h2>
                            <p className="text-gray-600 mb-6 grow">
                                {uc.solution_summary}
                            </p>
                            <div className="flex items-center gap-2 font-bold text-black border-t-2 border-gray-100 pt-4 mt-auto">
                                Read More <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
