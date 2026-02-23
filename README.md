# AURENIX

A luxury-grade digital experience studio landing page. Built with Next.js, Tailwind, GSAP, and Supabase.

## Quick Start

```bash
npm install
npm run dev
```

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local` and add your project URL and anon key
3. Run `supabase/schema.sql` in the Supabase SQL Editor
4. Create an admin user in Supabase Auth (Authentication > Users > Add user)
5. **Gallery uploads (optional):** Create a **public** bucket named `site-media` in Storage. Admin can then upload images/videos; otherwise use URLs.

## Features

- **Hero**: Animated aurora background (pure CSS, zero credits)
- **Features**: Shuffler, Typewriter, Scheduler cards
- **Philosophy**: Parallax manifesto section
- **Protocol**: Stacking scroll cards with SVG animations
- **Pricing**: Three-tier membership grid
- **Gallery**: Showcase with images/videos (URL or upload)
- **Admin**: `/admin` for content management (requires Supabase)

## Stack

- Next.js 14 (App Router)
- Tailwind CSS 3.4
- GSAP + ScrollTrigger
- Lucide React
- Supabase (optional)
