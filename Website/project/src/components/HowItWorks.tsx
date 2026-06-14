import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserPlus, Search, HeartHandshake } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Register as a Donor',
    description: 'Create your profile with your blood group, location, and availability status. Verification is quick and secure.',
    color: 'bg-red-600',
  },
  {
    number: '02',
    icon: Search,
    title: 'Smart Matching Engine',
    description: 'Our system instantly matches seekers with eligible donors nearby, filtering by blood group, distance, and availability.',
    color: 'bg-gray-900',
  },
  {
    number: '03',
    icon: HeartHandshake,
    title: 'Save a Life',
    description: 'Connect via secure in-app messaging, coordinate donation, and earn recognition for your life-saving contribution.',
    color: 'bg-red-700',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="how-it-works" className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-tag mb-4">How It Works</p>
            <h2 className="display-heading text-gray-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              From Request<br />To Rescue in<br />
              <span className="text-red-600">Minutes</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-500 text-base leading-relaxed max-w-md"
          >
            Donoris eliminates the frustrating hours-long search for blood donors. Our three-step process gets you connected with the right donor faster than ever before.
          </motion.p>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gray-100 z-0" style={{ left: '8%', right: '8%' }} />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative group"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className={`${step.color} w-14 h-14 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-condensed font-black text-7xl text-gray-100 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-condensed font-black uppercase text-2xl text-gray-900 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Hover accent */}
                <div className="mt-8 w-12 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-20" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 grid grid-cols-3 gap-4 h-48"
        >
          {[
            'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=500',
          ].map((src, i) => (
            <div key={i} className="overflow-hidden relative">
              <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" />
              {i === 1 && (
                <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                  <p className="font-condensed font-black text-white text-2xl uppercase text-center leading-tight px-4">
                    Every Drop<br />Counts
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
