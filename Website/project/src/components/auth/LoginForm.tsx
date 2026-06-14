import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (!password) { setError('Password is required.'); return; }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);

    if (authError) {
      if (authError.message.toLowerCase().includes('invalid')) {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError(authError.message);
      }
    }
    // On success, onAuthStateChange in AuthContext handles the session
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-condensed font-black uppercase text-2xl text-gray-900 leading-tight mb-1">
          Welcome Back
        </h3>
        <p className="text-gray-400 text-sm">Sign in to your Donoris account.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-red-50 border border-red-200 p-3 mb-5"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-xs font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full pl-10 pr-10 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner /> Signing In...
            </span>
          ) : (
            <>
              <LogIn className="w-4 h-4" /> Sign In
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <button onClick={onSwitch} className="text-red-600 font-bold hover:text-red-700 transition-colors">
            Create Profile
          </button>
        </p>
      </div>

      {/* Trust signals */}
      <div className="mt-6 flex items-center justify-center gap-6">
        {['12K+ Donors', 'Free Forever', 'Verified Platform'].map(s => (
          <div key={s} className="text-center">
            <p className="text-xs font-bold text-gray-300">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
