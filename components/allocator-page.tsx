"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleDollarSign,
  Link2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
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
import { Separator } from "@/components/ui/separator";
import { defaultBudget, defaultPresetKey, presets } from "@/data/presets";
import { themeDefinitionByKey, themeDefinitions } from "@/data/themes";
import { scoreProjects } from "@/lib/scoring";
import type { AllocationProject, ThemeKey } from "@/lib/types";
import { serializeThemes } from "@/lib/url-state";

type AllocatorPageProps = {
  projects: AllocationProject[];
  initialBudget: number;
  initialPresetKey: string;
  initialSelectedThemes: ThemeKey[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function parseBudgetValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultBudget;
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

export function AllocatorPage({
  projects,
  initialBudget,
  initialPresetKey,
  initialSelectedThemes,
}: AllocatorPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [presetKey, setPresetKey] = useState(
    initialPresetKey || defaultPresetKey,
  );
  const [budget, setBudget] = useState(initialBudget || defaultBudget);
  const [selectedThemes, setSelectedThemes] = useState(
    initialSelectedThemes ?? [],
  );

  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const recommendations = scoreProjects(projects, {
    budget,
    presetKey,
    selectedThemes,
  });

  const filteredRecommendations = recommendations.filter((project) =>
    buildSearchHaystack(project).includes(deferredQuery.trim().toLowerCase()),
  );

  const topThemes = Array.from(
    new Set(
      filteredRecommendations
        .slice(0, 8)
        .flatMap((project) => project.curation.themeBaskets),
    ),
  );

  function updateUrlState(next: {
    budget?: number;
    presetKey?: string;
    selectedThemes?: ThemeKey[];
  }) {
    const nextBudget = next.budget ?? budget;
    const nextPresetKey = next.presetKey ?? presetKey;
    const nextThemes = next.selectedThemes ?? selectedThemes;
    const params = new URLSearchParams();

    setBudget(nextBudget);
    setPresetKey(nextPresetKey);
    setSelectedThemes(nextThemes);

    params.set("budget", String(nextBudget));
    params.set("preset", nextPresetKey);

    if (nextThemes.length > 0) {
      params.set("themes", serializeThemes(nextThemes));
    } else {
      params.delete("themes");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function toggleTheme(themeKey: ThemeKey) {
    const themeSet = new Set(selectedThemes);

    if (themeSet.has(themeKey)) {
      themeSet.delete(themeKey);
    } else {
      themeSet.add(themeKey);
    }

    updateUrlState({ selectedThemes: Array.from(themeSet) as ThemeKey[] });
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
          <div className="grid gap-8 px-6 py-8 md:px-8 lg:grid-cols-[1.25fr_0.85fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/90 text-primary-foreground rounded-full px-3 py-1">
                  Ethereum Security Round
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/70 rounded-full"
                >
                  Live sheet data
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/70 rounded-full"
                >
                  Shareable allocator state
                </Badge>
              </div>
              <div className="space-y-4">
                <h1 className="font-heading text-foreground text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                  Shape a smarter donation split before you open Giveth.
                </h1>
                <p className="text-muted-foreground max-w-3xl text-base leading-8 sm:text-lg">
                  This page turns the round spreadsheet into a donor-facing
                  recommendation engine. Pick a preset, emphasize the baskets
                  you care about, set your budget, and share the exact state by
                  URL.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
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
              </div>
            </div>

            <Card className="border-border/80 bg-background/78 shadow-none">
              <CardHeader className="space-y-3">
                <CardTitle className="font-heading text-2xl">
                  Quick-start controls
                </CardTitle>
                <CardDescription className="leading-6">
                  V1 keeps the choices tight: one preset, weighted baskets, one
                  budget, one share link.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                    Preset
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
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

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                      Theme emphasis
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => updateUrlState({ selectedThemes: [] })}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {themeDefinitions.map((theme) => {
                      const active = selectedThemes.includes(theme.key);

                      return (
                        <button
                          key={theme.key}
                          type="button"
                          onClick={() => toggleTheme(theme.key)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border/70 bg-background/70 text-foreground hover:border-primary/40"
                          }`}
                        >
                          {theme.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

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

                <Button
                  type="button"
                  className="w-full rounded-full"
                  onClick={copyShareLink}
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  {copied ? "Copied share link" : "Copy share link"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <AllocationSummary
            projects={filteredRecommendations}
            budget={budget}
          />
          <Card className="border-border/80 bg-card/88 shadow-sm">
            <CardHeader className="gap-3">
              <CardTitle className="font-heading text-2xl">
                Current emphasis
              </CardTitle>
              <CardDescription className="leading-6">
                The preset sets the base logic. Selected baskets are added as a
                visible weight multiplier, not a hard filter.
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
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                  Emphasized baskets
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedThemes.length > 0 ? (
                    selectedThemes.map((themeKey) => (
                      <Badge
                        key={themeKey}
                        className="bg-primary text-primary-foreground rounded-full"
                      >
                        {themeDefinitionByKey[themeKey].label}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No extra basket emphasis applied.
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
        />
      </div>
    </main>
  );
}
