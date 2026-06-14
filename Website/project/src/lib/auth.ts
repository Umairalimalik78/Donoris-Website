export type User = {
  id: string;
  email: string;
};

export type Session = {
  user: User;
};

export type Profile = {
  id: string;
  email: string;
  password: string;
  full_name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  city: string;
  area: string;
  phone: string;
  role: 'donor' | 'seeker';
  availability_status: 'active' | 'inactive';
  last_donation_date: string | null;
  donation_count: number;
  badge_level: string;
  medical_eligible: boolean;
  created_at: string;
  updated_at: string;
};

type AuthStateChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT';

type AuthStateChangeCallback = (event: AuthStateChangeEvent, session: Session | null) => void;

const STORAGE_PROFILES = 'donoris_profiles';
const STORAGE_SESSION = 'donoris_session';
const authListeners = new Set<AuthStateChangeCallback>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function loadProfiles(): Profile[] {
  const raw = localStorage.getItem(STORAGE_PROFILES);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Profile[];
  } catch {
    return [];
  }
}

function saveProfiles(profiles: Profile[]) {
  localStorage.setItem(STORAGE_PROFILES, JSON.stringify(profiles));
}

function buildSession(user: User): Session {
  return { user };
}

function saveSession(session: Session | null) {
  if (session) {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_SESSION);
  }
}

function notifyAuthChange(event: AuthStateChangeEvent, session: Session | null) {
  authListeners.forEach(callback => callback(event, session));
}

export async function getProfileById(id: string) {
  const profiles = loadProfiles();
  const profile = profiles.find((profile) => profile.id === id) ?? null;
  return { data: profile };
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const profiles = loadProfiles();
  const profile = profiles.find((profile) => normalizeEmail(profile.email) === normalizeEmail(email));
  if (!profile || profile.password !== password) {
    return { data: null, error: { message: 'Invalid email or password.' } };
  }

  const session = buildSession({ id: profile.id, email: profile.email });
  saveSession(session);
  notifyAuthChange('SIGNED_IN', session);

  return { data: { session }, error: null };
}

export async function registerUser({
  email,
  password,
  full_name,
  gender,
  age,
  role,
  medical_eligible,
  blood_group,
  city,
  area,
  phone,
}: {
  email: string;
  password: string;
  full_name: string;
  gender: 'male' | 'female' | 'other' | '';
  age: number;
  role: 'donor' | 'seeker';
  medical_eligible: boolean;
  blood_group: Profile['blood_group'];
  city: string;
  area: string;
  phone: string;
}) {
  const profiles = loadProfiles();
  if (profiles.some((profile) => normalizeEmail(profile.email) === normalizeEmail(email))) {
    return { data: null, error: { message: 'Email already registered.' } };
  }

  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const profile: Profile = {
    id,
    email: normalizeEmail(email),
    password,
    full_name: full_name.trim(),
    gender: gender === '' ? 'other' : gender,
    age,
    role,
    medical_eligible,
    blood_group,
    city,
    area: area.trim(),
    phone: phone.trim(),
    availability_status: 'active',
    last_donation_date: null,
    donation_count: 0,
    badge_level: 'First Saver',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  profiles.push(profile);
  saveProfiles(profiles);

  const user = { id, email: profile.email };
  const session = buildSession(user);
  saveSession(session);
  notifyAuthChange('SIGNED_IN', session);

  return { data: { user }, error: null };
}

export async function signOut() {
  saveSession(null);
  notifyAuthChange('SIGNED_OUT', null);
  return { data: null, error: null };
}

export async function getSession() {
  const raw = localStorage.getItem(STORAGE_SESSION);
  const session = raw ? (JSON.parse(raw) as Session) : null;
  return { data: { session } };
}

export function onAuthStateChange(callback: AuthStateChangeCallback) {
  authListeners.add(callback);

  return {
    data: {
      subscription: {
        unsubscribe() {
          authListeners.delete(callback);
        },
      },
    },
  };
}
