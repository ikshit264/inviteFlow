import { Metadata } from 'next';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import solutionData from '@/lib/seo-data/solutions.json';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'InviteFlow.ai Solutions | Fix Critical Design Bottlenecks',
    description: 'Learn how InviteFlow.ai solves the core problems of manual invitation design, including guest list management errors and inconsistent branding.',
    alternates: {
        canonical: `${process.env.BASE_URL || 'https://inviteflow.ai'}/solutions`,
    },
};

export default function SolutionsIndexPage() {
    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto grow w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Solutions to Real Problems
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stop accepting the inefficiencies of drag-and-drop tools. We have solved the headache of manual invitation design.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
                    {solutionData.map((sol) => (
                        <Link
                            key={sol.slug}
                            href={`/solutions/${sol.slug}`}
                            className="bg-white border-2 border-black rounded-3xl p-10 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-if-yellow/10 rounded-full blur-3xl -translate-y-6 translate-x-6"></div>

                            <div>
                                <h2 className="text-3xl font-display font-bold mb-4">{sol.title}</h2>
                                <div className="space-y-4 text-lg">
                                    <p className="text-red-500 font-medium">❌ {sol.why_fails}</p>
                                    <p className="text-green-600 font-medium">✅ {sol.how_solves}</p>
                                </div>
                            </div>

                            <span className="inline-block mt-8 text-if-purple-dark text-lg font-bold underline group-hover:text-black transition-colors">
                                Explore Solution →
                            </span>
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
