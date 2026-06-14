import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Ayesha Malik',
    role: 'Cardiologist, Aga Khan Hospital',
    city: 'Karachi',
    text: 'Donoris saved a critical patient\'s life when we couldn\'t find a rare AB- donor anywhere. Within 8 minutes of posting the emergency, we had three responses. This platform is nothing short of revolutionary.',
    bloodGroup: 'AB-',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Usman Tariq',
    role: 'Blood Donor, 12 Donations',
    city: 'Lahore',
    text: 'I\'ve been donating blood for years but could never track my impact. With Donoris, I can see exactly how many lives I\'ve touched. The badge system keeps me motivated to donate more.',
    bloodGroup: 'O+',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Fatima Zahra',
    role: 'Blood Seeker — Mother',
    city: 'Islamabad',
    text: 'My son needed urgent blood transfusion. I was panicking, posting on every WhatsApp group. Then a friend told me about Donoris. In 12 minutes, a verified donor was at the hospital. I will never forget this.',
    bloodGroup: 'B+',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Hamza Khalid',
    role: 'Hospital Administrator',
    city: 'Faisalabad',
    text: 'We\'ve integrated Donoris into our emergency workflows. The broadcast system is unmatched — it reaches the right donors faster than any manual process we\'ve ever used.',
    bloodGroup: 'A-',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (dir: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gray-50 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-tag mb-4">Testimonials</p>
            <h2 className="display-heading text-gray-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Real Stories,<br />
              <span className="text-red-600">Real Lives</span> Saved
            </h2>
          </motion.div>

          {/* Navigation controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 border-2 border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 border-2 border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial display */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Featured testimonial */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 lg:p-14 relative"
          >
            <Quote className="w-12 h-12 text-red-100 absolute top-8 right-8" />

            <div className="inline-block bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 mb-8">
              Blood Group {testimonials[active].bloodGroup}
            </div>

            <blockquote className="text-gray-700 text-lg leading-relaxed mb-10 font-medium">
              "{testimonials[active].text}"
            </blockquote>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[active].image}
                alt={testimonials[active].name}
                className="w-14 h-14 object-cover grayscale"
              />
              <div>
                <p className="font-bold text-gray-900 text-sm">{testimonials[active].name}</p>
                <p className="text-gray-400 text-xs">{testimonials[active].role}</p>
                <p className="text-red-600 text-xs font-bold mt-0.5">{testimonials[active].city}</p>
              </div>
            </div>
          </motion.div>

          {/* Stacked mini cards */}
          <div className="grid grid-rows-2 gap-4">
            {[
              testimonials[(active + 1) % testimonials.length],
              testimonials[(active + 2) % testimonials.length],
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow duration-300 group"
                onClick={() => setActive((active + i + 1) % testimonials.length)}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 object-cover grayscale group-hover:grayscale-0 transition-all duration-300 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
                    "{t.text}"
                  </p>
                  <p className="text-xs font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 ${
                i === active ? 'w-8 h-2 bg-red-600' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
