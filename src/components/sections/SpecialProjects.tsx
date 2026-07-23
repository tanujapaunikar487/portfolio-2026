"use client";

import { useEffect, useRef, useState } from "react";
import { specialProjects, type SpecialCard } from "@/data/special";
import { v } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";

export default function SpecialProjects({
  cards = specialProjects,
}: {
  cards?: SpecialCard[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const rafId = useRef<number | null>(null);
  const moveRaf = useRef<number | null>(null);
  const pendingScrollLeft = useRef<number | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const compute = () => {
      rafId.current = null;
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    const update = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(compute);
    };
    compute();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
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
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !scroller.current) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    pendingScrollLeft.current = drag.current.startScroll - dx;
    if (moveRaf.current != null) return;
    moveRaf.current = requestAnimationFrame(() => {
      moveRaf.current = null;
      const el = scroller.current;
      const next = pendingScrollLeft.current;
      if (el && next != null) el.scrollLeft = next;
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !scroller.current) return;
    drag.current.active = false;
    setGrabbing(false);
    if (moveRaf.current != null) {
      cancelAnimationFrame(moveRaf.current);
      moveRaf.current = null;
    }
    pendingScrollLeft.current = null;
    try {
      scroller.current.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const slides = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".sp-slide-inner"),
      );
      if (!slides.length) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(slides, { xPercent: 0, autoAlpha: 1 });
        return;
      }

      gsap.set(slides, {
        xPercent: 8,
        autoAlpha: 0,
        force3D: true,
        willChange: "transform, opacity",
      });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(slides, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.08,
          force3D: true,
          onComplete: () => {
            gsap.set(slides, { willChange: "auto" });
          },
        });
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            play();
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px 20% 0px", threshold: 0 },
      );
      io.observe(root);

      return () => io.disconnect();
    },
    { scope: sectionRef, dependencies: [] },
  );

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step });
  };

  return (
    <section ref={sectionRef}>
      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={`no-scrollbar flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain md:gap-6 ${
          grabbing ? "select-none" : ""
        }`}
        style={{
          touchAction: "pan-x pan-y",
          paddingInline: "var(--rail-pad)",
          scrollPaddingInlineStart: "var(--rail-pad)",
        }}
      >
        {cards.map((card, i) => (
          <article
            key={i}
            className="flex w-[85vw] shrink-0 snap-start flex-col md:w-[920px] min-[1440px]:w-[1260px]"
          >
            <div className="sp-slide-inner flex flex-col">
              <div
                className="relative aspect-[9/10] w-full overflow-hidden rounded-[20px] bg-neutral-100 md:aspect-[16/9]"
              >
                <picture>
                  {card.mobileImage ? (
                    <source media="(max-width: 767px)" srcSet={v(card.mobileImage)} />
                  ) : null}
                  <img
                    src={v(card.image)}
                    alt={card.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
              </div>
              <p className="mt-6 w-[68vw] max-w-[45rem] text-[16px] font-medium leading-[1.3] tracking-[-0.022em] text-muted md:w-auto md:text-[20px]">
                <span className="text-black">{card.title}.</span>{" "}
                {card.body}
              </p>
            </div>
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
