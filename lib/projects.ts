import { cache } from "react";
import { generatedProjectCurations } from "@/data/curation.generated";
import { getEthereumSecurityQfEstimates } from "@/lib/fetch-qf-estimates";
import { buildHeuristicCuration } from "@/lib/curation";
import { getSheetProjects } from "@/lib/fetch-sheet";
import type {
  AllocationProject,
  ExploreGraph,
  ExploreDonorNode,
  ExploreProjectNode,
  MatchingTransparency,
  QfEstimateContext,
} from "@/lib/types";

type AllocationDataset = {
  matchingTransparency: MatchingTransparency;
  projects: AllocationProject[];
  qfEstimateContext: QfEstimateContext;
};

type ExploreDataset = {
  graph: ExploreGraph;
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

export const getExploreDataset = cache(async (): Promise<ExploreDataset> => {
  const [projects, qfEstimates] = await Promise.all([
    getSheetProjects(),
    getEthereumSecurityQfEstimates(),
  ]);
  const projectBySlug = new Map(
    projects.map((project) => [getProjectSlug(project.projectUrl), project]),
  );
  const donorBuilders = new Map<
    string,
    Omit<ExploreDonorNode, "projectCount"> & { projectSlugs: Set<string> }
  >();
  const visibleDonations = qfEstimates.exploreDonations.filter((donation) =>
    projectBySlug.has(donation.projectSlug),
  );

  for (const donation of visibleDonations) {
    const donorNode = donorBuilders.get(donation.donorWalletAddress) ?? {
      id: `donor:${donation.donorWalletAddress}`,
      walletAddress: donation.donorWalletAddress,
      totalUsd: 0,
      weightedUsd: 0,
      donationCount: 0,
      projectSlugs: new Set<string>(),
      verifiedBadgeDonationCount: 0,
    };

    donorNode.totalUsd += donation.actualUsd;
    donorNode.weightedUsd += donation.weightedUsd;
    donorNode.donationCount += 1;
    donorNode.projectSlugs.add(donation.projectSlug);
    donorNode.verifiedBadgeDonationCount += donation.isVerifiedBadgeDonation
      ? 1
      : 0;
    donorBuilders.set(donation.donorWalletAddress, donorNode);
  }

  const donors: ExploreDonorNode[] = Array.from(donorBuilders.values())
    .map((donor) => ({
      id: donor.id,
      walletAddress: donor.walletAddress,
      totalUsd: Number(donor.totalUsd.toFixed(2)),
      weightedUsd: Number(donor.weightedUsd.toFixed(2)),
      donationCount: donor.donationCount,
      projectCount: donor.projectSlugs.size,
      verifiedBadgeDonationCount: donor.verifiedBadgeDonationCount,
    }))
    .sort((left, right) => right.totalUsd - left.totalUsd);

  const graphProjects: ExploreProjectNode[] = projects
    .map((project) => {
      const projectSlug = getProjectSlug(project.projectUrl);
      const qfEstimate = qfEstimates.estimatesBySlug.get(projectSlug);

      if (!qfEstimate) {
        return null;
      }

      return {
        id: `project:${projectSlug}`,
        projectId: qfEstimate.projectId,
        projectSlug,
        projectUrl: project.projectUrl,
        title: project.title,
        ownerName: project.ownerName,
        imageUrl: project.imageUrl,
        totalUsd: qfEstimate.raisedUsd,
        donorCount: qfEstimate.donorCount,
        verifiedBadgeRaisedUsd: qfEstimate.verifiedBadgeRaisedUsd,
        mainCategoryNames: project.mainCategoryNames,
        themeBaskets:
          generatedProjectCurations[project.projectUrl]?.themeBaskets ??
          buildHeuristicCuration(project).themeBaskets,
      };
    })
    .filter((project): project is ExploreProjectNode => project !== null)
    .sort((left, right) => right.totalUsd - left.totalUsd);

  return {
    graph: {
      donors,
      projects: graphProjects,
      donations: visibleDonations,
      unresolvedDonationCount: qfEstimates.transparency.unresolvedDonationCount,
      unresolvedRaisedUsd: qfEstimates.transparency.unresolvedRaisedUsd,
    },
    qfEstimateContext: qfEstimates.context,
  };
});

export async function getAllocationProjects(): Promise<AllocationProject[]> {
  const { projects } = await getAllocationDataset();
  return projects;
}
