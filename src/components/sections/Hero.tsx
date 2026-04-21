"use client";

import { useEffect, useState } from "react";

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
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
    <section className="px-6 pt-10 pb-16 md:px-10 md:pt-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16 lg:gap-[120px]">
        {/* Left: identity + contact */}
        <div className="text-[16px] leading-[1.5] tracking-[-0.01em]">
          <p className="text-[22px] font-medium text-black lg:whitespace-nowrap">Tanuja Paunikar</p>
          <p className="text-black/50 tabular-nums lg:whitespace-nowrap">
            GMT+5:30 — {time} Pune, India.
          </p>
          <ul className="mt-5 flex flex-col items-start gap-1">
            <li>
              <a
                href="mailto:tanuja.paunikar@gmail.com"
                className="text-black underline underline-offset-4"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-black underline underline-offset-4"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/tanujaa"
                target="_blank"
                rel="noreferrer"
                className="text-black underline underline-offset-4"
              >
                Dribbble
              </a>
            </li>
          </ul>
        </div>

        {/* Right: description + logos */}
        <div className="md:w-[60%] md:shrink-0 lg:ml-auto lg:w-[720px]">
          <p className="text-[30px] leading-[1.2] tracking-[-0.02em] font-medium text-black/40">
            <span className="text-black">Product Designer.</span> I design
            interfaces that make complex things feel simple. 9+ years across
            agency and in-house teams, shaping products from early concepts to
            shipped experience. I prototype with Claude Code to make ideas
            tangible early.
          </p>
        </div>
      </div>
    </section>
  );
}

