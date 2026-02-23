"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/nav", label: "Nav Links" },
  { href: "/admin/features", label: "Features" },
  { href: "/admin/protocol", label: "Protocol" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/pricing", label: "Pricing" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isLogin = path === "/admin/login";

  if (isLogin) {
    return <div className="min-h-screen bg-[#0a0a0e]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0e] flex">
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
        {children}
      </main>
    </div>
  );
}
