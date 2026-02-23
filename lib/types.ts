export interface SiteSettings {
  id: string;
  brand_name: string;
  tagline: string;
  hero_line_1: string;
  hero_line_2: string;
  hero_background_image_url: string;
  cta_text: string;
  philosophy_common: string;
  philosophy_differentiated: string;
  philosophy_keyword: string;
  philosophy_texture_url: string;
}

export interface Feature {
  id: string;
  heading: string;
  descriptor: string;
  value_prop: string;
  sub_labels: string[];
  order_index: number;
}

export interface ProtocolStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  order_index: number;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
  order_index: number;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  media_type: "image" | "video";
  media_url: string;
  order_index: number;
}
