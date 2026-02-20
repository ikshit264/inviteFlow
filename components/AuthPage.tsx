'use client';

import React, { useState } from 'react';
import { User } from '../types';
import { ArrowRight, Loader2, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, isSignUp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-if-cream flex flex-col items-center justify-center p-4 relative">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 font-bold text-gray-600 hover:text-black transition-colors bg-white px-4 py-2 border-2 border-black rounded-xl shadow-neo hover:shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none"
      >
        <Home size={18} />
        <span className="hidden sm:inline">Home</span>
      </Link>

      <div className="w-full max-w-md bg-white border-2 border-black rounded-3xl p-8 shadow-neo-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl border-2 border-black shadow-neo-sm mx-auto mb-4">
            <Sparkles size={24} fill="currentColor" />
          </div>
          <h2 className="text-3xl font-display font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-gray-500 mt-2">
            {isSignUp ? 'Start designing events in seconds.' : 'Login to manage your invitations.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 text-red-700 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

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
            disabled={loading}
            className="w-full py-3 bg-black text-white font-bold rounded-xl shadow-neo hover:translate-y-[2px] hover:shadow-neo-sm active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isSignUp ? 'Get Started' : 'Sign In'} <ArrowRight size={18} />
              </>
            )}
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