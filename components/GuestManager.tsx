import React, { useState } from 'react';
import { Guest } from '../types';
import { Upload, Plus, Trash2, Download, CheckCircle, Mail } from 'lucide-react';

interface GuestManagerProps {
  guests: Guest[];
  onUpdateGuests: (guests: Guest[]) => void;
  onPreviewGuest: (guest: Guest) => void;
  currentGuestId: string | null;
  onBack: () => void;
}

const GuestManager: React.FC<GuestManagerProps> = ({ guests, onUpdateGuests, onPreviewGuest, currentGuestId, onBack }) => {
  const [newGuestName, setNewGuestName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleAddGuest = () => {
    if (!newGuestName.trim()) return;
    const newGuest: Guest = {
      id: Math.random().toString(36).substr(2, 9),
      name: newGuestName,
      email: '',
      status: 'pending'
    };
    const updated = [...guests, newGuest];
    onUpdateGuests(updated);
    setNewGuestName('');
    // Auto select new guest
    onPreviewGuest(newGuest);
  };

  const handleRemoveGuest = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = guests.filter(g => g.id !== id);
    onUpdateGuests(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock CSV parsing
    const file = e.target.files?.[0];
    if (file) {
      // Simulation
      const mockNames = ["Alice Freeman", "Bob Smith", "Charlie Kim", "Diana Prince", "Evan Wright"];
      const newGuests = mockNames.map(name => ({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email: '',
        status: 'pending'
      } as Guest));
      onUpdateGuests([...guests, ...newGuests]);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate batch processing
    for (let i = 0; i < guests.length; i++) {
        // Mock delay for each card generation
        await new Promise(r => setTimeout(r, 300));
        const updatedGuests = [...guests];
        updatedGuests[i].status = 'generated';
        // Only update status in UI if we want to show progress
    }
    setTimeout(() => {
        setIsExporting(false);
        alert(`Successfully generated and exported ${guests.length} invitations!`);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">The Guest List</h2>
        <p className="text-gray-500">Add guests manually or upload a CSV. Click a name to preview.</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input 
            type="text" 
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddGuest()}
            placeholder="Type a name..."
            className="flex-grow p-3 border-2 border-black rounded-xl focus:outline-none focus:border-if-purple shadow-sm"
        />
        <button 
            onClick={handleAddGuest}
            className="bg-if-yellow border-2 border-black p-3 rounded-xl hover:bg-if-yellow-dark transition-colors"
        >
            <Plus size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
         <div className="h-[1px] bg-gray-200 flex-grow"></div>
         <span>OR</span>
         <div className="h-[1px] bg-gray-200 flex-grow"></div>
      </div>

      <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors text-gray-500 mb-6">
         <Upload size={18} />
         <span className="font-bold">Upload CSV / Excel</span>
         <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
      </label>

      <div className="flex-grow overflow-y-auto mb-6 pr-2">
        {guests.length === 0 && (
            <div className="text-center py-10 text-gray-400 italic">
                No guests yet. Add someone!
            </div>
        )}
        <ul className="space-y-2">
            {guests.map((guest) => (
                <li 
                    key={guest.id} 
                    onClick={() => onPreviewGuest(guest)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${currentGuestId === guest.id ? 'bg-if-purple text-white border-black shadow-neo-sm' : 'bg-white border-gray-100 hover:border-if-purple text-gray-700'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentGuestId === guest.id ? 'bg-white text-if-purple' : 'bg-gray-100 text-gray-500'}`}>
                            {guest.name.charAt(0)}
                        </div>
                        <span className="font-bold">{guest.name}</span>
                    </div>
                    <button 
                        onClick={(e) => handleRemoveGuest(guest.id, e)}
                        className={`p-1 rounded-md transition-colors ${currentGuestId === guest.id ? 'hover:bg-purple-500 text-purple-200' : 'hover:bg-gray-100 text-gray-400'}`}
                    >
                        <Trash2 size={16} />
                    </button>
                </li>
            ))}
        </ul>
      </div>

      <div className="flex justify-between mt-auto pt-4 border-t-2 border-gray-100">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-black px-4 py-2">Back</button>
        <button
          onClick={handleExport}
          disabled={guests.length === 0 || isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-if-orange text-black font-bold rounded-xl border-2 border-black shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
             <>Processing...</>
          ) : (
             <>
                <Download size={20} />
                Export {guests.length} Cards
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GuestManager;