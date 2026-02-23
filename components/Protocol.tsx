"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProtocolStep } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function Protocol({ steps }: { steps: ProtocolStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || steps.length === 0) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [steps]);

  const animations = [
    <HelixSVG key="1" />,
    <LaserGrid key="2" />,
    <WaveformSVG key="3" />,
  ];

  const gradients = [
    "from-primary/95 via-primary to-primary/90",
    "from-primary via-accent/10 to-primary",
    "from-primary/95 via-primary to-accent/5",
  ];

  return (
    <section id="protocol" className="relative bg-primary">
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: `${steps.length * 100}vh` }}
      >
        {steps.map((step, i) => (
          <div
            key={step.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`min-h-[100dvh] flex items-center justify-center px-6 py-24 bg-gradient-to-b ${gradients[i % gradients.length]}`}
          >
            <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 relative h-56 md:h-72 w-full flex items-center justify-center">
                {animations[i % animations.length]}
              </div>
              <div className="flex-1">
                <span className="font-mono text-accent text-sm tracking-wider">
                  Step {step.step_number}
                </span>
                <h3 className="font-sans font-bold text-2xl md:text-4xl mt-2 text-white">
                  {step.title}
                </h3>
                <p className="text-white/80 mt-4 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HelixSVG() {
  return (
    <svg
      className="w-full h-full max-w-[200px] mx-auto opacity-80"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M100 20 Q150 50 100 80 Q50 110 100 140 Q150 170 100 180"
        stroke="rgba(201, 168, 76, 0.6)"
        strokeWidth="1.5"
        fill="none"
        style={{
          animation: "protocol-spin 8s linear infinite",
          transformOrigin: "100px 100px",
        }}
      />
      <path
        d="M100 180 Q50 150 100 120 Q150 90 100 60 Q50 30 100 20"
        stroke="rgba(201, 168, 76, 0.4)"
        strokeWidth="1"
        fill="none"
        style={{
          animation: "protocol-spin 8s linear infinite reverse",
          transformOrigin: "100px 100px",
        }}
      />
    </svg>
  );
}

function LaserGrid() {
  return (
    <div className="relative w-full h-full max-w-[200px] mx-auto flex items-center justify-center">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-accent/30 transition-colors duration-300"
          />
        ))}
      </div>
      <div
        className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
        style={{ animation: "protocol-laser 3s ease-in-out infinite" }}
      />
    </div>
  );
}

function WaveformSVG() {
  return (
    <svg
      className="w-full h-full max-w-[200px] mx-auto"
      viewBox="0 0 200 100"
    >
      <path
        d="M0 50 Q25 30 50 50 T100 50 T150 50 T200 50"
        stroke="rgba(201, 168, 76, 0.7)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="200"
        style={{ animation: "protocol-wave 2.5s ease-in-out infinite" }}
      />
    </svg>
  );
}
