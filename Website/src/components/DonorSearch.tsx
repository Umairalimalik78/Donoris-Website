import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Heart, Check } from 'lucide-react';

const mockDonors = [
  { name: 'Ali Hassan', blood: 'O+', city: 'Karachi', area: 'Gulshan-e-Iqbal', donations: 8, available: true, distance: '1.2 km', badge: 'Hero Donor' },
  { name: 'Sana Khan', blood: 'O+', city: 'Karachi', area: 'DHA Phase 6', donations: 3, available: true, distance: '3.4 km', badge: 'Life Saver' },
  { name: 'Bilal Ahmed', blood: 'O+', city: 'Karachi', area: 'Clifton', donations: 15, available: true, distance: '5.1 km', badge: 'Community Champion' },
  { name: 'Noor Fatima', blood: 'O+', city: 'Karachi', area: 'North Nazimabad', donations: 1, available: false, distance: '6.8 km', badge: 'First Saver' },
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function DonorSearch() {
  const [searched, setSearched] = useState(false);
  const [blood, setBlood] = useState('O+');
  const [city, setCity] = useState('Karachi');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <section id="donate" className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag mb-4"
          >
            Donor Discovery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-heading text-gray-900 leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Find a <span className="text-red-600">Donor</span><br />Near You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm max-w-sm mx-auto"
          >
            Search our verified donor database by blood group and city. Results ranked by distance and availability.
          </motion.p>
        </div>

        {/* Search form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSearch}
          className="bg-gray-950 p-6 lg:p-8 mb-12"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Blood Group</label>
              <select
                value={blood}
                onChange={e => setBlood(e.target.value)}
                className="w-full px-4 py-4 bg-white text-gray-900 text-sm font-bold focus:outline-none"
              >
                {bloodTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full pl-10 pr-4 py-4 bg-white text-gray-900 text-sm font-bold focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-3"
              >
                <Search className="w-4 h-4" />
                Search Donors
              </button>
            </div>
          </div>
        </motion.form>

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-bold text-gray-500">
                  Found <span className="text-gray-900">{mockDonors.length} donors</span> for {blood} in {city}
                </p>
                <p className="text-xs text-gray-400">Ranked by proximity</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {mockDonors.map((donor, i) => (
                  <motion.div
                    key={donor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`border-2 p-6 flex items-start justify-between gap-4 group hover:border-red-200 transition-colors duration-200 ${
                      donor.available ? 'border-gray-100' : 'border-gray-100 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 flex items-center justify-center font-condensed font-black text-lg flex-shrink-0 ${
                        donor.available ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {donor.blood}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 text-sm">{donor.name}</h4>
                          {donor.available && <Check className="w-3.5 h-3.5 text-green-500" />}
                        </div>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" /> {donor.area}, {donor.city} · {donor.distance}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wide bg-red-50 text-red-700 px-2 py-0.5">
                            {donor.badge}
                          </span>
                          <span className="text-[10px] text-gray-400">{donor.donations} donations</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-1 ${
                        donor.available
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {donor.available ? 'Available' : 'Unavailable'}
                      </span>
                      {donor.available && (
                        <button className="text-xs font-black uppercase tracking-wide text-red-600 flex items-center gap-1 hover:gap-2 transition-all duration-200 mt-auto">
                          <Heart className="w-3.5 h-3.5" /> Contact
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!searched && (
          <div className="text-center py-16 border-2 border-dashed border-gray-200">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Enter blood group and city to find donors near you.</p>
          </div>
        )}
      </div>
    </section>
  );
}
