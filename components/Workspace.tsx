'use client';

import React, { useState, useEffect } from 'react';
import { EventData, AppStep, Guest, TemplateId, TemplateCustomization } from '../types';
import EventInput from './EventInput';
import TemplateSelector from './TemplateSelector';
import GuestManager from './GuestManager';
import CardPreview from './CardPreview';
import { Layers, Wand2, Users, ChevronRight, Home, Save, Loader2, Download } from 'lucide-react';
import Loading from './Loading';
import EventDataEditor from './EventDataEditor';
import UpgradeModal from './UpgradeModal';
import { toPng } from 'html-to-image';

interface WorkspaceProps {
  onBackToDashboard: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ onBackToDashboard }) => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.ANALYZE);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isReviewingDetails, setIsReviewingDetails] = useState(false);

  // State for visual design
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(TemplateId.MINIMAL_POP);
  const [customization, setCustomization] = useState<TemplateCustomization>({
    colorPalette: 'default',
    fontStyle: 'modern'
  });

  const [guests, setGuests] = useState<Guest[]>([]);
  const [previewGuest, setPreviewGuest] = useState<Guest | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  // Default preview guest
  const defaultGuest: Guest = { id: 'demo', name: 'Alex Johnson', email: '', status: 'pending' };
  const activePreviewGuest = previewGuest || (guests.length > 0 ? guests[0] : defaultGuest);

  const handleDataParsed = (data: EventData) => {
    setEventData(data);
    setIsReviewingDetails(true);
  };

  const handleDownload = async (guestToDownload?: Guest) => {
    // If a specific guest is provided, we need to ensure the preview is showing them
    if (guestToDownload && guestToDownload.id !== activePreviewGuest.id) {
      setPreviewGuest(guestToDownload);
      // Give it a moment to render
      await new Promise(r => setTimeout(r, 150));
    }

    const node = document.getElementById('invite-card-preview');
    if (!node) return;

    setIsExporting(true);
    try {
      // Small delay to ensure all CSS/Images are in place
      await new Promise(r => setTimeout(r, 200));

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        width: 400,
        height: 533,
        style: {
          transform: 'none',
          borderRadius: '0',
        }
      });

      const link = document.createElement('a');
      link.download = `${(guestToDownload || activePreviewGuest).name || 'guest'}-invitation.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      // Only alert if not in bulk mode to avoid spam
      if (!guestToDownload) alert('Failed to download image. Try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    if (!eventData) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventData,
          guests,
          templateId: selectedTemplate,
          customization
        })
      });

      const data = await response.json();
      if (response.status === 403) {
        setIsUpgradeModalOpen(true);
        throw new Error(data.error);
      }
      if (!response.ok) throw new Error(data.error);

      if (data.guestCountCapped) {
        alert("Free plan limit reached: Only the first 50 guests were saved.");
      }

      onBackToDashboard();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const renderLeftPanel = () => {
    switch (currentStep) {
      case AppStep.ANALYZE:
        if (isReviewingDetails && eventData) {
          return (
            <EventDataEditor
              data={eventData}
              onChange={setEventData}
              onContinue={() => {
                setIsReviewingDetails(false);
                setCurrentStep(AppStep.STYLE);
              }}
            />
          );
        }
        return <EventInput onDataParsed={handleDataParsed} initialData={eventData} />;
      case AppStep.STYLE:
        return (
          eventData && (
            <TemplateSelector
              eventData={eventData}
              selectedTemplate={selectedTemplate}
              customization={customization}
              onSelectTemplate={setSelectedTemplate}
              onUpdateCustomization={setCustomization}
              onNext={() => setCurrentStep(AppStep.BATCH)}
              onBack={() => setCurrentStep(AppStep.ANALYZE)}
            />
          )
        );
      case AppStep.BATCH:
        return (
          <GuestManager
            guests={guests}
            onUpdateGuests={setGuests}
            onPreviewGuest={setPreviewGuest}
            currentGuestId={activePreviewGuest.id}
            onBack={() => setCurrentStep(AppStep.STYLE)}
            plan={user?.plan}
            onSave={handleSave}
            isSaving={isSaving}
            onDownloadGuest={handleDownload}
            isDownloadingAll={isExporting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-if-cream">
      {/* Navbar */}
      <header className="h-16 border-b-2 border-black bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBackToDashboard} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Back to Dashboard">
            <Home size={20} />
          </button>
          <div className="w-px h-6 bg-gray-300 hidden md:block"></div>
          <span className="font-display font-bold text-xl tracking-tight hidden md:block">New Project</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-bold">
          <div className={`flex items-center gap-2 cursor-pointer ${currentStep === AppStep.ANALYZE ? 'text-if-purple' : 'text-gray-400'}`} onClick={() => {
            setCurrentStep(AppStep.ANALYZE);
            setIsReviewingDetails(true);
          }}>
            <Wand2 size={16} /> Analyze
          </div>
          <ChevronRight size={16} className="text-gray-300" />
          <div className={`flex items-center gap-2 cursor-pointer ${currentStep === AppStep.STYLE ? 'text-if-purple' : 'text-gray-400'}`} onClick={() => setCurrentStep(AppStep.STYLE)}>
            <Layers size={16} /> Style
          </div>
          <ChevronRight size={16} className="text-gray-300" />
          <div className={`flex items-center gap-2 cursor-pointer ${currentStep === AppStep.BATCH ? 'text-if-purple' : 'text-gray-400'}`} onClick={() => setCurrentStep(AppStep.BATCH)}>
            <Users size={16} /> Batch
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={!eventData || isSaving}
          className="bg-black text-white px-4 py-2 rounded-xl border-2 border-black font-bold shadow-neo-sm hover:translate-y-px flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Project
        </button>
      </header>

      {/* Main Content */}
      <main className="grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-5/12 lg:w-4/12 bg-white border-b-2 md:border-b-0 md:border-r-2 border-black p-6 md:p-10 flex flex-col h-[50vh] md:h-full overflow-hidden relative shadow-[4px_0px_20px_rgba(0,0,0,0.05)] z-20">
          {renderLeftPanel()}
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-7/12 lg:w-8/12 bg-if-cream p-4 md:p-12 flex flex-col items-center justify-center relative overflow-hidden h-[50vh] md:h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-if-purple/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-if-yellow/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="z-10 w-full max-w-sm md:max-w-md h-full flex flex-col justify-center">
            <div className="mb-4 md:mb-6 flex justify-between items-center">
              <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Live Preview</h3>
              <div className="flex items-center gap-2">
                {eventData && (
                  <>
                    <button
                      onClick={() => handleDownload()}
                      disabled={isExporting}
                      className="bg-white border-2 border-black p-2 rounded-lg shadow-neo-sm hover:bg-gray-50 transition-all text-gray-600 disabled:opacity-50"
                      title="Download as Image"
                    >
                      {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    </button>
                    <div className="bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-bold shadow-neo-sm">
                      {selectedTemplate.replace('_', ' ').toUpperCase()}
                    </div>
                  </>
                )}
              </div>
            </div>

            {eventData ? (
              <div className="transition-all duration-500 ease-in-out">
                <CardPreview
                  data={eventData}
                  guestName={activePreviewGuest.name}
                  templateId={selectedTemplate}
                  customization={customization}
                />
              </div>
            ) : (
              <div className="aspect-3/4 border-4 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center text-gray-400">
                <Wand2 size={48} className="mb-4 opacity-50" />
                <p className="font-bold">Your design will appear here</p>
                <p className="text-sm">Start by analyzing your event</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          // Direct to profile which likely has payment options
          onBackToDashboard();
        }}
      />
    </div>
  );
};

export default Workspace;