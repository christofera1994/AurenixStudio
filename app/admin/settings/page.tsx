"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [data, setData] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: res } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (res) setData(res);
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { id, ...payload } = data;
    const row = { ...payload, updated_at: new Date().toISOString() };
    const { error } = id
      ? await supabase.from("site_settings").update(row).eq("id", id)
      : await supabase.from("site_settings").insert(row);
    setSaving(false);
    if (error) setMessage(error.message);
    else setMessage("Saved.");
  };

  const update = (k: keyof SiteSettings, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  if (loading)
    return (
      <div className="p-8">
        <p className="text-white/60">Loading...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="text-accent hover:underline font-medium"
        >
          ← Dashboard
        </Link>
      </div>
      <h1 className="font-sans font-bold text-2xl mb-6 text-white">Site Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-4">
        {[
          ["brand_name", "Brand name"],
          ["tagline", "Tagline"],
          ["hero_line_1", "Hero line 1"],
          ["hero_line_2", "Hero line 2"],
          ["hero_background_image_url", "Hero background image URL"],
          ["cta_text", "CTA text"],
          ["philosophy_common", "Philosophy (common)"],
          ["philosophy_differentiated", "Philosophy (differentiated)"],
          ["philosophy_keyword", "Philosophy (keyword)"],
          ["philosophy_texture_url", "Philosophy texture image URL"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-white/70 mb-1">
              {label}
            </label>
            <input
              type="text"
              value={data[key as keyof SiteSettings] ?? ""}
              onChange={(e) => update(key as keyof SiteSettings, e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-sans placeholder:text-white/40"
            />
          </div>
        ))}
        </div>
        {message && (
          <p className={message === "Saved." ? "text-emerald-400" : "text-amber-400"}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="mt-4 px-6 py-2.5 rounded-full bg-accent text-primary font-semibold disabled:opacity-60 hover:bg-accent/90 transition-colors"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
