import { cache } from "react";
import { generatedProjectCurations } from "@/data/curation.generated";
import { getEthereumSecurityQfEstimates } from "@/lib/fetch-qf-estimates";
import { buildHeuristicCuration } from "@/lib/curation";
import { getSheetProjects } from "@/lib/fetch-sheet";
import type {
  AllocationProject,
  MatchingTransparency,
  QfEstimateContext,
} from "@/lib/types";

type AllocationDataset = {
  matchingTransparency: MatchingTransparency;
  projects: AllocationProject[];
  qfEstimateContext: QfEstimateContext;
};

function getProjectSlug(projectUrl: string) {
  return new URL(projectUrl).pathname.replace(/^\/project\//, "");
}

export const getAllocationDataset = cache(
  async (): Promise<AllocationDataset> => {
    const [projects, qfEstimates] = await Promise.all([
      getSheetProjects(),
      getEthereumSecurityQfEstimates(),
    ]);

    return {
      matchingTransparency: qfEstimates.transparency,
      projects: projects.map((project) => ({
        ...project,
        curation:
          generatedProjectCurations[project.projectUrl] ??
          buildHeuristicCuration(project),
        qfEstimate:
          qfEstimates.estimatesBySlug.get(getProjectSlug(project.projectUrl)) ??
          null,
      })),
      qfEstimateContext: qfEstimates.context,
    };
  },
);

export async function getAllocationProjects(): Promise<AllocationProject[]> {
  const { projects } = await getAllocationDataset();
  return projects;
}
