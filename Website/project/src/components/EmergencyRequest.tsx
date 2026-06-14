import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Send, MapPin, User, Building2, Droplets } from 'lucide-react';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const urgencyLevels = ['Standard', 'Urgent', 'Critical'];
const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];

export default function EmergencyRequest() {
  const [urgency, setUrgency] = useState('Urgent');
  const [selectedBlood, setSelectedBlood] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="emergency" className="bg-gray-950 py-28 overflow-hidden relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #DC2626 0, #DC2626 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 px-3 py-1.5 flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <span className="text-white text-xs font-black uppercase tracking-widest">Emergency System</span>
              </div>
            </div>

            <h2 className="display-heading text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Need Blood<br />
              <span className="text-red-500">Right Now?</span>
            </h2>

            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm">
              Submit an emergency request and our system will instantly broadcast to all matching donors in your city, triggering SMS, push, and email notifications.
            </p>

            <div className="space-y-6">
              {[
                { icon: AlertTriangle, text: 'Instant broadcast to matching donors' },
                { icon: MapPin, text: 'Location-based proximity filtering' },
                { icon: Droplets, text: 'Rare blood group escalation protocol' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-white/60 text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Emergency helpline */}
            <div className="mt-12 border border-red-600/30 p-6">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">24/7 Emergency Helpline</p>
              <p className="font-condensed font-black text-white text-3xl tracking-wider">0800-DONORIS</p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white p-8 lg:p-10">
              <h3 className="font-condensed font-black uppercase text-2xl text-gray-900 mb-8">
                Submit Blood Request
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-red-600 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-condensed font-black text-2xl text-gray-900 mb-2">Request Submitted!</h4>
                  <p className="text-gray-500 text-sm">We're broadcasting to matching donors now. You'll be contacted within minutes.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Patient name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Patient Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Full patient name"
                        className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Hospital */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Hospital Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Hospital or clinic name"
                        className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Blood group */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Blood Group Required
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {bloodTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedBlood(type)}
                          className={`py-3 text-sm font-black border-2 transition-all duration-200 ${
                            selectedBlood === type
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-gray-200 text-gray-600 hover:border-red-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City + Urgency */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                      <select
                        required
                        className="w-full px-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select city</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Urgency</label>
                      <div className="flex flex-col gap-1.5">
                        {urgencyLevels.map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setUrgency(level)}
                            className={`py-2 text-xs font-black uppercase tracking-wide border transition-all duration-200 ${
                              urgency === level
                                ? level === 'Critical'
                                  ? 'border-red-600 bg-red-600 text-white'
                                  : 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 text-gray-500 hover:border-gray-400'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-3"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Submit Emergency Request
                  </button>

                  <p className="text-center text-gray-400 text-xs">
                    Your request will be broadcast instantly to all matching donors.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
