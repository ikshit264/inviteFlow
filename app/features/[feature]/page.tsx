import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import features from '@/lib/seo-data/features.json';
import Link from 'next/link';
import { Sparkles, Terminal, Layers } from 'lucide-react';

interface Props {
    params: Promise<{ feature: string }>;
}

export async function generateStaticParams() {
    return features.map((f) => ({
        feature: f.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { feature } = await params;
    const f = features.find((feat) => feat.slug === feature);
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    if (!f) return {};

    return {
        title: `${f.title} | InviteFlow.ai Features`,
        description: f.description,
        alternates: {
            canonical: `${baseUrl}/features/${feature}`,
        },
    };
}

export default async function FeaturePage({ params }: Props) {
    const { feature } = await params;
    const f = features.find((feat) => feat.slug === feature);

    if (!f) notFound();

    const getIcon = (slug: string) => {
        switch (slug) {
            case 'ai-personalization': return <Sparkles size={48} />;
            case 'bulk-rendering': return <Terminal size={48} />;
            default: return <Layers size={48} />;
        }
    };

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
                "name": f.title,
                "item": `https://inviteflow.ai/features/${feature}`
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

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto grow">
                <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-16 shadow-neo text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-if-purple/10 rounded-full blur-3xl"></div>

                    <div className="w-24 h-24 bg-if-purple text-white border-2 border-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-neo-sm">
                        {getIcon(feature)}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        {f.title}
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                        {f.description}
                    </p>

                    <Link
                        href="/auth"
                        className="inline-block bg-black text-white border-2 border-black px-10 py-5 rounded-2xl font-bold text-xl shadow-neo hover:bg-if-purple transition-all"
                    >
                        Try This Feature Now
                    </Link>
                </div>

                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-if-yellow border-2 border-black rounded-3xl p-8 shadow-neo">
                        <h2 className="text-2xl font-bold mb-4 italic">How it helps you</h2>
                        <p className="font-medium">
                            This feature is specifically designed to eliminate the manual overhead of 1-to-1 design tasks,
                            enabling you to focus on the bigger picture of your event planning.
                        </p>
                    </div>

                    <div className="bg-if-pink border-2 border-black rounded-3xl p-8 shadow-neo">
                        <h2 className="text-2xl font-bold mb-4 italic">Integrated Workflow</h2>
                        <p className="font-medium">
                            Works seamlessly with our guest list management and template engine to provide a
                            unified experience from raw text to rendered PNG.
                        </p>
                    </div>
                </div>

                <div className="mt-20 flex flex-wrap gap-4 justify-center">
                    {features.filter(feat => feat.slug !== feature).map(feat => (
                        <Link key={feat.slug} href={`/features/${feat.slug}`} className="px-6 py-2 bg-white border-2 border-black rounded-full font-bold hover:bg-if-purple hover:text-white transition-all">
                            Explore {feat.title}
                        </Link>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
