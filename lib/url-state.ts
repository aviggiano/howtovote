import { defaultBudget, defaultPresetKey } from "@/data/presets";
import { themeKeys, type ThemeKey } from "@/lib/types";

export type InitialAllocatorState = {
  budget: number;
  presetKey: string;
  selectedThemes: ThemeKey[];
};

export function parseBudgetParam(value: string | null | undefined) {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultBudget;
}

export function parsePresetParam(value: string | null | undefined) {
  return value?.trim() || defaultPresetKey;
}

export function parseThemesParam(value: string | null | undefined): ThemeKey[] {
  if (!value) {
    return [];
  }

  const validThemes = new Set(themeKeys);

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is ThemeKey => validThemes.has(item as ThemeKey));
}

export function serializeThemes(themes: ThemeKey[]) {
  return themes.join(",");
}
