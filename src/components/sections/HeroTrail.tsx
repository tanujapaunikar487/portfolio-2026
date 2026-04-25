import Hero from "@/components/sections/Hero";

export default function HeroTrail() {
  return (
    <div className="relative overflow-hidden md:min-h-screen">
      <div className="flex flex-col md:min-h-screen">
        <Hero />
        <div className="hidden flex-1 md:block" aria-hidden />
      </div>
    </div>
  );
}
