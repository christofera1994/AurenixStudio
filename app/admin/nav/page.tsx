"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import type { NavLink } from "@/lib/types";

export default function AdminNavPage() {
  const [items, setItems] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("nav_links")
      .select("*")
      .order("order_index");
    setItems(data ?? []);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const move = async (idx: number, dir: number) => {
    const next = idx + dir;
    if (next < 0 || next >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[next]] = [copy[next], copy[idx]];
    copy.forEach((item, i) => (item.order_index = i));
    const supabase = createClient();
    for (const item of copy) {
      await supabase.from("nav_links").update({ order_index: item.order_index }).eq("id", item.id);
    }
    setItems(copy);
  };

  const save = async (item: NavLink) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("nav_links")
      .update({ label: item.label, href: item.href })
      .eq("id", item.id);
    setEditing(null);
    if (error) setMessage(error.message);
    else { setMessage("Saved."); load(); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    const supabase = createClient();
    await supabase.from("nav_links").delete().eq("id", id);
    load();
  };

  const add = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("nav_links")
      .insert({
        label: "New Link",
        href: "#",
        order_index: items.length,
      })
      .select()
      .single();
    if (data) setItems([...items, data]);
  };

  if (loading)
    return (
      <div className="p-8">
        <p className="text-white/60">Loading...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-accent hover:underline font-medium">
          ← Dashboard
        </Link>
      </div>
      <h1 className="font-sans font-bold text-2xl mb-6 text-white">Nav Links</h1>
      {message && <p className="mb-4 text-emerald-400">{message}</p>}
      <button
        onClick={add}
        className="mb-6 px-4 py-2 rounded-full bg-accent text-primary font-medium btn-magnetic"
      >
        Add Link
      </button>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={item.id}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className="text-white/60 hover:text-accent disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(idx, 1)}
                disabled={idx === items.length - 1}
                className="text-white/60 hover:text-accent disabled:opacity-30"
              >
                ↓
              </button>
            </div>
            {editing === item.id ? (
              <>
                <input
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
                  value={item.label}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) =>
                        x.id === item.id ? { ...x, label: e.target.value } : x
                      )
                    )}
                />
                <input
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
                  value={item.href}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) =>
                        x.id === item.id ? { ...x, href: e.target.value } : x
                      )
                    )}
                />
                <button
                  onClick={() => save(item)}
                  className="px-3 py-1 rounded-full bg-accent text-primary text-sm"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 font-medium text-white">{item.label}</span>
                <span className="flex-1 text-sm text-white/50 truncate">{item.href}</span>
                <button
                  onClick={() => setEditing(item.id)}
                  className="text-accent hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
