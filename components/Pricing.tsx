"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import type { PricingTier } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function Pricing({
  tiers,
  ctaText,
}: {
  tiers: PricingTier[];
  ctaText: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [tiers]);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 px-6 sm:px-10 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans font-bold text-2xl md:text-3xl mb-12 text-primary">
          Membership
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`rounded-[2rem] p-8 border transition-all ${
                tier.highlighted
                  ? "bg-primary text-white scale-[1.02] md:scale-105 ring-2 ring-accent"
                  : "bg-background border-primary/10"
              }`}
            >
              <h3 className="font-sans font-bold text-xl">{tier.name}</h3>
              <p
                className={`text-2xl font-bold mt-2 ${
                  tier.highlighted ? "text-accent" : "text-primary"
                }`}
              >
                {tier.price}
              </p>
              <p
                className={`text-sm mt-2 ${
                  tier.highlighted ? "text-white/80" : "text-text-dark/80"
                }`}
              >
                {tier.description}
              </p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f, j) => (
                  <li
                    key={j}
                    className={`flex items-center gap-2 text-sm ${
                      tier.highlighted ? "text-white/90" : "text-text-dark"
                    }`}
                  >
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex justify-center w-full py-3 rounded-full font-semibold btn-magnetic overflow-hidden relative group ${
                  tier.highlighted
                    ? "bg-accent text-primary"
                    : "bg-primary text-white"
                }`}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">{ctaText}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
