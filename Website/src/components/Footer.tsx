import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Platform: ['How It Works', 'Find a Donor', 'Emergency Request', 'Blood Banks', 'Hospital Partners'],
  Donors: ['Register as Donor', 'Manage Profile', 'Donation History', 'Badge Program', 'Leaderboard'],
  Company: ['About Donoris', 'Our Mission', 'Press & Media', 'Careers', 'Contact Us'],
  Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Report Issue'],
};

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function Footer() {
  return (
    <footer className="bg-gray-950 pt-24 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top strip */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                  <BloodDropIcon className="w-6 h-6 text-white" />
                </div>
                <span className="font-condensed font-black text-3xl uppercase tracking-wider text-white">
                  Dono<span className="text-red-500">ris</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
                Pakistan's most intelligent blood donor ecosystem. Connecting seekers with eligible donors, saving lives — one match at a time.
              </p>

              {/* Social */}
              <div className="flex items-center gap-4">
                {[
                  { Icon: Twitter, href: '#' },
                  { Icon: Facebook, href: '#' },
                  { Icon: Instagram, href: '#' },
                  { Icon: Youtube, href: '#' },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact + Blood groups */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>hello@donoris.pk</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>0800-DONORIS (24/7 Emergency)</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>Karachi · Lahore · Islamabad · Peshawar</span>
              </div>

              {/* Blood groups list */}
              <div className="pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-white/20 mb-3">Available Blood Groups</p>
                <div className="flex flex-wrap gap-2">
                  {bloodTypes.map(t => (
                    <span
                      key={t}
                      className="text-xs font-black text-white/50 border border-white/10 px-3 py-1 hover:border-red-600 hover:text-red-400 transition-colors duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 Donoris. All rights reserved. Built for Pakistan.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-white/20 text-xs">System operational — donors standing by</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function BloodDropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 4 10.5 4 15.5C4 19.6421 7.58172 23 12 23C16.4183 23 20 19.6421 20 15.5C20 10.5 12 2 12 2Z" />
    </svg>
  );
}
