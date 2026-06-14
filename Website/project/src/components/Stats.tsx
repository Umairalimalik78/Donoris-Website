import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 12847, suffix: '+', label: 'Registered Donors', color: 'text-red-600' },
  { value: 4200, suffix: '+', label: 'Lives Saved', color: 'text-gray-900' },
  { value: 98, suffix: '%', label: 'Match Success Rate', color: 'text-red-600' },
  { value: 5, suffix: ' min', label: 'Avg. Match Time', color: 'text-gray-900' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-gray-950 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Marquee strip */}
        <div className="mb-16 overflow-hidden border-y border-white/10 py-4">
          <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="mx-8 text-xs font-black uppercase tracking-[0.3em] text-white/20">
                Give Blood · Save Lives · Be A Hero ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gray-950 p-10 text-center group hover:bg-red-600 transition-colors duration-300 cursor-default"
            >
              <p className={`font-condensed font-black text-5xl lg:text-6xl leading-none mb-3 ${stat.color} group-hover:text-white transition-colors`}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest group-hover:text-white/80 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm font-medium max-w-xl mx-auto">
            Every 2 seconds, someone in Pakistan needs blood. Together, we can change that.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
