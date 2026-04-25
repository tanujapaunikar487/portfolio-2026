import Image from "next/image";
import type { ProjectCase } from "@/data/projectCases";

export default function ProjectIntro({ project }: { project: ProjectCase }) {
  return (
    <div style={{ paddingInline: "var(--rail-pad)" }}>
      <div className="flex flex-col gap-8 border-t border-black/10 pt-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[38rem]">
          <p className="text-[24px] font-medium leading-[1.3] tracking-tight text-muted md:text-[30px]">
            <span className="text-black">{project.title}.</span>{" "}
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.stack.map((s) => (
              <Image
                key={s.name}
                src={s.src}
                alt={s.name}
                width={28}
                height={28}
                className="h-7 w-auto object-contain"
              />
            ))}
          </div>
        </div>

        {project.ctaHref ? (
          <a
            href={project.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center self-start whitespace-nowrap rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-neutral-800 md:self-end"
          >
            {project.ctaLabel}
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex h-10 cursor-not-allowed items-center justify-center self-start whitespace-nowrap rounded-full bg-black/40 px-5 text-sm font-medium text-white md:self-end"
          >
            {project.ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
