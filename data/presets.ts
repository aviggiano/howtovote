import {
  type AllocationPreset,
  type CriterionWeights,
  type ThemeWeights,
  criterionKeys,
  themeKeys,
} from "@/lib/types";

export function createCriterionWeights(
  overrides: Partial<CriterionWeights>,
): CriterionWeights {
  return Object.assign(
    Object.fromEntries(
      criterionKeys.map((key) => [key, 1]),
    ) as CriterionWeights,
    overrides,
  );
}

export function createThemeWeights(
  overrides: Partial<ThemeWeights>,
): ThemeWeights {
  return Object.assign(
    Object.fromEntries(themeKeys.map((key) => [key, 1])) as ThemeWeights,
    overrides,
  );
}

export const defaultBudget = 100;
export const defaultMaxProjects = 10;
export const defaultPresetKey = "balanced";
export const weightStep = 0.25;
export const minUserWeightMultiplier = 0.25;
export const maxUserWeightMultiplier = 2;
export const themeWeightStep = 1;
export const minThemeWeightMultiplier = 1;
export const maxThemeWeightMultiplier = 10;
export const unitCriterionMultipliers = createCriterionWeights({});
export const unitThemeMultipliers = createThemeWeights({});

export const presets: AllocationPreset[] = [
  {
    key: "balanced",
    label: "Balanced",
    description:
      "A broad, public-goods oriented mix without heavy thematic bias.",
    criteriaWeights: createCriterionWeights({
      trackRecord: 1.1,
      underfundedness: 1,
      ecosystemLeverage: 1.15,
      publicGoodsOpenness: 1.05,
      executionClarity: 1,
    }),
    themeWeights: createThemeWeights({}),
  },
  {
    key: "proven-builders",
    label: "Proven Builders",
    description:
      "Tilt toward teams with stronger track records, leverage, and clearer delivery plans.",
    criteriaWeights: createCriterionWeights({
      trackRecord: 1.4,
      underfundedness: 0.8,
      ecosystemLeverage: 1.2,
      publicGoodsOpenness: 1,
      executionClarity: 1.15,
    }),
    themeWeights: createThemeWeights({
      "core-protocol-client-security": 1.1,
      "tooling-fuzzing-formal-verification": 1.15,
    }),
  },
  {
    key: "overlooked-projects",
    label: "Overlooked Projects",
    description:
      "Tilt toward projects whose marginal funding seems more likely to matter right now.",
    criteriaWeights: createCriterionWeights({
      trackRecord: 0.9,
      underfundedness: 1.45,
      ecosystemLeverage: 1.1,
      publicGoodsOpenness: 1.1,
      executionClarity: 1,
    }),
    themeWeights: createThemeWeights({
      "education-research-coordination": 1.1,
      "monitoring-incident-response-ops": 1.05,
    }),
  },
  {
    key: "tooling-first",
    label: "Tooling First",
    description:
      "Deliberately overweight testing, verification, and developer safety tooling.",
    criteriaWeights: createCriterionWeights({
      trackRecord: 1.1,
      underfundedness: 0.95,
      ecosystemLeverage: 1.3,
      publicGoodsOpenness: 1.1,
      executionClarity: 1,
    }),
    themeWeights: createThemeWeights({
      "tooling-fuzzing-formal-verification": 1.45,
      "core-protocol-client-security": 1.15,
    }),
  },
];

export const presetByKey = Object.fromEntries(
  presets.map((preset) => [preset.key, preset]),
) as Record<string, AllocationPreset>;
