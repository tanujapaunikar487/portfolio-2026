"use client";

import { type ReactNode } from "react";
import RevealHeading from "@/components/ui/RevealHeading";

export default function RecentProjects({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div
      className="pb-20"
      style={{ ["--rail-pad" as string]: "clamp(1.5rem, 4vw, 2.5rem)" }}
    >
      <div className="mb-12" style={{ paddingInline: "var(--rail-pad)" }}>
        <RevealHeading
          text={heading}
          className="text-[2.5rem] leading-[1] tracking-[-0.02em] text-black md:text-[52px] lg:text-[80px]"
        />
      </div>
      {children}
    </div>
  );
}
