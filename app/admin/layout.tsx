"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/nav", label: "Nav Links" },
  { href: "/admin/features", label: "Features" },
  { href: "/admin/protocol", label: "Protocol" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/pricing", label: "Pricing" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const isLogin = path === "/admin/login";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // close mobile menu when route changes
    setOpen(false);
  }, [path]);

  if (isLogin) {
    return <div className="min-h-screen bg-[#0a0a0e]">{children}</div>;
  }

  const activeLabel = nav.find((x) => x.href === path)?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-white">
      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0e]/70 backdrop-blur-xl">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link href="/admin" className="font-bold tracking-tight">
            AURENIX
          </Link>

          <span className="text-xs text-white/50">/ {activeLabel}</span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto px-3 py-2 rounded-xl border border-white/10 bg-white/5"
            aria-label="Toggle admin menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="px-4 pb-4">
            <nav className="rounded-2xl border border-white/10 bg-white/5 p-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    path === item.href
                      ? "bg-accent/20 text-accent"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-white/10">
                <Link
                  href="/"
                  className="block px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/5"
                >
                  View Site →
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Layout (sidebar stays) */}
      <div className="hidden md:flex min-h-screen">
        <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="text-lg font-bold text-white tracking-tight">
              AURENIX
            </Link>
            <p className="text-xs text-white/50 mt-1">Admin</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  path === item.href
                    ? "bg-accent/20 text-accent"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Link
              href="/"
              className="block px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5"
            >
              View Site →
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-6 py-6">{children}</div>
        </main>
      </div>

      {/* Mobile Content Area */}
      <main className="md:hidden">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
