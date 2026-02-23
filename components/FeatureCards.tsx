"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Feature } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

function ShufflerCard({ feature }: { feature: Feature }) {
  const [labels, setLabels] = useState(feature.sub_labels);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setLabels((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-background rounded-[2rem] border border-primary/10 p-6 shadow-lg hover:shadow-xl hover:border-accent/20 transition-all duration-500 hover:-translate-y-1"
    >
      <h3 className="font-sans font-bold text-lg mb-2">{feature.heading}</h3>
      <p className="text-sm text-text-dark/80 mb-4">{feature.descriptor}</p>
      <div className="h-12 overflow-hidden relative">
        {labels.map((l, i) => (
          <div
            key={`${l}-${i}`}
            className="absolute inset-0 flex items-center font-mono text-accent font-medium transition-transform duration-500"
            style={{
              transform: `translateY(${i * 100}%)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypewriterCard({ feature }: { feature: Feature }) {
  const [text, setText] = useState("");
  const fullText = `${feature.value_prop}: ${feature.sub_labels.join(" · ")}`;

  useEffect(() => {
    let i = 0;
    let t: ReturnType<typeof setInterval>;
    const type = () => {
      t = setInterval(() => {
        if (i <= fullText.length) {
          setText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(t);
          setTimeout(() => {
            i = 0;
            type();
          }, 2500);
        }
      }, 70);
    };
    type();
    return () => clearInterval(t);
  }, [fullText]);

  return (
    <div className="bg-background rounded-[2rem] border border-primary/10 p-6 shadow-lg hover:shadow-xl hover:border-accent/20 transition-all duration-500 hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono text-text-dark/60">Live Feed</span>
      </div>
      <h3 className="font-sans font-bold text-lg mb-2">{feature.heading}</h3>
      <p className="text-sm text-text-dark/80 mb-4">{feature.descriptor}</p>
      <div className="font-mono text-sm min-h-[1.5em]">
        {text}
        <span className="inline-block w-2 h-4 ml-0.5 bg-accent animate-pulse align-middle" />
      </div>
    </div>
  );
}

function SchedulerCard({ feature }: { feature: Feature }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const seq = [
      () => setPhase(0),
      () => setActive(2),
      () => setActive(4),
      () => setActive(6),
      () => setPhase(1),
    ];
    let i = 0;
    const t = setInterval(() => {
      seq[i]?.();
      i = (i + 1) % 5;
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] border border-primary/10 p-6 shadow-lg relative hover:shadow-xl hover:border-accent/20 transition-all duration-500 hover:-translate-y-1">
      <h3 className="font-sans font-bold text-lg mb-2">{feature.heading}</h3>
      <p className="text-sm text-text-dark/80 mb-4">{feature.descriptor}</p>
      <div className="flex gap-2 mb-4">
        {days.map((d, i) => (
          <button
            key={i}
            className={`w-10 h-10 rounded-lg font-mono text-sm transition-all ${
              active === i ? "bg-accent text-primary scale-95" : "bg-primary/5"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      {phase === 1 && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/20 text-accent font-mono text-sm">
          Saved
        </div>
      )}
    </div>
  );
}

export function FeatureCards({ features }: { features: Feature[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [features]);

  const components = [ShufflerCard, TypewriterCard, SchedulerCard];

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-24 px-6 sm:px-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "var(--flow-1)",
          opacity: 0.4,
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <h2 className="font-sans font-bold text-2xl md:text-3xl mb-12 text-primary">
          Capabilities
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.slice(0, 3).map((f, i) => {
            const Comp = components[i] ?? ShufflerCard;
            return (
              <div
                key={f.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <Comp feature={f} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
