import React from 'react';
import Link from 'next/link';

const PublicFooter: React.FC = () => {
    return (
        <footer className="bg-black text-white py-20 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
                <div className="mb-10 md:mb-0">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-if-purple rounded border border-white"></div>
                        <span className="font-display font-bold text-2xl">InviteFlow.ai</span>
                    </div>
                    <p className="max-w-xs text-gray-400 text-sm leading-relaxed">
                        Redefining event design through structured data and automated rendering.
                        <br /><br />San Francisco, CA.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-sm">
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Product</h5>
                        <ul className="space-y-3">
                            <li><Link href="/#features" className="hover:text-if-yellow">Features</Link></li>
                            <li><Link href="/#templates" className="hover:text-if-yellow">Templates</Link></li>
                            <li><Link href="/#pricing" className="hover:text-if-yellow">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Resources</h5>
                        <ul className="space-y-3">
                            <li><Link href="/info" className="hover:text-if-yellow">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4 text-gray-500 uppercase tracking-widest text-xs">Legal</h5>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="hover:text-if-yellow">Privacy Policy</Link></li>
                            <li><a href="/privacy" className="hover:text-if-yellow">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
                © {new Date().getFullYear()} InviteFlow.ai. All rights reserved.
            </div>
        </footer>
    );
};

export default PublicFooter;
