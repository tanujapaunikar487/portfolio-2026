import HeroTrail from "@/components/sections/HeroTrail";
import Work from "@/components/sections/Work";
import ProjectCase from "@/components/sections/ProjectCase";
import Footer from "@/components/layout/Footer";
import { projectCases } from "@/data/projectCases";

export default function Home() {
  return (
    <main>
      <HeroTrail />

      <div
        className="pb-20"
        style={{ ["--rail-pad" as string]: "clamp(1.5rem, 4vw, 2.5rem)" }}
      >
        <div
          className="mb-12"
          style={{ paddingInline: "var(--rail-pad)" }}
        >
          <h2 className="text-3xl md:text-5xl tracking-[-0.03em]">Recent Projects</h2>
        </div>

        {projectCases.map((p, i) => (
          <ProjectCase
            key={p.id + i}
            project={p}
            className={i > 0 ? "mt-[80px]" : ""}
          />
        ))}
      </div>

      <Work />
      <Footer />
    </main>
  );
}
