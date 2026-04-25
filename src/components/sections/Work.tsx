"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { v } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealHeading from "@/components/ui/RevealHeading";

function ratioOf(p: Project) {
  const [w, h] = p.aspect.split("/").map(Number);
  return w / h;
}

function distribute(items: Project[], colCount: number): Project[][] {
  const cols: Project[][] = Array.from({ length: colCount }, () => []);

  if (colCount >= 3) {
    // Preserve author-defined order: round-robin by index into columns.
    items.forEach((p, i) => cols[i % colCount].push(p));
    return cols;
  }

  const heights = new Array(colCount).fill(0);
  for (const p of items) {
    const inv = 1 / ratioOf(p);
    let shortest = 0;
    for (let i = 1; i < colCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    cols[shortest].push(p);
    heights[shortest] += inv;
  }
  return cols;
}

function useColCount() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    const lgQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setN(lgQuery.matches ? 3 : mdQuery.matches ? 2 : 1);
    update();
    mdQuery.addEventListener("change", update);
    lgQuery.addEventListener("change", update);
    return () => {
      mdQuery.removeEventListener("change", update);
      lgQuery.removeEventListener("change", update);
    };
  }, []);
  return n;
}

export default function Work() {
  const cols = useColCount();
  const distributed = useMemo(() => distribute(projects, cols), [cols]);
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          full: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(root.querySelectorAll("[data-anim]"), {
              clearProps: "clipPath,opacity,y,scale,rotate",
            });
            return;
          }

          gsap.utils
            .toArray<HTMLElement>('[data-anim-key="work-card"]')
            .forEach((card) => {
              const frame = card.querySelector<HTMLElement>(
                '[data-anim="image-mask"]',
              );
              const inner = frame?.querySelector<HTMLElement>("img");
              const text = card.querySelector<HTMLElement>(
                '[data-anim="fade-up-sm"]',
              );
              const tl = gsap.timeline({
                defaults: { ease: "expo.out" },
                scrollTrigger: { trigger: card, start: "top 88%" },
              });
              if (frame) {
                tl.fromTo(
                  frame,
                  { clipPath: "inset(0 0 100% 0)" },
                  { clipPath: "inset(0 0 0 0)", duration: 1.3 },
                  0,
                );
              }
              if (inner) {
                tl.fromTo(
                  inner,
                  { scale: 1.18 },
                  { scale: 1, duration: 1.6 },
                  0,
                );
              }
              if (text) {
                tl.fromTo(
                  text,
                  { y: 14, autoAlpha: 0 },
                  { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
                  0.18,
                );
              }
            });

        },
      );
    },
    { scope: ref, dependencies: [cols] },
  );

  return (
    <section ref={ref} className="px-6 pt-24 pb-16 md:px-10">
      <RevealHeading
        text="From the archive."
        className="mb-10 text-[2.5rem] leading-[1] tracking-[-0.02em] text-black md:text-[52px] lg:text-[80px]"
      />

      <div className="flex items-start gap-6 border-t border-black/10 pt-12 md:gap-8">
        {distributed.map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-10 md:gap-12">
            {col.map((p) => (
              <div key={p.slug} data-anim-key="work-card">
                <div
                  data-anim="image-mask"
                  className="relative w-full overflow-hidden rounded-2xl bg-neutral-100"
                  style={{ aspectRatio: p.aspect }}
                >
                  <img
                    src={v(p.cover)}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p
                  data-anim="fade-up-sm"
                  className="mt-3 text-sm font-medium text-muted"
                >
                  <span className="text-black">{p.client}</span> - {p.category}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
