"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADING = "Let’s push things forward.";

const FOOTER_COPY =
  "Looking for my next full-time role somewhere design is treated as a core discipline. Real autonomy, high craft, and designers trusted to own the outcome. If you're building something ambitious, I'd love to chat.";

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
    "link-underline inline-flex items-center text-sm text-black";
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
  const scrollTop = () =>
    window.scrollTo({ top: 0 });
  const footerRef = useRef<HTMLElement>(null);
  const [headingSize, setHeadingSize] = useState<string>("calc((100dvw - 40px)/13)");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const probe = document.createElement("span");
    Object.assign(probe.style, {
      position: "absolute",
      visibility: "hidden",
      whiteSpace: "nowrap",
      fontWeight: "400",
      letterSpacing: "-0.04em",
      fontSize: "200px",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
      left: "-9999px",
      top: "0",
      lineHeight: "1",
    });
    probe.textContent = HEADING;
    document.body.appendChild(probe);

    const fit = () => {
      const natural = probe.getBoundingClientRect().width;
      const target = window.innerWidth - 40;
      if (natural > 0) {
        setHeadingSize(`${(target / natural) * 200 * 0.97}px`);
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.documentElement);
    window.addEventListener("orientationchange", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", fit);
      probe.remove();
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const footerCopy = footerRef.current?.querySelector<HTMLElement>(".footer-copy");
      const footerWords = gsap.utils.toArray<HTMLElement>(".footer-word");
      if (!footerCopy || !footerWords.length) return;

      if (reduce) {
        gsap.set(footerWords, { color: "#000000" });
        return;
      }

      const muted =
        getComputedStyle(footerCopy).getPropertyValue("color").trim() ||
        "rgb(115, 115, 115)";
      gsap.set(footerWords, { color: muted });
      gsap.to(footerWords, {
        color: "#000000",
        ease: "none",
        stagger: { each: 1, from: "start" },
        scrollTrigger: {
          trigger: footerCopy,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="px-6 pt-0 pb-10 md:px-10 md:pt-24">
      <div className="border-t border-black/10 pt-12">
        <h2
          style={isDesktop ? { fontSize: headingSize } : undefined}
          className="text-[2.5rem] font-normal leading-[1] tracking-[-0.04em] text-black md:mx-[-20px] md:block md:w-[calc(100dvw-40px)] md:whitespace-nowrap md:text-left"
        >
          {HEADING}
        </h2>

        <div
          className="mt-16 flex flex-col gap-12 md:ml-auto md:max-w-[740px]"
        >
          <p className="footer-copy text-[24px] leading-[1.2] tracking-[-0.02em] font-normal text-muted md:text-[36px]">
            {FOOTER_COPY.split(" ").map((word, i, arr) => (
              <span key={i}>
                <span className="footer-word">{word}</span>
                {i < arr.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
          <div className="flex items-center gap-4 self-start">
            <a
              href="mailto:tanuja.paunikar@gmail.com"
              className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-black px-4 text-[14px] font-medium text-white"
            >
              Get in Touch
            </a>
            <a
              href="/tanuja-paunikar-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[14px] font-medium text-black"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      <div
        className="mt-24 flex flex-col items-center gap-6 md:grid md:grid-cols-3 md:items-center"
      >
        <div className="flex flex-wrap justify-center gap-6 md:justify-start">
          {socials.map((s) => (
            <Pill key={s.label} href={s.href}>
              {s.label}
            </Pill>
          ))}
        </div>

        <p className="text-center text-sm text-muted">
          Based in Pune, working with clients worldwide.
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:justify-end">
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
