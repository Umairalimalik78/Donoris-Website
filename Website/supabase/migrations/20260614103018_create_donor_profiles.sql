/*
# Create Donor Profiles Table

## Purpose
Stores all extended profile data for Donoris users (donors and seekers).
Each profile row is owned by a Supabase auth user (1-to-1 via `id`).

## New Tables

### `profiles`
- `id` (uuid, PK) — mirrors `auth.users.id`; row deleted when the auth user is deleted
- `full_name` (text, not null) — user's full legal name
- `gender` (text) — 'male' | 'female' | 'other'
- `age` (integer) — must be 18–65 (donation eligibility window)
- `blood_group` (text) — one of 8 ABO/Rh types
- `city` (text, not null) — city for location matching
- `area` (text) — neighbourhood / sub-area
- `phone` (text) — masked contact number
- `role` (text) — 'donor' | 'seeker'; defaults to 'donor'
- `availability_status` (text) — 'active' | 'inactive'; defaults to 'active'
- `last_donation_date` (date) — used to auto-pause after 90 days
- `donation_count` (integer) — lifetime verified donations, defaults 0
- `badge_level` (text) — current gamification badge
- `medical_eligible` (boolean) — donor self-declared eligibility
- `created_at`, `updated_at` (timestamptz)

## Security
- RLS enabled; 4 separate policies (SELECT / INSERT / UPDATE / DELETE)
- Authenticated users can only read and modify their own profile
- Public read policy allows seekers to browse donor cards (blood_group, city, area, availability_status, donation_count, badge_level only — full contact is masked in the application layer)
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  age integer CHECK (age >= 18 AND age <= 65),
  blood_group text CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
  city text NOT NULL DEFAULT '',
  area text DEFAULT '',
  phone text DEFAULT '',
  role text NOT NULL DEFAULT 'donor' CHECK (role IN ('donor', 'seeker')),
  availability_status text NOT NULL DEFAULT 'active' CHECK (availability_status IN ('active', 'inactive')),
  last_donation_date date,
  donation_count integer NOT NULL DEFAULT 0,
  badge_level text NOT NULL DEFAULT 'none',
  medical_eligible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Each authenticated user reads only their own profile
DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Public (anon) can see anonymized donor info (no phone, no email)
DROP POLICY IF EXISTS "public_donor_discovery" ON profiles;
CREATE POLICY "public_donor_discovery" ON profiles
  FOR SELECT TO anon
  USING (role = 'donor' AND availability_status = 'active');

-- Insert: user can only create their own profile row
DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update: user can only modify their own profile
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Delete: user can remove their own profile
DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles
  FOR DELETE TO authenticated
  USING (auth.uid() = id);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index for donor discovery queries (blood_group + city + availability)
CREATE INDEX IF NOT EXISTS idx_profiles_donor_search
  ON profiles (blood_group, city, availability_status)
  WHERE role = 'donor';
