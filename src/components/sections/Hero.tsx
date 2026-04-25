"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TextMarquee } from "@/components/ui/text-marquee";

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

export default function Hero() {
  const time = useLocalTime("Asia/Kolkata");

  return (
    <section className="relative flex min-h-screen flex-col px-6 md:px-10">
      <div className="absolute inset-x-6 top-5 z-10 flex items-start justify-between gap-4 text-[14px] md:inset-x-10 md:top-6 md:grid md:grid-cols-3 md:items-center">
        <div className="flex flex-col gap-2 md:contents">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-[8px] rounded-full bg-black"
            />
            <span className="font-medium text-black">Product Designer</span>
          </div>
          <div className="flex flex-col gap-1 pl-4 text-black md:flex-row md:items-center md:justify-center md:gap-5 md:pl-0">
            <span>Pune (India)</span>
            <span className="tabular-nums text-muted">IST {time}</span>
          </div>
        </div>
        <div className="md:justify-self-end">
          <a
            href="mailto:tanuja.paunikar@gmail.com"
            className="inline-flex items-center rounded-full bg-black px-4 py-2 text-[14px] text-white"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap text-[18px] font-medium text-black sm:text-[22px] md:text-[26px]">
          <span>I design using</span>
          <span
            className="relative inline-block size-[68px] shrink-0 overflow-hidden rounded-full select-none md:size-[88px]"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src="/images/tanuja.png?v=4"
              alt="Tanuja Paunikar"
              fill
              sizes="88px"
              draggable={false}
              className="pointer-events-none object-cover grayscale select-none"
              priority
            />
          </span>
          <span className="text-[26px] text-muted md:text-[32px]">×</span>
          <TextMarquee
            speed={0.8}
            height={60}
            className="whitespace-nowrap text-[18px] font-medium text-black sm:text-[22px] md:text-[26px]"
          >
            <span className="whitespace-nowrap">Claude Code</span>
            <span className="whitespace-nowrap">Cursor</span>
            <span className="whitespace-nowrap">Figma</span>
            <span className="whitespace-nowrap">Framer</span>
            <span className="whitespace-nowrap">Codex</span>
          </TextMarquee>
        </div>

        <h1 className="mt-[80px] whitespace-nowrap text-left font-normal leading-[0.9] tracking-[-0.04em] text-black text-[calc((100vw-48px)/6.8)] md:text-[calc((100vw-80px)/6.8)]">
          Tanuja Paunikar
        </h1>

        <div className="mt-8 flex max-w-[720px] flex-col gap-4">
          <p className="text-[22px] leading-[1.3] tracking-[-0.02em] font-medium text-muted md:text-[20px]">
            A decade in, I work the full arc of a product, shaping the
            direction with the team, then taking it from idea to something real
            in people&rsquo;s hands. Having done this for early-stage startups
            and large teams alike, I&rsquo;ve learned the craft only matters
            once the right thing is being built.
          </p>
          <p className="text-[22px] leading-[1.3] tracking-[-0.02em] font-medium text-muted md:text-[20px]">
            These days I design inside AI-native IDEs, taking ideas from sketch
            to production without the handoff. The role is shifting toward
            craft in the build, and that&rsquo;s the part I&rsquo;m here for.
          </p>
        </div>
      </div>
    </section>
  );
}
