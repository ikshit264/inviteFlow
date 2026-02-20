'use client';

import React, { useState } from 'react';
import { User, Project } from '../types';
import { Plus, Calendar, Users, LogOut, Search, User as UserIcon, LayoutDashboard, ChevronDown, Sparkles } from 'lucide-react';
import ProfileView from './ProfileView';
import UpgradeModal from './UpgradeModal';

interface DashboardProps {
   user: User;
   onCreateNew: () => void;
   onLogout: () => void;
   onEventClick: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user: initialUser, onCreateNew, onLogout, onEventClick }) => {
   const [user, setUser] = useState<User>(initialUser);
   const [projects, setProjects] = useState<Project[]>([]);
   const [loading, setLoading] = useState(true);
   const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

   const handleCreateClick = () => {
      if ((user?.planDetails?.name === 'FREE' || user?.plan === 'FREE') && projects.length >= 3) {
         setIsUpgradeModalOpen(true);
         return;
      }
      onCreateNew();
   };

   const handleUpgrade = async () => {
      try {
         const res = await fetch('/api/payments/checkout', { method: 'POST' });
         const data = await res.json();
         if (data.url) {
            window.location.href = data.url;
         } else {
            alert('Failed to initiate checkout: ' + (data.error || 'Unknown error'));
         }
      } catch (err) {
         console.error('Upgrade error:', err);
         alert('An error occurred. Please try again.');
      }
   };

   React.useEffect(() => {
      fetch('/api/events')
         .then(res => res.json())
         .then(data => {
            setProjects(data.events || []);
            setLoading(false);
         });
   }, []);

   const handleUpdateUser = async (newName: string) => {
      const res = await fetch('/api/user/update', {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: newName })
      });
      if (!res.ok) throw new Error('Update failed');
      const data = await res.json();
      setUser(data.user);
   };

   const renderNavbar = () => (
      <header className="h-20 border-b-2 border-black bg-white flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
         <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg border-2 border-transparent group-hover:border-if-purple group-hover:bg-if-purple transition-all shadow-[4px_4px_0px_0px_rgba(139,92,246,1)]">
               <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter">InviteFlow.ai</span>
         </div>

         <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border-2 border-black uppercase hidden sm:block ${user?.plan === 'PAID' ? 'bg-if-yellow text-black' : 'bg-gray-100 text-gray-400'}`}>
               {user?.plan || 'FREE'}
            </div>

            <div className="relative">
               <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 hover:bg-if-cream rounded-full border-2 border-transparent hover:border-black transition-all group"
               >
                  <div className="w-8 h-8 bg-if-purple text-white rounded-full border-2 border-black flex items-center justify-center font-bold text-sm">
                     {user?.name?.charAt(0)}
                  </div>
                  <span className="font-bold hidden md:inline-block">{user?.name}</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
               </button>

               {isProfileOpen && (
                  <>
                     <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileOpen(false)}
                     ></div>
                     <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black rounded-2xl shadow-neo-lg z-20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-4 border-b-2 border-gray-100">
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
                           <p className="font-bold truncate">{user?.email}</p>
                        </div>
                        <div className="p-2">
                           <button
                              onClick={() => {
                                 setCurrentView('home');
                                 setIsProfileOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${currentView === 'home' ? 'bg-if-purple text-white' : 'hover:bg-if-cream'}`}
                           >
                              <LayoutDashboard size={18} /> Dashboard
                           </button>
                           <button
                              onClick={() => {
                                 setCurrentView('profile');
                                 setIsProfileOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${currentView === 'profile' ? 'bg-if-purple text-white' : 'hover:bg-if-cream'}`}
                           >
                              <UserIcon size={18} /> Profile & Plan
                           </button>
                        </div>
                        <div className="p-2 border-t-2 border-gray-100">
                           <button
                              onClick={onLogout}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                           >
                              <LogOut size={18} /> Logout
                           </button>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
      </header>
   );

   if (currentView === 'profile') {
      return (
         <div className="min-h-screen bg-if-cream font-sans text-if-dark flex flex-col">
            {renderNavbar()}
            <main className="flex-grow max-w-7xl mx-auto w-full p-6 md:p-12">
               <ProfileView
                  user={user}
                  totalEvents={projects.length}
                  onBack={() => setCurrentView('home')}
                  onUpdateUser={handleUpdateUser}
                  onUpgrade={handleUpgrade}
               />
            </main>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-if-cream font-sans text-if-dark flex flex-col">
         {renderNavbar()}

         <main className="flex-grow max-w-7xl mx-auto w-full p-6 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
               <div>
                  <h1 className="text-4xl font-display font-bold mb-2">Your Events</h1>
                  <p className="text-gray-500">Manage your guest lists and designs.</p>
               </div>
               <button
                  onClick={handleCreateClick}
                  className="px-6 py-3 bg-if-purple text-white font-bold rounded-xl border-2 border-black shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
               >
                  <Plus size={20} /> Create New Event
               </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* New Event Card (Quick Action) */}
               <div
                  onClick={handleCreateClick}
                  className="group cursor-pointer border-2 border-dashed border-gray-400 rounded-3xl p-8 flex flex-col items-center justify-center bg-white hover:border-if-purple transition-all min-h-[250px]"
               >
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-4 group-hover:border-if-purple group-hover:text-if-purple transition-colors">
                     <Plus size={32} />
                  </div>
                  <h3 className="font-bold text-gray-500 group-hover:text-if-purple">Start New Project</h3>
               </div>

               {loading ? (
                  <div className="col-span-full text-center py-20 font-bold text-gray-400 animate-pulse">Loading events...</div>
               ) : projects.map((project) => (
                  <div key={project.id} onClick={() => onEventClick(project.id)} className="bg-white border-2 border-black rounded-3xl p-6 shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between min-h-[250px]">
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-black uppercase ${project.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {project.status}
                           </span>
                        </div>
                        <h3 className="text-2xl font-bold font-display leading-tight mb-2">{project.name}</h3>
                     </div>

                     <div className="space-y-3 mt-4 pt-4 border-t-2 border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                           <Calendar size={18} />
                           {project.date}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                           <Users size={18} />
                           {project.guestCount} Guests
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </main>

         <UpgradeModal
            isOpen={isUpgradeModalOpen}
            onClose={() => setIsUpgradeModalOpen(false)}
            onUpgrade={handleUpgrade}
         />
      </div>
   );
};

export default Dashboard;