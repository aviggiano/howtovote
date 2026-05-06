import {
  createCriterionWeights,
  createThemeWeights,
  defaultBudget,
  defaultMaxProjects,
  defaultPresetKey,
} from "@/data/presets";
import {
  criterionKeys,
  themeKeys,
  type CriterionKey,
  type CriterionWeights,
  type ThemeKey,
  type ThemeWeights,
} from "@/lib/types";

export type InitialAllocatorState = {
  budget: number;
  maxProjects: number;
  presetKey: string;
  criterionMultipliers: CriterionWeights;
  themeMultipliers: ThemeWeights;
};

export function parseBudgetParam(value: string | null | undefined) {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultBudget;
}

export function parsePresetParam(value: string | null | undefined) {
  return value?.trim() || defaultPresetKey;
}

export function parseMaxProjectsParam(value: string | null | undefined) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultMaxProjects;
}

function parseWeightEntries<T extends string>(
  value: string | null | undefined,
  validKeys: readonly T[],
): Partial<Record<T, number>> {
  if (!value) {
    return {};
  }

  const validKeySet = new Set(validKeys);
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce<Partial<Record<T, number>>>((accumulator, entry) => {
      const [rawKey, rawWeight] = entry.split(":");

      if (!rawKey || !rawWeight || !validKeySet.has(rawKey as T)) {
        return accumulator;
      }

      const parsedWeight = Number.parseFloat(rawWeight);

      if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
        return accumulator;
      }

      accumulator[rawKey as T] = parsedWeight;
      return accumulator;
    }, {});
}

export function parseCriterionMultipliersParam(
  value: string | null | undefined,
): CriterionWeights {
  return createCriterionWeights(
    parseWeightEntries<CriterionKey>(value, criterionKeys),
  );
}

export function parseThemeMultipliersParam(
  value: string | null | undefined,
): ThemeWeights {
  return createThemeWeights(parseWeightEntries<ThemeKey>(value, themeKeys));
}

function serializeWeightEntries<T extends string>(
  weights: Record<T, number>,
  defaultWeights: Record<T, number>,
) {
  return Object.entries(weights)
    .filter(([key, value]) => defaultWeights[key as T] !== value)
    .map(([key, value]) => `${key}:${value}`)
    .join(",");
}

export function serializeCriterionMultipliers(weights: CriterionWeights) {
  return serializeWeightEntries(weights, createCriterionWeights({}));
}

export function serializeThemeMultipliers(weights: ThemeWeights) {
  return serializeWeightEntries(weights, createThemeWeights({}));
}
