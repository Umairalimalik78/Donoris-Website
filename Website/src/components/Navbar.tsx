import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, LogOut, ChevronDown, Droplets, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Donate', href: '#donate' },
  { label: 'Give Blood', href: '#how-it-works' },
  { label: 'Volunteer', href: '#features' },
  { label: 'Get Help', href: '#emergency' },
];

type Props = {
  onOpenAuth: (mode: 'login' | 'register') => void;
};

export default function Navbar({ onOpenAuth }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close user menu on outside click
  useEffect(() => {
    const handler = () => setUserMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await signOut();
  };

  const badgeColor: Record<string, string> = {
    none: 'bg-gray-100 text-gray-500',
    'First Saver': 'bg-orange-100 text-orange-700',
    'Life Saver': 'bg-red-100 text-red-700',
    'Hero Donor': 'bg-yellow-100 text-yellow-700',
    'Community Champion': 'bg-blue-100 text-blue-700',
    'Blood Guardian': 'bg-gray-800 text-white',
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                <BloodDropIcon className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 bg-red-600 opacity-30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="font-condensed font-black text-2xl uppercase tracking-wider text-gray-900">
              Dono<span className="text-red-600">ris</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-red-600 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : user && profile ? (
              /* Authenticated user menu */
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 border-2 border-gray-100 px-3 py-2 hover:border-red-200 transition-colors"
                >
                  {/* Blood group badge */}
                  <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
                    <span className="text-white text-xs font-black">{profile.blood_group || '?'}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900 leading-none">{profile.full_name.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{profile.role}</p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white shadow-xl border border-gray-100 z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-4 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-900">{profile.full_name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-1 ${badgeColor[profile.badge_level] ?? badgeColor['none']}`}>
                            {profile.badge_level === 'none' ? 'New Donor' : profile.badge_level}
                          </span>
                          <span className="text-[10px] text-gray-400">{profile.donation_count} donations</span>
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="grid grid-cols-3 divide-x divide-gray-50 border-b border-gray-50">
                        {[
                          { icon: Droplets, label: 'Blood', value: profile.blood_group },
                          { icon: User, label: 'City', value: profile.city },
                          { icon: Award, label: 'Status', value: profile.availability_status === 'active' ? 'Active' : 'Paused' },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label} className="px-3 py-3 text-center">
                            <Icon className="w-3.5 h-3.5 text-gray-300 mx-auto mb-1" />
                            <p className="text-[10px] text-gray-400">{label}</p>
                            <p className="text-xs font-bold text-gray-900">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="p-2">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Unauthenticated */
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-xs font-black uppercase tracking-widest text-gray-600 hover:text-red-600 transition-colors px-4 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-5 py-3 hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-900 hover:text-red-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-red-600 transition-colors py-2 border-b border-gray-50"
                >
                  {link.label}
                </motion.a>
              ))}

              {user && profile ? (
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50">
                    <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                      <span className="text-white text-sm font-black">{profile.blood_group}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{profile.full_name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 text-sm font-bold text-red-600 py-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => { setMenuOpen(false); onOpenAuth('login'); }}
                    className="border-2 border-gray-200 text-gray-900 text-xs font-black uppercase tracking-widest py-3 text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onOpenAuth('register'); }}
                    className="bg-red-600 text-white text-xs font-black uppercase tracking-widest py-3 text-center hover:bg-red-700 transition-colors"
                  >
                    Create Donor Profile
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function BloodDropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 4 10.5 4 15.5C4 19.6421 7.58172 23 12 23C16.4183 23 20 19.6421 20 15.5C20 10.5 12 2 12 2Z" />
    </svg>
  );
}
