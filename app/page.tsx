import type { ThemeKey } from "@/lib/types";
import { AllocatorPage } from "@/components/allocator-page";
import { getAllocationProjects } from "@/lib/projects";
import {
  parseBudgetParam,
  parsePresetParam,
  parseThemesParam,
} from "@/lib/url-state";

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({ searchParams }: HomeProps) {
  const projects = await getAllocationProjects();
  const resolvedSearchParams = (await searchParams) ?? {};
  const budget = parseBudgetParam(getSingleParam(resolvedSearchParams.budget));
  const presetKey = parsePresetParam(
    getSingleParam(resolvedSearchParams.preset),
  );
  const selectedThemes = parseThemesParam(
    getSingleParam(resolvedSearchParams.themes),
  ) as ThemeKey[];

  return (
    <AllocatorPage
      projects={projects}
      initialBudget={budget}
      initialPresetKey={presetKey}
      initialSelectedThemes={selectedThemes}
    />
  );
}
