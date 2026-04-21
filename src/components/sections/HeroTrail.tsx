import Hero from "@/components/sections/Hero";

export default function HeroTrail() {
  return (
    <div className="relative min-h-[55vh] overflow-hidden">
      <div className="flex min-h-[55vh] flex-col">
        <Hero />
        <div className="flex-1" aria-hidden />
      </div>
    </div>
  );
}
