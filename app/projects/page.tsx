import { Container, PageHeader } from "@/components/editorial/primitives";
import { ProjectArchive } from "@/components/projects/ProjectArchive";
import { themes } from "@/content/taxonomy";
import { getProjects } from "@/lib/content";
import { programmeGroup } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  path: "/projects",
  description: "Project archive of Kostadin Penchev — research, EU, digital transformation, AI, AgriTech, software and entrepreneurial projects.",
});

const PROGRAMME_ORDER = ["Horizon Europe", "Interreg Europe", "Erasmus+", "LIFE", "Europe for Citizens"];

export default function ProjectsPage() {
  const projects = getProjects();
  const usedThemes = new Set(projects.flatMap((p) => p.themes ?? []));
  const usedProgrammeGroups = [...new Set(projects.map((p) => programmeGroup(p.programme)))].sort(
    (a, b) => PROGRAMME_ORDER.indexOf(a) - PROGRAMME_ORDER.indexOf(b),
  );
  const usedRoles = [...new Set(projects.flatMap((p) => p.roles ?? []))].sort();
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Project archive"
        intro="Project experience across European programmes, research, innovation, digital transformation and regional development."
      />
      <Container className="pt-10 md:pt-14">
        <ProjectArchive
          projects={projects}
          themes={themes.filter((t) => usedThemes.has(t.id)).map((t) => ({ id: t.id, label: t.label }))}
          programmes={usedProgrammeGroups.map((p) => ({ id: p, label: p }))}
          roles={usedRoles.map((r) => ({ id: r, label: r }))}
        />
      </Container>
    </>
  );
}
