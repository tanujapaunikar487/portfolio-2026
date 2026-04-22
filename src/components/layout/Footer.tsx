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
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="px-6 pt-24 pb-6 md:px-10">
      <div className="border-t border-black/10 pt-12">
        <p className="text-5xl tracking-tight text-muted">
          Get in touch
        </p>
        <a
          href="mailto:tanuja.paunikar@gmail.com"
          className="mt-2 block whitespace-nowrap text-[clamp(1.5rem,7.2vw,3rem)] tracking-tight text-black hover:underline"
        >
          tanuja.paunikar@gmail.com
        </a>
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
