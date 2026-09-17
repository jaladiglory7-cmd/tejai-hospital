-- ============================================================================
-- TejAI Multi-Specialty Hospital - Supabase / PostgreSQL schema
-- Run this in the Supabase SQL editor to create all tables + RLS policies.
-- ============================================================================

-- 1. Doctors -----------------------------------------------------------------
create table if not exists public.doctors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  name_te     text,
  qualifications text not null,
  specializations text,
  specializations_te text,
  experience_years int not null default 0,
  bio         text,
  bio_te      text,
  image_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- 2. Services ----------------------------------------------------------------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  name_te     text,
  description text,
  description_te text,
  icon        text,
  category    text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- 3. FAQs --------------------------------------------------------------------
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  question_te text,
  answer      text,
  answer_te   text,
  category    text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- 4. Testimonials ---------------------------------------------------------------
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  name_te       text,
  designation   text,
  designation_te text,
  quote         text not null,
  quote_te      text,
  is_verified   boolean not null default false,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists idx_testimonials_verified on public.testimonials (is_verified);

alter table public.testimonials enable row level security;

-- 5. Hospital information (single row per key: brand, address, hours, contact) --
create table if not exists public.hospital_info (
  id          uuid primary key default gen_random_uuid(),
  info_key    text not null unique,
  value       text not null,
  value_te    text,
  updated_at  timestamptz not null default now()
);

insert into public.hospital_info (info_key, value, value_te) values
  ('brand_name', 'TejAI Multi-Specialty Hospital', 'TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్'),
  ('tagline', 'Technology. People. Better Health.', 'సాంకేతికత. ప్రజలు. మెరుగైన ఆరోగ్యం.'),
  ('address', 'Plot No. 12, Hitech City Road, Madhapur, Hyderabad - 500081', 'ప్లాట్ నంబర్ 12, హైటెక్ సిటీ రోడ్, మధాపూర్, హైదరాబాద్ - 500081'),
  ('phone', '+91 98765 43210', '+91 98765 43210'),
  ('hours_mon_sat', 'Mon - Sat: 9:00 AM - 7:00 PM', 'సోమ - శని: ఉదయం 9:00 - సాయంత్రం 7:00'),
  ('hours_sunday', 'Sunday: 9:00 AM - 1:00 PM', 'ఆదివారం: ఉదయం 9:00 - మధ్యాహ్నం 1:00')
on conflict (info_key) do update set value = excluded.value, value_te = excluded.value_te;

-- 5. Appointments --------------------------------------------------------
-- NOTE: store only what is needed for booking. No health data is stored.
create table if not exists public.appointments (
  id          uuid primary key default gen_random_uuid(),
  patient_name text not null,
  phone       text not null,
  email       text,
  preferred_date date not null,
  preferred_time time not null,
  concern     text not null,
  message     text,
  status      text not null default 'pending'
              check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_appointments_date on public.appointments (preferred_date);
create index if not exists idx_appointments_status on public.appointments (status);

-- 6. Contact / consultation requests -----------------------------------------
create table if not exists public.contact_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text,
  message     text not null,
  request_type text not null default 'general',
  status      text not null default 'new'
              check (status in ('new', 'in_progress', 'closed')),
  created_at  timestamptz not null default now()
);

-- 7. AI chat logs (anonymised by default -- no PII captured) -----------------
-- Each row belongs to a chat session tracked by session_id (chat sessions) and
-- stores the user message + AI reply (chat messages).
create table if not exists public.chat_logs (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  user_message text not null,
  ai_reply    text not null,
  language    text not null default 'en',
  created_at  timestamptz not null default now()
);

create index if not exists idx_chat_logs_session on public.chat_logs (session_id);

-- ============================================================================
-- Row Level Security
-- Public anonymous writes are enabled for bookings & contact for simplicity.
-- For production, restrict to a service-role key issued to the FastAPI backend.
-- ============================================================================
alter table public.doctors enable row level security;
alter table public.services enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.hospital_info enable row level security;
alter table public.appointments enable row level security;
alter table public.contact_requests enable row level security;
alter table public.chat_logs enable row level security;

drop policy if exists "Public read doctors" on public.doctors;
create policy "Public read doctors" on public.doctors for select using (true);

drop policy if exists "Public read services" on public.services;
create policy "Public read services" on public.services for select using (true);

drop policy if exists "Public read faqs" on public.faqs;
create policy "Public read faqs" on public.faqs for select using (true);

drop policy if exists "Public read verified testimonials" on public.testimonials;
create policy "Public read verified testimonials" on public.testimonials
  for select using (is_verified = true);

drop policy if exists "Public read hospital info" on public.hospital_info;
create policy "Public read hospital info" on public.hospital_info for select using (true);

drop policy if exists "Public insert appointments" on public.appointments;
create policy "Public insert appointments" on public.appointments for insert with check (true);

drop policy if exists "Public read appointments" on public.appointments;
create policy "Public read appointments" on public.appointments for select using (true);

drop policy if exists "Public insert contact requests" on public.contact_requests;
create policy "Public insert contact requests" on public.contact_requests for insert with check (true);

drop policy if exists "Public read contact requests" on public.contact_requests;
create policy "Public read contact requests" on public.contact_requests for select using (true);

drop policy if exists "Public insert chat logs" on public.chat_logs;
create policy "Public insert chat logs" on public.chat_logs for insert with check (true);

-- ============================================================================
-- Seed data (doctors, services, FAQs)
-- Adjust to match your actual clinic.
-- ============================================================================
insert into public.doctors (name, name_te, qualifications, specializations, specializations_te, experience_years, bio, bio_te, sort_order)
values
  ('Dr. Anjali Reddy', 'డాక్టర్ అంజలి రెడ్డి', 'MBBS, MD (Dermatology, Venereology & Leprosy)', 'Consultant Dermatologist', 'కన్సల్టెంట్ చర్మ వ్యాధి నిపుణురాలు', 8, 'Consultant Dermatologist at TejAI Multi-Specialty Hospital, dedicated to honest, evidence-based skin and hair care.', 'TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్‌లో కన్సల్టెంట్ చర్మ వ్యాధి నిపుణురాలు, నిజాయితీగల, ఆధార-ఆధారిత చర్మ మరియు జుట్టు సంరక్షణకు అంకితం.', 1),
  ('Dr. Karthik Varma', 'డాక్టర్ కార్తీక్ వర్మ', 'MBBS, MD (Dermatology)', 'Consultant Dermatologist', 'కన్సల్టెంట్ చర్మ వ్యాధి నిపుణుడు', 8, 'Consultant Dermatologist at TejAI Multi-Specialty Hospital, focused on personalized treatment plans for every skin type and tone.', 'TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్‌లో కన్సల్టెంట్ చర్మ వ్యాధి నిపుణుడు, ప్రతి చర్మ రకం మరియు టోన్ కోసం వ్యక్తిగత చికిత్స ప్రణాళికలపై దృష్టి సారిస్తారు.', 2)
on conflict do nothing;

insert into public.services (name, name_te, description, description_te, icon, category, sort_order)
values
  ('Acne & Acne Scars', 'మొటిమలు & మొటిమల గుర్తులు', 'Cleaner skin for a more confident you', 'మరింత ఆత్మవిశ్వాసం కోసం శుభ్రమైన చర్మం', 'Sparkles', 'dermatology', 1),
  ('Hair Fall', 'జుట్టు రాలడం', 'Stronger, healthier hair with the right care', 'సరైన సంరక్షణతో బలమైన, ఆరోగ్యకరమైన జుట్టు', 'Heart', 'trichology', 2),
  ('Pigmentation & Melasma', 'వర్ణద్రవ్యం & మెలాస్మా', 'Even-toned skin, restored confidence', 'ఏకరీతి చర్మం, పునరుద్ధరించబడిన ఆత్మవిశ్వాసం', 'Sun', 'dermatology', 3),
  ('Skin Allergies', 'చర్మ అలర్జీలు', 'Relief from itching, rashes and irritation', 'దురద, దద్దుర్లు మరియు చికాకు నుండి ఉపశమనం', 'Shield', 'dermatology', 4),
  ('Psoriasis', 'సోరియాసిస్', 'Better control. A more comfortable tomorrow.', 'మెరుగైన నియంత్రణ. మరింత సౌకర్యవంతమైన రేపు.', 'Zap', 'dermatology', 5),
  ('Mole / Skin Lesion Screening', 'మోల్ / చర్మ గాయాల స్క్రీనింగ్', 'Early detection for peace of mind', 'మనశ్శాంతి కోసం ముందస్తు గుర్తింపు', 'Eye', 'screening', 6),
  ('Pre-Bridal Skin Prep', 'ప్రీ-బ్రైడల్ చర్మ సిద్ధం', 'Put your best skin for life''s special days', 'జీవితంలోని ప్రత్యేక రోజుల కోసం మీ ఉత్తమ చర్మం', 'Crown', 'cosmetology', 7),
  ('Anti-Aging', 'యాంటీ-ఏజింగ్', 'Healthy, youthful skin at every age', 'ప్రతి వయస్సులో ఆరోగ్యకరమైన, యవ్వన చర్మం', 'Clock', 'cosmetology', 8)
on conflict do nothing;

insert into public.faqs (question, question_te, answer, answer_te, category, sort_order)
values
  ('How much does a consultation cost?', 'సంప్రదింపు ఖర్చు ఎంత?', 'Consultation pricing is confirmed when you book. Please contact us or reach us on WhatsApp for current fees. Any treatment cost is always explained clearly before you begin.', 'మీరు బుక్ చేసినప్పుడు సంప్రదింపు ధర నిర్ధారించబడుతుంది. ప్రస్తుత ఫీజుల కోసం దయచేసి మమ్మల్ని సంప్రదించండి లేదా WhatsApp ద్వారా చేరుకోండి.', 'pricing', 1),
  ('Is the treatment painful?', 'చికిత్స బాధాకరమా?', 'Experience varies by procedure. Your doctor explains what to expect, including any discomfort, and tailors the plan to keep you as comfortable as possible.', 'అనుభవం ప్రక్రియను బట్టి మారుతుంది. మీ డాక్టర్ అసౌకర్యంతో సహా ఏమి ఆశించాలో వివరిస్తారు.', 'treatment', 2),
  ('How many sessions will I need?', 'నాకు ఎన్ని సెషన్లు అవసరం?', 'The number of sessions depends on your condition and how your skin responds to treatment. Your doctor outlines a clear plan with expected milestones after your consultation.', 'సెషన్ల సంఖ్య మీ పరిస్థితి మరియు చికిత్సకు మీ చర్మం ఎలా స్పందిస్తుందనే దానిపై ఆధారపడి ఉంటుంది.', 'treatment', 3),
  ('Does insurance or government health scheme apply?', 'బీమా లేదా ప్రభుత్వ ఆరోగ్య పథకం వర్తిస్తుందా?', 'Coverage depends on your plan and the specific service. Our team can guide you on the documentation you may need. Please check with your provider for eligibility details.', 'కవరేజ్ మీ ప్లాన్ మరియు నిర్దిష్ట సేవపై ఆధారపడి ఉంటుంది. మీకు అవసరమైన డాక్యుమెంటేషన్‌పై మా బృందం మీకు మార్గనిర్దేశం చేయగలదు.', 'billing', 4),
  ('What should I expect in my first visit?', 'నా మొదటి సందర్శనలో నేను ఏమి ఆశించాలి?', 'Your doctor listens to your concern, reviews your history, examines the affected area and explains your options clearly. You can ask questions at any time.', 'మీ డాక్టర్ మీ సమస్యను వింటారు, మీ చరిత్రను సమీక్షిస్తారు, ప్రభావిత ప్రాంతాన్ని పరిశీలిస్తారు మరియు మీ ఎంపికలను స్పష్టంగా వివరిస్తారు.', 'consultation', 5)
on conflict do nothing;