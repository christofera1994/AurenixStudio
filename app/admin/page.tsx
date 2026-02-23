"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.replace("/admin/login");
    };
    check();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-sans font-bold text-2xl mb-2 text-white">Dashboard</h1>
      <p className="text-white/60 mb-8">
        Manage site content. Edits reflect on the live site.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/settings"
          className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/[0.07] transition-all"
        >
          <span className="font-semibold text-white">Settings</span>
          <p className="text-sm text-white/50 mt-1">
            Brand, hero, philosophy, CTA
          </p>
        </Link>
        <Link
          href="/admin/nav"
          className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/[0.07] transition-all"
        >
          <span className="font-semibold text-white">Nav Links</span>
          <p className="text-sm text-white/50 mt-1">
            Add, edit, reorder navigation
          </p>
        </Link>
        <Link
          href="/admin/features"
          className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/[0.07] transition-all"
        >
          <span className="font-semibold text-white">Features</span>
          <p className="text-sm text-white/50 mt-1">
            Feature cards (Shuffler, Typewriter, Scheduler)
          </p>
        </Link>
        <Link
          href="/admin/protocol"
          className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/[0.07] transition-all"
        >
          <span className="font-semibold text-white">Protocol</span>
          <p className="text-sm text-white/50 mt-1">
            Protocol steps with animations
          </p>
        </Link>
        <Link
          href="/admin/gallery"
          className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/[0.07] transition-all"
        >
          <span className="font-semibold text-white">Gallery</span>
          <p className="text-sm text-white/50 mt-1">
            Images & videos, upload or paste URL
          </p>
        </Link>
        <Link
          href="/admin/pricing"
          className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/[0.07] transition-all"
        >
          <span className="font-semibold text-white">Pricing</span>
          <p className="text-sm text-white/50 mt-1">
            Pricing tiers
          </p>
        </Link>
      </div>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-accent text-primary font-medium hover:bg-accent/90 transition-colors"
        >
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
