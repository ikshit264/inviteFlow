import React from 'react';
import { Template, TemplateId, EventData, TemplateCustomization } from '../types';
import CardPreview from './CardPreview';
import { Check, Palette, Type as TypeIcon } from 'lucide-react';

interface TemplateSelectorProps {
  eventData: EventData;
  selectedTemplate: TemplateId;
  customization: TemplateCustomization;
  onSelectTemplate: (id: TemplateId) => void;
  onUpdateCustomization: (c: TemplateCustomization) => void;
  onNext: () => void;
  onBack: () => void;
}

const templates: Template[] = [
  { id: TemplateId.MINIMAL_POP, name: 'Minimal Pop', description: 'Clean, modern, and playful.', previewColor: 'bg-white' },
  { id: TemplateId.BOLD_BRUTAL, name: 'Bold Brutal', description: 'High contrast, neo-brutalist style.', previewColor: 'bg-if-yellow' },
  { id: TemplateId.TECH_NEON, name: 'Tech Neon', description: 'Dark mode cyber aesthetics.', previewColor: 'bg-slate-900' },
  { id: TemplateId.ELEGANT_SERIF, name: 'Elegant Serif', description: 'Classic sophistication.', previewColor: 'bg-stone-50' },
  { id: TemplateId.RETRO_VAPOR, name: 'Retro Vapor', description: '80s gradient vibes.', previewColor: 'bg-purple-100' },
  { id: TemplateId.CORPORATE_PRO, name: 'Corporate Pro', description: 'Trustworthy and professional.', previewColor: 'bg-blue-50' },
  { id: TemplateId.LUXE_GOLD, name: 'Luxe Gold', description: 'Premium black and gold.', previewColor: 'bg-black' },
  { id: TemplateId.TYPO_SWISS, name: 'Typo Swiss', description: 'Grid-based typography.', previewColor: 'bg-red-50' },
  { id: TemplateId.ABSTRACT_GEO, name: 'Abstract Geo', description: 'Geometric art patterns.', previewColor: 'bg-emerald-50' },
  { id: TemplateId.NATURE_SOFT, name: 'Nature Soft', description: 'Organic curves and earth tones.', previewColor: 'bg-stone-100' },
  { id: TemplateId.GLITCH_PUNK, name: 'Glitch Punk', description: 'Distorted digital chaos.', previewColor: 'bg-neutral-900' },
  { id: TemplateId.FILM_NOIR, name: 'Film Noir', description: 'Cinematic monochrome.', previewColor: 'bg-gray-200' },
  { id: TemplateId.Y2K_AESTHETIC, name: 'Y2K Aesthetic', description: 'Early 2000s chrome & plastic.', previewColor: 'bg-pink-100' },
  { id: TemplateId.PAPER_CRAFT, name: 'Paper Craft', description: 'Tactile paper texture look.', previewColor: 'bg-orange-50' },
];

const colorPalettes: { id: TemplateCustomization['colorPalette'], name: string, colors: string }[] = [
  { id: 'default', name: 'Original', colors: 'bg-gray-200' },
  { id: 'ocean', name: 'Ocean', colors: 'bg-blue-400' },
  { id: 'sunset', name: 'Sunset', colors: 'bg-orange-400' },
  { id: 'forest', name: 'Forest', colors: 'bg-green-600' },
  { id: 'midnight', name: 'Midnight', colors: 'bg-indigo-900' },
  { id: 'candy', name: 'Candy', colors: 'bg-pink-400' },
];

const fontStyles: { id: TemplateCustomization['fontStyle'], name: string }[] = [
  { id: 'modern', name: 'Modern Sans' },
  { id: 'classic', name: 'Classic Serif' },
  { id: 'mono', name: 'Tech Mono' },
  { id: 'playful', name: 'Playful' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  eventData, 
  selectedTemplate, 
  customization,
  onSelectTemplate, 
  onUpdateCustomization,
  onNext, 
  onBack 
}) => {
  
  return (
    <div className="flex flex-col h-full">
       <div className="mb-4">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-1">Pick a Vibe</h2>
        <p className="text-gray-500 text-sm">Choose a base architecture and customize it.</p>
      </div>

      {/* Templates Grid */}
      <div className="flex-grow overflow-y-auto pr-2 pb-4 grid grid-cols-2 gap-3 mb-4 max-h-[40vh] md:max-h-none">
        {templates.map((t) => (
          <div 
            key={t.id}
            onClick={() => onSelectTemplate(t.id)}
            className={`cursor-pointer group relative border-2 rounded-xl p-2 md:p-3 transition-all duration-300 ${selectedTemplate === t.id ? 'border-if-purple bg-if-purple/5 ring-1 ring-if-purple' : 'border-gray-200 hover:border-gray-400 hover:shadow-md'}`}
          >
            {selectedTemplate === t.id && (
                <div className="absolute top-2 right-2 z-20">
                    <div className="w-5 h-5 rounded-full bg-if-purple text-white border-2 border-black flex items-center justify-center">
                        <Check size={12} strokeWidth={4} />
                    </div>
                </div>
            )}
            
            <div className="w-full h-24 mb-2 overflow-hidden rounded-lg bg-gray-50 relative pointer-events-none border border-gray-100">
                {/* Micro preview */}
                 <div className="absolute top-0 left-0 w-[200%] h-[200%] transform scale-50 origin-top-left">
                    <CardPreview 
                        data={eventData} 
                        guestName="Guest" 
                        templateId={t.id} 
                        customization={{ colorPalette: 'default', fontStyle: 'modern' }}
                    />
                 </div>
            </div>

            <h3 className="font-bold text-gray-900 text-sm leading-tight">{t.name}</h3>
            <p className="text-[10px] text-gray-500 leading-tight mt-1">{t.description}</p>
          </div>
        ))}
      </div>

      {/* Customization Panel */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4 mb-4">
         
         {/* Color Selector */}
         <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                <Palette size={14} /> Color Theme
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
                {colorPalettes.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onUpdateCustomization({ ...customization, colorPalette: p.id })}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0 ${customization.colorPalette === p.id ? 'border-black scale-110 shadow-sm' : 'border-transparent'}`}
                        title={p.name}
                    >
                        <div className={`w-full h-full rounded-full ${p.colors}`}></div>
                    </button>
                ))}
            </div>
         </div>

         {/* Font Selector */}
         <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                <TypeIcon size={14} /> Typography
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
                {fontStyles.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => onUpdateCustomization({ ...customization, fontStyle: f.id })}
                        className={`px-3 py-1 rounded-lg border text-xs font-bold transition-colors whitespace-nowrap ${customization.fontStyle === f.id ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}`}
                    >
                        {f.name}
                    </button>
                ))}
            </div>
         </div>
      </div>

      <div className="flex justify-between pt-2 border-t-2 border-gray-100">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-black px-4 py-2 text-sm">Back</button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-black text-white font-bold rounded-xl shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all text-sm"
        >
          Confirm Design
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;