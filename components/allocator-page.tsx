"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleDollarSign,
  ExternalLink,
  Link2,
  Minus,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Plus,
} from "lucide-react";
import { AllocationSummary } from "@/components/allocator/allocation-summary";
import { ProjectTable } from "@/components/allocator/project-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  OFFICIAL_PROJECT_SHEET_URL,
  getGivethRoundUrl,
} from "@/data/allocator-metadata";
import {
  defaultBudget,
  defaultMaxProjects,
  defaultPresetKey,
  maxUserWeightMultiplier,
  minUserWeightMultiplier,
  presets,
  unitCriterionMultipliers,
  unitThemeMultipliers,
  weightStep,
} from "@/data/presets";
import { themeDefinitionByKey, themeDefinitions } from "@/data/themes";
import { scoreProjects } from "@/lib/scoring";
import {
  criterionDefinitions,
  type AllocationProject,
  type CriterionKey,
  type CriterionWeights,
  type QfEstimateContext,
  type ThemeKey,
  type ThemeWeights,
} from "@/lib/types";
import {
  serializeCriterionMultipliers,
  serializeThemeMultipliers,
} from "@/lib/url-state";

type AllocatorPageProps = {
  projects: AllocationProject[];
  initialBudget: number;
  initialMaxProjects: number;
  initialPresetKey: string;
  initialCriterionMultipliers: CriterionWeights;
  initialThemeMultipliers: ThemeWeights;
  qfEstimateContext: QfEstimateContext;
};

type WeightStepperProps = {
  label: string;
  description: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatMultiplier(value: number) {
  return `${value.toFixed(2)}x`;
}

function clampWeight(value: number) {
  return Number(
    Math.max(
      minUserWeightMultiplier,
      Math.min(maxUserWeightMultiplier, value),
    ).toFixed(2),
  );
}

function parseBudgetValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultBudget;
}

function parseMaxProjectsValue(value: string, projectCount: number) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0
    ? Math.min(projectCount, parsed)
    : defaultMaxProjects;
}

function buildSearchHaystack(project: AllocationProject) {
  const themeText = project.curation.themeBaskets
    .map((themeKey) => themeDefinitionByKey[themeKey].label)
    .join(" ");

  return [
    project.title,
    project.ownerName,
    project.descriptionSummary,
    project.categoryNames.join(" "),
    themeText,
  ]
    .join(" ")
    .toLowerCase();
}

function adjustWeight<T extends string>(
  weights: Record<T, number>,
  key: T,
  direction: -1 | 1,
) {
  return {
    ...weights,
    [key]: clampWeight(weights[key] + direction * weightStep),
  };
}

type DataChipLinkProps = {
  href: string;
  children: string;
  primary?: boolean;
};

function DataChipLink({ href, children, primary = false }: DataChipLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px ${
        primary
          ? "bg-primary text-primary-foreground border-primary/80"
          : "border-border/80 bg-background/75 text-foreground hover:border-primary/35 hover:bg-background"
      }`}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

type DataChipButtonProps = {
  children: string;
  onClick: () => void;
};

function DataChipButton({ children, onClick }: DataChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-border/80 bg-background/75 text-foreground hover:border-primary/35 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
    >
      {children}
      <Link2 className="h-3.5 w-3.5" />
    </button>
  );
}

function WeightStepper({
  label,
  description,
  value,
  onDecrease,
  onIncrease,
}: WeightStepperProps) {
  return (
    <div className="border-border/70 bg-background/70 rounded-3xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-foreground font-semibold">{label}</p>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            {description}
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {formatMultiplier(value)}
        </Badge>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={onDecrease}
          disabled={value <= minUserWeightMultiplier}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="border-border/70 bg-secondary/40 text-foreground flex-1 rounded-full border px-3 py-2 text-center text-sm font-medium">
          {formatMultiplier(value)}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={onIncrease}
          disabled={value >= maxUserWeightMultiplier}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function AllocatorPage({
  projects,
  initialBudget,
  initialMaxProjects,
  initialPresetKey,
  initialCriterionMultipliers,
  initialThemeMultipliers,
  qfEstimateContext,
}: AllocatorPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [presetKey, setPresetKey] = useState(
    initialPresetKey || defaultPresetKey,
  );
  const [budget, setBudget] = useState(initialBudget || defaultBudget);
  const [maxProjects, setMaxProjects] = useState(
    initialMaxProjects || defaultMaxProjects,
  );
  const [criterionMultipliers, setCriterionMultipliers] = useState(
    initialCriterionMultipliers,
  );
  const [themeMultipliers, setThemeMultipliers] = useState(
    initialThemeMultipliers,
  );
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const recommendations = scoreProjects(projects, {
    budget,
    maxProjects,
    presetKey,
    criterionMultipliers,
    themeMultipliers,
  });

  const filteredRecommendations = recommendations.filter((project) =>
    buildSearchHaystack(project).includes(deferredQuery.trim().toLowerCase()),
  );

  const allocatedProjects = recommendations.filter(
    (project) => project.allocationPercent > 0,
  );
  const topThemes = Array.from(
    new Set(
      allocatedProjects.flatMap((project) => project.curation.themeBaskets),
    ),
  );
  const roundUrl = getGivethRoundUrl(qfEstimateContext.roundSlug);

  const activeCriterionWeights = criterionDefinitions.filter(
    (criterion) => criterionMultipliers[criterion.key] !== 1,
  );
  const activeThemeWeights = themeDefinitions.filter(
    (theme) => themeMultipliers[theme.key] !== 1,
  );

  function updateUrlState(next: {
    budget?: number;
    maxProjects?: number;
    presetKey?: string;
    criterionMultipliers?: CriterionWeights;
    themeMultipliers?: ThemeWeights;
  }) {
    const nextBudget = next.budget ?? budget;
    const nextMaxProjects = next.maxProjects ?? maxProjects;
    const nextPresetKey = next.presetKey ?? presetKey;
    const nextCriterionMultipliers =
      next.criterionMultipliers ?? criterionMultipliers;
    const nextThemeMultipliers = next.themeMultipliers ?? themeMultipliers;

    const params = new URLSearchParams();

    setBudget(nextBudget);
    setMaxProjects(nextMaxProjects);
    setPresetKey(nextPresetKey);
    setCriterionMultipliers(nextCriterionMultipliers);
    setThemeMultipliers(nextThemeMultipliers);

    params.set("budget", String(nextBudget));
    params.set("max", String(nextMaxProjects));
    params.set("preset", nextPresetKey);

    const serializedCriteria = serializeCriterionMultipliers(
      nextCriterionMultipliers,
    );
    const serializedThemes = serializeThemeMultipliers(nextThemeMultipliers);

    if (serializedCriteria) {
      params.set("cw", serializedCriteria);
    }

    if (serializedThemes) {
      params.set("tw", serializedThemes);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function resetCustomization() {
    updateUrlState({
      maxProjects: defaultMaxProjects,
      criterionMultipliers: unitCriterionMultipliers,
      themeMultipliers: unitThemeMultipliers,
    });
  }

  function updateCriterionMultiplier(
    criterionKey: CriterionKey,
    direction: -1 | 1,
  ) {
    updateUrlState({
      criterionMultipliers: adjustWeight(
        criterionMultipliers,
        criterionKey,
        direction,
      ),
    });
  }

  function updateThemeMultiplier(themeKey: ThemeKey, direction: -1 | 1) {
    updateUrlState({
      themeMultipliers: adjustWeight(themeMultipliers, themeKey, direction),
    });
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="surface-panel border-primary/15 shadow-primary/5 overflow-hidden rounded-[2rem] border shadow-xl">
          <div className="space-y-8 px-6 py-8 md:px-8 lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <DataChipLink href={roundUrl} primary>
                  Ethereum Security Round
                </DataChipLink>
                <DataChipLink href={OFFICIAL_PROJECT_SHEET_URL}>
                  Official project sheet
                </DataChipLink>
                <DataChipButton onClick={copyShareLink}>
                  {copied ? "Copied share URL" : "Share allocator state"}
                </DataChipButton>
              </div>
              <div className="space-y-4">
                <h1 className="font-heading text-foreground text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                  Shape a smarter donation split before you open Giveth.
                </h1>
                <p className="text-muted-foreground max-w-3xl text-base leading-8 sm:text-lg">
                  Start from a preset, then change the actual weights. You can
                  favor tooling, deprioritize other baskets, raise track record,
                  and cap the final recommendation to a smaller number of
                  projects like 10.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="border-border/80 bg-background/75 rounded-3xl border p-4">
                  <ShieldCheck className="text-primary h-5 w-5" />
                  <p className="text-muted-foreground mt-3 text-sm font-semibold tracking-[0.18em] uppercase">
                    Projects
                  </p>
                  <p className="text-foreground mt-1 text-3xl font-semibold">
                    {projects.length}
                  </p>
                </div>
                <div className="border-border/80 bg-background/75 rounded-3xl border p-4">
                  <Sparkles className="text-primary h-5 w-5" />
                  <p className="text-muted-foreground mt-3 text-sm font-semibold tracking-[0.18em] uppercase">
                    Presets
                  </p>
                  <p className="text-foreground mt-1 text-3xl font-semibold">
                    {presets.length}
                  </p>
                </div>
                <div className="border-border/80 bg-background/75 rounded-3xl border p-4">
                  <CircleDollarSign className="text-primary h-5 w-5" />
                  <p className="text-muted-foreground mt-3 text-sm font-semibold tracking-[0.18em] uppercase">
                    Budget
                  </p>
                  <p className="text-foreground mt-1 text-3xl font-semibold">
                    {formatCurrency(budget)}
                  </p>
                </div>
                <div className="border-border/80 bg-background/75 rounded-3xl border p-4">
                  <Target className="text-primary h-5 w-5" />
                  <p className="text-muted-foreground mt-3 text-sm font-semibold tracking-[0.18em] uppercase">
                    Max ballot
                  </p>
                  <p className="text-foreground mt-1 text-3xl font-semibold">
                    {maxProjects}
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-border/80 bg-background/78 shadow-none">
              <CardHeader className="gap-4 xl:flex-row xl:items-end xl:justify-between">
                <CardTitle className="font-heading text-2xl">
                  Quick-start controls
                </CardTitle>
                <CardDescription className="max-w-3xl leading-6">
                  Presets are only a starting point. The recommendation updates
                  when you change budget, ballot size, signal weights, or theme
                  weights. Project metadata comes from the official sheet and
                  round stats refresh from Giveth roughly every{" "}
                  {qfEstimateContext.refreshIntervalMinutes} minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
                <div className="space-y-6">
                  <div className="border-border/70 bg-background/70 rounded-3xl border p-5">
                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                      Preset
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                      {presets.map((preset) => {
                        const active = preset.key === presetKey;

                        return (
                          <button
                            key={preset.key}
                            type="button"
                            onClick={() =>
                              updateUrlState({ presetKey: preset.key })
                            }
                            className={`rounded-3xl border px-4 py-4 text-left transition ${
                              active
                                ? "border-primary bg-primary/10 shadow-sm"
                                : "border-border/70 bg-background/70 hover:border-primary/40"
                            }`}
                          >
                            <p className="text-foreground font-semibold">
                              {preset.label}
                            </p>
                            <p className="text-muted-foreground mt-2 text-sm leading-6">
                              {preset.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-border/70 bg-background/70 rounded-3xl border p-5">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                          Budget
                        </p>
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          value={budget}
                          onChange={(event) =>
                            updateUrlState({
                              budget: parseBudgetValue(event.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                          Maximum projects
                        </p>
                        <Input
                          type="number"
                          min="1"
                          max={projects.length}
                          step="1"
                          value={maxProjects}
                          onChange={(event) =>
                            updateUrlState({
                              maxProjects: parseMaxProjectsValue(
                                event.target.value,
                                projects.length,
                              ),
                            })
                          }
                        />
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm leading-6">
                      Share state is encoded directly in the URL. The chip above
                      copies the current allocator configuration.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-border/70 bg-background/70 rounded-3xl border p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                          Criterion weights
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          How much each scoring dimension matters overall.
                        </p>
                      </div>
                      <SlidersHorizontal className="text-muted-foreground h-4 w-4" />
                    </div>
                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                      {criterionDefinitions.map((criterion) => (
                        <WeightStepper
                          key={criterion.key}
                          label={criterion.label}
                          description={`Current multiplier for ${criterion.label.toLowerCase()}.`}
                          value={criterionMultipliers[criterion.key]}
                          onDecrease={() =>
                            updateCriterionMultiplier(criterion.key, -1)
                          }
                          onIncrease={() =>
                            updateCriterionMultiplier(criterion.key, 1)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-border/70 bg-background/70 rounded-3xl border p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                          Theme weights
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Raise or lower specific baskets directly. This covers
                          cases like “tooling, vote for 10”.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        onClick={resetCustomization}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset custom weights
                      </Button>
                    </div>
                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                      {themeDefinitions.map((theme) => (
                        <WeightStepper
                          key={theme.key}
                          label={theme.label}
                          description={theme.blurb}
                          value={themeMultipliers[theme.key]}
                          onDecrease={() =>
                            updateThemeMultiplier(theme.key, -1)
                          }
                          onIncrease={() => updateThemeMultiplier(theme.key, 1)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <AllocationSummary
            projects={recommendations}
            budget={budget}
            maxProjects={maxProjects}
          />
          <Card className="border-border/80 bg-card/88 shadow-sm">
            <CardHeader className="gap-3">
              <CardTitle className="font-heading text-2xl">
                Current emphasis
              </CardTitle>
              <CardDescription className="leading-6">
                The preset still seeds the model, but the final recommendation
                is now shaped by explicit user multipliers and a ballot-size
                cap.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="border-border/70 bg-secondary/25 rounded-3xl border p-4">
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                  Active preset
                </p>
                <p className="text-foreground mt-2 text-xl font-semibold">
                  {presets.find((preset) => preset.key === presetKey)?.label ??
                    "Balanced"}
                </p>
              </div>
              <div className="border-border/70 bg-secondary/25 rounded-3xl border p-4">
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                  Maximum projects
                </p>
                <p className="text-foreground mt-2 text-xl font-semibold">
                  {maxProjects}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                  Criteria with custom weight
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeCriterionWeights.length > 0 ? (
                    activeCriterionWeights.map((criterion) => (
                      <Badge
                        key={criterion.key}
                        className="bg-primary text-primary-foreground rounded-full"
                      >
                        {criterion.shortLabel}{" "}
                        {formatMultiplier(criterionMultipliers[criterion.key])}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No custom criterion multipliers applied.
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                  Themes with custom weight
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeThemeWeights.length > 0 ? (
                    activeThemeWeights.map((theme) => (
                      <Badge
                        key={theme.key}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {theme.shortLabel}{" "}
                        {formatMultiplier(themeMultipliers[theme.key])}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No custom theme multipliers applied.
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                  Themes surfacing near the top
                </p>
                <div className="flex flex-wrap gap-2">
                  {topThemes.map((themeKey) => (
                    <Badge
                      key={themeKey}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {themeDefinitionByKey[themeKey].shortLabel}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <ProjectTable
          projects={filteredRecommendations}
          query={query}
          onQueryChange={setQuery}
          qfEstimateContext={qfEstimateContext}
        />
      </div>
    </main>
  );
}
