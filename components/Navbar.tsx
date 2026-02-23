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
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const brand = settings?.brand_name ?? "AURENIX";

  const shell = `fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
    scrolled
      ? "bg-background/60 backdrop-blur-xl border border-primary/10 text-primary"
      : "bg-transparent text-white"
  }`;

  return (
    <nav className={shell}>
      {/* ONE continuous floating island */}
      <div
        className={[
          "px-4 sm:px-6 py-3 transition-all duration-300",
          "border border-white/10",
          open ? "rounded-3xl" : "rounded-full",
          scrolled ? "" : "border-transparent",
        ].join(" ")}
      >
        {/* top row */}
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

          {/* Mobile controls (stay inside pill) */}
          <div className="sm:hidden ml-auto flex items-center gap-2">
            <Link
              href="#pricing"
              className="px-3 py-2 rounded-full bg-accent text-primary font-semibold text-xs btn-magnetic overflow-hidden relative group"
              onClick={() => setOpen(false)}
            >
              <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">CTA</span>
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="px-3 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-md link-lift"
            >
              <span className="text-sm font-semibold">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* mobile menu area that grows from the same island */}
        {open && (
          <div className="sm:hidden mt-3 pt-3 border-t border-white/10">
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-2xl text-sm font-semibold opacity-90 hover:opacity-100 hover:bg-white/5 transition link-lift"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 px-3 py-3 rounded-2xl bg-accent text-primary font-semibold text-sm btn-magnetic overflow-hidden relative group text-center"
              >
                <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">{ctaText}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
