"use client";

import Link from "next/link";
import type { SiteSettings, NavLink } from "@/lib/types";

export function Footer({
  settings,
  navLinks,
}: {
  settings: SiteSettings | null;
  navLinks: NavLink[];
}) {
  const brand = settings?.brand_name ?? "AURENIX";
  const tagline = settings?.tagline ?? "Precision-engineered cinematic interfaces.";

  return (
    <footer className="bg-primary rounded-t-[4rem] py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-sans font-bold text-xl text-white">{brand}</h3>
            <p className="text-white/70 text-sm mt-2">{tagline}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-white/60">
                System Operational
              </span>
            </div>
          </div>
          <div className="md:col-span-3 flex flex-wrap gap-8 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-white/70 hover:text-white text-sm link-lift"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-white/50 hover:text-white/70 text-sm link-lift"
            >
              Admin
            </Link>
            <Link
              href="#"
              className="text-white/50 hover:text-white/70 text-sm link-lift"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-white/50 hover:text-white/70 text-sm link-lift"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
