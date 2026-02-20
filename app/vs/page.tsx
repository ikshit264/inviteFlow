import { Metadata } from 'next';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import comparisonData from '@/lib/seo-data/competitors.json';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'InviteFlow.ai Comparisons | Why We Win',
    description: 'Compare InviteFlow.ai against traditional design tools like Canva, Evite, and Paperless Post.',
    alternates: {
        canonical: `${process.env.BASE_URL || 'https://inviteflow.ai'}/vs`,
    },
};

export default function VSIndexPage() {
    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto grow w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Why InviteFlow?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See how we stack up against the competition. Spoiler: We are faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {comparisonData.map((comp) => (
                        <Link
                            key={comp.slug}
                            href={`/vs/${comp.slug}`}
                            className="bg-white border-2 border-black rounded-3xl p-12 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all text-center flex flex-col justify-center items-center group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-if-pink/10 rounded-full blur-3xl -translate-y-8 translate-x-8"></div>

                            <span className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-4">Competitor</span>
                            <h2 className="text-4xl font-display font-bold mb-8">{comp.name}</h2>

                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-bold text-2xl text-gray-400 border-2 border-gray-200 mb-8 group-hover:bg-if-yellow group-hover:border-black group-hover:text-black transition-all">
                                VS
                            </div>

                            <p className="text-xl font-medium text-gray-600 mb-8">
                                See exactly why InviteFlow beats {comp.name} for bulk events.
                            </p>

                            <span className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold group-hover:bg-if-purple transition-colors">
                                View Comparison
                            </span>
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
