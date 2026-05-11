import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AllocatorPage } from "@/components/allocator-page";
import { getAllocationDataset } from "@/lib/projects";
import {
  buildShareMetadata,
  getSharePreviewSummary,
} from "@/lib/share-preview";
import { decodeShareToken } from "@/lib/url-state";

type SharePageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { token } = await params;
  const decodedState = decodeShareToken(token);

  if (!decodedState) {
    return {
      title: "How To Vote",
      description:
        "A shareable Ethereum Security round allocator for donors who want a reasoned recommendation instead of a blank spreadsheet.",
    };
  }

  const { projects } = await getAllocationDataset();
  return buildShareMetadata(
    decodedState,
    getSharePreviewSummary(projects, decodedState),
  );
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  const decodedState = decodeShareToken(token);

  if (!decodedState) {
    notFound();
  }

  const { matchingTransparency, projects, qfEstimateContext } =
    await getAllocationDataset();

  return (
    <AllocatorPage
      projects={projects}
      initialMaxProjects={decodedState.maxProjects}
      initialPresetKey={decodedState.presetKey}
      initialCriterionMultipliers={decodedState.criterionMultipliers}
      initialThemeMultipliers={decodedState.themeMultipliers}
      matchingTransparency={matchingTransparency}
      qfEstimateContext={qfEstimateContext}
    />
  );
}
