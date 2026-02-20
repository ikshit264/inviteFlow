import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import industryData from '@/lib/seo-data/industries.json';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

interface Props {
    params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
    return industryData.map((ind) => ({
        industry: ind.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { industry } = await params;
    const ind = industryData.find((i) => i.slug === industry);
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    if (!ind) return {};

    return {
        title: ind.title,
        description: `${ind.industry} use InviteFlow.ai to ${ind.solution}`,
        alternates: {
            canonical: `${baseUrl}/industries/${industry}`,
        },
    };
}

export default async function IndustryPage({ params }: Props) {
    const { industry } = await params;
    const ind = industryData.find((i) => i.slug === industry);

    if (!ind) notFound();

    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto grow">
                <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-if-yellow border-2 border-black rounded-lg flex items-center justify-center">
                            <Briefcase size={24} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Industry Solution</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        {ind.title}
                    </h1>

                    <div className="space-y-6 text-xl leading-relaxed">
                        <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                            <p className="font-bold text-red-800">The Problem:</p>
                            <p className="text-gray-700">{ind.problem}</p>
                        </div>

                        <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                            <p className="font-bold text-green-800">The Solution:</p>
                            <p className="text-gray-700">{ind.solution}</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/auth"
                            className="inline-block bg-black text-white border-2 border-black px-8 py-4 rounded-2xl font-bold text-xl shadow-neo hover:bg-if-purple transition-all"
                        >
                            {ind.cta}
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {industryData.filter(i => i.slug !== industry).map(i => (
                        <Link key={i.slug} href={`/industries/${i.slug}`} className="p-8 bg-white border-2 border-black rounded-3xl shadow-neo-sm hover:shadow-neo transition-all flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">{i.industry}</h3>
                                <p className="text-sm text-gray-500">{i.problem}</p>
                            </div>
                            <span className="mt-4 font-bold text-if-purple-dark underline">Learn More →</span>
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
