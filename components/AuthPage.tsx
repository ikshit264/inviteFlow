import React, { useState } from 'react';
import { User } from '../types';
import { ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Authentication
    const mockUser: User = {
      id: 'u-123',
      name: name || 'Demo User',
      email: email
    };
    onLoginSuccess(mockUser);
  };

  return (
    <div className="min-h-screen bg-if-cream flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-md bg-white border-2 border-black rounded-3xl p-8 shadow-neo-lg">
          <div className="text-center mb-8">
             <div className="w-12 h-12 bg-if-purple rounded-xl border-2 border-black shadow-neo-sm mx-auto mb-4"></div>
             <h2 className="text-3xl font-display font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
             <p className="text-gray-500 mt-2">
               {isSignUp ? 'Start designing events in seconds.' : 'Login to manage your invitations.'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             {isSignUp && (
               <div>
                  <label className="block text-sm font-bold mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-black rounded-xl focus:outline-none focus:shadow-neo transition-all"
                    placeholder="Jane Doe"
                    required
                  />
               </div>
             )}
             <div>
                <label className="block text-sm font-bold mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-xl focus:outline-none focus:shadow-neo transition-all"
                  placeholder="jane@example.com"
                  required
                />
             </div>
             <div>
                <label className="block text-sm font-bold mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-xl focus:outline-none focus:shadow-neo transition-all"
                  placeholder="••••••••"
                  required
                />
             </div>

             <button 
               type="submit"
               className="w-full py-3 bg-black text-white font-bold rounded-xl shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 mt-6"
             >
               {isSignUp ? 'Get Started' : 'Sign In'} <ArrowRight size={18} />
             </button>
          </form>

          <div className="mt-6 text-center text-sm">
             {isSignUp ? (
               <p className="text-gray-500">
                 Already have an account? {' '}
                 <button onClick={() => setIsSignUp(false)} className="font-bold text-black underline decoration-if-purple decoration-2">Log in</button>
               </p>
             ) : (
               <p className="text-gray-500">
                 New to InviteFlow? {' '}
                 <button onClick={() => setIsSignUp(true)} className="font-bold text-black underline decoration-if-purple decoration-2">Create an account</button>
               </p>
             )}
          </div>
       </div>
    </div>
  );
};

export default AuthPage;