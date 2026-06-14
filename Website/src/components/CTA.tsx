import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';

export default function CTA() {
  const { openAuth } = useAuthModal();
  return (
    <section className="relative overflow-hidden">
      {/* Hero image with overlay */}
      <div className="relative h-[500px] lg:h-[600px]">
        <img
          src="https://images.pexels.com/photos/6823529/pexels-photo-6823529.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Blood donation"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gray-950/85" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="section-tag text-red-400 mb-4">Join the Movement</p>
                <h2 className="display-heading text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
                  Be the Hero<br />
                  Someone is<br />
                  <span className="text-red-500">Waiting For</span>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  Register as a donor today. It takes 5 minutes and could save three lives. Pakistan needs 6 million blood units per year — and we need you.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col gap-4 lg:items-end"
              >
                <div className="bg-white p-8 max-w-xs">
                  <Heart className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="font-condensed font-black uppercase text-gray-900 text-2xl mb-3 leading-tight">
                    Register as<br />a Donor
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6">
                    Join 12,000+ verified donors already saving lives across Pakistan.
                  </p>
                  <button
                    onClick={() => openAuth('register')}
                    className="w-full bg-red-600 text-white text-xs font-black uppercase tracking-widest py-4 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
                  >
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Stats strip */}
                <div className="flex gap-6">
                  {[
                    { value: '5 min', label: 'To register' },
                    { value: 'Free', label: 'Always' },
                    { value: '100%', label: 'Private' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-condensed font-black text-white text-xl leading-none">{s.value}</p>
                      <p className="text-white/40 text-xs mt-1 uppercase tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
