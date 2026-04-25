import HeroTrail from "@/components/sections/HeroTrail";
import Work from "@/components/sections/Work";
import ProjectCase from "@/components/sections/ProjectCase";
import RecentProjects from "@/components/sections/RecentProjects";
import Footer from "@/components/layout/Footer";
import { projectCases } from "@/data/projectCases";

export default function Home() {
  return (
    <main>
      <HeroTrail />

      <RecentProjects heading="Recent Projects.">
        {projectCases.map((p, i) => (
          <ProjectCase
            key={p.id + i}
            project={p}
            className={i > 0 ? "mt-[80px]" : ""}
          />
        ))}
      </RecentProjects>

      <Work />
      <Footer />
    </main>
  );
}
