"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealHeading from "@/components/ui/RevealHeading";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "https://dribbble.com/tanujaa" },
];

function Pill({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "inline-flex items-center text-sm text-black underline underline-offset-4 transition hover:text-muted";
  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
  const isExternal = !!href && /^https?:\/\//.test(href);
  return (
    <Link
      href={href ?? "#"}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  const scrollTop = () =>
    window.scrollTo({ top: 0 });

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
            .toArray<HTMLElement>('[data-anim="fade-up-sm"][data-anim-key="footer-block"]')
            .forEach((b, i) => {
              gsap.fromTo(
                b,
                { y: 24, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  delay: 0.05 * i,
                  ease: "power3.out",
                  scrollTrigger: { trigger: b, start: "top 88%" },
                },
              );
            });
        },
      );
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="px-6 pt-24 pb-10 md:px-10">
      <div className="border-t border-black/10 pt-12">
        <RevealHeading
          text={"Let’s push\nthings forward."}
          className="text-[2.5rem] leading-[1] tracking-[-0.02em] text-black md:text-[52px] lg:text-[80px]"
        />

        <div
          data-anim="fade-up-sm"
          data-anim-key="footer-block"
          className="mt-8 flex flex-col gap-6 md:ml-auto md:max-w-[740px]"
        >
          <p className="text-[20px] leading-[28px] tracking-[-0.02em] font-medium text-muted">
            Looking for my next full-time role somewhere design is treated as
            a core discipline. Real autonomy, high craft, and designers
            trusted to own the outcome. If you&apos;re building something
            ambitious, I&apos;d love to chat.
          </p>
          <a
            href="mailto:tanuja.paunikar@gmail.com"
            className="inline-flex h-10 shrink-0 items-center self-start whitespace-nowrap rounded-full bg-black px-4 text-[14px] font-medium text-white"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div
        data-anim="fade-up-sm"
        data-anim-key="footer-block"
        className="mt-24 flex flex-col gap-6 md:grid md:grid-cols-3 md:items-center"
      >
        <div className="flex flex-wrap gap-6">
          {socials.map((s) => (
            <Pill key={s.label} href={s.href}>
              {s.label}
            </Pill>
          ))}
        </div>

        <p className="text-sm text-muted md:text-center">
          Based in Pune, working with clients worldwide.
        </p>

        <div className="flex flex-wrap gap-6 md:justify-end">
          <Pill onClick={scrollTop}>
            <span className="flex items-center gap-2">
              <span aria-hidden>↑</span>
              Up
            </span>
          </Pill>
        </div>
      </div>
    </footer>
  );
}
