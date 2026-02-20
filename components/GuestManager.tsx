import React, { useState } from 'react';
import { Guest } from '../types';
import { Upload, Plus, Trash2, Download, CheckCircle, Mail, Loader2 } from 'lucide-react';

interface GuestManagerProps {
  guests: Guest[];
  onUpdateGuests: (guests: Guest[]) => void;
  onPreviewGuest: (guest: Guest) => void;
  currentGuestId: string | null;
  onBack: () => void;
  plan: any;
  onSave: () => void;
  isSaving: boolean;
  onDownloadGuest: (guest: Guest) => Promise<void>;
  isDownloadingAll?: boolean;
}

const GuestManager: React.FC<GuestManagerProps> = ({
  guests,
  onUpdateGuests,
  onPreviewGuest,
  currentGuestId,
  onBack,
  plan,
  onSave,
  isSaving,
  onDownloadGuest,
  isDownloadingAll = false
}) => {
  const [newGuestName, setNewGuestName] = useState('');
  const [isDownloadingId, setIsDownloadingId] = useState<string | null>(null);

  const handleAddGuest = () => {
    if (!newGuestName.trim()) return;

    if (plan?.name === 'FREE' && guests.length >= plan.maxGuestsPerEvent) {
      alert(`Limit reached: FREE plan only allows up to ${plan.maxGuestsPerEvent} guests.`);
      return;
    }

    const newGuest: Guest = {
      id: Math.random().toString(36).substr(2, 9),
      name: newGuestName,
      email: '',
      status: 'pending'
    };
    const updated = [...guests, newGuest];
    onUpdateGuests(updated);
    setNewGuestName('');
    onPreviewGuest(newGuest);
  };

  const handleRemoveGuest = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = guests.filter(g => g.id !== id);
    onUpdateGuests(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          // Split by lines and filter out empty ones
          const rows = text.split(/\r?\n/).filter(line => line.trim() !== '');

          // Skip header and process names
          // Most CSVs will have "Guest Name" or similar as first row
          const names = rows.slice(1).map(row => {
            // Take the first column (some CSVs might have more columns)
            return row.split(',')[0].replace(/"/g, '').trim();
          }).filter(name => name.length > 0);

          if (plan?.name === 'FREE' && (guests.length + names.length) > plan.maxGuestsPerEvent) {
            const availableSlots = Math.max(0, plan.maxGuestsPerEvent - guests.length);
            alert(`FREE plan limit: Only adding first ${availableSlots} guests from file.`);
            names.splice(availableSlots);
          }

          const newGuests = names.map(name => ({
            id: Math.random().toString(36).substr(2, 9),
            name,
            email: '',
            status: 'pending'
          } as Guest));

          onUpdateGuests([...guests, ...newGuests]);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadSingle = async (guest: Guest, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloadingId(guest.id);
    try {
      await onDownloadGuest(guest);
    } finally {
      setIsDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    // Sequential download to avoid browser blocks
    for (const guest of guests) {
      await onDownloadGuest(guest);
      // Small buffer between downloads
      await new Promise(r => setTimeout(r, 400));
    }
    alert(`Finished downloading ${guests.length} invitations!`);
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
        <div className="h-px bg-gray-200 grow"></div>
        <span>OR</span>
        <div className="h-px bg-gray-200 grow"></div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex gap-2">
          <label className="grow flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors text-gray-500">
            <Upload size={18} />
            <span className="font-bold">Import CSV</span>
            <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
          </label>

          {guests.length > 0 && (
            <button
              onClick={handleDownloadAll}
              disabled={isDownloadingAll}
              className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-neo-sm hover:translate-y-px transition-all disabled:opacity-50"
            >
              {isDownloadingAll ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              <span>Download All</span>
            </button>
          )}
        </div>
        <a
          href="/guest_template.csv"
          download
          className="text-center text-xs text-if-purple font-bold hover:underline py-1"
        >
          Download CSV Template
        </a>
      </div>

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
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDownloadSingle(guest, e)}
                  disabled={isDownloadingId === guest.id}
                  className={`p-1.5 rounded-md transition-colors ${currentGuestId === guest.id ? 'hover:bg-purple-500 text-white' : 'hover:bg-gray-100 text-gray-400'}`}
                  title="Download this invitation"
                >
                  {isDownloadingId === guest.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                </button>
                <button
                  onClick={(e) => handleRemoveGuest(guest.id, e)}
                  className={`p-1.5 rounded-md transition-colors ${currentGuestId === guest.id ? 'hover:bg-purple-500 text-purple-200' : 'hover:bg-gray-100 text-gray-400'}`}
                  title="Remove Guest"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-auto pt-4 border-t-2 border-gray-100">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-black px-4 py-2">Back</button>
        <button
          onClick={onSave}
          disabled={guests.length === 0 || isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-if-purple text-white font-bold rounded-xl border-2 border-black shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <><Loader2 className="animate-spin" /> Saving...</>
          ) : (
            <>
              <CheckCircle size={20} />
              Finish & Save Event
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GuestManager;