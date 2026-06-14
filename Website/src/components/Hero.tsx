import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Facebook, Instagram } from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';

export default function Hero() {
  const { openAuth } = useAuthModal();
  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large red drop - top right area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          className="absolute top-16 right-[38%] lg:right-[42%]"
        >
          <BloodDropLarge />
        </motion.div>

        {/* Plus signs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-[42%] left-12 text-6xl font-black text-gray-900 select-none leading-none"
        >
          +
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute top-[58%] left-24 text-3xl font-black text-red-600 select-none leading-none"
        >
          -
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-[30%] left-32 text-2xl font-black text-gray-300 select-none leading-none"
        >
          -
        </motion.div>

        {/* Right side decorative + and - */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute top-[60%] right-[52%] lg:right-[55%] text-4xl font-black text-red-600 select-none"
        >
          -
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute top-[55%] right-[46%] lg:right-[49%] text-4xl font-black text-gray-900 select-none"
        >
          +
        </motion.div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center min-h-screen">

          {/* Left content */}
          <div className="relative z-10 pt-32 pb-20 lg:pt-0 lg:pb-0">
            {/* Hash tag */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-red-600 font-condensed font-black text-5xl leading-none">#</span>
              <div className="h-px w-12 bg-red-600" />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-condensed font-black uppercase leading-[0.9] text-gray-900 mb-8"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Everyone<br />
              Could Be<br />
              <span className="text-red-600">A Hero</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10 font-medium"
            >
              Pakistan's most intelligent blood donor platform. Connect with verified donors,
              create emergency requests, and save lives — all in minutes, not hours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <button
                onClick={() => openAuth('register')}
                className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-red-700 transition-all duration-300 flex items-center gap-3 group"
              >
                Give Blood
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                className="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
              >
                How It Works
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-5"
            >
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — image + call to action card */}
          <div className="relative hidden lg:block h-screen">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 clip-hero"
            >
              <img
                src="https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Blood donor"
                className="w-full h-full object-cover object-center grayscale"
              />
              {/* Red overlay */}
              <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply" />
            </motion.div>

            {/* Floating CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute left-0 bottom-32 bg-white shadow-2xl p-8 max-w-xs z-10"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Make a Difference
              </p>
              <h3 className="font-condensed font-black uppercase text-3xl text-gray-900 leading-tight mb-4">
                You Can Help<br />Save A Life
              </h3>
              <a
                href="#emergency"
                className="text-red-600 font-black uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all duration-200"
              >
                Give Blood <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Live stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2, type: 'spring', stiffness: 200 }}
              className="absolute top-28 left-8 bg-red-600 text-white p-5 z-10"
            >
              <p className="font-condensed font-black text-4xl leading-none">12K+</p>
              <p className="text-xs font-bold uppercase tracking-wider mt-1 text-red-200">Active Donors</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-red-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function BloodDropLarge() {
  return (
    <svg width="220" height="260" viewBox="0 0 220 260" fill="none">
      <path
        d="M110 10C110 10 20 110 20 165C20 213 61 250 110 250C159 250 200 213 200 165C200 110 110 10 110 10Z"
        fill="#DC2626"
        opacity="0.08"
      />
      <path
        d="M110 40C110 40 40 125 40 170C40 208 72 238 110 238C148 238 180 208 180 170C180 125 110 40 110 40Z"
        fill="#DC2626"
        opacity="0.12"
      />
      <path
        d="M110 70C110 70 58 140 58 175C58 202.6 81.4 225 110 225C138.6 225 162 202.6 162 175C162 140 110 70 110 70Z"
        fill="#DC2626"
        opacity="0.9"
      />
      {/* Shine */}
      <ellipse cx="90" cy="140" rx="10" ry="18" fill="white" opacity="0.25" transform="rotate(-20 90 140)" />
    </svg>
  );
}
