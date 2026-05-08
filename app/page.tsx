import { AllocatorPage } from "@/components/allocator-page";
import { getAllocationDataset } from "@/lib/projects";
import {
  parseCriterionMultipliersParam,
  parseMaxProjectsParam,
  parsePresetParam,
  parseThemeMultipliersParam,
} from "@/lib/url-state";

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({ searchParams }: HomeProps) {
  const { projects, qfEstimateContext } = await getAllocationDataset();
  const resolvedSearchParams = (await searchParams) ?? {};
  const maxProjects = parseMaxProjectsParam(
    getSingleParam(resolvedSearchParams.max),
  );
  const presetKey = parsePresetParam(
    getSingleParam(resolvedSearchParams.preset),
  );
  const criterionMultipliers = parseCriterionMultipliersParam(
    getSingleParam(resolvedSearchParams.cw),
  );
  const themeMultipliers = parseThemeMultipliersParam(
    getSingleParam(resolvedSearchParams.tw),
  );

  return (
    <AllocatorPage
      projects={projects}
      initialMaxProjects={maxProjects}
      initialPresetKey={presetKey}
      initialCriterionMultipliers={criterionMultipliers}
      initialThemeMultipliers={themeMultipliers}
      qfEstimateContext={qfEstimateContext}
    />
  );
}
