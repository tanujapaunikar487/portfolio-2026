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
          <h2 className="text-[2.5rem] leading-[1] tracking-[-0.02em] text-black md:text-[52px] lg:text-[80px]">
            Recent Projects.
          </h2>
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
