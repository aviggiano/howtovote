import {
  type CriterionWeights,
  type ThemeWeights,
  criterionKeys,
  type AllocationProject,
  type ProjectRecommendation,
  type ThemeKey,
} from "@/lib/types";
import {
  createCriterionWeights,
  createThemeWeights,
  presetByKey,
} from "@/data/presets";

type ScoreOptions = {
  budget: number;
  maxProjects: number;
  presetKey: string;
  criterionMultipliers: CriterionWeights;
  themeMultipliers: ThemeWeights;
};

export function getPreset(presetKey: string) {
  return presetByKey[presetKey] ?? presetByKey.balanced;
}

export function getEffectiveCriterionWeights(
  presetKey: string,
  criterionMultipliers: CriterionWeights,
): CriterionWeights {
  const preset = getPreset(presetKey);

  return createCriterionWeights(
    Object.fromEntries(
      criterionKeys.map((criterionKey) => [
        criterionKey,
        preset.criteriaWeights[criterionKey] *
          criterionMultipliers[criterionKey],
      ]),
    ) as CriterionWeights,
  );
}

export function getEffectiveThemeWeights(
  presetKey: string,
  themeMultipliers: ThemeWeights,
): ThemeWeights {
  const preset = getPreset(presetKey);

  return createThemeWeights(
    Object.fromEntries(
      Object.keys(preset.themeWeights).map((themeKey) => [
        themeKey,
        preset.themeWeights[themeKey as ThemeKey] *
          themeMultipliers[themeKey as ThemeKey],
      ]),
    ) as ThemeWeights,
  );
}

export function getThemeMultiplier(
  project: AllocationProject,
  effectiveThemeWeights: ThemeWeights,
): number {
  const basketWeights = project.curation.themeBaskets.map(
    (themeKey) => effectiveThemeWeights[themeKey],
  );

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
  const effectiveCriterionWeights = getEffectiveCriterionWeights(
    options.presetKey,
    options.criterionMultipliers,
  );
  const effectiveThemeWeights = getEffectiveThemeWeights(
    options.presetKey,
    options.themeMultipliers,
  );

  const scored = projects.map((project) => {
    const themeMultiplier = getThemeMultiplier(project, effectiveThemeWeights);

    const breakdown = {
      trackRecord:
        project.curation.trackRecord * effectiveCriterionWeights.trackRecord,
      underfundedness:
        project.curation.underfundedness *
        effectiveCriterionWeights.underfundedness,
      ecosystemLeverage:
        project.curation.ecosystemLeverage *
        effectiveCriterionWeights.ecosystemLeverage,
      publicGoodsOpenness:
        project.curation.publicGoodsOpenness *
        effectiveCriterionWeights.publicGoodsOpenness,
      executionClarity:
        project.curation.executionClarity *
        effectiveCriterionWeights.executionClarity,
    };

    const baseScore = criterionKeys.reduce(
      (total, criterionKey) => total + breakdown[criterionKey],
      0,
    );

    return {
      ...project,
      breakdown,
      matchedThemes: project.curation.themeBaskets.filter(
        (themeKey) => effectiveThemeWeights[themeKey] > 1,
      ),
      themeMultiplier,
      score: Number((baseScore * themeMultiplier).toFixed(4)),
      allocationPercent: 0,
      allocationAmount: 0,
    } satisfies ProjectRecommendation;
  });

  const sortedProjects = [...scored].sort(
    (left, right) => right.score - left.score,
  );
  const cappedProjects = sortedProjects.slice(
    0,
    Math.max(1, options.maxProjects),
  );
  const cappedProjectUrls = new Set(
    cappedProjects.map((project) => project.projectUrl),
  );
  const totalScore =
    cappedProjects.reduce((total, project) => total + project.score, 0) || 1;

  return sortedProjects.map((project) => {
    if (!cappedProjectUrls.has(project.projectUrl)) {
      return {
        ...project,
        allocationPercent: 0,
        allocationAmount: 0,
      };
    }

    const allocationPercent = project.score / totalScore;
    return {
      ...project,
      allocationPercent,
      allocationAmount: Number((allocationPercent * options.budget).toFixed(2)),
    };
  });
}
