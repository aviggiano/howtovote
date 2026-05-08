"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  Link2,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
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
  curationTransparencyNote,
  reusableCurationPrompt,
} from "@/data/curation-transparency";
import {
  defaultBudget,
  defaultMaxProjects,
  defaultPresetKey,
  maxThemeWeightMultiplier,
  maxUserWeightMultiplier,
  minThemeWeightMultiplier,
  minUserWeightMultiplier,
  presets,
  themeWeightStep,
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
import { buildSharePath } from "@/lib/url-state";

type AllocatorPageProps = {
  projects: AllocationProject[];
  initialMaxProjects: number;
  initialPresetKey: string;
  initialCriterionMultipliers: CriterionWeights;
  initialThemeMultipliers: ThemeWeights;
  qfEstimateContext: QfEstimateContext;
};

type WeightStepperProps = {
  label: string;
  description: string;
  decreaseDisabled: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
  increaseDisabled: boolean;
  valueLabel: string;
};

type DataChipLinkProps = {
  href: string;
  children: string;
  primary?: boolean;
};

type DataChipButtonProps = {
  children: string;
  onClick: () => void;
  active?: boolean;
};

type CopyState = "idle" | "copied" | "error";

function formatMultiplier(value: number, fractionDigits = 2) {
  return `${value.toFixed(fractionDigits)}x`;
}

function formatControlMultiplier(value: number) {
  return formatMultiplier(value, Number.isInteger(value) ? 0 : 2);
}

function clampWeight(
  value: number,
  min: number,
  max: number,
  precision: number,
) {
  return Number(Math.max(min, Math.min(max, value)).toFixed(precision));
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
  options: {
    max: number;
    min: number;
    precision: number;
    step: number;
  },
) {
  return {
    ...weights,
    [key]: clampWeight(
      weights[key] + direction * options.step,
      options.min,
      options.max,
      options.precision,
    ),
  };
}

function DataChipLink({ href, children, primary = false }: DataChipLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex max-w-full min-w-0 items-center gap-2 rounded-full border px-3 py-1.5 text-left text-sm font-medium transition hover:-translate-y-px ${
        primary
          ? "border-primary/30 bg-primary/8 text-foreground hover:border-primary/45 hover:bg-primary/12"
          : "border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background"
      }`}
    >
      <span className="min-w-0 truncate">{children}</span>
      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
    </a>
  );
}

function DataChipButton({
  children,
  onClick,
  active = false,
}: DataChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex max-w-full min-w-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px ${
        active
          ? "border-primary/35 bg-primary/10 text-foreground"
          : "border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background"
      }`}
    >
      {children}
      <Link2 className="h-3.5 w-3.5" />
    </button>
  );
}

function WeightStepper({
  label,
  description,
  decreaseDisabled,
  onDecrease,
  onIncrease,
  increaseDisabled,
  valueLabel,
}: WeightStepperProps) {
  return (
    <div className="border-border/75 bg-background/72 rounded-[1.35rem] border px-4 py-3.5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-foreground text-sm font-semibold">{label}</p>
          <span className="eyebrow text-muted-foreground">{valueLabel}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-6">{description}</p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="bg-background/92 rounded-full"
          onClick={onDecrease}
          disabled={decreaseDisabled}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="border-border/75 bg-secondary/38 text-foreground flex-1 rounded-full border px-3 py-2 text-center font-mono text-sm font-medium tabular-nums">
          {valueLabel}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="bg-background/92 rounded-full"
          onClick={onIncrease}
          disabled={increaseDisabled}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function AllocatorPage({
  projects,
  initialMaxProjects,
  initialPresetKey,
  initialCriterionMultipliers,
  initialThemeMultipliers,
  qfEstimateContext,
}: AllocatorPageProps) {
  const router = useRouter();

  const [presetKey, setPresetKey] = useState(
    initialPresetKey || defaultPresetKey,
  );
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
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const deferredQuery = useDeferredValue(query);

  const recommendations = scoreProjects(projects, {
    budget: defaultBudget,
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
  const activePreset =
    presets.find((preset) => preset.key === presetKey)?.label ?? "Balanced";

  const activeCriterionWeights = criterionDefinitions.filter(
    (criterion) => criterionMultipliers[criterion.key] !== 1,
  );
  const activeThemeWeights = themeDefinitions.filter(
    (theme) => themeMultipliers[theme.key] !== 1,
  );

  function updateUrlState(next: {
    maxProjects?: number;
    presetKey?: string;
    criterionMultipliers?: CriterionWeights;
    themeMultipliers?: ThemeWeights;
  }) {
    const nextMaxProjects = next.maxProjects ?? maxProjects;
    const nextPresetKey = next.presetKey ?? presetKey;
    const nextCriterionMultipliers =
      next.criterionMultipliers ?? criterionMultipliers;
    const nextThemeMultipliers = next.themeMultipliers ?? themeMultipliers;

    setMaxProjects(nextMaxProjects);
    setPresetKey(nextPresetKey);
    setCriterionMultipliers(nextCriterionMultipliers);
    setThemeMultipliers(nextThemeMultipliers);

    startTransition(() => {
      router.replace(
        buildSharePath({
          maxProjects: nextMaxProjects,
          presetKey: nextPresetKey,
          criterionMultipliers: nextCriterionMultipliers,
          themeMultipliers: nextThemeMultipliers,
        }),
        { scroll: false },
      );
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
        {
          min: minUserWeightMultiplier,
          max: maxUserWeightMultiplier,
          step: weightStep,
          precision: 2,
        },
      ),
    });
  }

  function updateThemeMultiplier(themeKey: ThemeKey, direction: -1 | 1) {
    updateUrlState({
      themeMultipliers: adjustWeight(themeMultipliers, themeKey, direction, {
        min: minThemeWeightMultiplier,
        max: maxThemeWeightMultiplier,
        step: themeWeightStep,
        precision: 0,
      }),
    });
  }

  async function copyShareLink() {
    const shareUrl = new URL(
      buildSharePath({
        maxProjects,
        presetKey,
        criterionMultipliers,
        themeMultipliers,
      }),
      window.location.origin,
    ).toString();

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    window.setTimeout(() => setCopyState("idle"), 1400);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-6 px-4 pt-5 pb-10 sm:px-6 lg:px-8 lg:pt-6 lg:pb-14">
        <section className="surface-panel panel-border overflow-hidden rounded-[2rem] border">
          <div className="grid gap-8 px-5 py-6 sm:px-6 lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-10">
            <div className="space-y-5">
              <p className="eyebrow text-muted-foreground">
                Ethereum Security allocator
              </p>
              <div className="max-w-4xl space-y-3">
                <h1 className="text-foreground text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.85rem] lg:leading-[1.02]">
                  Shape a smarter donation split before you open Giveth.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-[1.02rem] leading-7 sm:text-lg">
                  Start from a preset, change the weights that matter, and
                  compare the result against live round traction and project
                  details.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <DataChipLink href={roundUrl} primary>
                  {qfEstimateContext.roundName}
                </DataChipLink>
                <DataChipLink href={OFFICIAL_PROJECT_SHEET_URL}>
                  Source sheet
                </DataChipLink>
                <DataChipButton
                  onClick={copyShareLink}
                  active={copyState !== "idle"}
                >
                  {copyState === "copied"
                    ? "URL copied"
                    : copyState === "error"
                      ? "Copy failed"
                      : "Copy current URL"}
                </DataChipButton>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="border-border/75 bg-background/78 rounded-[1.45rem] border px-4 py-3.5">
                <ShieldCheck className="text-primary h-5 w-5" />
                <p className="eyebrow text-muted-foreground">Projects</p>
                <p className="text-foreground mt-2 text-2xl font-semibold">
                  {projects.length}
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Included in the current round.
                </p>
              </div>
              <div className="border-border/75 bg-background/78 rounded-[1.45rem] border px-4 py-3.5">
                <Sparkles className="text-primary h-5 w-5" />
                <p className="eyebrow text-muted-foreground">Presets</p>
                <p className="text-foreground mt-2 text-2xl font-semibold">
                  {presets.length}
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Starting positions available.
                </p>
              </div>
              <div className="border-border/75 bg-background/78 rounded-[1.45rem] border px-4 py-3.5">
                <SlidersHorizontal className="text-primary h-5 w-5" />
                <p className="eyebrow text-muted-foreground">Signals</p>
                <p className="text-foreground mt-2 text-2xl font-semibold">
                  {criterionDefinitions.length}
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Criteria in the scoring model.
                </p>
              </div>
              <div className="border-border/75 bg-background/78 rounded-[1.45rem] border px-4 py-3.5">
                <Target className="text-primary h-5 w-5" />
                <p className="eyebrow text-muted-foreground">Theme baskets</p>
                <p className="text-foreground mt-2 text-2xl font-semibold">
                  {themeDefinitions.length}
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Baskets you can overweight directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(19rem,22rem)_minmax(0,1fr)]">
          <aside className="space-y-4 xl:sticky xl:top-6 xl:max-h-[calc(100svh-3rem)] xl:self-start xl:overflow-y-auto xl:pr-1">
            <Card className="panel-border bg-card/88">
              <CardHeader className="gap-2">
                <p className="eyebrow text-muted-foreground">Quick setup</p>
                <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                  Quick setup
                </CardTitle>
                <CardDescription className="leading-6">
                  Choose a starting point, then cap how many projects make the
                  ballot.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="eyebrow text-muted-foreground">Preset</p>
                  <div className="grid gap-2">
                    {presets.map((preset) => {
                      const active = preset.key === presetKey;

                      return (
                        <button
                          key={preset.key}
                          type="button"
                          onClick={() =>
                            updateUrlState({ presetKey: preset.key })
                          }
                          className={`cursor-pointer rounded-[1.25rem] border px-4 py-3.5 text-left transition ${
                            active
                              ? "border-primary/35 bg-primary/8 shadow-[inset_0_1px_0_color-mix(in_oklab,white_60%,transparent)]"
                              : "border-border/75 bg-background/72 hover:border-primary/28 hover:bg-background/92"
                          }`}
                        >
                          <p className="text-foreground text-sm font-semibold">
                            {preset.label}
                          </p>
                          <p className="text-muted-foreground mt-1.5 text-sm leading-6">
                            {preset.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-border/75 bg-background/72 rounded-[1.35rem] border px-4 py-4">
                  <div className="flex items-end justify-between gap-3">
                    <label
                      htmlFor="max-projects"
                      className="space-y-1 text-sm leading-6"
                    >
                      <span className="eyebrow text-muted-foreground">
                        Ballot cap
                      </span>
                      <span className="text-foreground block">
                        Number of projects to include.
                      </span>
                    </label>
                    <div className="w-28">
                      <Input
                        id="max-projects"
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
                        aria-label="Maximum projects to include"
                      />
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    The allocator always returns a 100% ballot split.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="panel-border bg-primary/6 shadow-[0_24px_70px_-54px_color-mix(in_oklab,var(--color-primary)_30%,transparent)]">
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow text-primary/80">Main controls</p>
                    <CardTitle className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                      Tune the model
                    </CardTitle>
                  </div>
                  <SlidersHorizontal className="text-primary h-4 w-4" />
                </div>
                <CardDescription className="leading-6">
                  These are the main knobs.{" "}
                  <span className="text-foreground font-mono">1x</span> is
                  baseline. Raise a weight to lean harder on it, or lower it to
                  cool it off.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
                <div className="border-border/75 bg-background/72 rounded-[1.15rem] border px-3.5 py-3">
                  <p className="eyebrow text-muted-foreground">Baseline</p>
                  <p className="text-foreground mt-2 font-mono text-sm font-semibold">
                    1x
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Neutral weight.
                  </p>
                </div>
                <div className="border-border/75 bg-background/72 rounded-[1.15rem] border px-3.5 py-3">
                  <p className="eyebrow text-muted-foreground">Raise</p>
                  <p className="text-foreground mt-2 text-sm font-semibold">
                    Push it up
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Give that factor more pull.
                  </p>
                </div>
                <div className="border-border/75 bg-background/72 rounded-[1.15rem] border px-3.5 py-3">
                  <p className="eyebrow text-muted-foreground">Lower</p>
                  <p className="text-foreground mt-2 text-sm font-semibold">
                    Pull it back
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Soften it when you trust it less.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="panel-border bg-card/88">
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow text-muted-foreground">Core knobs</p>
                    <CardTitle className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                      Tune signal weights
                    </CardTitle>
                  </div>
                  <SlidersHorizontal className="text-muted-foreground h-4 w-4" />
                </div>
                <CardDescription className="leading-6">
                  Raise a signal to give it more influence in every score, or
                  lower it to soften its pull.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {criterionDefinitions.map((criterion) => (
                  <WeightStepper
                    key={criterion.key}
                    label={criterion.label}
                    description={criterion.description}
                    valueLabel={formatControlMultiplier(
                      criterionMultipliers[criterion.key],
                    )}
                    onDecrease={() =>
                      updateCriterionMultiplier(criterion.key, -1)
                    }
                    onIncrease={() =>
                      updateCriterionMultiplier(criterion.key, 1)
                    }
                    decreaseDisabled={
                      criterionMultipliers[criterion.key] <=
                      minUserWeightMultiplier
                    }
                    increaseDisabled={
                      criterionMultipliers[criterion.key] >=
                      maxUserWeightMultiplier
                    }
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="panel-border bg-card/88">
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow text-muted-foreground">Theme knobs</p>
                    <CardTitle className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                      Tune theme weights
                    </CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={resetCustomization}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <CardDescription className="leading-6">
                  Overweight or cool off a basket directly when you want the
                  ballot to tilt toward a theme.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {themeDefinitions.map((theme) => (
                  <WeightStepper
                    key={theme.key}
                    label={theme.label}
                    description={theme.blurb}
                    valueLabel={formatMultiplier(
                      themeMultipliers[theme.key],
                      0,
                    )}
                    onDecrease={() => updateThemeMultiplier(theme.key, -1)}
                    onIncrease={() => updateThemeMultiplier(theme.key, 1)}
                    decreaseDisabled={
                      themeMultipliers[theme.key] <= minThemeWeightMultiplier
                    }
                    increaseDisabled={
                      themeMultipliers[theme.key] >= maxThemeWeightMultiplier
                    }
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="panel-border bg-card/88 shadow-[0_24px_70px_-54px_color-mix(in_oklab,var(--color-primary)_26%,transparent)]">
              <CardHeader className="gap-2">
                <p className="eyebrow text-muted-foreground">Model state</p>
                <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                  Model state
                </CardTitle>
                <CardDescription className="leading-6">
                  Preset, ballot cap, and active overrides.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="border-border/75 bg-background/72 rounded-[1.25rem] border px-4 py-3">
                    <p className="eyebrow text-muted-foreground">Preset</p>
                    <p className="text-foreground mt-2 text-lg font-semibold">
                      {activePreset}
                    </p>
                  </div>
                  <div className="border-border/75 bg-background/72 rounded-[1.25rem] border px-4 py-3">
                    <p className="eyebrow text-muted-foreground">Ballot cap</p>
                    <p className="text-foreground mt-2 text-lg font-semibold">
                      {maxProjects} projects
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="eyebrow text-muted-foreground">
                    Signal overrides
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeCriterionWeights.length > 0 ? (
                      activeCriterionWeights.map((criterion) => (
                        <Badge
                          key={criterion.key}
                          className="bg-primary text-primary-foreground rounded-full"
                        >
                          {criterion.shortLabel}{" "}
                          {formatMultiplier(
                            criterionMultipliers[criterion.key],
                            0,
                          )}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm leading-6">
                        All signals are at baseline.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="eyebrow text-muted-foreground">
                    Theme overrides
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
                          {formatMultiplier(themeMultipliers[theme.key], 0)}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm leading-6">
                        All theme baskets are at baseline.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="eyebrow text-muted-foreground">
                    Themes in the current ballot
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topThemes.length > 0 ? (
                      topThemes.map((themeKey) => (
                        <Badge
                          key={themeKey}
                          variant="secondary"
                          className="rounded-full"
                        >
                          {themeDefinitionByKey[themeKey].shortLabel}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm leading-6">
                        No projects are currently allocating.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <AllocationSummary
              projects={recommendations}
              maxProjects={maxProjects}
            />
            <ProjectTable
              projects={filteredRecommendations}
              query={query}
              onQueryChange={setQuery}
              qfEstimateContext={qfEstimateContext}
            />
          </div>
        </section>

        <section className="space-y-4">
          <details className="panel-border bg-card/88 rounded-[1.6rem] border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <div>
                <p className="eyebrow text-muted-foreground">Reference</p>
                <p className="text-foreground mt-1 text-base font-semibold">
                  How the curation scores were produced
                </p>
              </div>
              <span className="text-muted-foreground text-sm">
                Open methodology
              </span>
            </summary>
            <div className="border-border/70 text-muted-foreground space-y-3 border-t px-5 py-4 text-sm leading-6">
              <p>{curationTransparencyNote}</p>
              <p>
                Reusable review prompt: This is the closest prompt-form rubric
                for anyone who wants to sanity check the scores independently.
              </p>
              <pre className="bg-muted/60 text-foreground overflow-x-auto rounded-[1.15rem] border p-4 text-xs leading-6 whitespace-pre-wrap">
                {reusableCurationPrompt}
              </pre>
            </div>
          </details>

          <footer className="text-muted-foreground flex justify-center pt-1 pb-2 text-sm">
            <a
              href="https://x.com/aviggiano"
              target="_blank"
              rel="noreferrer"
              className="text-foreground decoration-primary/35 font-medium underline underline-offset-4"
            >
              Built by aviggiano
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}
