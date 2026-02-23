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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
      // close menu when user scrolls
      if (open) setOpen(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const brand = settings?.brand_name ?? "AURENIX";

  const navShell = `fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
    scrolled
      ? "bg-background/60 backdrop-blur-xl border border-primary/10 text-primary shadow-lg"
      : "bg-transparent text-white"
  }`;

  return (
    <nav className={navShell}>
      {/* Pill */}
      <div className="px-4 sm:px-6 py-3 rounded-full">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="font-bold tracking-tight text-lg link-lift">
            {brand}
          </Link>

          {/* Desktop links */}
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

          {/* Desktop CTA */}
          <Link
            href="#pricing"
            className="hidden sm:inline-flex ml-auto px-4 py-2 rounded-full bg-accent text-primary font-semibold text-sm btn-magnetic overflow-hidden relative group"
          >
            <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">{ctaText}</span>
          </Link>

          {/* Mobile button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden ml-auto px-3 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md link-lift"
          >
            <span className="text-sm font-semibold">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="sm:hidden mt-2 px-3 pb-3">
          <div className="rounded-3xl border border-white/10 bg-background/70 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="p-3 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-2xl text-sm font-semibold opacity-90 hover:opacity-100 hover:bg-white/5 transition link-lift"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-2xl bg-accent text-primary font-semibold text-sm btn-magnetic overflow-hidden relative group text-center"
              >
                <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">{ctaText}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
