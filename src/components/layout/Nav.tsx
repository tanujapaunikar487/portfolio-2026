import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-10 bg-white/70 backdrop-blur">
      <Link href="/" className="text-sm uppercase tracking-widest text-neutral-900">
        Tanuja P.
      </Link>
      <nav className="flex gap-8 text-sm uppercase tracking-widest text-neutral-900">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
