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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl border border-primary/10 text-primary"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center gap-4 sm:gap-8">
        <Link href="/" className="font-bold tracking-tight text-lg link-lift whitespace-nowrap">
          {brand}
        </Link>

        {/* DESKTOP LINKS (original behavior) */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-sm font-medium opacity-90 hover:opacity-100 link-lift"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE LINKS (NEW): visible on phone, horizontal scroll inside the same pill */}
        <div className="sm:hidden flex-1 overflow-x-auto">
          <div className="flex items-center gap-3 pr-2">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-xs font-semibold opacity-90 hover:opacity-100 link-lift whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="#pricing"
          className="ml-auto px-4 py-2 rounded-full bg-accent text-primary font-semibold text-sm btn-magnetic overflow-hidden relative group whitespace-nowrap"
        >
          <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative">{ctaText}</span>
        </Link>
      </div>
    </nav>
  );
}
