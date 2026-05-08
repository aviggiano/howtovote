import {
  createCriterionWeights,
  createThemeWeights,
  defaultBudget,
  defaultMaxProjects,
  defaultPresetKey,
  presetByKey,
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

export type ShareableAllocatorState = Omit<InitialAllocatorState, "budget">;

export type SearchParamRecord = Record<string, string | string[] | undefined>;

const shareTokenVersion = "1";
const sharePresetKeys = [
  "balanced",
  "proven-builders",
  "overlooked-projects",
  "tooling-first",
] as const;
const maxProjectsTokenWidth = 2;
const weightTokenWidth = 3;
const weightPrecision = 2;
const weightScale = 10 ** weightPrecision;
const maxTokenWeight = 36 ** weightTokenWidth - 1;
const maxTokenProjects = 36 ** maxProjectsTokenWidth - 1;
const shareTokenLength =
  1 +
  1 +
  maxProjectsTokenWidth +
  (criterionKeys.length + themeKeys.length) * weightTokenWidth;

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

export function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function clampShareWeight(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return 1;
  }

  const scaled = Math.round(value * weightScale);
  return Number(
    (Math.max(1, Math.min(maxTokenWeight, scaled)) / weightScale).toFixed(
      weightPrecision,
    ),
  );
}

function toFixedBase36(value: number, width: number) {
  return value.toString(36).padStart(width, "0");
}

function fromFixedBase36(value: string) {
  const parsed = Number.parseInt(value, 36);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function normalizeShareState(
  state: Partial<ShareableAllocatorState>,
): ShareableAllocatorState {
  const maxProjects = Number.isFinite(state.maxProjects)
    ? Math.max(
        1,
        Math.min(maxTokenProjects, Math.trunc(state.maxProjects ?? 0)),
      )
    : defaultMaxProjects;
  const presetKey = presetByKey[state.presetKey ?? ""]
    ? (state.presetKey as string)
    : defaultPresetKey;

  return {
    maxProjects,
    presetKey,
    criterionMultipliers: createCriterionWeights(
      Object.fromEntries(
        criterionKeys.map((key) => [
          key,
          clampShareWeight(state.criterionMultipliers?.[key] ?? 1),
        ]),
      ) as CriterionWeights,
    ),
    themeMultipliers: createThemeWeights(
      Object.fromEntries(
        themeKeys.map((key) => [
          key,
          clampShareWeight(state.themeMultipliers?.[key] ?? 1),
        ]),
      ) as ThemeWeights,
    ),
  };
}

export function isDefaultShareState(state: ShareableAllocatorState) {
  const normalizedState = normalizeShareState(state);
  return (
    normalizedState.maxProjects === defaultMaxProjects &&
    normalizedState.presetKey === defaultPresetKey &&
    criterionKeys.every(
      (key) => normalizedState.criterionMultipliers[key] === 1,
    ) &&
    themeKeys.every((key) => normalizedState.themeMultipliers[key] === 1)
  );
}

export function getShareableAllocatorStateFromSearchParams(
  searchParams: SearchParamRecord,
): ShareableAllocatorState {
  return normalizeShareState({
    maxProjects: parseMaxProjectsParam(getSingleParam(searchParams.max)),
    presetKey: parsePresetParam(getSingleParam(searchParams.preset)),
    criterionMultipliers: parseCriterionMultipliersParam(
      getSingleParam(searchParams.cw),
    ),
    themeMultipliers: parseThemeMultipliersParam(
      getSingleParam(searchParams.tw),
    ),
  });
}

export function encodeShareToken(state: ShareableAllocatorState) {
  const normalizedState = normalizeShareState(state);
  const presetIndex = sharePresetKeys.indexOf(
    normalizedState.presetKey as (typeof sharePresetKeys)[number],
  );
  const encodedCriteria = criterionKeys
    .map((key) =>
      toFixedBase36(
        Math.round(normalizedState.criterionMultipliers[key] * weightScale),
        weightTokenWidth,
      ),
    )
    .join("");
  const encodedThemes = themeKeys
    .map((key) =>
      toFixedBase36(
        Math.round(normalizedState.themeMultipliers[key] * weightScale),
        weightTokenWidth,
      ),
    )
    .join("");

  return [
    shareTokenVersion,
    toFixedBase36(Math.max(0, presetIndex), 1),
    toFixedBase36(normalizedState.maxProjects, maxProjectsTokenWidth),
    encodedCriteria,
    encodedThemes,
  ].join("");
}

export function decodeShareToken(
  token: string,
): ShareableAllocatorState | null {
  if (
    token.length !== shareTokenLength ||
    token[0] !== shareTokenVersion ||
    !/^[0-9a-z]+$/i.test(token)
  ) {
    return null;
  }

  const presetIndex = fromFixedBase36(token.slice(1, 2));
  const maxProjects = fromFixedBase36(
    token.slice(2, 2 + maxProjectsTokenWidth),
  );

  if (
    !Number.isFinite(presetIndex) ||
    presetIndex < 0 ||
    presetIndex >= sharePresetKeys.length ||
    !Number.isFinite(maxProjects) ||
    maxProjects < 1
  ) {
    return null;
  }

  let cursor = 2 + maxProjectsTokenWidth;
  const criterionEntries: Array<[CriterionKey, number]> = criterionKeys.map(
    (key) => {
      const parsedWeight = fromFixedBase36(
        token.slice(cursor, cursor + weightTokenWidth),
      );
      cursor += weightTokenWidth;
      return [
        key,
        Number((parsedWeight / weightScale).toFixed(weightPrecision)),
      ];
    },
  );
  const themeEntries: Array<[ThemeKey, number]> = themeKeys.map((key) => {
    const parsedWeight = fromFixedBase36(
      token.slice(cursor, cursor + weightTokenWidth),
    );
    cursor += weightTokenWidth;
    return [key, Number((parsedWeight / weightScale).toFixed(weightPrecision))];
  });

  const hasInvalidWeight = [...criterionEntries, ...themeEntries].some(
    ([, value]) => !Number.isFinite(value) || value <= 0,
  );

  if (hasInvalidWeight) {
    return null;
  }

  return normalizeShareState({
    maxProjects,
    presetKey: sharePresetKeys[presetIndex],
    criterionMultipliers: createCriterionWeights(
      Object.fromEntries(criterionEntries) as CriterionWeights,
    ),
    themeMultipliers: createThemeWeights(
      Object.fromEntries(themeEntries) as ThemeWeights,
    ),
  });
}

export function buildSharePath(state: ShareableAllocatorState) {
  return `/s/${encodeShareToken(state)}`;
}
