"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import type { ProtocolStep } from "@/lib/types";

export default function AdminProtocolPage() {
  const [items, setItems] = useState<ProtocolStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("protocol_steps")
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
      await supabase
        .from("protocol_steps")
        .update({ order_index: item.order_index })
        .eq("id", item.id);
    }
    setItems(copy);
  };

  const save = async (item: ProtocolStep) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("protocol_steps")
      .update({
        step_number: item.step_number,
        title: item.title,
        description: item.description,
      })
      .eq("id", item.id);
    if (error) setMessage(error.message);
    else { setMessage("Saved."); load(); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    const supabase = createClient();
    await supabase.from("protocol_steps").delete().eq("id", id);
    load();
  };

  const add = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("protocol_steps")
      .insert({
        step_number: items.length + 1,
        title: "New Step",
        description: "Description",
        order_index: items.length,
      })
      .select()
      .single();
    if (data) setItems([...items, data]);
  };

  const updateItem = (id: string, fn: (p: ProtocolStep) => ProtocolStep) =>
    setItems((prev) => prev.map((x) => (x.id === id ? fn(x) : x)));

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
      <h1 className="font-sans font-bold text-2xl mb-6 text-white">Protocol Steps</h1>
      {message && <p className="mb-4 text-emerald-400">{message}</p>}
      <button
        onClick={add}
        className="mb-6 px-4 py-2 rounded-full bg-accent text-primary font-medium btn-magnetic"
      >
        Add Step
      </button>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li
            key={item.id}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-0">
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
              <div className="flex-1 space-y-2">
                <input
                  type="number"
                  className="w-16 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white"
                  value={item.step_number}
                  onChange={(e) =>
                    updateItem(item.id, (p) => ({
                      ...p,
                      step_number: parseInt(e.target.value, 10) || 1,
                    }))
                  }
                  placeholder="Step #"
                />
                <input
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
                  value={item.title}
                  onChange={(e) =>
                    updateItem(item.id, (p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Title"
                />
                <textarea
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, (p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Description"
                  rows={2}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => save(item)}
                    className="px-3 py-1 rounded-full bg-accent text-primary text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => del(item.id)}
                    className="px-3 py-1 text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
