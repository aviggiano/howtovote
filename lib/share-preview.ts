import type { Metadata } from "next";
import { defaultBudget, presetByKey } from "@/data/presets";
import { themeDefinitions } from "@/data/themes";
import { scoreProjects } from "@/lib/scoring";
import type { AllocationProject } from "@/lib/types";
import { criterionDefinitions } from "@/lib/types";
import { buildSharePath, type ShareableAllocatorState } from "@/lib/url-state";

export const shareImageSize = {
  width: 1200,
  height: 630,
};

export const shareImageAlt = "How To Vote allocator preview";

type SharePreviewProject = {
  allocationLabel: string;
  title: string;
};

export type SharePreviewSummary = {
  customizations: string[];
  description: string;
  imageAlt: string;
  maxProjects: number;
  presetLabel: string;
  subtitle: string;
  title: string;
  topProjects: SharePreviewProject[];
};

function formatMultiplier(value: number) {
  return `${Number(value.toFixed(2)).toString()}x`;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function getSharePreviewSummary(
  projects: AllocationProject[],
  state: ShareableAllocatorState,
): SharePreviewSummary {
  const presetLabel = presetByKey[state.presetKey]?.label ?? "Balanced";
  const recommendations = scoreProjects(projects, {
    budget: defaultBudget,
    maxProjects: state.maxProjects,
    presetKey: state.presetKey,
    criterionMultipliers: state.criterionMultipliers,
    themeMultipliers: state.themeMultipliers,
  });
  const topProjects = recommendations
    .filter((project) => project.allocationPercent > 0)
    .slice(0, 4)
    .map((project) => ({
      allocationLabel: formatPercent(project.allocationPercent),
      title: project.title,
    }));
  const customizationLabels = [
    ...criterionDefinitions
      .filter((criterion) => state.criterionMultipliers[criterion.key] !== 1)
      .map(
        (criterion) =>
          `${criterion.shortLabel} ${formatMultiplier(
            state.criterionMultipliers[criterion.key],
          )}`,
      ),
    ...themeDefinitions
      .filter((theme) => state.themeMultipliers[theme.key] !== 1)
      .map(
        (theme) =>
          `${theme.shortLabel} ${formatMultiplier(
            state.themeMultipliers[theme.key],
          )}`,
      ),
  ].slice(0, 4);
  const topProjectNames = topProjects
    .slice(0, 3)
    .map((project) => project.title);
  const descriptionParts = [
    topProjectNames.length > 0
      ? `Top picks: ${topProjectNames.join(", ")}.`
      : null,
    customizationLabels.length > 0
      ? `Custom boosts: ${customizationLabels.join(", ")}.`
      : `Preset: ${presetLabel}.`,
  ].filter(Boolean);
  const title = `How To Vote: ${presetLabel} split for ${state.maxProjects} projects`;
  const description = truncateText(descriptionParts.join(" "), 180);

  return {
    customizations: customizationLabels,
    description,
    imageAlt: `${title}. ${description}`,
    maxProjects: state.maxProjects,
    presetLabel,
    subtitle: `Max ${state.maxProjects} projects`,
    title,
    topProjects,
  };
}

export function buildShareMetadata(
  state: ShareableAllocatorState,
  summary: SharePreviewSummary,
  canonicalPath = buildSharePath(state),
): Metadata {
  const sharePath = buildSharePath(state);

  return {
    title: summary.title,
    description: summary.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: summary.title,
      description: summary.description,
      siteName: "How To Vote",
      images: [
        {
          url: `${sharePath}/opengraph-image`,
          width: shareImageSize.width,
          height: shareImageSize.height,
          alt: summary.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: summary.title,
      description: summary.description,
      images: [`${sharePath}/twitter-image`],
    },
  };
}
