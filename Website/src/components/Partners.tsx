import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const partners = [
  'Aga Khan University Hospital',
  'Shaukat Khanum Memorial',
  'Pakistan Red Crescent',
  'Civil Hospital Karachi',
  'Mayo Hospital Lahore',
  'PIMS Islamabad',
  'Indus Hospital',
  'Jinnah Hospital',
];

export default function Partners() {
  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-tag mb-3">Trusted By</p>
          <h3 className="font-condensed font-black uppercase text-2xl text-gray-900">
            Pakistan's Leading Healthcare Institutions
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-gray-50 hover:bg-white transition-colors duration-200 p-8 flex flex-col items-center gap-3 group cursor-default"
            >
              <Building2 className="w-6 h-6 text-gray-300 group-hover:text-red-600 transition-colors duration-200" />
              <p className="text-center text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors duration-200 leading-snug">
                {partner}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
