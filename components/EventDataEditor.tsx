'use client';

import React from 'react';
import { EventData } from '../types';
import { Calendar, MapPin, Type, MessageSquare, User, Clock, ArrowRight } from 'lucide-react';

interface EventDataEditorProps {
    data: EventData;
    onChange: (data: EventData) => void;
    onContinue: () => void;
}

const EventDataEditor: React.FC<EventDataEditorProps> = ({ data, onChange, onContinue }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            [name]: value
        });
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto pr-2 pb-10">
            <div className="mb-6">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Refine Details</h2>
                <p className="text-gray-500">Fine-tune the information extracted by AI. Every word matters.</p>
            </div>

            <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                        <Type size={14} /> Event Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all font-bold text-lg"
                        placeholder="e.g. Sarah's Birthday Bash"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                        <MessageSquare size={14} /> Description
                    </label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all min-h-[100px] resize-none"
                        placeholder="Tell your guests what to expect..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                            <Calendar size={14} /> Date
                        </label>
                        <input
                            type="text"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all"
                            placeholder="e.g. October 12, 2024"
                        />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                            <Clock size={14} /> Time
                        </label>
                        <input
                            type="text"
                            name="time"
                            value={data.time}
                            onChange={handleChange}
                            className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all"
                            placeholder="e.g. 7:00 PM onwards"
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                        <MapPin size={14} /> Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={data.location}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all"
                        placeholder="e.g. The Grand Ballroom"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Host */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                            <User size={14} /> Host Name
                        </label>
                        <input
                            type="text"
                            name="hostName"
                            value={data.hostName}
                            onChange={handleChange}
                            className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all"
                            placeholder="e.g. The Smiths"
                        />
                    </div>

                    {/* Tone */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                            Tone
                        </label>
                        <select
                            name="tone"
                            value={data.tone}
                            onChange={handleChange}
                            className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm focus:outline-none focus:shadow-neo transition-all appearance-none cursor-pointer"
                        >
                            <option value="formal">Formal</option>
                            <option value="casual">Casual</option>
                            <option value="playful">Playful</option>
                            <option value="tech">Tech</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                <button
                    onClick={onContinue}
                    className="grow py-4 bg-black text-white text-xl font-bold rounded-2xl border-2 border-black shadow-neo hover:translate-y-px hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3"
                >
                    Proceed to Design <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default EventDataEditor;
