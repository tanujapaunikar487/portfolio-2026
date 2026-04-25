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
    <section className="relative flex flex-col px-6 md:min-h-screen md:px-10">
      <div className="z-10 flex items-start justify-between gap-4 pt-5 text-[14px] md:absolute md:inset-x-10 md:top-6 md:grid md:grid-cols-3 md:items-center md:pt-0">
        <div className="flex flex-col gap-2 md:contents">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-[8px] rounded-full bg-black"
            />
            <span className="font-medium text-black">Product Designer</span>
          </div>
          <div className="flex flex-col gap-1 pl-4 font-medium text-black md:flex-row md:items-center md:justify-center md:gap-5 md:pl-0">
            <span>Pune (India)</span>
            <span className="tabular-nums text-muted">IST {time}</span>
          </div>
        </div>
        <div className="md:justify-self-end">
          <a
            href="mailto:tanuja.paunikar@gmail.com"
            className="inline-flex items-center rounded-full bg-black px-4 py-2 text-[14px] font-medium text-white"
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

        <h1 className="mt-[40px] whitespace-nowrap text-left font-normal leading-[0.9] tracking-[-0.04em] text-black text-[calc((100vw-48px)/6.7)] md:mt-[80px] md:text-[calc((100vw-80px)/6.7)]">
          Tanuja Paunikar
        </h1>

        <div className="mt-8 flex flex-col gap-4 md:ml-auto md:mt-12 md:max-w-[740px]">
          <p className="text-[20px] leading-[28px] tracking-[-0.02em] font-medium text-muted">
            Spent the past decade working across the full arc of a product,
            from shaping direction to building and shipping what people use.
            Experience spans early-stage startups and larger teams, with a
            consistent focus on getting the right thing built.
          </p>
          <p className="text-[20px] leading-[28px] tracking-[-0.02em] font-medium text-muted">
            I work from idea to working product, using modern tools and AI to
            close the gap between concept and reality. Most of my time goes
            into refining working prototypes, using tools like Claude and
            Codex to shape the product as it is built.
          </p>
        </div>
      </div>
    </section>
  );
}
