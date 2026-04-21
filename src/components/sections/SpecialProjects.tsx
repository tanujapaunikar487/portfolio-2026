"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { specialProjects, type SpecialCard } from "@/data/special";

export default function SpecialProjects({
  cards = specialProjects,
}: {
  cards?: SpecialCard[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
    };
    setGrabbing(true);
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !scroller.current) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    scroller.current.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !scroller.current) return;
    drag.current.active = false;
    setGrabbing(false);
    try {
      scroller.current.releasePointerCapture(e.pointerId);
    } catch {}
    scroller.current.style.scrollSnapType = "";
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section>
      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth md:gap-6 ${
          grabbing ? "select-none" : ""
        }`}
        style={{
          touchAction: "pan-y",
          paddingInline: "var(--rail-pad)",
          scrollPaddingInlineStart: "var(--rail-pad)",
        }}
      >
        {cards.map((card, i) => (
          <article
            key={i}
            className="flex w-[85vw] shrink-0 snap-start flex-col md:w-[920px]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 768px) 920px, 85vw"
                className="object-cover"
                draggable={false}
                priority={i < 2}
              />
            </div>
            <p className="mt-6 max-w-[45rem] text-[18px] font-medium leading-[1.3] tracking-[-0.022em] text-black/55">
              <span className="text-black">{card.title}.</span>{" "}
              {card.body}
            </p>
          </article>
        ))}

        <div aria-hidden className="w-[20vw] shrink-0 md:w-[10vw]" />
      </div>

      <div
        className="mt-10 hidden justify-end gap-2 md:flex"
        style={{ paddingInline: "var(--rail-pad)" }}
      >
        <button
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-neutral-700 transition hover:bg-[#e8e8ed] disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-[#f5f5f7]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-neutral-700 transition hover:bg-[#e8e8ed] disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-[#f5f5f7]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </section>
  );
}
