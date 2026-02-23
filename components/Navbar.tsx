"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteSettings, NavLink as NavLinkType } from "@/lib/types";

export function Navbar({
  settings,
  links,
  ctaText,
}: {
  settings: SiteSettings | null;
  links: NavLinkType[];
  ctaText: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const brand = settings?.brand_name ?? "AURENIX";

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full transition-all duration-500
      w-[calc(100vw-1.25rem)] sm:w-auto
      px-3 sm:px-6 py-3
      ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl border border-primary/10 text-primary"
          : "bg-transparent text-white"
      }`}
    >
      {/* allow wrapping on mobile, single row on desktop */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-8 min-w-0">
        <Link
          href="/"
          className="font-bold tracking-tight text-base sm:text-lg link-lift whitespace-nowrap"
        >
          {brand}
        </Link>

        {/* links: wrap on mobile, normal row on desktop */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-6 min-w-0">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-xs sm:text-sm font-medium opacity-90 hover:opacity-100 link-lift whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA: on mobile goes to next line if needed, on desktop stays right */}
        <Link
          href="#pricing"
          className="sm:ml-auto px-3 sm:px-4 py-2 rounded-full bg-accent text-primary font-semibold text-xs sm:text-sm btn-magnetic overflow-hidden relative group whitespace-nowrap"
        >
          <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative">{ctaText}</span>
        </Link>
      </div>
    </nav>
  );
}
