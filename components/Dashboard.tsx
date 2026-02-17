import React from 'react';
import { User, Project } from '../types';
import { Plus, Calendar, Users, LogOut, Search } from 'lucide-react';

interface DashboardProps {
  user: User;
  onCreateNew: () => void;
  onLogout: () => void;
}

const mockProjects: Project[] = [
  { id: '1', name: 'Summer Tech Mixer', date: 'Aug 24, 2024', guestCount: 45, status: 'Sent' },
  { id: '2', name: 'Sarah\'s 30th Birthday', date: 'Sep 12, 2024', guestCount: 12, status: 'Draft' },
  { id: '3', name: 'Q4 All Hands', date: 'Oct 01, 2024', guestCount: 120, status: 'Draft' },
];

const Dashboard: React.FC<DashboardProps> = ({ user, onCreateNew, onLogout }) => {
  return (
    <div className="min-h-screen bg-if-cream font-sans text-if-dark flex flex-col">
       {/* Navbar */}
      <header className="h-20 border-b-2 border-black bg-white flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-if-purple rounded-lg border-2 border-black"></div>
           <span className="font-display font-bold text-xl tracking-tight">InviteFlow.ai</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="font-bold hidden md:inline-block">Hey, {user.name}</span>
           <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center font-bold">
              {user.name.charAt(0)}
           </div>
           <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
              <LogOut size={20} />
           </button>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
           <div>
              <h1 className="text-4xl font-display font-bold mb-2">Your Events</h1>
              <p className="text-gray-500">Manage your guest lists and designs.</p>
           </div>
           <button 
             onClick={onCreateNew}
             className="px-6 py-3 bg-if-purple text-white font-bold rounded-xl border-2 border-black shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
           >
             <Plus size={20} /> Create New Event
           </button>
        </div>

        {/* Filters/Search */}
        <div className="mb-8">
            <div className="relative max-w-md">
               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
               <input 
                 type="text" 
                 placeholder="Search events..." 
                 className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:shadow-neo transition-all bg-white"
               />
            </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* New Event Card (Quick Action) */}
           <div 
             onClick={onCreateNew}
             className="group cursor-pointer border-2 border-dashed border-gray-400 rounded-3xl p-8 flex flex-col items-center justify-center bg-transparent hover:bg-white hover:border-if-purple transition-all min-h-[250px]"
           >
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-4 group-hover:border-if-purple group-hover:text-if-purple transition-colors">
                 <Plus size={32} />
              </div>
              <h3 className="font-bold text-gray-500 group-hover:text-if-purple">Start New Project</h3>
           </div>

           {mockProjects.map((project) => (
             <div key={project.id} className="bg-white border-2 border-black rounded-3xl p-6 shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between min-h-[250px]">
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
    </div>
  );
};

export default Dashboard;