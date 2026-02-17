import React, { useState } from 'react';
import { EventData } from '../types';
import { parseEventDetails } from '../services/geminiService';
import { Sparkles, Mic, ArrowRight, Loader2 } from 'lucide-react';

interface EventInputProps {
  onDataParsed: (data: EventData) => void;
  initialData?: EventData | null;
}

const EventInput: React.FC<EventInputProps> = ({ onDataParsed, initialData }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Use initial data if available (back navigation)
  React.useEffect(() => {
    if (initialData) {
       setInputText(`${initialData.title} at ${initialData.location} on ${initialData.date} at ${initialData.time}. ${initialData.description}. Tone: ${initialData.tone}. Host: ${initialData.hostName}`);
    }
  }, [initialData]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const data = await parseEventDetails(inputText);
      onDataParsed(data);
    } catch (e) {
      console.error(e);
      alert("Something went wrong with the AI analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleListening = () => {
    // Mock speech recognition
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputText(prev => prev + " Join us for the UrbCraft launch party this Saturday at 8 PM at the Neon Loft. Casual vibes, free drinks!");
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">What's the plan?</h2>
        <p className="text-gray-500">Describe your event naturally. Our AI will handle the formatting.</p>
      </div>

      <div className="relative flex-grow mb-6">
        <textarea
          className="w-full h-full min-h-[300px] p-6 text-lg bg-white border-2 border-black rounded-3xl shadow-neo focus:outline-none focus:shadow-neo-lg transition-all resize-none placeholder-gray-300"
          placeholder="e.g. I'm hosting a birthday dinner for Sarah next Friday at 7 PM at Mario's Italian Restaurant. It's a surprise party, so keep it hush-hush! Dress code is casual chic."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
          onClick={toggleListening}
          className={`absolute bottom-6 right-6 p-4 rounded-full border-2 border-black transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-if-cream hover:bg-if-yellow'}`}
          title="Voice Input"
        >
          <Mic size={24} />
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!inputText.trim() || isAnalyzing}
          className="group relative px-8 py-4 bg-if-purple text-white text-xl font-bold rounded-2xl border-2 border-black shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="group-hover:rotate-12 transition-transform" /> 
              Analyze & Style
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EventInput;