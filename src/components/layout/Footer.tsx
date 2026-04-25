"use client";

import Link from "next/link";

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
  const scrollTop = () =>
    window.scrollTo({ top: 0 });

  return (
    <footer className="px-6 pt-24 pb-10 md:px-10">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-[-0.02em] text-black">
          Let&apos;s push
          <br />
          things forward.
        </h2>
        <a
          href="mailto:tanuja.paunikar@gmail.com"
          className="inline-flex h-10 shrink-0 items-center self-start whitespace-nowrap rounded-full bg-black px-4 text-[14px] text-white md:self-end"
        >
          Get in Touch
        </a>
      </div>

      <div className="max-w-[640px] border-t border-black/10 pt-12">
        <p className="text-[22px] leading-[1.3] tracking-[-0.02em] font-medium text-muted md:text-[20px]">
          Looking for my next full-time role somewhere design is treated as
          a core discipline. Real autonomy, high craft, and designers trusted
          to own the outcome. If you&apos;re building something ambitious,
          I&apos;d love to chat.
        </p>
      </div>

      <div className="mt-24 flex flex-col gap-6 md:grid md:grid-cols-3 md:items-center">
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
