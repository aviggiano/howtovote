"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themeDefinitionByKey } from "@/data/themes";
import type { ProjectRecommendation } from "@/lib/types";

type AllocationSummaryProps = {
  projects: ProjectRecommendation[];
  maxProjects: number;
};

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function AllocationSummary({
  projects,
  maxProjects,
}: AllocationSummaryProps) {
  const includedProjects = projects.filter(
    (project) => project.allocationPercent > 0,
  );
  const leadProject = includedProjects[0] ?? null;

  return (
    <Card className="surface-panel panel-border shadow-[0_30px_90px_-58px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]">
      <CardHeader className="border-border/70 gap-4 border-b pb-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="eyebrow text-muted-foreground">Recommended ballot</p>
          <CardTitle className="text-foreground text-2xl font-semibold tracking-[-0.03em]">
            Recommended ballot
          </CardTitle>
          <CardDescription className="max-w-2xl leading-6">
            The current model allocates across every project with a non-zero
            share.
          </CardDescription>
        </div>

        <div className="grid gap-2 text-right sm:grid-cols-3">
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Picks</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {includedProjects.length}
            </p>
          </div>
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Cap</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {maxProjects}
            </p>
          </div>
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Lead share</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {leadProject
                ? formatPercent(leadProject.allocationPercent)
                : "0%"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {includedProjects.length > 0 ? (
          includedProjects.map((project, index) => (
            <div
              key={project.projectUrl}
              className="border-border/75 bg-background/76 grid gap-4 rounded-[1.5rem] border px-4 py-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start"
            >
              <div className="border-border/75 bg-secondary/45 text-foreground flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-medium">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-foreground text-base font-semibold">
                      {project.title}
                    </h3>
                    {project.curation.themeBaskets.map((themeKey) => (
                      <Badge
                        key={themeKey}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {themeDefinitionByKey[themeKey].shortLabel}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.ownerName}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="bg-secondary/65 h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${project.allocationPercent * 100}%` }}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm leading-6">
                    Score {project.score.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="text-left md:min-w-28 md:text-right">
                <p className="text-foreground text-2xl font-semibold">
                  {formatPercent(project.allocationPercent)}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Ballot share
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="border-border/80 bg-background/70 rounded-[1.5rem] border border-dashed px-4 py-6">
            <p className="text-muted-foreground text-sm leading-6">
              No projects are allocating under the current model.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
