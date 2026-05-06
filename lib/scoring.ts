import { presetByKey, themeSelectionBoost } from "@/data/presets";
import {
  criterionKeys,
  type AllocationProject,
  type ProjectRecommendation,
  type ThemeKey,
} from "@/lib/types";

type ScoreOptions = {
  budget: number;
  presetKey: string;
  selectedThemes: ThemeKey[];
};

export function getPreset(presetKey: string) {
  return presetByKey[presetKey] ?? presetByKey.balanced;
}

export function getThemeMultiplier(
  project: AllocationProject,
  presetKey: string,
  selectedThemes: ThemeKey[],
): number {
  const preset = getPreset(presetKey);
  const selectedThemeSet = new Set(selectedThemes);

  const basketWeights = project.curation.themeBaskets.map((themeKey) => {
    const baseWeight = preset.themeWeights[themeKey];
    return selectedThemeSet.has(themeKey)
      ? baseWeight + themeSelectionBoost
      : baseWeight;
  });

  if (basketWeights.length === 0) {
    return 1;
  }

  return (
    basketWeights.reduce((total, weight) => total + weight, 0) /
    basketWeights.length
  );
}

export function scoreProjects(
  projects: AllocationProject[],
  options: ScoreOptions,
): ProjectRecommendation[] {
  const preset = getPreset(options.presetKey);
  const selectedThemeSet = new Set(options.selectedThemes);

  const scored = projects.map((project) => {
    const themeMultiplier = getThemeMultiplier(
      project,
      options.presetKey,
      options.selectedThemes,
    );

    const breakdown = {
      trackRecord:
        project.curation.trackRecord * preset.criteriaWeights.trackRecord,
      underfundedness:
        project.curation.underfundedness *
        preset.criteriaWeights.underfundedness,
      ecosystemLeverage:
        project.curation.ecosystemLeverage *
        preset.criteriaWeights.ecosystemLeverage,
      publicGoodsOpenness:
        project.curation.publicGoodsOpenness *
        preset.criteriaWeights.publicGoodsOpenness,
      executionClarity:
        project.curation.executionClarity *
        preset.criteriaWeights.executionClarity,
    };

    const baseScore = criterionKeys.reduce(
      (total, criterionKey) => total + breakdown[criterionKey],
      0,
    );

    return {
      ...project,
      breakdown,
      matchedThemes: project.curation.themeBaskets.filter((themeKey) =>
        selectedThemeSet.has(themeKey),
      ),
      themeMultiplier,
      score: Number((baseScore * themeMultiplier).toFixed(4)),
      allocationPercent: 0,
      allocationAmount: 0,
    } satisfies ProjectRecommendation;
  });

  const totalScore =
    scored.reduce((total, project) => total + project.score, 0) || 1;

  return scored
    .map((project) => {
      const allocationPercent = project.score / totalScore;
      return {
        ...project,
        allocationPercent,
        allocationAmount: Number(
          (allocationPercent * options.budget).toFixed(2),
        ),
      };
    })
    .sort((left, right) => right.score - left.score);
}
