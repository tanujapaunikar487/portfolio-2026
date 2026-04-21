import type { ProjectCase as ProjectCaseType } from "@/data/projectCases";
import ProjectIntro from "./ProjectIntro";
import SpecialProjects from "./SpecialProjects";

export default function ProjectCase({
  project,
  className = "",
}: {
  project: ProjectCaseType;
  className?: string;
}) {
  return (
    <section
      className={className}
      style={{ ["--rail-pad" as string]: "clamp(1.5rem, 4vw, 2.5rem)" }}
    >
      <div className="pb-12">
        <ProjectIntro project={project} />
      </div>
      <SpecialProjects cards={project.cards} />
    </section>
  );
}
