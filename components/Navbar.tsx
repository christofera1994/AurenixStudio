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
    const handler = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const brand = settings?.brand_name ?? "AURENIX";

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl border border-primary/10 text-primary"
          : "bg-transparent text-white"
      } ${
        // Desktop = always pill. Mobile = dynamic pill that can expand
        open ? "rounded-3xl" : "rounded-full"
      }`}
      style={{
        // Mobile: keep it inside screen. Desktop: size-to-content.
        width: open ? "calc(100vw - 1.25rem)" : "auto",
        maxWidth: open ? "520px" : "none",
      }}
    >
      {/* Desktop layout (your original) */}
      <div className="hidden sm:flex items-center gap-8 px-6 py-3">
        <Link href="/" className="font-bold tracking-tight text-lg link-lift">
          {brand}
        </Link>

        <div className="flex items-center gap-6">
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

        <Link
          href="#pricing"
          className="ml-auto px-4 py-2 rounded-full bg-accent text-primary font-semibold text-sm btn-magnetic overflow-hidden relative group"
        >
          <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative">{ctaText}</span>
        </Link>
      </div>

      {/* Mobile dynamic island */}
      <div className="sm:hidden px-3 py-2.5">
        {/* Top row: compact island */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-bold tracking-tight text-base link-lift whitespace-nowrap"
            onClick={() => setOpen(false)}
          >
            {brand}
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto px-3 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-md link-lift"
          >
            <span className="text-sm font-semibold">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Expanded content inside same island */}
        {open && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-semibold opacity-90 hover:opacity-100 hover:bg-white/10 transition link-lift"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-3 w-full inline-flex justify-center px-4 py-3 rounded-2xl bg-accent text-primary font-semibold text-sm btn-magnetic overflow-hidden relative group"
            >
              <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">{ctaText}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
