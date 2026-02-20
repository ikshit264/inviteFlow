'use client';

import React, { useState, useEffect } from 'react';
import {
   ArrowRight, Sparkles, Zap, Layout, Users,
   Check, Star, X, Terminal, Cpu, Layers,
   Globe, ShieldCheck, ChevronRight, Play,
   MessageSquare, Wand2, PartyPopper, Heart, Calendar,
   Mail, Mic, Hash, FileJson
} from 'lucide-react';
import Link from 'next/link';

interface LandingPageProps {
   onGetStarted: () => void;
   onLogin: () => void;
}

// --- SUB-COMPONENTS ---

const HeroAnimation = () => {
   const [phase, setPhase] = useState<'input' | 'analyzing' | 'generating'>('input');
   const [themeIndex, setThemeIndex] = useState(0);
   const [guestIndex, setGuestIndex] = useState(0);
   const [randomCode, setRandomCode] = useState(1234);

   useEffect(() => {
      setRandomCode(Math.floor(Math.random() * 9999));
   }, []);

   const scenarios = [
      {
         id: 'wedding',
         sourceType: 'email',
         sourceIcon: <Mail size={16} className="text-blue-500" />,
         sourceLabel: 'Gmail • Inbox',
         sourceText: "We're finally doing it! Sarah & James wedding. The Grand Plaza, Aug 24th. Black tie, gold accents. Can you create invites for the VIP list?",
         extractedTags: [
            { label: 'Event: Wedding', color: 'bg-yellow-100 text-yellow-800' },
            { label: 'Tone: Formal', color: 'bg-gray-100 text-gray-800' },
            { label: 'Theme: Gold', color: 'bg-yellow-50 text-yellow-600' }
         ],
         card: {
            bg: "bg-[#1a1a1a]",
            border: "border-yellow-600",
            textMain: "text-[#F2E6D0]",
            textSub: "text-yellow-600",
            fontHead: "font-serif",
            fontBody: "font-serif",
            title: "Sarah & James",
            detail: "The Grand Plaza • Est. 2024",
            icon: <Heart className="text-yellow-600" fill="currentColor" size={20} />
         },
         guests: ["Eleanor Rigby", "Mr. Darcy", "Lady Whistledown", "Jay Gatsby"]
      },
      {
         id: 'tech',
         sourceType: 'slack',
         sourceIcon: <Hash size={16} className="text-purple-500" />,
         sourceLabel: '#marketing • Slack',
         sourceText: "@channel Launch party for NeuralLink v2 is confirmed! Sector 7, 22:00 UTC. Need cyberpunk vibes for the dev team invites.",
         extractedTags: [
            { label: 'Event: Launch', color: 'bg-cyan-100 text-cyan-800' },
            { label: 'Vibe: Cyberpunk', color: 'bg-purple-100 text-purple-800' },
            { label: 'Time: 22:00', color: 'bg-blue-100 text-blue-800' }
         ],
         card: {
            bg: "bg-slate-950",
            border: "border-cyan-400",
            textMain: "text-white",
            textSub: "text-cyan-400",
            fontHead: "font-mono",
            fontBody: "font-mono",
            title: "SYSTEM_LAUNCH",
            detail: "Sector 7 • 22:00 UTC",
            icon: <Terminal className="text-cyan-400" size={20} />
         },
         guests: ["dev_01", "neo_anderson", "trinity_matrix", "morpheus"]
      },
      {
         id: 'birthday',
         sourceType: 'voice',
         sourceIcon: <Mic size={16} className="text-red-500" />,
         sourceLabel: 'Voice Note • 0:14',
         sourceText: "Okay so Leo is turning 5! We're doing a big Dino theme at the park this Saturday. Pizza and cake provided. Keep it super playful!",
         extractedTags: [
            { label: 'Age: 5th', color: 'bg-orange-100 text-orange-800' },
            { label: 'Theme: Dino', color: 'bg-green-100 text-green-800' },
            { label: 'Tone: Playful', color: 'bg-pink-100 text-pink-800' }
         ],
         card: {
            bg: "bg-orange-50",
            border: "border-green-500",
            textMain: "text-green-800",
            textSub: "text-orange-500",
            fontHead: "font-display",
            fontBody: "font-sans",
            title: "ROAR! LEO IS 5",
            detail: "Dino Park • Saturday 2PM",
            icon: <PartyPopper className="text-orange-500" size={20} />
         },
         guests: ["Auntie May", "Cousin Vinny", "Best Friend Sam", "Grandma"]
      }
   ];

   const s = scenarios[themeIndex];

   useEffect(() => {
      let timeout: any;

      const cycle = async () => {
         // 1. INPUT: Show Source
         setPhase('input');
         await new Promise(r => { timeout = setTimeout(r, 2000); });

         // 2. ANALYZE: Show Tags extracting
         setPhase('analyzing');
         await new Promise(r => { timeout = setTimeout(r, 1500); });

         // 3. GENERATE: Show Card and cycle guests
         setPhase('generating');
         for (let i = 0; i < 4; i++) {
            setGuestIndex(i);
            await new Promise(r => { timeout = setTimeout(r, 800); });
         }

         // Loop
         setThemeIndex((prev) => (prev + 1) % scenarios.length);
         cycle();
      };

      cycle();
      return () => clearTimeout(timeout);
   }, []);

   return (
      <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2500px] overflow-visible">

         {/* --- BACKDROP FX --- */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-transparent via-current to-transparent opacity-5 blur-[100px] transition-colors duration-1000 ${s.card.textSub.replace('text-', 'text-')}`}></div>

         {/* --- 3D STAGE --- */}
         <div className="relative w-[340px] md:w-[400px] h-[500px] transform rotate-y-[-10deg] rotate-x-[5deg] transition-all duration-700 preserve-3d">

            {/* --- COMPONENT 1: THE SOURCE (Floating Left) --- */}
            <div
               className={`absolute -top-8 -left-20 z-40 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 transition-all duration-700 ease-out transform
            ${phase === 'input' ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-40 scale-90 grayscale'}`}
            >
               <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                  <div className="p-1.5 bg-gray-50 rounded-md">{s.sourceIcon}</div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{s.sourceLabel}</span>
               </div>
               <p className="text-sm font-medium text-gray-800 leading-relaxed font-sans">
                  "{s.sourceText}"
               </p>
               {/* Visual connector line */}
               <div className={`absolute bottom-[-20px] left-1/2 w-[2px] h-[40px] bg-gradient-to-b from-gray-300 to-transparent transition-opacity duration-300 ${phase === 'analyzing' ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            {/* --- COMPONENT 2: THE AI EXTRACTION (Floating Middle) --- */}
            <div className="absolute top-32 -right-10 z-50 flex flex-col gap-2 pointer-events-none">
               {s.extractedTags.map((tag, idx) => (
                  <div
                     key={idx}
                     className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-neo-sm border-2 border-black bg-white transition-all duration-500
                    ${phase === 'analyzing' || phase === 'generating'
                           ? 'translate-x-0 opacity-100'
                           : 'translate-x-10 opacity-0'}`}
                     style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                     <Sparkles size={12} className={tag.color.split(' ')[1]} />
                     <span className={`text-xs font-bold ${tag.color.split(' ')[1]}`}>{tag.label}</span>
                  </div>
               ))}
            </div>

            {/* --- COMPONENT 3: THE RENDER ENGINE (Main Card) --- */}
            <div className="absolute inset-0 z-20 bg-white border-2 border-black rounded-[2rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
               {/* Engine Header */}
               <div className="h-12 border-b-2 border-black bg-gray-50 flex items-center justify-between px-5">
                  <div className="flex items-center gap-2 text-gray-400">
                     <FileJson size={14} />
                     <span className="text-[10px] font-mono font-bold uppercase">Render_Stream_v2.1</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors duration-300 ${phase === 'generating' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                     {phase === 'generating' ? 'BATCHING ACTIVE' : 'STANDBY'}
                  </div>
               </div>

               {/* Canvas Area */}
               <div className="flex-grow bg-[#f0f0f0] relative p-6 flex items-center justify-center overflow-hidden">
                  {/* Background Grid */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                  {/* The Card Container */}
                  <div className={`relative w-full aspect-[3/4] transition-all duration-700 transform ${phase === 'generating' ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-50 rotate-1'}`}>

                     {/* Shadow Stack (Simulates bulk) */}
                     <div className={`absolute top-0 left-0 w-full h-full bg-black rounded-xl transform translate-x-2 translate-y-2 opacity-10 transition-all duration-300 ${phase === 'generating' ? 'translate-x-3 translate-y-3' : ''}`}></div>
                     <div className={`absolute top-0 left-0 w-full h-full bg-black rounded-xl transform translate-x-1 translate-y-1 opacity-20 transition-all duration-300 ${phase === 'generating' ? 'translate-x-1.5 translate-y-1.5' : ''}`}></div>

                     {/* THE ACTUAL CARD */}
                     <div className={`relative w-full h-full ${s.card.bg} border-2 ${s.card.border} rounded-xl shadow-xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500`}>
                        {/* Card Header */}
                        <div className="relative z-10 flex justify-between items-start">
                           <div className={`w-8 h-8 rounded-full border-2 ${s.card.border} flex items-center justify-center`}>
                              {s.card.icon}
                           </div>
                           <div className={`${s.card.textSub} text-[10px] font-bold uppercase tracking-widest`}>
                              VIP ACCESS
                           </div>
                        </div>

                        {/* Card Body */}
                        <div className="relative z-10 text-center space-y-2 mt-4">
                           <h2 className={`${s.card.fontHead} text-3xl leading-none ${s.card.textMain}`}>
                              {s.card.title}
                           </h2>
                           <div className={`h-[1px] w-12 mx-auto ${s.card.bg === 'bg-[#1a1a1a]' ? 'bg-yellow-600' : 'bg-current'} opacity-50`}></div>
                           <p className={`${s.card.textSub} text-[10px] uppercase tracking-widest`}>
                              {s.card.detail}
                           </p>
                        </div>

                        {/* Dynamic Guest Slot */}
                        <div className="relative z-10 my-4">
                           <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg text-center transform transition-transform duration-200">
                              <p className={`text-[9px] uppercase opacity-60 mb-1 ${s.card.textMain}`}>Exclusive Invitation For</p>
                              <div className="h-8 overflow-hidden relative">
                                 {/* Name Animation */}
                                 <p
                                    key={guestIndex}
                                    className={`${s.card.fontBody} text-lg font-bold ${s.card.textMain} animate-slide-up`}
                                 >
                                    {phase === 'generating' ? s.guests[guestIndex] : 'Analyzing Data...'}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Card Footer */}
                        <div className={`relative z-10 flex justify-between items-end border-t border-current/10 pt-3 ${s.card.textMain}`}>
                           <div className="flex flex-col text-[9px] opacity-70">
                              <span>DATE: AUG 24</span>
                              <span>CODE: {randomCode}</span>
                           </div>
                           <div className="w-6 h-6 bg-current opacity-20 rounded-sm"></div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Batch Progress Footer */}
               <div className="bg-white border-t-2 border-black p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className={`w-3 h-3 rounded-full ${phase === 'generating' ? 'bg-green-500 animate-pulse' : 'bg-yellow-400'}`}></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-gray-400">Job Status</span>
                        <span className="text-xs font-bold text-gray-800">{phase === 'input' ? 'Waiting for Source' : phase === 'analyzing' ? 'Extracting Data' : 'Rendering Batch'}</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-bold uppercase text-gray-400">Total Count</span>
                     <div className="font-mono font-bold text-lg leading-none">
                        {phase === 'generating' ? guestIndex + 1 : 0}<span className="text-gray-300">/50</span>
                     </div>
                  </div>
               </div>
            </div>

         </div>

         <style jsx>{`
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          20% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      </div>
   );
};

// Helper Icon Component
function FeatureCheckIcon({ size, className }: { size: number, className?: string }) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={className}
      >
         <circle cx="12" cy="12" r="10" />
         <path d="m9 12 2 2 4-4" />
      </svg>
   );
}

// --- MAIN COMPONENT ---

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-900 selection:bg-if-purple selection:text-white overflow-x-hidden">

         {/* --- NAVIGATION --- */}
         <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b-2 border-black py-4' : 'bg-transparent py-6'} px-6 md:px-12`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
               <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg border-2 border-transparent group-hover:border-if-purple group-hover:bg-if-purple transition-all shadow-[4px_4px_0px_0px_rgba(139,92,246,1)]">
                     <Sparkles size={20} fill="currentColor" />
                  </div>
                  <span className="font-display font-bold text-2xl tracking-tighter">InviteFlow.ai</span>
               </div>

               <div className="hidden md:flex items-center gap-8 font-bold text-sm">
                  <a href="#features" className="hover:text-if-purple transition-colors">How it Works</a>
                  <a href="#pricing" className="hover:text-if-purple transition-colors">Pricing</a>
                  <button onClick={onLogin} className="hover:text-if-purple transition-colors">Log In</button>
                  <button
                     onClick={onGetStarted}
                     className="bg-if-yellow border-2 border-black px-6 py-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                  >
                     Start Building
                  </button>
               </div>
            </div>
         </nav>

         {/* --- HERO SECTION --- */}
         <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
            {/* Abstract Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full">

               {/* Hero Copy */}
               <div className="text-left space-y-8">
                  <div className="inline-flex items-center gap-2 border-2 border-black rounded-full px-4 py-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-xs font-bold uppercase tracking-wider">v2.0 Public Beta</span>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight">
                     THE END OF <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-if-purple to-if-pink">DRAG & DROP.</span>
                  </h1>

                  <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
                     InviteFlow is an <span className="text-black font-bold bg-if-yellow px-1">intelligent design engine</span>.
                     We replaced the canvas with code, so you can generate 1,000 personalized invites in the time it takes to make one.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                     <button
                        onClick={onGetStarted}
                        className="group h-14 px-8 bg-black text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-if-purple transition-colors shadow-[6px_6px_0px_0px_rgba(139,92,246,1)]"
                     >
                        Generate Invites
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button className="h-14 px-8 bg-white border-2 border-black text-black font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                        <Play size={18} /> Watch Demo
                     </button>
                  </div>

                  <div className="flex items-center gap-4 text-sm font-bold text-gray-500 pt-4">
                     <div className="flex -space-x-3">
                        {[...Array(4)].map((_, i) => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                           </div>
                        ))}
                     </div>
                     <p>Trusted by 10,000+ early adopters</p>
                  </div>
               </div>

               {/* Hero Visual - The "Engine" Metaphor */}
               <HeroAnimation />

            </div>
         </section>

         {/* --- MARQUEE --- */}
         <div className="bg-if-yellow border-y-2 border-black py-4 overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap font-display font-bold text-2xl uppercase tracking-widest">
               <span>No Templates to Break</span> <Star className="fill-black" />
               <span>Zero Drag & Drop</span> <Star className="fill-black" />
               <span>LLM Powered Layouts</span> <Star className="fill-black" />
               <span>100% Vector Quality</span> <Star className="fill-black" />
               <span>Weddings, Tech, Birthdays</span> <Star className="fill-black" />
            </div>
         </div>

         {/* --- FEATURES (BENTO GRID) --- */}
         <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-sm font-bold border border-black rounded-full px-4 py-1 inline-block mb-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider">The Technology</h2>
               <h3 className="text-5xl md:text-6xl font-display font-bold">Built for Speed. Not for Art Class.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">

               {/* Feature 1: Large Left */}
               <div className="md:col-span-2 bg-[#FAFAFA] border-2 border-black rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="absolute top-8 right-8 bg-black text-white p-3 rounded-full">
                     <Cpu size={32} />
                  </div>
                  <div className="h-full flex flex-col justify-between relative z-10">
                     <div className="max-w-md">
                        <h4 className="text-3xl font-display font-bold mb-4">Context-Aware Analysis</h4>
                        <p className="text-gray-600 text-lg">
                           Paste an email, a slack message, or a voice note. Gemini AI extracts structured data (Date, Time, Venue) and infers the 'Vibe' to auto-select typography.
                        </p>
                     </div>
                     <div className="mt-8 bg-white border-2 border-black rounded-xl p-4 shadow-sm max-w-sm">
                        <div className="text-xs font-mono text-gray-400 mb-2">Raw Input:</div>
                        <p className="font-medium text-gray-800 italic">"Hey guys, throwing a pizza party at my place next friday around 7..."</p>
                        <div className="h-[1px] bg-gray-200 my-3"></div>
                        <div className="flex gap-2">
                           <span className="bg-if-purple/10 text-if-purple-dark px-2 py-1 rounded text-xs font-bold">Category: Social</span>
                           <span className="bg-if-purple/10 text-if-purple-dark px-2 py-1 rounded text-xs font-bold">Tone: Casual</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Feature 2: Top Right */}
               <div className="bg-if-purple text-white border-2 border-black rounded-3xl p-8 relative overflow-hidden group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Layers size={40} className="mb-6" />
                  <h4 className="text-2xl font-display font-bold mb-2">Code-First Design</h4>
                  <p className="opacity-90">
                     Our layouts are HTML/CSS engines, not static images. They expand, shrink, and adapt to long names perfectly.
                  </p>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
               </div>

               {/* Feature 3: Bottom Right */}
               <div className="bg-if-yellow border-2 border-black rounded-3xl p-8 relative overflow-hidden group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Terminal size={40} className="mb-6" />
                  <h4 className="text-2xl font-display font-bold mb-2">Bulk Rendering</h4>
                  <p className="text-gray-800">
                     Upload a CSV. We spin up a headless browser cluster to render 500 unique PNGs in under 30 seconds.
                  </p>
               </div>

               {/* Feature 4: Bottom Center */}
               <div className="md:col-span-2 md:col-start-2 bg-white border-2 border-black rounded-3xl p-8 flex items-center justify-between group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div>
                     <h4 className="text-2xl font-display font-bold mb-2">Ready to Distribute</h4>
                     <p className="text-gray-600">Export as a ZIP or sync directly to email tools (Coming Soon).</p>
                  </div>
                  <div className="h-16 w-16 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
                     <Check size={32} />
                  </div>
               </div>

            </div>
         </section>

         {/* --- COMPARISON TABLE --- */}
         <section className="py-20 bg-white border-y-2 border-black">
            <div className="max-w-5xl mx-auto px-6">
               <div className="grid md:grid-cols-3 gap-0 border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                  {/* Header Column */}
                  <div className="bg-gray-50 p-8 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-center">
                     <h3 className="text-3xl font-display font-bold mb-2">The Reality Check</h3>
                     <p className="text-gray-500">Why professionals are switching.</p>
                  </div>

                  {/* Competitor Column */}
                  <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white opacity-60">
                     <h4 className="text-xl font-bold mb-6 text-gray-500 uppercase tracking-widest">Canva / Figma</h4>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-red-500 font-medium">
                           <X size={20} /> Manual data entry
                        </li>
                        <li className="flex items-center gap-3 text-red-500 font-medium">
                           <X size={20} /> Layout breaks on long names
                        </li>
                        <li className="flex items-center gap-3 text-red-500 font-medium">
                           <X size={20} /> 1 hour for 50 invites
                        </li>
                     </ul>
                  </div>

                  {/* InviteFlow Column */}
                  <div className="p-8 bg-if-cream relative">
                     <div className="absolute top-0 right-0 bg-if-purple text-white text-xs font-bold px-3 py-1 rounded-bl-xl">WINNER</div>
                     <h4 className="text-xl font-bold mb-6 text-if-purple-dark uppercase tracking-widest">InviteFlow</h4>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-green-600 font-bold">
                           <Check size={20} /> CSV Upload
                        </li>
                        <li className="flex items-center gap-3 text-green-600 font-bold">
                           <Check size={20} /> Auto-resizing Layouts
                        </li>
                        <li className="flex items-center gap-3 text-green-600 font-bold">
                           <Check size={20} /> 30 seconds for 50 invites
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* --- PRICING --- */}
         <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-5xl font-display font-bold">Simple Pricing.</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
               {/* Free Plan */}
               <div className="bg-white border-2 border-black rounded-3xl p-10 flex flex-col hover:shadow-neo transition-all">
                  <h3 className="text-2xl font-bold mb-2">Hobbyist</h3>
                  <div className="text-4xl font-black mb-6">$0</div>
                  <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8">Perfect for birthdays, dinners, and small meetups.</p>
                  <ul className="space-y-4 mb-auto">
                     <li className="flex items-center gap-3"><FeatureCheckIcon size={18} className="text-gray-400" /> Up to 50 guests / event</li>
                     <li className="flex items-center gap-3"><FeatureCheckIcon size={18} className="text-gray-400" /> Access to "Minimal" templates</li>
                     <li className="flex items-center gap-3"><FeatureCheckIcon size={18} className="text-gray-400" /> Community Support</li>
                  </ul>
                  <button onClick={onGetStarted} className="mt-8 w-full py-4 border-2 border-black rounded-xl font-bold hover:bg-black hover:text-white transition-all">Get Started Free</button>
               </div>

               {/* Pro Plan */}
               <div className="bg-black text-white border-2 border-black rounded-3xl p-10 flex flex-col shadow-neo relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-if-yellow text-black border-2 border-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                  <h3 className="text-2xl font-bold mb-2 text-if-purple">Event Pro</h3>
                  <div className="text-4xl font-black mb-6">$29<span className="text-lg text-gray-500 font-medium">/mo</span></div>
                  <p className="text-gray-400 mb-8 border-b border-gray-800 pb-8">For HR teams, event planners, and power hosts.</p>
                  <ul className="space-y-4 mb-auto">
                     <li className="flex items-center gap-3"><Check size={18} className="text-if-yellow" /> Unlimited Guests</li>
                     <li className="flex items-center gap-3"><Check size={18} className="text-if-yellow" /> All Premium Templates (Neon, Brutal)</li>
                     <li className="flex items-center gap-3"><Check size={18} className="text-if-yellow" /> Priority Rendering Queue</li>
                     <li className="flex items-center gap-3"><Check size={18} className="text-if-yellow" /> Remove Watermark</li>
                  </ul>
                  <button onClick={onGetStarted} className="mt-8 w-full py-4 bg-if-purple text-white rounded-xl font-bold border-2 border-transparent hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">Go Pro</button>
               </div>
            </div>
         </section>

         {/* --- FOOTER --- */}
         <footer className="bg-black text-white py-20 px-6">
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
                        <li><a href="/#features" className="hover:text-if-yellow">Features</a></li>
                        <li><a href="#" className="hover:text-if-yellow">Templates</a></li>
                        <li><a href="/#pricing" className="hover:text-if-yellow">Pricing</a></li>
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
                        <li><Link href="/privacy" className="hover:text-if-yellow">Privacy</Link></li>
                     </ul>
                  </div>
               </div>
            </div>
         </footer>

      </div>
   );
};

export default LandingPage;