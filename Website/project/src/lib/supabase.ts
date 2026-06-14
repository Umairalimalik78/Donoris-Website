import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
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
