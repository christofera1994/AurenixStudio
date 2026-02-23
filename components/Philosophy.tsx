"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SiteSettings } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy({ settings }: { settings: SiteSettings | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const keywordRef = useRef<HTMLSpanElement>(null);

  const common = settings?.philosophy_common ?? "Most studios focus on: templated solutions and generic UX.";
  const differentiated = settings?.philosophy_differentiated ?? "We focus on:";
  const keyword = settings?.philosophy_keyword ?? "precision-engineered cinematic interfaces.";
  const textureUrl =
    settings?.philosophy_texture_url ??
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60";

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line1Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        line2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line2Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        keywordRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          scrollTrigger: {
            trigger: keywordRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [common, differentiated, keyword]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 px-6 sm:px-10 bg-primary overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${textureUrl})` }}
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          ref={line1Ref}
          className="text-white/70 text-lg md:text-xl mb-8"
        >
          {common}
        </p>
        <p ref={line2Ref} className="text-white text-2xl md:text-3xl mb-4">
          {differentiated}{" "}
          <span
            ref={keywordRef}
            className="font-drama italic text-accent text-3xl md:text-5xl"
          >
            {keyword}
          </span>
        </p>
      </div>
    </section>
  );
}
