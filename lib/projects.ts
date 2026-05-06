import { generatedProjectCurations } from "@/data/curation.generated";
import { buildHeuristicCuration } from "@/lib/curation";
import { getSheetProjects } from "@/lib/fetch-sheet";
import type { AllocationProject } from "@/lib/types";

export async function getAllocationProjects(): Promise<AllocationProject[]> {
  const projects = await getSheetProjects();

  return projects.map((project) => ({
    ...project,
    curation:
      generatedProjectCurations[project.projectUrl] ??
      buildHeuristicCuration(project),
  }));
}
