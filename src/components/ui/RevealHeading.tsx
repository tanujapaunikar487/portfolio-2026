"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  innerClassName?: string;
  start?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
};

export default function RevealHeading({
  text,
  className,
  innerClassName,
  start = "top 82%",
  delay = 0,
  as = "h2",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;

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
          const inners = root.querySelectorAll<HTMLElement>(".rh-inner");
          if (ctx.conditions?.reduced) {
            gsap.set(inners, { yPercent: 0, autoAlpha: 1 });
            return;
          }
          gsap.fromTo(
            inners,
            { yPercent: 110, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 1.05,
              ease: "power4.out",
              stagger: 0.08,
              delay,
              scrollTrigger: { trigger: root, start },
            },
          );
        },
      );
    },
    { scope: ref, dependencies: [text] },
  );

  const lines = text.split(/\n/);

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi, arr) => (
            <span key={`${li}-${wi}`}>
              <span className="rh-mask inline-block overflow-hidden align-bottom pb-[0.06em]">
                <span
                  className={`rh-inner inline-block translate-y-[110%] opacity-0 will-change-transform ${innerClassName ?? ""}`}
                >
                  {word}
                </span>
              </span>
              {wi < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
