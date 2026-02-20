import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import solutionData from '@/lib/seo-data/solutions.json';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return solutionData.map((sol) => ({
        slug: sol.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const sol = solutionData.find((s) => s.slug === slug);
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    if (!sol) return {};

    return {
        title: sol.title,
        description: `Learn how InviteFlow.ai helps you ${sol.slug.replace(/-/g, ' ')}.`,
        alternates: {
            canonical: `${baseUrl}/solutions/${slug}`,
        },
    };
}

export default async function SolutionPage({ params }: Props) {
    const { slug } = await params;
    const sol = solutionData.find((s) => s.slug === slug);

    if (!sol) notFound();

    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto grow">
                <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo mb-12">
                    <div className="w-16 h-16 bg-if-pink border-2 border-black rounded-2xl flex items-center justify-center mb-8 rotate-3 shadow-neo-sm">
                        <Lightbulb size={32} />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
                        {sol.title}
                    </h1>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm italic">?</span>
                                The Challenge
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {sol.why_fails}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-if-purple text-white rounded-full flex items-center justify-center text-sm italic">!</span>
                                The Solution
                            </h2>
                            <div className="bg-if-purple/5 border-2 border-if-purple p-8 rounded-3xl">
                                <p className="text-xl text-if-purple-dark font-medium leading-relaxed">
                                    {sol.how_solves}
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/auth"
                            className="inline-block bg-if-yellow text-black border-2 border-black px-10 py-5 rounded-3xl font-bold text-xl shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm transition-all"
                        >
                            {sol.cta}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {solutionData.filter(s => s.slug !== slug).map(s => (
                        <Link key={s.slug} href={`/solutions/${s.slug}`} className="flex-1 p-6 bg-white border-2 border-black rounded-2xl shadow-neo-sm hover:translate-y-[-4px] transition-all">
                            <h4 className="font-bold mb-2">Another Way to Scale</h4>
                            <p className="text-sm text-gray-500">{s.title}</p>
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
