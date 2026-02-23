"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { SiteSettings } from "@/lib/types";

export function Hero({ settings }: { settings: SiteSettings | null }) {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const line1 = settings?.hero_line_1 ?? "Craft meets";
  const line2 = settings?.hero_line_2 ?? "precision.";
  const ctaText = settings?.cta_text ?? "Access the Experience";
  const heroBg =
    settings?.hero_background_image_url ??
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80";

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        line2Ref.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [line1, line2, ctaText]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100dvh] flex flex-col justify-end overflow-hidden rounded-b-[3rem] bg-primary"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Animated aurora orbs — pure CSS, zero credits */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="hero-aurora-orb animate-aurora-1 w-[min(80vw,520px)] h-[min(80vw,520px)] -top-[20%] -right-[15%]"
          style={{
            background:
              "radial-gradient(circle, rgba(201, 168, 76, 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-aurora-orb animate-aurora-2 w-[min(70vw,420px)] h-[min(70vw,420px)] top-[30%] -left-[10%]"
          style={{
            background:
              "radial-gradient(circle, rgba(42, 42, 53, 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-aurora-orb animate-aurora-3 w-[min(60vw,380px)] h-[min(60vw,380px)] top-[50%] right-[10%]"
          style={{
            background:
              "radial-gradient(circle, rgba(201, 168, 76, 0.25) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/50" />
      <div className="relative z-10 px-6 sm:px-10 pb-[20dvh] max-w-4xl">
        <p className="text-white/70 text-sm font-mono tracking-widest uppercase mb-4">
          Luxury digital experience studio
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white mb-2">
          <span ref={line1Ref} className="block">
            {line1}
          </span>
          <span
            ref={line2Ref}
            className="block font-drama italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-accent mt-2"
          >
            {line2}
          </span>
        </h1>
        <div ref={ctaRef} className="mt-8">
          <Link
            href="#pricing"
            className="inline-flex items-center px-6 py-3 rounded-full bg-accent text-primary font-semibold tracking-tight btn-magnetic overflow-hidden relative group"
          >
            <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">{ctaText}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
