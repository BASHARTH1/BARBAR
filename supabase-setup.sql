-- Run this in: Supabase Dashboard -> SQL Editor -> New query
-- It creates the `events` table, RLS policies, and seeds the current events.

create extension if not exists "uuid-ossp";

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  description text not null,
  day text not null,
  month text not null,
  year text not null,
  "time" text not null,
  location text not null,
  tag text not null,
  image text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.events enable row level security;

-- Public can read events
drop policy if exists "events_select_public" on public.events;
create policy "events_select_public" on public.events
  for select
  using (true);

-- Only logged-in users (the admin) can write
drop policy if exists "events_insert_auth" on public.events;
create policy "events_insert_auth" on public.events
  for insert
  to authenticated
  with check (true);

drop policy if exists "events_update_auth" on public.events;
create policy "events_update_auth" on public.events
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "events_delete_auth" on public.events;
create policy "events_delete_auth" on public.events
  for delete
  to authenticated
  using (true);

-- Storage bucket for uploaded event images
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

drop policy if exists "event_images_select_public" on storage.objects;
create policy "event_images_select_public" on storage.objects
  for select
  using (bucket_id = 'event-images');

drop policy if exists "event_images_insert_auth" on storage.objects;
create policy "event_images_insert_auth" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'event-images');

drop policy if exists "event_images_update_auth" on storage.objects;
create policy "event_images_update_auth" on storage.objects
  for update
  to authenticated
  using (bucket_id = 'event-images')
  with check (bucket_id = 'event-images');

drop policy if exists "event_images_delete_auth" on storage.objects;
create policy "event_images_delete_auth" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'event-images');

-- Seed with the existing 6 events (idempotent on slug)
insert into public.events (slug, title, description, day, month, year, "time", location, tag, image, sort_order) values
  ('eid-clothing-2026', 'حملة كسوة العيد للأيتام', 'حملة سنوية لتوزيع كسوة العيد على الأطفال الأيتام والأسر المتعففة في مختلف المناطق.', '15', 'يونيو', '2026', '4:00 - 9:00 مساءً', 'مركز الجمعية - باربار', 'حملة', '/assets/support-1.jpg', 10),
  ('iftar-2026', 'إفطار جماعي للأسر المتعففة', 'مأدبة إفطار رمضانية تجمع الأسر المتعففة في أجواء إيمانية روحانية مفعمة بالعطاء.', '22', 'مارس', '2026', '6:30 مساءً', 'صالة الجمعية الكبرى', 'إفطار', '/assets/support-2.jpg', 20),
  ('volunteer-day-2026', 'يوم تطوعي - تنظيف وصيانة', 'فعالية تطوعية مفتوحة للمشاركة في صيانة المساجد والمقابر وتنظيف المرافق العامة.', '08', 'يوليو', '2026', '7:00 - 11:00 صباحاً', 'مساجد ومقابر باربار', 'تطوعي', '/assets/support-3.jpg', 30),
  ('medical-day-2026', 'يوم طبي مجاني', 'فحوصات طبية مجانية بالتعاون مع نخبة من الأطباء المتطوعين لخدمة الأسر المحتاجة.', '20', 'سبتمبر', '2026', '9:00 صباحاً - 4:00 عصراً', 'العيادة المتنقلة - باربار', 'صحي', '/assets/intro-1.jpg', 40),
  ('orphans-trip-2026', 'رحلة ترفيهية للأيتام', 'رحلة ترفيهية وتعليمية للأطفال الأيتام تتضمن أنشطة تفاعلية ومسابقات وجوائز قيمة.', '12', 'أكتوبر', '2026', '8:00 صباحاً - 6:00 مساءً', 'حديقة المنطقة الشمالية', 'ترفيهي', '/assets/intro-2.jpg', 50),
  ('graduation-2026', 'حفل تكريم المتفوقين', 'حفل سنوي لتكريم الطلاب المتفوقين من أبناء الأسر المتعففة وتقديم منح دراسية لهم.', '03', 'نوفمبر', '2026', '7:00 مساءً', 'قاعة الفعاليات الرئيسية', 'تكريم', '/assets/hero-bg.jpg', 60)
on conflict (slug) do nothing;

-- ====================================================================
-- NEWS
-- ====================================================================

create table if not exists public.news (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text default '',
  category text not null,
  date date not null,
  image text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.news enable row level security;

drop policy if exists "news_select_public" on public.news;
create policy "news_select_public" on public.news
  for select
  using (true);

drop policy if exists "news_insert_auth" on public.news;
create policy "news_insert_auth" on public.news
  for insert
  to authenticated
  with check (true);

drop policy if exists "news_update_auth" on public.news;
create policy "news_update_auth" on public.news
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "news_delete_auth" on public.news;
create policy "news_delete_auth" on public.news
  for delete
  to authenticated
  using (true);

-- Storage bucket for uploaded news images
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

drop policy if exists "news_images_select_public" on storage.objects;
create policy "news_images_select_public" on storage.objects
  for select
  using (bucket_id = 'news-images');

drop policy if exists "news_images_insert_auth" on storage.objects;
create policy "news_images_insert_auth" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'news-images');

drop policy if exists "news_images_update_auth" on storage.objects;
create policy "news_images_update_auth" on storage.objects
  for update
  to authenticated
  using (bucket_id = 'news-images')
  with check (bucket_id = 'news-images');

drop policy if exists "news_images_delete_auth" on storage.objects;
create policy "news_images_delete_auth" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'news-images');

-- ====================================================================
-- TEAM (مجلس الإدارة / board members)
-- ====================================================================

create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  image text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.team_members enable row level security;

-- Public can read team members
drop policy if exists "team_select_public" on public.team_members;
create policy "team_select_public" on public.team_members
  for select
  using (true);

-- Only logged-in users (the admin) can write
drop policy if exists "team_insert_auth" on public.team_members;
create policy "team_insert_auth" on public.team_members
  for insert
  to authenticated
  with check (true);

drop policy if exists "team_update_auth" on public.team_members;
create policy "team_update_auth" on public.team_members
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "team_delete_auth" on public.team_members;
create policy "team_delete_auth" on public.team_members
  for delete
  to authenticated
  using (true);

-- Storage bucket for uploaded member photos
insert into storage.buckets (id, name, public)
values ('team-images', 'team-images', true)
on conflict (id) do nothing;

drop policy if exists "team_images_select_public" on storage.objects;
create policy "team_images_select_public" on storage.objects
  for select
  using (bucket_id = 'team-images');

drop policy if exists "team_images_insert_auth" on storage.objects;
create policy "team_images_insert_auth" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'team-images');

drop policy if exists "team_images_update_auth" on storage.objects;
create policy "team_images_update_auth" on storage.objects
  for update
  to authenticated
  using (bucket_id = 'team-images')
  with check (bucket_id = 'team-images');

drop policy if exists "team_images_delete_auth" on storage.objects;
create policy "team_images_delete_auth" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'team-images');

-- Seed with the current 9 board members.
-- Lowest sort_order is rendered as the highlighted chairman on the team page.
insert into public.team_members (name, role, image, sort_order)
select * from (values
  ('علي عبدالله سبت', 'رئيس مجلس الإدارة', '/assets/members/member-6.jpg', 10),
  ('السيد أحمد علوي المحافظة', 'نائب الرئيس / رئيس المشاريع والموارد المالية', '/assets/members/member-8.jpg', 20),
  ('مجدي عبدالوهاب الجمري', 'رئيس الأنشطة الاجتماعية', '/assets/members/member-3.jpg', 30),
  ('شوقي علي مكي', 'رئيس اللجنة الاجتماعية', '/assets/members/member-4.jpg', 40),
  ('السيد محمود علي المحافظة', 'نائب رئيس اللجنة الاجتماعية', '/assets/members/member-5.jpg', 50),
  ('يونس محمد حسن الشويخ', 'أمين السر', '/assets/members/member-7.jpg', 60),
  ('عبدالعزيز عبدالغني', 'الأمين المالي', '/assets/members/member-1.jpg', 70),
  ('السيد كميل عبدالله المحافظة', 'رئيس لجنة دعم الطالب', '/assets/members/member-2.jpg', 80),
  ('السيد أسامة عبدالجليل المحافظة', 'رئيس لجنة العلاقات العامة والإعلام', '/assets/members/member-9.jpg', 90)
) as seed(name, role, image, sort_order)
where not exists (select 1 from public.team_members);
