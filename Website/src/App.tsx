import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AuthModalContext } from './context/AuthModalContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import BloodGroups from './components/BloodGroups';
import DonorSearch from './components/DonorSearch';
import EmergencyRequest from './components/EmergencyRequest';
import Badges from './components/Badges';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthModal from './components/auth/AuthModal';

export default function App() {
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'register',
  });

  const openAuth = (mode: 'login' | 'register') => setAuthModal({ open: true, mode });
  const closeAuth = () => setAuthModal(a => ({ ...a, open: false }));

  return (
    <AuthProvider>
      <AuthModalContext.Provider value={{ openAuth }}>
        <div className="min-h-screen bg-white">
          <Navbar onOpenAuth={openAuth} />
          <Hero />
          <Stats />
          <HowItWorks />
          <Features />
          <BloodGroups />
          <DonorSearch />
          <EmergencyRequest />
          <Badges />
          <Testimonials />
          <Partners />
          <CTA />
          <Footer />

          <AuthModal
            open={authModal.open}
            onClose={closeAuth}
            defaultMode={authModal.mode}
          />
        </div>
      </AuthModalContext.Provider>
    </AuthProvider>
  );
}
