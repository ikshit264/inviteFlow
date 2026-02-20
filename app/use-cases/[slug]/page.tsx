import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import useCases from '@/lib/seo-data/use-cases.json';
import Link from 'next/link';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return useCases.map((uc) => ({
        slug: uc.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const useCase = useCases.find((uc) => uc.slug === slug);
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    if (!useCase) return {};

    return {
        title: useCase.title,
        description: useCase.solution_summary,
        alternates: {
            canonical: `${baseUrl}/use-cases/${slug}`,
        },
        openGraph: {
            title: useCase.title,
            description: useCase.solution_summary,
            url: `${baseUrl}/use-cases/${slug}`,
        }
    };
}

export default async function UseCasePage({ params }: Props) {
    const { slug } = await params;
    const useCase = useCases.find((uc) => uc.slug === slug);

    if (!useCase) notFound();

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
                "name": useCase.title,
                "item": `https://inviteflow.ai/use-cases/${slug}`
            }
        ]
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": useCase.faq.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-if-cream font-sans text-gray-900 selection:bg-if-purple selection:text-white flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, faqLd]) }}
            />
            <PublicNavbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto grow">
                <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 italic">
                        {useCase.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                        {useCase.solution_summary}
                    </p>

                    <div className="space-y-8 mt-12">
                        <h2 className="text-2xl font-bold border-b-2 border-black pb-2 inline-block">The Challenges</h2>
                        <ul className="grid gap-4">
                            {useCase.pain_points.map((pt, i) => (
                                <li key={i} className="flex items-start gap-4 bg-gray-50 border-2 border-black p-4 rounded-xl">
                                    <span className="w-8 h-8 rounded-full bg-if-pink border-2 border-black flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                    <span className="font-bold">{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/auth"
                            className="inline-block bg-if-purple text-white border-2 border-black px-8 py-4 rounded-2xl font-bold text-xl shadow-neo hover:translate-y-1 hover:shadow-neo-sm transition-all"
                        >
                            Build Your {useCase.slug.split('-')[0]} Invites Now
                        </Link>
                    </div>
                </div>

                {useCase.faq.length > 0 && (
                    <div className="bg-if-yellow border-2 border-black rounded-3xl p-8 md:p-12 shadow-neo mb-12">
                        <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-widest">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {useCase.faq.map((f, i) => (
                                <div key={i} className="bg-white border-2 border-black p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold mb-2">{f.question}</h3>
                                    <p className="text-gray-600">{f.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Internal Linking Block */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo-sm">
                        <h4 className="font-bold text-gray-400 uppercase text-xs mb-4">Related Solutions</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/" className="font-bold hover:text-if-purple-dark underline">InviteFlow.ai Home</Link>
                            <Link href="/privacy" className="font-bold hover:text-if-purple-dark underline">Privacy First Design</Link>
                        </div>
                    </div>
                    <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo-sm">
                        <h4 className="font-bold text-gray-400 uppercase text-xs mb-4">Explore More</h4>
                        <div className="flex flex-col gap-2">
                            {useCases.filter(uc => uc.slug !== slug).map(uc => (
                                <Link key={uc.slug} href={`/use-cases/${uc.slug}`} className="font-bold hover:text-if-purple-dark underline">
                                    {uc.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
