-- Run after 001 schema. Creates gallery_items and documents Storage bucket.
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  media_type text default 'image',
  media_url text not null,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table gallery_items enable row level security;

drop policy if exists "Public read gallery_items" on gallery_items;
drop policy if exists "Auth write gallery_items" on gallery_items;
create policy "Public read gallery_items" on gallery_items for select using (true);
create policy "Auth write gallery_items" on gallery_items for all using (auth.role() = 'authenticated');

-- Storage: Create a PUBLIC bucket named "site-media" in Supabase Dashboard > Storage.
-- Add policy: Allow authenticated uploads, public read.
