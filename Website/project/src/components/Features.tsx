import { motion } from 'framer-motion';
import { Shield, MapPin, Bell, Lock, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Donors',
    description: 'Every donor is verified through hospital and blood bank confirmation for trust you can rely on.',
    accent: 'bg-red-600',
  },
  {
    icon: MapPin,
    title: 'Location Matching',
    description: 'Smart radius-based filtering surfaces the nearest eligible donors within seconds.',
    accent: 'bg-gray-900',
  },
  {
    icon: Bell,
    title: 'Emergency Broadcasts',
    description: 'Critical requests instantly broadcast to all matching donors in the same city via SMS and push.',
    accent: 'bg-red-700',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'In-app messaging keeps contacts masked. Female donors get enhanced privacy protections.',
    accent: 'bg-red-600',
  },
  {
    icon: Award,
    title: 'Donor Rewards',
    description: 'Earn badges, climb leaderboards, and receive recognition for each life-saving donation.',
    accent: 'bg-gray-900',
  },
  {
    icon: Clock,
    title: '90-Day Auto Pause',
    description: 'System automatically marks donors unavailable post-donation — no manual action needed.',
    accent: 'bg-red-700',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-tag mb-4">Platform Features</p>
            <h2 className="display-heading text-gray-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Built for<br />Emergency.<br />
              <span className="text-red-600">Designed</span> for<br />Everyone.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:max-w-xs"
          >
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Donoris is engineered around Pakistan's unique blood shortage challenges, with features that protect donors while ensuring seekers find help fast.
            </p>
            <a href="#emergency" className="btn-primary">
              Explore Platform
            </a>
          </motion.div>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-gray-50 p-10 group hover:bg-white transition-colors duration-300 cursor-default"
            >
              <div className={`${feature.accent} w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-condensed font-black uppercase text-xl text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-6 w-8 h-0.5 bg-red-600 group-hover:w-16 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
