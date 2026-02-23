"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import type { GalleryItem } from "@/lib/types";

const BUCKET = "site-media";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery_items")
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
        .from("gallery_items")
        .update({ order_index: item.order_index })
        .eq("id", item.id);
    }
    setItems(copy);
  };

  const addByUrl = async () => {
    if (!url.trim()) return;
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.from("gallery_items").insert({
      title: title.trim() || null,
      media_type: mediaType,
      media_url: url.trim(),
      order_index: items.length,
    });
    if (error) setMessage(error.message);
    else { setMessage("Added."); setUrl(""); setTitle(""); load(); }
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage("");
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      setMessage(uploadErr.message + " (Create public bucket 'site-media' in Supabase Storage)");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const type = file.type.startsWith("video") ? "video" : "image";

    const { error: insertErr } = await supabase.from("gallery_items").insert({
      title: title.trim() || null,
      media_type: type,
      media_url: urlData.publicUrl,
      order_index: items.length,
    });

    setUploading(false);
    e.target.value = "";
    setTitle("");
    if (insertErr) setMessage(insertErr.message);
    else { setMessage("Uploaded."); load(); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    const supabase = createClient();
    await supabase.from("gallery_items").delete().eq("id", id);
    load();
  };

  if (loading)
    return (
      <div className="p-8">
        <p className="text-white/70">Loading...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin" className="text-accent hover:underline font-medium mb-6 inline-block">
        ← Dashboard
      </Link>
      <h1 className="font-sans font-bold text-2xl mb-6">Gallery</h1>
      {message && (
        <p className={`mb-4 ${message.includes("Added") || message.includes("Uploaded") ? "text-emerald-400" : "text-amber-400"}`}>
          {message}
        </p>
      )}

      <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-4">Add by URL</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Image or video URL"
          className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-3"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-3"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as "image" | "video")}
          className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-4"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button
          onClick={addByUrl}
          className="px-4 py-2 rounded-full bg-accent text-primary font-medium"
        >
          Add
        </button>
      </div>

      <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-4">Upload file</h3>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={uploadFile}
          disabled={uploading}
          className="block mb-4"
        />
        {uploading && <p className="text-sm text-white/60">Uploading...</p>}
        <p className="text-xs text-white/50">Requires public bucket &quot;site-media&quot; in Supabase Storage.</p>
      </div>

      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex flex-col">
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
            {item.media_type === "video" ? (
              <video
                src={item.media_url}
                className="w-24 h-16 object-cover rounded-lg"
                muted
                playsInline
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.title ?? ""}
                className="w-24 h-16 object-cover rounded-lg"
              />
            )}
            <span className="flex-1 truncate text-sm">{item.title || item.media_url}</span>
            <button
              onClick={() => del(item.id)}
              className="text-rose-400 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
