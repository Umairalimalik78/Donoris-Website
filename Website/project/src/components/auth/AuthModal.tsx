import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

type Mode = 'login' | 'register';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultMode?: Mode;
};

export default function AuthModal({ open, onClose, defaultMode = 'register' }: Props) {
  const [mode, setMode] = useState<Mode>(defaultMode);

  // sync mode when defaultMode changes (e.g. Navbar opens login vs register)
  useEffect(() => {
    if (open) setMode(defaultMode);
  }, [open, defaultMode]);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Blood drop logo */}
                <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
                  <BloodDropIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-condensed font-black text-xl uppercase tracking-wider text-gray-900">
                  Dono<span className="text-red-600">ris</span>
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-gray-100 flex-shrink-0">
              {(['register', 'login'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-widest relative transition-colors duration-200 ${
                    mode === m ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
                  }`}
                >
                  {m === 'register' ? 'Create Account' : 'Sign In'}
                  {mode === m && (
                    <motion.div
                      layoutId="auth-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {/* Hero panel (register only) */}
              {mode === 'register' && (
                <div className="mb-8">
                  <p className="section-tag mb-3">Join Pakistan's Largest Donor Network</p>
                  <h2 className="font-condensed font-black uppercase text-3xl text-gray-900 leading-[0.9] mb-3">
                    Become a<br />
                    <span className="text-red-600">Life-Saver</span>
                  </h2>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Register in 3 quick steps. Your profile goes live instantly and you can start saving lives today.
                  </p>
                  <div className="mt-4 flex gap-4">
                    {['Free', '5 min', 'Confidential'].map(s => (
                      <div key={s} className="bg-red-50 px-3 py-1.5 text-center">
                        <p className="text-xs font-black text-red-700">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {mode === 'register' ? (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RegisterForm onSwitch={() => setMode('login')} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LoginForm onSwitch={() => setMode('register')} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom decorative strip */}
            <div className="flex-shrink-0 bg-gray-950 px-8 py-4 flex items-center justify-between">
              <p className="text-white/30 text-xs">Your data is encrypted and never sold.</p>
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BloodDropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 4 10.5 4 15.5C4 19.6421 7.58172 23 12 23C16.4183 23 20 19.6421 20 15.5C20 10.5 12 2 12 2Z" />
    </svg>
  );
}
