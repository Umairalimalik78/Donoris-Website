# ⚙️ DONORIS
### *Every Drop Counts. Every Second Matters.*

---

# TECHNICAL REQUIREMENTS DOCUMENT (TRD)
**Version 1.0 | June 2025 | Hackathon Edition**
*Confidential — Internal Use Only*

---

## 1. Technical Overview

This document defines the complete technical architecture, stack decisions, data models, API design, security protocols, and infrastructure plan for Donoris v1.0. All technologies chosen are free-tier or open-source to meet hackathon constraints, while maintaining production-grade design patterns for scalability.

Donoris follows a monolithic-first architecture for rapid development, with clear module separation to allow migration to microservices in v2.0 without significant refactoring.

---

## 2. Technology Stack

### 2.1 Full Stack Overview

| Layer | Technology | Justification |
|---|---|---|
| **Frontend** | Next.js 14 (React) | SSR + SSG hybrid; fast SEO-friendly pages; free deployment on Vercel. |
| **Styling** | Tailwind CSS | Utility-first CSS; no extra cost; fast prototyping for hackathon. |
| **Backend** | Next.js API Routes | Eliminates a separate server; same codebase for frontend and backend. |
| **Database** | Supabase (PostgreSQL) | Free tier; built-in auth; real-time subscriptions; row-level security. |
| **Authentication** | Supabase Auth | Email/password + social login; JWT-based; free tier. |
| **File Storage** | Supabase Storage | For profile photos; 1GB free tier. |
| **Email Notifications** | Resend (free tier) | 100 emails/day free; simple API; React Email templates. |
| **SMS Alerts (UI only)** | Mocked / Prototype | UI demonstrates feature; real integration (Telenor/Jazz) for v2.0. |
| **Deployment** | Vercel | Free tier for Next.js; automatic CI/CD from GitHub. |
| **Version Control** | GitHub | Free; CI/CD integration with Vercel. |
| **Maps / Geo** | Leaflet.js + OpenStreetMap | Free; no API key needed; shows donor locations by city. |

---

## 3. System Architecture

### 3.1 Architecture Pattern

Donoris v1.0 uses a Server-Side Rendered (SSR) monolithic architecture powered by Next.js. The application is split into three conceptual layers:

- **Presentation Layer:** Next.js pages and React components rendered server-side or client-side based on data sensitivity.
- **API Layer:** Next.js API Routes handle all business logic, data validation, and database interactions.
- **Data Layer:** Supabase PostgreSQL with Row-Level Security (RLS) policies enforcing data access rules at the database level.

### 3.2 High-Level Architecture Diagram

```
[ Browser / User ]
       |  HTTPS
       v
[ Next.js App on Vercel ]  <-- SSR Pages + API Routes
       |  Supabase Client (JWT Auth)
       v
[ Supabase ]  PostgreSQL + Auth + Storage + Realtime
       |  API call
       v
[ Resend API ]  Email notification delivery
```

### 3.3 Module Breakdown

| Module | Responsibilities |
|---|---|
| `auth/` | Login, register, session management, role assignment (donor, seeker, admin, blood-bank-admin). |
| `donors/` | Donor registration, profile CRUD, availability toggle, donation history, badge awards. |
| `search/` | Blood type + city search, ranking algorithm, compatibility expansion (O- universal). |
| `bloodbanks/` | Blood bank inventory display, partner management, inventory updates. |
| `broadcast/` | Emergency alert creation, donor targeting by type + city, notification dispatch. |
| `messages/` | In-app secure contact form, email relay, message history for logged-in users. |
| `admin/` | User management, platform analytics, moderation tools, badge management. |
| `gamification/` | Badge logic engine, donation milestone checks, leaderboard computation. |

---

## 4. Database Design

### 4.1 Entity Relationship Summary

The database uses PostgreSQL hosted on Supabase. All tables use UUID primary keys. Row-Level Security (RLS) is enabled on all sensitive tables.

### 4.2 Core Tables

#### `users`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Supabase Auth user ID. |
| `full_name` | VARCHAR(100) | User's full name. |
| `email` | VARCHAR(200) | Unique email; used for login and notifications. |
| `role` | ENUM | `donor` \| `seeker` \| `admin` \| `blood_bank_admin` |
| `city` | VARCHAR(100) | City for geographic matching. |
| `phone_masked` | VARCHAR(20) | Stored but never publicly exposed. |
| `anonymous_mode` | BOOLEAN | If true, name shown as initials only. |
| `created_at` | TIMESTAMPTZ | Account creation timestamp. |

#### `donors`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Donor record ID. |
| `user_id` | UUID (FK) | References `users.id`. |
| `blood_type` | ENUM | `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-` |
| `is_available` | BOOLEAN | Active availability toggle. |
| `inactive_reason` | VARCHAR(100) | `recent_donation` \| `illness` \| `travel` \| `other` |
| `last_donation_date` | DATE | Self-reported; used to enforce 90-day cooldown suggestion. |
| `total_donations` | INTEGER | Self-reported count; used for badge awards. |
| `broadcast_opt_in` | BOOLEAN | Whether donor receives broadcast alerts. |

#### `blood_banks`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Blood bank record ID. |
| `name` | VARCHAR(200) | Institution name. |
| `city` | VARCHAR(100) | City location. |
| `contact_phone` | VARCHAR(20) | Public contact number. |
| `address` | TEXT | Full address. |
| `working_hours` | VARCHAR(100) | e.g., Mon-Sat 8am-8pm |

#### `blood_inventory`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Inventory record ID. |
| `blood_bank_id` | UUID (FK) | References `blood_banks.id`. |
| `blood_type` | ENUM | Blood type for this inventory entry. |
| `units_available` | INTEGER | Current units in stock. |
| `updated_at` | TIMESTAMPTZ | Last inventory update time. |

#### `badges`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Badge award record. |
| `donor_id` | UUID (FK) | References `donors.id`. |
| `badge_type` | ENUM | `first_drop` \| `life_saver` \| `hero` \| `guardian_angel` \| `rare_hero` |
| `awarded_at` | TIMESTAMPTZ | When badge was awarded. |

#### `broadcasts`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Broadcast record ID. |
| `created_by` | UUID (FK) | References `users.id` (admin or blood bank admin). |
| `blood_type` | ENUM | Target blood type for this alert. |
| `city` | VARCHAR(100) | Target city for this alert. |
| `message` | TEXT | Emergency message content. |
| `created_at` | TIMESTAMPTZ | Broadcast timestamp. |

#### `messages`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Message record ID. |
| `sender_id` | UUID (FK) | References `users.id`. |
| `donor_id` | UUID (FK) | References `donors.id` (recipient). |
| `content` | TEXT | Message body. |
| `sent_at` | TIMESTAMPTZ | Send timestamp. |

---

## 5. API Design

### 5.1 API Conventions

- All API routes use Next.js API Routes under `/api/`
- Authentication via Supabase JWT passed in `Authorization: Bearer <token>` header
- All responses return JSON with `{ data, error, status }` envelope
- HTTP methods: `GET` (read), `POST` (create), `PATCH` (update), `DELETE` (remove)

### 5.2 Core API Endpoints

| Method | Endpoint | Auth Required | Description |
|:---:|---|:---:|---|
| `POST` | `/api/auth/register` | No | Register new user with role selection. |
| `POST` | `/api/auth/login` | No | Authenticate and receive JWT. |
| `GET` | `/api/donors/search` | Optional | Search donors by `blood_type` + `city` query params. |
| `GET` | `/api/donors/:id` | Yes | Get donor profile (masked if anonymous). |
| `PATCH` | `/api/donors/:id` | Yes (owner) | Update availability, profile info. |
| `POST` | `/api/donors/:id/donation` | Yes (owner) | Log a self-reported donation. |
| `GET` | `/api/bloodbanks` | No | List all blood banks with inventory. |
| `PATCH` | `/api/bloodbanks/:id/inventory` | Yes (BB Admin) | Update blood type unit count. |
| `POST` | `/api/broadcast` | Yes (Admin/BB) | Trigger emergency broadcast by type + city. |
| `POST` | `/api/messages/send` | Yes | Send private message to donor (relayed via email). |
| `GET` | `/api/admin/analytics` | Yes (Admin) | Platform-wide stats and metrics. |
| `GET` | `/api/admin/users` | Yes (Admin) | List all users with filter and pagination. |
| `DELETE` | `/api/admin/users/:id` | Yes (Admin) | Deactivate or delete a user account. |

### 5.3 Example API Response Envelope

```json
{
  "data": {
    "donors": [...],
    "total": 24
  },
  "error": null,
  "status": 200
}
```

### 5.4 Example: Donor Search Query

```
GET /api/donors/search?blood_type=B-&city=Karachi&urgency=emergency
```

```json
{
  "data": {
    "donors": [
      {
        "id": "uuid-xxx",
        "display_name": "Usman T.",
        "blood_type": "B-",
        "city": "Karachi",
        "is_available": true,
        "total_donations": 5,
        "badges": ["hero", "rare_hero"]
      }
    ],
    "blood_banks_with_stock": [
      {
        "name": "Indus Hospital Blood Bank",
        "units_available": 3
      }
    ],
    "total": 1
  },
  "error": null,
  "status": 200
}
```

---

## 6. Security Architecture

### 6.1 Authentication & Authorization

- Supabase Auth handles all authentication with industry-standard JWT tokens.
- Role-based access control (RBAC) enforced at both API route and database level.
- Four roles: `donor`, `seeker`, `blood_bank_admin`, `super_admin`.
- JWT tokens expire in 1 hour; refresh tokens valid for 7 days.

### 6.2 Data Privacy

- Donor phone numbers stored encrypted and never returned in any API response to non-admins.
- Anonymous mode replaces full names with initials at the API response level — not just the UI.
- Seeker must be authenticated to contact a donor — prevents scraping and abuse.
- All communication routed through in-app relay; no direct personal contact info shared.

### 6.3 Row-Level Security (RLS) Policies

| Table | Policy |
|---|---|
| `users` | Users can only read/update their own record. Admins can read all. |
| `donors` | Public read for `is_available = true` records only. Write restricted to owner. |
| `blood_inventory` | Public read. Write restricted to `blood_bank_admin` role. |
| `messages` | Only sender and recipient can read messages. |
| `broadcast` | Only admin and blood_bank_admin can create; all authenticated users can read. |

### 6.4 Input Validation

- All API inputs validated using **Zod** schema validation before database interaction.
- Blood type enum strictly enforced; no free-text blood type entry.
- Rate limiting on contact form and broadcast endpoints to prevent abuse (10 req/min).
- XSS protection via React's default escaping; no `dangerouslySetInnerHTML` used.

---

## 7. Frontend Architecture

### 7.1 Page Structure (Next.js App Router)

| Route | Description |
|---|---|
| `/` | Landing page with hero, stats, blood bank logos, and CTA. |
| `/search` | Smart search page with blood type + city filters and donor results. |
| `/register` | Dual-path registration: donor or seeker. |
| `/login` | Authentication page. |
| `/donor/[id]` | Public donor profile with availability, badges, and contact form. |
| `/donor/dashboard` | Private donor dashboard: toggle, history, badges, notifications. |
| `/blood-banks` | List of partner blood banks with inventory status. |
| `/emergency` | Emergency broadcast page — shows active alerts by city. |
| `/admin` | Super admin panel: users, analytics, broadcasts, badge management. |
| `/admin/bloodbanks` | Blood bank admin: inventory management, urgent request posting. |

### 7.2 Key UI Components

| Component | Description |
|---|---|
| `DonorCard` | Displays donor avatar (initials), blood type badge, city, availability status, and contact button. |
| `BloodTypeSearch` | Dropdown for all 8 blood types + universal donor filter option. |
| `AvailabilityToggle` | Switch with reason modal for setting inactive status. |
| `BadgeDisplay` | Visual badge grid showing earned and locked badges. |
| `EmergencyBanner` | Site-wide sticky alert for active emergency broadcasts. |
| `InventoryGrid` | Color-coded 8-cell grid showing blood type stock per bank. |
| `AdminAnalyticsDashboard` | Charts showing donor growth, request volume, match rates. |

### 7.3 State Management

- **Server state:** React Query (TanStack Query) for all API data fetching, caching, and background refetching.
- **Client state:** React `useState` / `useContext` for UI state (modals, toggles, form steps).
- **Auth state:** Supabase Auth context provider wrapping the entire application.

---

## 8. Smart Matching Algorithm

### 8.1 Search Logic

When a seeker submits a search with `blood_type` and `city`, the matching engine performs the following steps in order:

1. **Exact match:** Fetch all donors where `blood_type = requested` AND `city = requested` AND `is_available = true`.
2. **Compatibility expansion:** If blood type is rare and results < 5, expand to include compatible donor types (e.g., O- compatible with any type).
3. **Sort results:** By `total_donations DESC` (most experienced donors first), then by `last_active_at DESC`.
4. **Blood bank cross-check:** Simultaneously query `blood_inventory` for the requested type in the same city and surface relevant banks at the top of results.

### 8.2 Blood Compatibility Matrix

| Donor Type | A+ | A- | B+ | B- | AB+ | AB- | O+ | O- |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **O-** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **O+** | ✓ | | ✓ | | ✓ | | ✓ | |
| **A-** | ✓ | ✓ | | | ✓ | ✓ | | |
| **A+** | ✓ | | | | ✓ | | | |
| **B-** | | | ✓ | ✓ | ✓ | ✓ | | |
| **B+** | | | ✓ | | ✓ | | | |
| **AB-** | | | | | ✓ | ✓ | | |
| **AB+** | | | | | ✓ | | | |

### 8.3 Broadcast Targeting Logic

```
WHEN emergency broadcast is triggered for (blood_type, city):
  SELECT donors
  WHERE city = target_city
    AND blood_type IN compatible_types(target_blood_type)
    AND is_available = true
    AND broadcast_opt_in = true
  FOR EACH donor:
    → Send in-app notification
    → Send email via Resend API
    → [v2.0] Send SMS via Telenor/Jazz gateway
```

---

## 9. Deployment & Infrastructure

### 9.1 Environments

| Environment | URL Pattern | Purpose |
|---|---|---|
| **Development** | `localhost:3000` | Local development and testing. |
| **Preview** | `donoris-pr-*.vercel.app` | Auto-deployed on every GitHub PR by Vercel. |
| **Production** | `donoris.vercel.app` | Live platform deployed from `main` branch. |

### 9.2 CI/CD Pipeline

- GitHub repository with `main` (production) and `dev` (development) branches.
- Vercel auto-deploys `main` branch to production on every push.
- Vercel auto-generates preview URLs for every pull request.
- Environment variables (Supabase URL, Anon Key, Resend API Key) stored securely in Vercel dashboard.

### 9.3 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your-resend-key
NEXT_PUBLIC_APP_URL=https://donoris.vercel.app
```

### 9.4 Free Tier Limits & Monitoring

| Service | Free Tier Limit | Expected Usage (Hackathon) |
|---|---|---|
| **Vercel** | 100GB bandwidth/mo, unlimited deploys | < 1GB |
| **Supabase** | 500MB DB, 1GB storage, 50K MAU | < 10MB DB, < 100 users |
| **Resend** | 100 emails/day | < 50 emails/day |

---

## 10. Future Technical Considerations

- **SMS Gateway Integration:** Integrate Telenor or Jazz Pakistan SMS API for real broadcast alerts in v2.0.
- **Microservices Migration:** Extract search, broadcast, and notification into independent services as traffic scales.
- **Blood Bank API Integration:** Build standardized REST adapters for each partner blood bank's existing systems.
- **Real-time Features:** Use Supabase Realtime subscriptions to push live donor availability updates to search results without page refresh.
- **Mobile App:** React Native app sharing API and component logic with the web platform.
- **AI Matching:** ML model trained on historical donation patterns to predict donor availability and optimize routing.
- **PDPA Compliance:** Full compliance audit with Pakistan's Personal Data Protection Act when it is enacted.
- **Plasma & Platelet Donation:** Extend the platform beyond whole blood to cover other blood components.

---

*Donoris TRD v1.0 | Confidential | Hackathon Edition | June 2025*
