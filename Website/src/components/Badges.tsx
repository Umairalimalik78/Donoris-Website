import { motion } from 'framer-motion';
import { Shield, Heart, Star, Trophy, Droplets } from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';

const badges = [
  {
    name: 'First Saver',
    donations: 1,
    description: 'You made your first life-saving donation.',
    icon: Droplets,
    color: 'from-orange-400 to-red-500',
    border: 'border-orange-300',
  },
  {
    name: 'Life Saver',
    donations: 5,
    description: 'Five donations — five lives impacted.',
    icon: Heart,
    color: 'from-red-500 to-red-700',
    border: 'border-red-400',
  },
  {
    name: 'Hero Donor',
    donations: 10,
    description: 'A decade of donations. True heroism.',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    border: 'border-yellow-300',
  },
  {
    name: 'Community Champion',
    donations: 25,
    description: 'Twenty-five lives. A community legend.',
    icon: Trophy,
    color: 'from-blue-400 to-blue-600',
    border: 'border-blue-300',
  },
  {
    name: 'Blood Guardian',
    donations: 50,
    description: 'Fifty donations. An immortal legacy.',
    icon: Shield,
    color: 'from-gray-600 to-gray-900',
    border: 'border-gray-400',
  },
];

export default function Badges() {
  const { openAuth } = useAuthModal();
  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag mb-4"
          >
            Gamification & Rewards
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-heading text-gray-900 leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Earn Your <span className="text-red-600">Badge</span>,<br />Own Your Legacy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-500 text-sm max-w-md mx-auto"
          >
            Every donation earns you recognition. Climb through five badge tiers and become one of Pakistan's most celebrated life-savers.
          </motion.p>
        </div>

        {/* Badge cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative border-2 ${badge.border} bg-white p-6 text-center cursor-default group`}
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${badge.color}`} />

              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {(() => {
                  const Icon = badge.icon;
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>

              <h3 className="font-condensed font-black uppercase text-sm text-gray-900 mb-1 leading-tight">
                {badge.name}
              </h3>
              <p className="text-red-600 font-black text-xs mb-3">
                {badge.donations} {badge.donations === 1 ? 'Donation' : 'Donations'}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 bg-gray-950 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="section-tag mb-3 text-red-400">Community Leaderboard</p>
            <h3 className="font-condensed font-black uppercase text-white text-3xl lg:text-4xl leading-tight">
              See Where You Stand<br />Among Pakistan's Heroes
            </h3>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-4">
            <p className="text-white/40 text-sm text-center lg:text-right max-w-xs">
              Top donors receive certificates, community recognition, and exclusive perks.
            </p>
            <button onClick={() => openAuth('register')} className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-red-700 transition-colors">
              Join the Platform
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
