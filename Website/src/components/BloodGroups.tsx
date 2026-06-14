import { motion } from 'framer-motion';

const bloodGroups = [
  { type: 'A+', canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  { type: 'A-', canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  { type: 'B+', canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  { type: 'B-', canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  { type: 'O+', canDonateTo: ['A+', 'B+', 'O+', 'AB+'], canReceiveFrom: ['O+', 'O-'] },
  { type: 'O-', canDonateTo: ['ALL'], canReceiveFrom: ['O-'] },
  { type: 'AB+', canDonateTo: ['AB+'], canReceiveFrom: ['ALL'] },
  { type: 'AB-', canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'] },
];

const rarityMap: Record<string, { label: string; color: string }> = {
  'O-': { label: 'Universal Donor', color: 'bg-red-600 text-white' },
  'AB+': { label: 'Universal Receiver', color: 'bg-gray-900 text-white' },
  'AB-': { label: 'Rare', color: 'bg-red-100 text-red-700' },
  'B-': { label: 'Rare', color: 'bg-red-100 text-red-700' },
};

export default function BloodGroups() {
  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-tag mb-4">Blood Compatibility</p>
            <h2 className="display-heading text-gray-900 leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Find Your<br />
              <span className="text-red-600">Compatible</span><br />
              Blood Group
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              Not every blood group can receive from every donor. Our system automatically handles compatibility matching so you never have to worry about it.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 bg-red-600 flex-shrink-0" />
                <span className="text-gray-600"><strong className="text-gray-900">O-</strong> is the universal donor — anyone can receive it.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 bg-gray-900 flex-shrink-0" />
                <span className="text-gray-600"><strong className="text-gray-900">AB+</strong> is the universal receiver — can accept all groups.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 bg-red-200 flex-shrink-0" />
                <span className="text-gray-600"><strong className="text-gray-900">AB-</strong> and <strong className="text-gray-900">B-</strong> are the rarest blood groups in Pakistan.</span>
              </div>
            </div>
          </motion.div>

          {/* Right — blood group grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-4 gap-3"
          >
            {bloodGroups.map((group, i) => {
              const rarity = rarityMap[group.type];
              return (
                <motion.div
                  key={group.type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className={`relative p-5 border-2 cursor-default group ${
                    rarity ? 'border-red-600 bg-red-50' : 'border-gray-100 bg-gray-50 hover:border-red-200'
                  } transition-all duration-200`}
                >
                  <p className="font-condensed font-black text-3xl text-gray-900 leading-none">
                    {group.type}
                  </p>
                  {rarity && (
                    <span className={`mt-2 inline-block text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 ${rarity.color}`}>
                      {rarity.label}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
