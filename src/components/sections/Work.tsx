"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";

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
  const distributed = distribute(projects, cols);

  return (
    <section className="px-6 pt-24 pb-16 md:px-10">
      <h2 className="mb-10 text-4xl md:text-5xl tracking-[-0.03em]">From the archive</h2>

      <div className="flex items-start gap-6 border-t border-black/10 pt-12 md:gap-8">
        {distributed.map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-10 md:gap-12">
            {col.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="block"
              >
                <div
                  className="relative w-full overflow-hidden bg-neutral-100"
                  style={{ aspectRatio: p.aspect }}
                >
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-xs text-black/60">
                  <span className="text-black">{p.client}</span> - {p.category}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
