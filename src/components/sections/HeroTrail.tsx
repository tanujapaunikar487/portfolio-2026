import Hero from "@/components/sections/Hero";

export default function HeroTrail() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="flex min-h-screen flex-col">
        <Hero />
        <div className="flex-1" aria-hidden />
      </div>
    </div>
  );
}
