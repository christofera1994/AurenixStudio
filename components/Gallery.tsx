"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryItem as GalleryItemType } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function Gallery({ items }: { items: GalleryItemType[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const els = gridRef.current?.querySelectorAll(".gallery-item") ?? [];
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <h2 className="font-sans font-bold text-2xl md:text-4xl mb-4 text-primary">
          Showcase
        </h2>
        <p className="text-text-dark/70 mb-16 max-w-xl">
          Selected work and visual explorations.
        </p>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="gallery-item group rounded-[2rem] overflow-hidden border border-primary/10 bg-background shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-accent/30"
            >
              {item.media_type === "video" ? (
                <video
                  src={item.media_url}
                  className="w-full aspect-video object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.media_url}
                    alt={item.title ?? "Gallery item"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}
              {item.title && (
                <div className="p-4">
                  <p className="font-sans font-medium text-primary">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
