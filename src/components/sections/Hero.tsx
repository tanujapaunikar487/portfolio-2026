"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ABOUT_COPY =
  "Spent the past decade working across the full arc of a product, from shaping direction to building and shipping what people use. Experience spans early-stage startups and larger teams, with a consistent focus on getting the right thing built. I work from idea to working product, using modern tools and AI to close the gap between concept and reality. Most of my time goes into refining working prototypes, using tools like Claude and OpenAI Codex to shape the product as it is built.";

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function SplitLetters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="hero-letter-mask inline-block overflow-hidden align-bottom pb-[0.04em] leading-[1]"
        >
          <span className="hero-letter inline-block will-change-transform">
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const time = useLocalTime("Asia/Kolkata");
  const heroRef = useRef<HTMLDivElement>(null);
  const [nameFontSize, setNameFontSize] = useState<string>("calc((100dvw - 40px)/6.8)");

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
    document.body.appendChild(probe);

    const renderProbe = (text: string) => {
      probe.textContent = "";
      for (const ch of text) {
        const letter = document.createElement("span");
        letter.style.display = "inline-block";
        letter.textContent = ch === " " ? " " : ch;
        probe.appendChild(letter);
      }
    };

    const fit = () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      renderProbe(isDesktop ? "Tanuja Paunikar" : "Paunikar");
      const natural = probe.getBoundingClientRect().width;
      const target = window.innerWidth - 40;
      if (natural > 0) {
        setNameFontSize(`${(target / natural) * 200}px`);
        requestAnimationFrame(() => ScrollTrigger.refresh());
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

      gsap.set(
        [
          ".hero-nav-item",
          ".hero-using",
          ".hero-photo",
          ".hero-x",
          ".hero-tool",
          ".hero-letter",
        ],
        { willChange: "transform, opacity" },
      );

      if (reduce) {
        gsap.set(
          [
            ".hero-nav-item",
            ".hero-using",
            ".hero-photo",
            ".hero-x",
            ".hero-letter",
          ],
          { autoAlpha: 1, y: 0, yPercent: 0, scale: 1, clearProps: "willChange,transform,opacity" },
        );
        const allTools = gsap.utils.toArray<HTMLElement>(".hero-tool");
        gsap.set(allTools, { autoAlpha: 0, yPercent: 0 });
        if (allTools[0]) gsap.set(allTools[0], { autoAlpha: 1 });
        return;
      }

      const tools = gsap.utils.toArray<HTMLElement>(".hero-tool");
      gsap.set(tools, { yPercent: 110, autoAlpha: 0 });
      if (tools[0]) gsap.set(tools[0], { yPercent: 0, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl.from(".hero-nav-item", {
        y: -16,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
      })
        .from(
          ".hero-using",
          { y: 24, autoAlpha: 0, duration: 0.8 },
          "-=0.5",
        )
        .from(
          ".hero-photo",
          {
            scale: 0.4,
            autoAlpha: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          "-=0.6",
        )
        .from(
          ".hero-x",
          { autoAlpha: 0, scale: 0.6, duration: 0.5 },
          "-=0.5",
        )
        .fromTo(
          tools[0],
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "power4.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-letter",
          { yPercent: -110, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: "power4.out",
            stagger: 0.04,
          },
          "-=0.5",
        );

      if (tools.length > 1) {
        const cycle = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.6 },
        });
        const HOLD = 1.4;
        for (let i = 0; i < tools.length; i++) {
          const current = tools[i];
          const next = tools[(i + 1) % tools.length];
          cycle
            .to(current, { yPercent: -110, autoAlpha: 0 }, `+=${HOLD}`)
            .fromTo(
              next,
              { yPercent: 110, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1 },
              "<",
            );
        }
        tl.add(cycle, ">+=0.4");
      }

      const aboutCopy = heroRef.current?.querySelector<HTMLElement>(".about-copy");
      const aboutWords = gsap.utils.toArray<HTMLElement>(".about-word");
      if (aboutCopy && aboutWords.length) {
        const muted =
          getComputedStyle(aboutCopy).getPropertyValue("color").trim() ||
          "rgb(115, 115, 115)";
        gsap.set(aboutWords, { color: muted });
        gsap.to(aboutWords, {
          color: "#000000",
          ease: "none",
          stagger: { each: 1, from: "start" },
          scrollTrigger: {
            trigger: aboutCopy,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: heroRef },
  );

  return (
    <div ref={heroRef} className="overflow-x-clip">
      <section className="relative flex h-[100dvh] flex-col px-6 pb-0 md:px-10 md:pb-0">
        <div className="z-10 flex items-center justify-between gap-4 pt-5 text-[14px] md:absolute md:inset-x-10 md:top-6 md:grid md:grid-cols-3 md:items-center md:pt-0">
          <div className="hero-nav-item flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-[8px] rounded-full bg-black"
            />
            <span className="hidden font-medium text-black md:inline">
              Product designer
            </span>
          </div>
          <div className="hero-nav-item hidden font-medium text-black md:flex md:flex-row md:items-center md:justify-center md:gap-5">
            <span>Pune (India)</span>
            <span className="tabular-nums text-muted">IST {time}</span>
          </div>
          <div className="hero-nav-item md:justify-self-end">
            <a
              href="mailto:tanuja.paunikar@gmail.com"
              className="inline-flex items-center rounded-full bg-black px-4 py-2 text-[14px] font-medium text-white"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-24 md:pt-0">
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-nowrap items-center gap-3 whitespace-nowrap text-[18px] font-medium text-black sm:text-[22px] md:text-[26px]">
              <span className="hero-using">I design using</span>
              <span
                className="hero-photo relative hidden size-[56px] shrink-0 overflow-hidden rounded-full select-none md:inline-block"
                onContextMenu={(e) => e.preventDefault()}
              >
                <Image
                  src="/images/tanuja.png?v=4"
                  alt="Tanuja Paunikar"
                  fill
                  sizes="56px"
                  draggable={false}
                  className="pointer-events-none object-cover grayscale select-none"
                  priority
                />
              </span>
              <span className="hero-x hidden text-[26px] text-muted md:inline md:text-[28px]">
                ×
              </span>
              <span
                className="relative inline-flex h-[1.2em] items-center overflow-hidden"
                aria-label="Claude Code, Figma, Codex, Webflow"
              >
                <span className="invisible block whitespace-nowrap" aria-hidden>
                  Claude Code
                </span>
                <span className="hero-tool absolute inset-0 flex items-center whitespace-nowrap will-change-transform">
                  Claude Code
                </span>
                <span className="hero-tool absolute inset-0 flex items-center whitespace-nowrap will-change-transform">
                  Figma
                </span>
                <span className="hero-tool absolute inset-0 flex items-center whitespace-nowrap will-change-transform">
                  Codex
                </span>
                <span className="hero-tool absolute inset-0 flex items-center whitespace-nowrap will-change-transform">
                  Webflow
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:hidden">
            <span
              className="hero-photo relative size-[64px] shrink-0 overflow-hidden rounded-full select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src="/images/tanuja.png?v=4"
                alt="Tanuja Paunikar"
                fill
                sizes="64px"
                draggable={false}
                className="pointer-events-none object-cover grayscale select-none"
              />
            </span>
            <h1
              style={{ fontSize: nameFontSize }}
              aria-label="Tanuja Paunikar"
              className="mx-[-4px] w-[calc(100dvw-40px)] text-center font-normal leading-[1] tracking-[-0.04em] text-black"
            >
              <span className="block">
                <SplitLetters text="Tanuja" />
              </span>
              <span className="block">
                <SplitLetters text="Paunikar" />
              </span>
            </h1>
            <span className="hero-using font-medium text-black">
              Product designer
            </span>
          </div>

          <h1
            style={{ fontSize: nameFontSize }}
            aria-label="Tanuja Paunikar"
            className="hidden whitespace-nowrap text-left font-normal leading-[1] tracking-[-0.04em] text-black md:mx-[-20px] md:block md:w-[calc(100dvw-40px)]"
          >
            <SplitLetters text="Tanuja Paunikar" />
          </h1>
        </div>
      </section>

      <section className="px-6 pt-16 pb-48 md:px-10 md:pt-24 md:pb-64">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="text-[18px] font-medium text-muted md:pt-3">
            About me
          </div>
          <p className="about-copy w-full max-w-[820px] min-w-0 text-[24px] leading-[1.2] tracking-[-0.02em] font-medium text-muted md:text-[36px]">
            {ABOUT_COPY.split(" ").map((word, i, arr) => (
              <span key={i}>
                <span className="about-word">{word}</span>
                {i < arr.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
