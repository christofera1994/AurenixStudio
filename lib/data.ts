import { createClient } from "@supabase/supabase-js";
import type {
  SiteSettings,
  Feature,
  ProtocolStep,
  PricingTier,
  NavLink,
  GalleryItem,
} from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const DEFAULT_SETTINGS: SiteSettings = {
  id: "default",
  brand_name: "AURENIX",
  tagline: "Precision-engineered cinematic interfaces for visionary brands.",
  hero_line_1: "Craft meets",
  hero_line_2: "precision.",
  hero_background_image_url:
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80",
  cta_text: "Access the Experience",
  philosophy_common: "Most studios focus on: templated solutions and generic UX.",
  philosophy_differentiated: "We focus on:",
  philosophy_keyword: "precision-engineered cinematic interfaces.",
  philosophy_texture_url:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60",
};

const DEFAULT_FEATURES: Feature[] = [
  {
    id: "1",
    heading: "Ultra-Refined Visual Systems",
    descriptor: "Design tokens and component libraries built for consistency at scale.",
    value_prop: "Visual Systems",
    sub_labels: ["Typography", "Color Systems", "Spacing Grids"],
    order_index: 0,
  },
  {
    id: "2",
    heading: "Cinematic Interaction Engineering",
    descriptor: "Every scroll and transition weighted for narrative impact.",
    value_prop: "Interaction",
    sub_labels: ["Scroll choreography", "Micro-interactions", "Motion design"],
    order_index: 1,
  },
  {
    id: "3",
    heading: "Precision-Tuned Interface Architecture",
    descriptor: "Modular, performant systems ready for complex workflows.",
    value_prop: "Architecture",
    sub_labels: ["Component Library", "API Design", "Performance"],
    order_index: 2,
  },
];

const DEFAULT_PROTOCOL: ProtocolStep[] = [
  {
    id: "1",
    step_number: 1,
    title: "Discovery & Strategy",
    description:
      "We map your vision to technical requirements and define the experience architecture.",
    order_index: 0,
  },
  {
    id: "2",
    step_number: 2,
    title: "Design System Synthesis",
    description:
      "Visual identity and interaction patterns are crystallized into a reusable design language.",
    order_index: 1,
  },
  {
    id: "3",
    step_number: 3,
    title: "Precision Build & Delivery",
    description:
      "Engineering meets craft. Your digital instrument is shipped with documentation and support.",
    order_index: 2,
  },
];

const DEFAULT_PRICING: PricingTier[] = [
  {
    id: "1",
    name: "Essential",
    price: "Custom",
    description: "For brands ready to elevate their digital presence.",
    features: ["Strategy workshop", "Design system", "Landing experience"],
    highlighted: false,
    order_index: 0,
  },
  {
    id: "2",
    name: "Performance",
    price: "Custom",
    description: "Full cinematic experience with advanced interactions.",
    features: [
      "Everything in Essential",
      "Multi-page experiences",
      "CMS integration",
      "Ongoing support",
    ],
    highlighted: true,
    order_index: 1,
  },
  {
    id: "3",
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke systems for the most demanding visionaries.",
    features: [
      "Everything in Performance",
      "Custom integrations",
      "Dedicated team",
      "SLA & priority support",
    ],
    highlighted: false,
    order_index: 2,
  },
];

const DEFAULT_NAV: NavLink[] = [
  { id: "1", label: "Features", href: "#features", order_index: 0 },
  { id: "2", label: "Philosophy", href: "#philosophy", order_index: 1 },
  { id: "3", label: "Protocol", href: "#protocol", order_index: 2 },
  { id: "4", label: "Gallery", href: "#gallery", order_index: 3 },
  { id: "5", label: "Pricing", href: "#pricing", order_index: 4 },
];

const DEFAULT_GALLERY: GalleryItem[] = [];

export interface SiteContent {
  settings: SiteSettings | null;
  features: Feature[];
  protocolSteps: ProtocolStep[];
  pricingTiers: PricingTier[];
  navLinks: NavLink[];
  galleryItems: GalleryItem[];
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!supabase) {
    return {
      settings: DEFAULT_SETTINGS,
      features: DEFAULT_FEATURES,
      protocolSteps: DEFAULT_PROTOCOL,
      pricingTiers: DEFAULT_PRICING,
      navLinks: DEFAULT_NAV,
      galleryItems: DEFAULT_GALLERY,
    };
  }

  try {
    const [
      settingsRes,
      featuresRes,
      protocolRes,
      pricingRes,
      navRes,
      galleryRes,
    ] = await Promise.all([
        supabase.from("site_settings").select("*").limit(1).maybeSingle(),
        supabase.from("features").select("*").order("order_index"),
        supabase.from("protocol_steps").select("*").order("order_index"),
        supabase.from("pricing_tiers").select("*").order("order_index"),
        supabase.from("nav_links").select("*").order("order_index"),
        supabase.from("gallery_items").select("*").order("order_index"),
      ]);

    return {
      settings: settingsRes.data ?? DEFAULT_SETTINGS,
      features: featuresRes.data ?? DEFAULT_FEATURES,
      protocolSteps: protocolRes.data ?? DEFAULT_PROTOCOL,
      pricingTiers: pricingRes.data ?? DEFAULT_PRICING,
      navLinks: navRes.data ?? DEFAULT_NAV,
      galleryItems: galleryRes.data ?? DEFAULT_GALLERY,
    };
  } catch {
    return {
      settings: DEFAULT_SETTINGS,
      features: DEFAULT_FEATURES,
      protocolSteps: DEFAULT_PROTOCOL,
      pricingTiers: DEFAULT_PRICING,
      navLinks: DEFAULT_NAV,
      galleryItems: DEFAULT_GALLERY,
    };
  }
}
