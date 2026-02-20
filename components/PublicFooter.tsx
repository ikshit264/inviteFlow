import React from 'react';
import Link from 'next/link';
import useCases from '@/lib/seo-data/use-cases.json';
import industryData from '@/lib/seo-data/industries.json';
import solutionData from '@/lib/seo-data/solutions.json';
import features from '@/lib/seo-data/features.json';
import competitors from '@/lib/seo-data/competitors.json';
import { Logo } from '@/components/Logo';

const PublicFooter: React.FC = () => {
    return (
        <footer className="bg-black text-white py-20 px-6 mt-auto border-t-2 border-transparent">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
                <div className="mb-10 lg:mb-0 lg:w-1/4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl border-2 border-black shadow-neo">
                            <Logo className="w-8 h-8 text-black" />
                        </div>
                        <span className="font-display font-bold text-2xl">InviteFlow.ai</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Redefining event design through structured data and automated rendering.
                        <br /><br />San Francisco, CA.
                    </p>
                    <div className="flex gap-4">
                        {/* Social placeholders could go here */}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 text-sm lg:w-3/4">

                    {/* PRODUCT */}
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Product</h5>
                        <ul className="space-y-3">
                            <li><Link href="/#features" className="hover:text-if-yellow transition-colors">Features</Link></li>
                            <li><Link href="/#pricing" className="hover:text-if-yellow transition-colors">Pricing</Link></li>
                            <li><Link href="/auth" className="hover:text-if-yellow transition-colors">Login / Signup</Link></li>
                        </ul>
                    </div>

                    {/* USE CASES */}
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Use Cases</h5>
                        <ul className="space-y-3">
                            {useCases.slice(0, 5).map(uc => (
                                <li key={uc.slug}>
                                    <Link href={`/use-cases/${uc.slug}`} className="hover:text-if-yellow transition-colors block text-gray-300">
                                        {uc.title.split(' ')[0]} {uc.title.split(' ')[1]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SOLUTIONS */}
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Solutions</h5>
                        <ul className="space-y-3">
                            {solutionData.map(sol => (
                                <li key={sol.slug}>
                                    <Link href={`/solutions/${sol.slug}`} className="hover:text-if-yellow transition-colors block text-gray-300">
                                        {sol.title.split(' ').slice(0, 2).join(' ')}...
                                    </Link>
                                </li>
                            ))}
                            {industryData.slice(0, 2).map(ind => (
                                <li key={ind.slug}>
                                    <Link href={`/industries/${ind.slug}`} className="hover:text-if-yellow transition-colors block text-gray-300">
                                        For {ind.industry.split(' ')[0]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COMPARE */}
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Compare</h5>
                        <ul className="space-y-3">
                            {competitors.map(comp => (
                                <li key={comp.slug}>
                                    <Link href={`/vs/${comp.slug}`} className="hover:text-if-yellow transition-colors block text-gray-300">
                                        vs {comp.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Company</h5>
                        <ul className="space-y-3">
                            <li><Link href="/info" className="hover:text-if-yellow transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-if-yellow transition-colors">Privacy Policy</Link></li>
                            <li><a href="#" className="hover:text-if-yellow transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} InviteFlow.ai. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    {features.slice(0, 3).map(f => (
                        <Link key={f.slug} href={`/features/${f.slug}`} className="hover:text-gray-300 transition-colors">
                            {f.title}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
