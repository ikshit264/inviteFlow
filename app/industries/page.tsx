import { Metadata } from 'next';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import industryData from '@/lib/seo-data/industries.json';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'InviteFlow.ai for Industries | Event Professionals',
    description: 'Discover how InviteFlow.ai helps event planners, HR teams, and non-profits scale their invitation design.',
    alternates: {
        canonical: `${process.env.BASE_URL || 'https://inviteflow.ai'}/industries`,
    },
};

export default function IndustriesIndexPage() {
    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto grow w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Industry Applications
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See how professionals in your field use InviteFlow.ai to generate thousands of personalized invitations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industryData.map((ind) => (
                        <Link
                            key={ind.slug}
                            href={`/industries/${ind.slug}`}
                            className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-if-green/10 rounded-full blur-3xl -translate-y-6 translate-x-6"></div>

                            <h2 className="text-2xl font-bold mb-4 font-display group-hover:text-if-purple transition-colors">
                                {ind.industry}
                            </h2>
                            <p className="text-gray-600 mb-6 grow">
                                {ind.problem}
                            </p>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{ind.primary_keyword}</span>
                                <span className="inline-block text-if-purple-dark font-bold group-hover:underline transition-all">
                                    Learn More →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
