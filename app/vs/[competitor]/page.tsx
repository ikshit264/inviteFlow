import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import competitors from '@/lib/seo-data/competitors.json';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

interface Props {
    params: Promise<{ competitor: string }>;
}

export async function generateStaticParams() {
    return competitors.map((comp) => ({
        competitor: comp.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { competitor } = await params;
    const comp = competitors.find((c) => c.slug === competitor);
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    if (!comp) return {};

    return {
        title: `InviteFlow.ai vs ${comp.name} | The Comparison`,
        description: `See why professionals choose InviteFlow.ai over ${comp.name} for bulk personalized event invitations.`,
        alternates: {
            canonical: `${baseUrl}/vs/${competitor}`,
        },
    };
}

export default async function ComparisonPage({ params }: Props) {
    const { competitor } = await params;
    const comp = competitors.find((c) => c.slug === competitor);

    if (!comp) notFound();

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://inviteflow.ai"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `InviteFlow vs ${comp.name}`,
                "item": `https://inviteflow.ai/vs/${competitor}`
            }
        ]
    };

    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto grow">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                        InviteFlow.ai <br /><span className="text-gray-400">vs</span> {comp.name}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stop fighting with canvases. Start using an engine built for volume.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo grayscale opacity-60">
                        <h2 className="text-2xl font-bold mb-6 text-gray-500 uppercase tracking-widest">{comp.name}</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-red-500 font-medium">
                                <X size={20} /> Manual data entry for every guest
                            </li>
                            <li className="flex items-center gap-3 text-red-500 font-medium">
                                <X size={20} /> Static layouts that break
                            </li>
                            <li className="flex items-center gap-3 text-red-500 font-medium">
                                <X size={20} /> Slow, repetitive workflow
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-neo relative">
                        <div className="absolute top-0 right-0 bg-if-purple text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">The Winner</div>
                        <h2 className="text-2xl font-bold mb-6 text-if-purple-dark uppercase tracking-widest">InviteFlow.ai</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-green-600 font-bold">
                                <Check size={20} /> Automated CSV processing
                            </li>
                            <li className="flex items-center gap-3 text-green-600 font-bold">
                                <Check size={20} /> Code-first auto-resizing
                            </li>
                            <li className="flex items-center gap-3 text-green-600 font-bold">
                                <Check size={20} /> Instant bulk rendering
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-black text-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo-lg mb-12">
                    <h3 className="text-3xl font-display font-bold mb-6">Comparison Insights</h3>
                    <div className="space-y-6">
                        {comp.comparison_points.map((point, i) => (
                            <div key={i} className="flex items-start gap-4 border-l-2 border-if-purple pl-6">
                                <p className="text-lg text-gray-300">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/auth"
                        className="inline-block bg-if-yellow text-black border-2 border-black px-8 py-4 rounded-2xl font-bold text-xl shadow-neo hover:translate-y-1 hover:shadow-neo-sm transition-all"
                    >
                        Choose Speed. Switch to InviteFlow.
                    </Link>
                </div>

                {/* Link back to other comparisons */}
                <div className="mt-20 pt-8 border-t-2 border-black flex flex-wrap gap-8 justify-center">
                    {competitors.filter(c => c.slug !== competitor).map(c => (
                        <Link key={c.slug} href={`/vs/${c.slug}`} className="font-bold text-gray-500 hover:text-black hover:underline">
                            vs {c.name}
                        </Link>
                    ))}
                    <Link href="/use-cases/wedding-invitations" className="font-bold text-gray-500 hover:text-black hover:underline">
                        Wedding Use Case
                    </Link>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
