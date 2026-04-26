"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { v } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";

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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;

      const colEls = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-parallax]"),
      );
      if (colEls.length < 3) return;

      const speeds = colEls.map((col) =>
        col.dataset.parallax === "center" ? 320 : -200,
      );

      const setters = colEls.map((col) =>
        gsap.quickSetter(col, "y", "px"),
      );

      let target = 0;
      let current = 0;
      let rafId = 0;
      const compute = () => {
        const rect = root.getBoundingClientRect();
        const vh = window.innerHeight;
        const startY = vh * 0.9;
        const total = rect.height + vh * 0.8;
        const traveled = startY - rect.top;
        target = Math.max(0, Math.min(1, traveled / total));
      };
      const tick = () => {
        rafId = 0;
        compute();
        current += (target - current) * 0.18;
        if (Math.abs(target - current) < 0.0005) current = target;
        setters.forEach((set, i) => set(speeds[i] * current));
        if (current !== target) schedule();
      };
      const schedule = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(tick);
      };

      compute();
      current = target;
      setters.forEach((set, i) => set(speeds[i] * current));

      const onScroll = () => schedule();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (rafId) cancelAnimationFrame(rafId);
      };
    },
    { scope: sectionRef, dependencies: [cols] },
  );

  return (
    <section ref={sectionRef} className="overflow-hidden px-6 pt-0 pb-0 md:px-10 md:pt-24 md:pb-48">
      <h2 className="mb-10 text-[2.5rem] leading-[1] tracking-[-0.02em] text-black md:text-[52px] lg:text-[80px]">
        From the archive.
      </h2>

      <div className="flex items-start gap-6 border-t border-black/10 pt-20 pb-20 md:gap-8 md:pt-40 md:pb-40">
        {distributed.map((col, i) => (
          <div
            key={i}
            data-parallax={cols === 3 && i === 1 ? "center" : "side"}
            className="flex flex-1 flex-col gap-10 md:gap-12 will-change-transform"
          >
            {col.map((p) => (
              <div key={p.slug}>
                <div
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
                <p className="mt-3 text-sm font-medium text-muted">
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
