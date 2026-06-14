import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Eye, EyeOff, User, Phone, MapPin,
  Droplets, CheckCircle, ChevronRight, ChevronLeft, AlertCircle,
  Check, UserPlus, Users,
} from 'lucide-react';
import { registerUser } from '../../lib/auth';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot'];

type Step = 1 | 2 | 3;

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  gender: 'male' | 'female' | 'other' | '';
  age: string;
  role: 'donor' | 'seeker';
  medical_eligible: boolean;
  blood_group: typeof BLOOD_GROUPS[number] | '';
  city: string;
  area: string;
  phone: string;
};

const initialForm: FormData = {
  email: '', password: '', confirmPassword: '',
  full_name: '', gender: '', age: '', role: 'donor', medical_eligible: true,
  blood_group: '', city: '', area: '', phone: '',
};

const stepLabels = ['Account', 'Personal Info', 'Blood & Location'];

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (key: keyof FormData, value: unknown) =>
    setForm(f => ({ ...f, [key]: value }));

  const validateStep = (): string => {
    if (step === 1) {
      if (!form.email.includes('@')) return 'Enter a valid email address.';
      if (form.password.length < 8) return 'Password must be at least 8 characters.';
      if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    }
    if (step === 2) {
      if (!form.full_name.trim()) return 'Full name is required.';
      if (!form.gender) return 'Please select your gender.';
      const age = parseInt(form.age);
      if (isNaN(age) || age < 18 || age > 65) return 'Age must be between 18 and 65.';
    }
    if (step === 3) {
      if (!form.blood_group) return 'Please select your blood group.';
      if (!form.city) return 'Please select your city.';
      if (!form.phone.trim()) return 'Phone number is required.';
    }
    return '';
  };

  const next = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => (s + 1) as Step);
  };

  const back = () => {
    setError('');
    setStep(s => (s - 1) as Step);
  };

  const handleSubmit = async () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);

    try {
      const { data, error: signUpError } = await registerUser({
        email: form.email.trim(),
        password: form.password,
        full_name: form.full_name.trim(),
        gender: form.gender,
        age: parseInt(form.age),
        blood_group: form.blood_group as any,
        city: form.city,
        area: form.area.trim(),
        phone: form.phone.trim(),
        role: form.role,
        medical_eligible: form.medical_eligible,
      });
      if (signUpError) throw signUpError;
      if (!data?.user) throw new Error('Registration failed. Please try again.');
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 bg-red-600 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="font-condensed font-black uppercase text-2xl text-gray-900 mb-3">
          You're a Hero Now!
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-2">
          Your donor profile is live. You'll receive notifications when someone nearby needs your blood group.
        </p>
        <div className="mt-6 inline-block bg-red-50 border border-red-100 px-5 py-3">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
            Blood Group: <span className="text-xl">{form.blood_group}</span>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Step progress */}
      <div className="flex items-center gap-2 mb-8">
        {stepLabels.map((label, i) => {
          const s = (i + 1) as Step;
          const active = step === s;
          const done = step > s;
          return (
            <div key={label} className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-7 h-7 flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-300 ${
                done ? 'bg-red-600 text-white' : active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {done ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wide truncate transition-colors duration-200 ${
                active ? 'text-gray-900' : done ? 'text-red-600' : 'text-gray-300'
              }`}>
                {label}
              </span>
              {i < 2 && <div className={`flex-1 h-px transition-colors duration-300 ${done ? 'bg-red-600' : 'bg-gray-100'}`} />}
            </div>
          );
        })}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-red-50 border border-red-200 p-3 mb-5"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-xs font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepOne key="s1" form={form} set={set} showPw={showPw} setShowPw={setShowPw} />
        )}
        {step === 2 && (
          <StepTwo key="s2" form={form} set={set} />
        )}
        {step === 3 && (
          <StepThree key="s3" form={form} set={set} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <div>
          {step > 1 ? (
            <button onClick={back} className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-gray-400 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <button onClick={onSwitch} className="text-xs text-gray-400 hover:text-red-600 transition-colors">
              Already have an account? <span className="font-bold">Sign In</span>
            </button>
          )}
        </div>

        {step < 3 ? (
          <button onClick={next} className="bg-gray-900 text-white text-xs font-black uppercase tracking-widest px-6 py-3 hover:bg-red-600 transition-colors duration-200 flex items-center gap-2">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-8 py-3 hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner /> Creating Profile...
              </span>
            ) : (
              <>Create My Profile <CheckCircle className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Step panels ─────────────────────────────────────────────────────── */

function stepVariants() {
  return {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };
}

function StepOne({ form, set, showPw, setShowPw }: {
  form: FormData;
  set: (k: keyof FormData, v: unknown) => void;
  showPw: boolean;
  setShowPw: (v: boolean) => void;
}) {
  return (
    <motion.div {...stepVariants()} transition={{ duration: 0.25 }} className="space-y-4">
      <Field icon={<Mail className="w-4 h-4" />} label="Email Address">
        <input
          type="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          placeholder="you@example.com"
          className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
        />
      </Field>

      <Field icon={<Lock className="w-4 h-4" />} label="Password" rightSlot={
        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }>
        <input
          type={showPw ? 'text' : 'password'}
          value={form.password}
          onChange={e => set('password', e.target.value)}
          placeholder="Min. 8 characters"
          className="w-full pl-10 pr-10 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
        />
      </Field>

      <Field icon={<Lock className="w-4 h-4" />} label="Confirm Password">
        <input
          type={showPw ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={e => set('confirmPassword', e.target.value)}
          placeholder="Repeat password"
          className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
        />
      </Field>

      {/* Password strength */}
      {form.password.length > 0 && (
        <PasswordStrength password={form.password} />
      )}
    </motion.div>
  );
}

function StepTwo({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <motion.div {...stepVariants()} transition={{ duration: 0.25 }} className="space-y-4">
      <Field icon={<User className="w-4 h-4" />} label="Full Name">
        <input
          type="text"
          value={form.full_name}
          onChange={e => set('full_name', e.target.value)}
          placeholder="Your full legal name"
          className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Gender</label>
          <div className="flex flex-col gap-1.5">
            {(['male', 'female', 'other'] as const).map(g => (
              <button
                key={g}
                type="button"
                onClick={() => set('gender', g)}
                className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wide border-2 transition-all duration-200 text-left capitalize ${
                  form.gender === g ? 'border-red-600 bg-red-600 text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Age</label>
            <input
              type="number"
              min={18} max={65}
              value={form.age}
              onChange={e => set('age', e.target.value)}
              placeholder="18–65"
              className="w-full px-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Role</label>
            {(['donor', 'seeker'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => set('role', r)}
                className={`w-full mb-1.5 py-2.5 px-4 text-xs font-bold uppercase tracking-wide border-2 transition-all duration-200 text-left ${
                  form.role === r ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {r === 'donor' ? <Users className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {r === 'donor' ? 'Donor' : 'Seeker'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medical eligibility */}
      <button
        type="button"
        onClick={() => set('medical_eligible', !form.medical_eligible)}
        className={`w-full flex items-center gap-3 p-4 border-2 text-left transition-all duration-200 ${
          form.medical_eligible ? 'border-red-200 bg-red-50' : 'border-gray-200'
        }`}
      >
        <div className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          form.medical_eligible ? 'border-red-600 bg-red-600' : 'border-gray-300'
        }`}>
          {form.medical_eligible && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">I am medically eligible to donate blood</p>
          <p className="text-xs text-gray-400 mt-0.5">No recent illness, surgery, or tattoos in past 6 months</p>
        </div>
      </button>
    </motion.div>
  );
}

function StepThree({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <motion.div {...stepVariants()} transition={{ duration: 0.25 }} className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          Blood Group
        </label>
        <div className="grid grid-cols-4 gap-2">
          {BLOOD_GROUPS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => set('blood_group', t)}
              className={`py-3.5 text-sm font-black border-2 transition-all duration-200 ${
                form.blood_group === t
                  ? 'border-red-600 bg-red-600 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-red-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
          <select
            value={form.city}
            onChange={e => set('city', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none bg-white"
          >
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <Field icon={<MapPin className="w-4 h-4" />} label="Area / Neighbourhood">
          <input
            type="text"
            value={form.area}
            onChange={e => set('area', e.target.value)}
            placeholder="e.g. DHA Phase 5"
            className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
          />
        </Field>
      </div>

      <Field icon={<Phone className="w-4 h-4" />} label="Phone Number">
        <input
          type="tel"
          value={form.phone}
          onChange={e => set('phone', e.target.value)}
          placeholder="+92 300 0000000"
          className="w-full pl-10 pr-4 py-3.5 border border-gray-200 text-gray-900 text-sm focus:border-red-600 focus:outline-none"
        />
      </Field>

      <div className="bg-gray-50 border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <Droplets className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Your phone number is kept private. Seekers can only contact you through the secure in-app messaging system — your number is never shared publicly.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Shared helpers ─────────────────────────────────────────────────── */

function Field({
  icon, label, children, rightSlot,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        {children}
        {rightSlot}
      </div>
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 transition-colors duration-300 ${i < score ? colors[score - 1] : 'bg-gray-100'}`} />
        ))}
      </div>
      <p className="text-xs text-gray-400">Strength: <span className="font-bold text-gray-700">{labels[score - 1] ?? 'Weak'}</span></p>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
