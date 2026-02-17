import React from 'react';
import { EventData, TemplateId, TemplateCustomization } from '../types';
import { MapPin, Calendar, Clock, Sparkles, User, Globe, Music, Star, QrCode } from 'lucide-react';

interface CardPreviewProps {
  data: EventData;
  guestName: string;
  templateId: TemplateId;
  customization: TemplateCustomization;
}

// Helper to get color values based on palette
const getColors = (palette: TemplateCustomization['colorPalette']) => {
  switch (palette) {
    case 'ocean': return { bg: 'bg-blue-50', primary: 'text-blue-600', accent: 'bg-blue-500', border: 'border-blue-600', dark: 'bg-slate-900', textLight: 'text-blue-100' };
    case 'sunset': return { bg: 'bg-orange-50', primary: 'text-orange-600', accent: 'bg-orange-500', border: 'border-orange-600', dark: 'bg-orange-950', textLight: 'text-orange-100' };
    case 'forest': return { bg: 'bg-green-50', primary: 'text-green-700', accent: 'bg-green-600', border: 'border-green-700', dark: 'bg-green-950', textLight: 'text-green-100' };
    case 'midnight': return { bg: 'bg-indigo-50', primary: 'text-indigo-800', accent: 'bg-indigo-600', border: 'border-indigo-800', dark: 'bg-indigo-950', textLight: 'text-indigo-100' };
    case 'candy': return { bg: 'bg-pink-50', primary: 'text-pink-600', accent: 'bg-pink-500', border: 'border-pink-600', dark: 'bg-pink-950', textLight: 'text-pink-100' };
    case 'default': 
    default: return { bg: 'bg-gray-50', primary: 'text-gray-900', accent: 'bg-black', border: 'border-black', dark: 'bg-black', textLight: 'text-gray-200' };
  }
};

// Helper to get fonts
const getFont = (style: TemplateCustomization['fontStyle']) => {
    switch (style) {
        case 'classic': return { head: 'font-serif', body: 'font-sans' };
        case 'mono': return { head: 'font-mono', body: 'font-mono' };
        case 'playful': return { head: 'font-display', body: 'font-sans' };
        case 'modern':
        default: return { head: 'font-sans', body: 'font-sans' };
    }
}

const CardPreview: React.FC<CardPreviewProps> = ({ data, guestName, templateId, customization }) => {
  const c = getColors(customization.colorPalette);
  const f = getFont(customization.fontStyle);

  // Common Elements
  const QR = () => (
     <div className="bg-white p-1 rounded-lg">
        <QrCode className="w-full h-full text-black" />
     </div>
  );

  const renderContent = () => {
    switch (templateId) {
      
      // 1. TECH NEON
      case TemplateId.TECH_NEON:
        return (
          <div className={`h-full w-full ${c.dark} p-8 flex flex-col justify-between ${f.body} relative overflow-hidden border-2 ${c.border} rounded-xl`}>
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${c.primary} 1px, transparent 1px), linear-gradient(90deg, ${c.primary} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
            
            <div className="z-10 border-b border-white/20 pb-4 mb-4">
               <h3 className={`text-xs uppercase tracking-[0.2em] ${c.textLight} opacity-70 mb-1`}>Transmission Received</h3>
               <h1 className={`text-3xl font-bold text-white leading-tight ${f.head}`}>{data.title}</h1>
            </div>

            <div className="z-10 flex-grow space-y-6">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded border border-white/20">
                <p className={`text-sm ${c.textLight} mb-1`}>Target Identity:</p>
                <p className="text-2xl font-bold text-white tracking-wider">{guestName}</p>
              </div>

              <div className="text-white/80 text-sm leading-relaxed border-l-2 border-white pl-4">
                {data.description}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-white">
                <div className="flex items-center gap-2">
                   <Calendar size={14} className="opacity-70" />
                   <span>{data.date}</span>
                </div>
                 <div className="flex items-center gap-2">
                   <Clock size={14} className="opacity-70" />
                   <span>{data.time}</span>
                </div>
                 <div className="flex items-center gap-2 col-span-2">
                   <MapPin size={14} className="opacity-70" />
                   <span className="truncate">{data.location}</span>
                </div>
              </div>
            </div>
            <div className="z-10 mt-2 flex justify-between items-end">
                <span className="text-[10px] text-white/50 font-mono">ID: {Math.random().toString(36).substr(2,6).toUpperCase()}</span>
                <div className="w-12 h-12"><QR/></div>
            </div>
          </div>
        );

      // 2. BOLD BRUTAL
      case TemplateId.BOLD_BRUTAL:
        return (
          <div className={`h-full w-full ${c.bg} border-4 ${c.border} p-6 flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none relative`}>
            <div className={`absolute top-4 right-4 w-12 h-12 ${c.accent} rounded-full border-2 ${c.border} flex items-center justify-center font-bold text-white transform rotate-12`}>
              VIP
            </div>

            <div className="mt-8 mb-6">
              <h1 className={`text-4xl font-black ${c.primary} uppercase leading-none tracking-tighter mb-2 transform -rotate-1 origin-left ${f.head}`}>
                {data.title}
              </h1>
              <div className={`${c.accent} text-white inline-block px-2 py-1 transform rotate-1 border-2 border-black`}>
                <span className="font-bold text-sm uppercase">Hosted By {data.hostName}</span>
              </div>
            </div>

            <div className={`flex-grow bg-white border-2 ${c.border} p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
               <p className={`font-bold text-xl mb-2 underline ${f.body} decoration-4`}>Hey {guestName}!</p>
               <p className={`font-medium ${c.primary}`}>{data.description}</p>
            </div>

            <div className={`space-y-2 font-bold text-lg ${f.body}`}>
               <div className={`flex items-center gap-3 bg-white border-2 ${c.border} p-2`}>
                  <Calendar className={c.primary} />
                  {data.date}
               </div>
               <div className={`flex items-center gap-3 ${c.accent} text-white border-2 border-black p-2`}>
                  <MapPin className="text-white" />
                  {data.location}
               </div>
            </div>
          </div>
        );
      
      // 3. ELEGANT SERIF
      case TemplateId.ELEGANT_SERIF:
        return (
          <div className={`h-full w-full ${c.bg} p-10 flex flex-col text-center border border-gray-200 shadow-xl rounded-sm`}>
             <div className="border-b-2 border-gray-800 pb-6 mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">You Are Cordially Invited</p>
                <h1 className={`text-4xl ${f.head} ${c.primary} italic leading-tight`}>{data.title}</h1>
             </div>
             
             <div className="flex-grow flex flex-col justify-center items-center space-y-6">
                <div className="text-left w-full">
                  <span className={`text-gray-400 text-lg italic block mb-1 ${f.head}`}>Dearest</span>
                  <span className={`text-2xl ${c.primary} border-b border-gray-300 pb-1 block w-full ${f.head}`}>{guestName},</span>
                </div>
                
                <p className={`text-gray-600 leading-relaxed text-sm ${f.body}`}>
                  {data.description}
                </p>

                <div className="py-6 border-t border-b border-gray-200 w-full grid grid-cols-1 gap-4 mt-4">
                  <div className={`${c.primary} ${f.head}`}>
                    <span className="block text-xs uppercase text-gray-400 tracking-wider font-sans">When</span>
                    {data.date} at {data.time}
                  </div>
                  <div className={`${c.primary} ${f.head}`}>
                     <span className="block text-xs uppercase text-gray-400 tracking-wider font-sans">Where</span>
                     {data.location}
                  </div>
                </div>
             </div>
          </div>
        );

      // 4. RETRO VAPOR
      case TemplateId.RETRO_VAPOR:
        return (
            <div className={`h-full w-full bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 p-6 flex flex-col border-4 border-white rounded-xl shadow-lg relative overflow-hidden`}>
                <div className="absolute top-10 left-0 w-full h-1 bg-white opacity-50"></div>
                <div className="absolute top-12 left-0 w-full h-1 bg-white opacity-30"></div>
                
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-inner mb-4 z-10">
                    <h1 className={`text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 ${f.head} drop-shadow-sm`}>
                        {data.title}
                    </h1>
                </div>

                <div className="flex-grow z-10 flex flex-col justify-center items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-300 to-pink-500 p-1 mb-4 shadow-xl animate-pulse">
                         <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                             <span className="text-4xl">😎</span>
                         </div>
                    </div>
                    <h2 className={`text-2xl font-bold ${c.primary} mb-2 ${f.head}`}>{guestName}</h2>
                    <p className={`text-sm font-medium ${c.primary} bg-white/50 p-2 rounded`}>{data.description}</p>
                </div>

                <div className="z-10 bg-white border-2 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span>{data.date}</span>
                        <span>{data.time}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{data.location}</div>
                </div>
            </div>
        );
      
      // 5. CORPORATE PRO
      case TemplateId.CORPORATE_PRO:
        return (
            <div className={`h-full w-full bg-white border border-gray-200 p-8 flex flex-col relative rounded-lg shadow-sm`}>
                <div className={`absolute top-0 left-0 w-full h-2 ${c.accent}`}></div>
                
                <div className="mb-8 mt-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`w-8 h-8 rounded ${c.accent} flex items-center justify-center text-white font-bold`}>
                            {data.hostName.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-500 text-sm uppercase tracking-wider">{data.hostName}</span>
                    </div>
                    <h1 className={`text-3xl font-bold text-gray-900 leading-tight ${f.head}`}>{data.title}</h1>
                </div>

                <div className={`bg-gray-50 p-6 rounded-lg border-l-4 ${c.border} mb-6`}>
                    <p className="text-sm text-gray-500 uppercase font-bold mb-1">Invitee</p>
                    <p className={`text-xl font-medium text-gray-900 ${f.body}`}>{guestName}</p>
                </div>

                <div className="flex-grow">
                     <p className="text-gray-600 text-sm leading-relaxed mb-6">{data.description}</p>
                     <div className="grid grid-cols-2 gap-y-4">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Date</p>
                            <p className="font-medium">{data.date}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Time</p>
                            <p className="font-medium">{data.time}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs text-gray-400 font-bold uppercase">Venue</p>
                            <p className="font-medium">{data.location}</p>
                        </div>
                     </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                    <span>RSVP Requested</span>
                    <span>inviteflow.ai</span>
                </div>
            </div>
        );

      // 6. LUXE GOLD
      case TemplateId.LUXE_GOLD:
        return (
            <div className="h-full w-full bg-[#1a1a1a] p-1 border-4 border-[#C5A059] flex flex-col relative rounded-sm">
                <div className="h-full w-full border border-[#C5A059] p-6 flex flex-col items-center text-center">
                    <div className="mb-6">
                        <Star className="text-[#C5A059] w-8 h-8 mx-auto mb-2" fill="#C5A059" />
                        <h1 className={`text-3xl font-serif text-[#F2E6D0] tracking-wide ${f.head}`}>{data.title}</h1>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mb-6"></div>

                    <div className="flex-grow flex flex-col justify-center">
                        <p className="text-[#8c8c8c] text-sm uppercase tracking-widest mb-4">Exclusively For</p>
                        <p className={`text-2xl text-white font-serif italic mb-6 ${f.head}`}>{guestName}</p>
                        <p className="text-[#C5A059] text-sm leading-relaxed px-4">{data.description}</p>
                    </div>

                    <div className="w-full mt-6 pt-6 border-t border-[#333]">
                        <div className="flex justify-between text-[#F2E6D0] text-xs uppercase tracking-widest">
                            <span>{data.date}</span>
                            <span>{data.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        );

      // 7. TYPO SWISS
      case TemplateId.TYPO_SWISS:
        return (
            <div className={`h-full w-full ${c.bg} p-6 flex flex-col justify-between font-sans`}>
                <div className="grid grid-cols-2 gap-4 border-b-4 border-black pb-4">
                    <h1 className="text-4xl font-black uppercase leading-[0.8] tracking-tighter col-span-2 break-words">
                        {data.title}
                    </h1>
                </div>

                <div className="flex-grow py-6">
                    <div className="text-8xl font-black opacity-10 leading-none -ml-1 select-none pointer-events-none absolute">
                        {data.date.split(' ')[0]}
                    </div>
                    <div className="relative z-10">
                        <p className="text-lg font-bold bg-black text-white inline-block px-1 mb-2">GUEST: {guestName}</p>
                        <p className="text-sm font-medium leading-snug max-w-[90%]">{data.description}</p>
                    </div>
                </div>

                <div className="border-t-4 border-black pt-2 grid grid-cols-2 text-sm font-bold">
                    <div>
                        <span className="block text-[10px] uppercase opacity-50">When</span>
                        {data.date}<br/>{data.time}
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] uppercase opacity-50">Where</span>
                        {data.location}
                    </div>
                </div>
            </div>
        );

      // 8. ABSTRACT GEO
      case TemplateId.ABSTRACT_GEO:
        return (
            <div className={`h-full w-full ${c.bg} p-8 flex flex-col relative overflow-hidden rounded-2xl`}>
                <div className={`absolute -top-10 -right-10 w-40 h-40 ${c.accent} rounded-full mix-blend-multiply opacity-50`}></div>
                <div className={`absolute top-20 -left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply opacity-50`}></div>
                <div className={`absolute bottom-0 right-10 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply opacity-50`}></div>

                <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white h-full flex flex-col">
                    <h1 className={`text-2xl font-bold ${c.primary} mb-4 ${f.head}`}>{data.title}</h1>
                    
                    <div className="flex-grow flex flex-col justify-center">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Prepared for</p>
                        <p className={`text-xl font-bold ${f.body} mb-4`}>{guestName}</p>
                        <div className="h-[2px] w-12 bg-black mb-4"></div>
                        <p className="text-sm text-gray-600">{data.description}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 text-xs font-medium text-gray-500 flex justify-between">
                         <div className="flex items-center gap-1"><Calendar size={12}/> {data.date}</div>
                         <div className="flex items-center gap-1"><Clock size={12}/> {data.time}</div>
                    </div>
                </div>
            </div>
        );
      
      // 9. Y2K AESTHETIC
      case TemplateId.Y2K_AESTHETIC:
        return (
            <div className={`h-full w-full bg-gradient-to-br from-pink-200 to-blue-200 p-2 rounded-xl border border-white shadow-lg`}>
                <div className="h-full w-full bg-white/40 backdrop-blur-md rounded-lg border border-white/60 p-4 flex flex-col relative overflow-hidden">
                    {/* Chrome Text Effect */}
                    <h1 className={`text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-600 drop-shadow-[1px_1px_0_rgba(0,0,0,1)] ${f.head} mb-4 text-center transform -skew-x-12`}>
                        {data.title}
                    </h1>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[1px] border-white/50 rounded-full animate-[spin_10s_linear_infinite]"></div>

                    <div className="flex-grow flex flex-col items-center justify-center z-10 relative">
                        <div className="bg-white/80 border border-blue-300 px-4 py-1 rounded-full text-blue-500 text-xs font-bold mb-2 shadow-sm">
                            INCOMING MSG
                        </div>
                        <p className={`text-xl font-bold text-slate-800 mb-2 ${f.body}`}>@{guestName}</p>
                        <p className="text-xs text-slate-600 text-center bg-white/50 p-2 rounded max-w-full">{data.description}</p>
                    </div>

                    <div className="bg-blue-500/10 rounded-lg p-2 mt-2 flex justify-between items-center text-xs font-mono text-blue-800 border border-blue-500/20">
                        <span>{data.date}</span>
                        <span>::</span>
                        <span>{data.location}</span>
                    </div>
                </div>
            </div>
        );

      // 10. PAPER CRAFT
      case TemplateId.PAPER_CRAFT:
        return (
            <div className={`h-full w-full ${c.bg} p-6 flex flex-col shadow-inner`} style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard-flat.png")' }}>
                <div className="bg-white p-6 shadow-md transform rotate-1 flex-grow flex flex-col items-center text-center border border-gray-200" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
                    <div className="w-full border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                        <h1 className={`text-2xl font-bold ${c.primary} ${f.head}`}>{data.title}</h1>
                    </div>
                    
                    <p className={`text-lg font-serif italic text-gray-500 mb-2`}>For the attention of</p>
                    <h2 className={`text-2xl font-bold ${c.primary} mb-6 ${f.body}`}>{guestName}</h2>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-serif">{data.description}</p>
                    
                    <div className="mt-auto w-full bg-gray-100 p-3 rounded text-sm text-gray-700 font-medium">
                        <p>{data.date} • {data.time}</p>
                        <p className="mt-1 text-xs uppercase text-gray-500">{data.location}</p>
                    </div>
                </div>
            </div>
        );

      // 11. GLITCH PUNK
      case TemplateId.GLITCH_PUNK:
         return (
             <div className="h-full w-full bg-black text-white p-6 flex flex-col justify-between font-mono overflow-hidden relative border-2 border-red-600">
                 {/* Glitch offsets */}
                 <div className="absolute top-0 left-0 w-full h-full bg-red-500 mix-blend-screen opacity-10 translate-x-1"></div>
                 <div className="absolute top-0 left-0 w-full h-full bg-blue-500 mix-blend-screen opacity-10 -translate-x-1"></div>

                 <div className="z-10">
                     <div className="bg-red-600 text-black inline-block px-1 font-bold text-xs mb-2">SYSTEM_OVERRIDE</div>
                     <h1 className="text-3xl font-bold uppercase tracking-tighter leading-none mb-4 glitch-text" style={{ textShadow: '2px 0 red, -2px 0 blue' }}>{data.title}</h1>
                 </div>

                 <div className="z-10 border-t border-b border-white/20 py-4 my-2">
                     <p className="text-xs text-gray-400 mb-1">// TARGET</p>
                     <p className="text-xl font-bold text-white">{guestName}</p>
                     <p className="text-xs text-gray-500 mt-2 max-w-[80%]">{data.description}</p>
                 </div>

                 <div className="z-10 grid grid-cols-2 gap-4 text-xs">
                     <div className="border border-white/30 p-2">
                         <span className="block text-gray-500">WHEN</span>
                         {data.date}
                     </div>
                     <div className="border border-white/30 p-2 text-right">
                         <span className="block text-gray-500">WHERE</span>
                         {data.location}
                     </div>
                 </div>
             </div>
         );

      // 12. NATURE SOFT
      case TemplateId.NATURE_SOFT:
          return (
              <div className={`h-full w-full ${c.bg} p-8 flex flex-col justify-center items-center text-center relative rounded-t-[50%] overflow-hidden border border-stone-200`}>
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-50"></div>
                  
                  <div className="z-10 relative">
                      <h1 className={`text-2xl font-medium text-stone-800 mb-6 ${f.head} tracking-wide`}>{data.title}</h1>
                      
                      <div className="w-16 h-16 rounded-full border border-stone-300 flex items-center justify-center mx-auto mb-6">
                          <span className="font-serif italic text-stone-500 text-lg">for</span>
                      </div>

                      <h2 className={`text-xl text-stone-700 mb-4 ${f.body}`}>{guestName}</h2>
                      <p className="text-stone-500 text-sm leading-relaxed mb-8 px-4 font-light">{data.description}</p>
                      
                      <div className="text-xs text-stone-400 uppercase tracking-widest space-y-1">
                          <p>{data.date}</p>
                          <p>{data.location}</p>
                      </div>
                  </div>
              </div>
          );

      // 13. FILM NOIR
      case TemplateId.FILM_NOIR:
          return (
              <div className="h-full w-full bg-black text-white p-8 flex flex-col items-start justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[200px] h-[400px] bg-white opacity-10 transform rotate-12 translate-x-10 -translate-y-10 blur-xl pointer-events-none"></div>
                  
                  <h1 className="text-4xl font-bold font-serif mb-2 relative z-10 leading-none tracking-tight">{data.title}</h1>
                  <div className="w-12 h-1 bg-white mb-8"></div>

                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Starring</p>
                  <p className="text-2xl font-light mb-8">{guestName}</p>

                  <p className="text-sm text-gray-300 max-w-[80%] leading-relaxed mb-8 italic">"{data.description}"</p>

                  <div className="mt-auto text-xs font-bold uppercase tracking-widest text-gray-500">
                      {data.date} • {data.location}
                  </div>
              </div>
          );

      // DEFAULT: MINIMAL POP
      case TemplateId.MINIMAL_POP:
      default:
        return (
          <div className={`h-full w-full ${c.bg} rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-2xl`}>
             <div className={`absolute -top-10 -right-10 w-40 h-40 ${c.accent} rounded-full z-0 opacity-20`}></div>
             <div className={`absolute bottom-10 -left-10 w-24 h-24 ${c.accent} rounded-full z-0 opacity-20`}></div>

             <div className="z-10 relative h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                   <div className={`${c.accent} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>Invitation</div>
                   <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase">Date</p>
                      <p className={`text-sm font-bold ${c.primary}`}>{data.date}</p>
                   </div>
                </div>

                <div className="mb-6">
                   <h1 className={`text-3xl font-display font-bold ${c.primary} leading-tight mb-2 ${f.head}`}>{data.title}</h1>
                   <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                      <MapPin size={16} />
                      {data.location}
                   </div>
                </div>

                <div className={`flex-grow flex items-center justify-center bg-white/50 rounded-2xl p-6 mb-6 border-2 border-dashed ${c.border} border-opacity-20`}>
                    <div className="text-center w-full">
                       <p className="text-gray-400 text-xs font-bold uppercase mb-2">Guest of Honor</p>
                       <p className={`text-2xl font-display font-bold ${c.primary} ${f.body}`}>{guestName}</p>
                    </div>
                </div>

                <div className={`${c.dark} text-white p-4 rounded-xl flex justify-between items-center`}>
                   <div className="text-xs">
                      <p className="opacity-60">Time</p>
                      <p className="font-bold">{data.time}</p>
                   </div>
                   <div className="h-8 w-[1px] bg-white/20"></div>
                   <div className="text-xs text-right">
                      <p className="opacity-60">Host</p>
                      <p className="font-bold">{data.hostName}</p>
                   </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-[400px] aspect-[3/4] mx-auto transform transition-all duration-500 hover:scale-[1.02] shadow-2xl">
      {renderContent()}
    </div>
  );
};

export default CardPreview;