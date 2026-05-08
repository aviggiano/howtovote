import type { Metadata } from "next";
import { AllocatorPage } from "@/components/allocator-page";
import { getAllocationDataset } from "@/lib/projects";
import {
  buildSharePath,
  getShareableAllocatorStateFromSearchParams,
  isDefaultShareState,
} from "@/lib/url-state";
import {
  buildShareMetadata,
  getSharePreviewSummary,
} from "@/lib/share-preview";

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: HomeProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) ?? {};
  const shareState =
    getShareableAllocatorStateFromSearchParams(resolvedSearchParams);
  const { projects } = await getAllocationDataset();

  return buildShareMetadata(
    shareState,
    getSharePreviewSummary(projects, shareState),
    isDefaultShareState(shareState) ? "/" : buildSharePath(shareState),
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const shareState =
    getShareableAllocatorStateFromSearchParams(resolvedSearchParams);
  const { projects, qfEstimateContext } = await getAllocationDataset();

  return (
    <AllocatorPage
      projects={projects}
      initialMaxProjects={shareState.maxProjects}
      initialPresetKey={shareState.presetKey}
      initialCriterionMultipliers={shareState.criterionMultipliers}
      initialThemeMultipliers={shareState.themeMultipliers}
      qfEstimateContext={qfEstimateContext}
    />
  );
}
