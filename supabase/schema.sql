-- Run this in Supabase SQL Editor to set up the schema
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text default 'AURENIX',
  tagline text,
  hero_line_1 text,
  hero_line_2 text,
  hero_background_image_url text,
  cta_text text,
  philosophy_common text,
  philosophy_differentiated text,
  philosophy_keyword text,
  philosophy_texture_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists features (
  id uuid primary key default gen_random_uuid(),
  heading text, descriptor text, value_prop text,
  sub_labels text[] default '{}', order_index int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists protocol_steps (
  id uuid primary key default gen_random_uuid(),
  step_number int, title text, description text, order_index int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  name text, price text, description text, features text[] default '{}',
  highlighted boolean default false, order_index int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists nav_links (
  id uuid primary key default gen_random_uuid(),
  label text, href text, order_index int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  media_type text default 'image',
  media_url text not null,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;
alter table features enable row level security;
alter table protocol_steps enable row level security;
alter table pricing_tiers enable row level security;
alter table nav_links enable row level security;
alter table gallery_items enable row level security;

drop policy if exists "Public read site_settings" on site_settings;
drop policy if exists "Auth write site_settings" on site_settings;
create policy "Public read site_settings" on site_settings for select using (true);
create policy "Auth write site_settings" on site_settings for all using (auth.role() = 'authenticated');

drop policy if exists "Public read features" on features;
drop policy if exists "Auth write features" on features;
create policy "Public read features" on features for select using (true);
create policy "Auth write features" on features for all using (auth.role() = 'authenticated');

drop policy if exists "Public read protocol_steps" on protocol_steps;
drop policy if exists "Auth write protocol_steps" on protocol_steps;
create policy "Public read protocol_steps" on protocol_steps for select using (true);
create policy "Auth write protocol_steps" on protocol_steps for all using (auth.role() = 'authenticated');

drop policy if exists "Public read pricing_tiers" on pricing_tiers;
drop policy if exists "Auth write pricing_tiers" on pricing_tiers;
create policy "Public read pricing_tiers" on pricing_tiers for select using (true);
create policy "Auth write pricing_tiers" on pricing_tiers for all using (auth.role() = 'authenticated');

drop policy if exists "Public read nav_links" on nav_links;
drop policy if exists "Auth write nav_links" on nav_links;
create policy "Public read nav_links" on nav_links for select using (true);
create policy "Auth write nav_links" on nav_links for all using (auth.role() = 'authenticated');

drop policy if exists "Public read gallery_items" on gallery_items;
drop policy if exists "Auth write gallery_items" on gallery_items;
create policy "Public read gallery_items" on gallery_items for select using (true);
create policy "Auth write gallery_items" on gallery_items for all using (auth.role() = 'authenticated');

insert into site_settings (brand_name, tagline, hero_line_1, hero_line_2, hero_background_image_url, cta_text, philosophy_common, philosophy_differentiated, philosophy_keyword, philosophy_texture_url)
select 'AURENIX', 'Precision-engineered cinematic interfaces for visionary brands.', 'Craft meets', 'precision.', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80', 'Access the Experience', 'Most studios focus on: templated solutions and generic UX.', 'We focus on:', 'precision-engineered cinematic interfaces.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60'
where not exists (select 1 from site_settings limit 1);

insert into features (heading, descriptor, value_prop, sub_labels, order_index)
select 'Ultra-Refined Visual Systems', 'Design tokens and component libraries built for consistency at scale.', 'Visual Systems', array['Typography','Color Systems','Spacing Grids'], 0
where not exists (select 1 from features limit 1)
union all select 'Cinematic Interaction Engineering', 'Every scroll and transition weighted for narrative impact.', 'Interaction', array['Scroll choreography','Micro-interactions','Motion design'], 1
where not exists (select 1 from features limit 1)
union all select 'Precision-Tuned Interface Architecture', 'Modular, performant systems ready for complex workflows.', 'Architecture', array['Component Library','API Design','Performance'], 2
where not exists (select 1 from features limit 1);

insert into protocol_steps (step_number, title, description, order_index)
select 1, 'Discovery & Strategy', 'We map your vision to technical requirements and define the experience architecture.', 0
where not exists (select 1 from protocol_steps limit 1)
union all select 2, 'Design System Synthesis', 'Visual identity and interaction patterns crystallized into a reusable design language.', 1
where not exists (select 1 from protocol_steps limit 1)
union all select 3, 'Precision Build & Delivery', 'Engineering meets craft. Your digital instrument shipped with documentation and support.', 2
where not exists (select 1 from protocol_steps limit 1);

insert into pricing_tiers (name, price, description, features, highlighted, order_index)
select 'Essential', 'Custom', 'For brands ready to elevate their digital presence.', array['Strategy workshop','Design system','Landing experience'], false, 0
where not exists (select 1 from pricing_tiers limit 1)
union all select 'Performance', 'Custom', 'Full cinematic experience with advanced interactions.', array['Everything in Essential','Multi-page experiences','CMS integration','Ongoing support'], true, 1
where not exists (select 1 from pricing_tiers limit 1)
union all select 'Enterprise', 'Custom', 'Bespoke systems for the most demanding visionaries.', array['Everything in Performance','Custom integrations','Dedicated team','SLA & priority support'], false, 2
where not exists (select 1 from pricing_tiers limit 1);

insert into nav_links (label, href, order_index)
select 'Features', '#features', 0 where not exists (select 1 from nav_links limit 1)
union all select 'Philosophy', '#philosophy', 1 where not exists (select 1 from nav_links limit 1)
union all select 'Protocol', '#protocol', 2 where not exists (select 1 from nav_links limit 1)
union all select 'Gallery', '#gallery', 3 where not exists (select 1 from nav_links limit 1)
union all select 'Pricing', '#pricing', 4 where not exists (select 1 from nav_links limit 1);
