"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <Card className="surface-panel border-primary/15 shadow-primary/5 shadow-lg">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="font-heading text-foreground text-2xl">
              Recommended Allocation
            </CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-sm leading-6">
              This is the full current ballot in rank order, not just a fixed
              top-five slice, expressed as shares of a 100% ballot.
            </CardDescription>
          </div>
          <div className="border-primary/15 bg-background/70 rounded-2xl border px-4 py-3 text-right">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
              Allocation basis
            </p>
            <p className="text-foreground mt-1 text-2xl font-semibold">100%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border-border/80 bg-background/80 rounded-2xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Projects funded
            </p>
            <p className="text-foreground mt-2 text-3xl font-semibold">
              {includedProjects.length}
            </p>
          </div>
          <div className="border-border/80 bg-background/80 rounded-2xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Ballot cap
            </p>
            <p className="text-foreground mt-2 text-3xl font-semibold">
              {maxProjects}
            </p>
          </div>
          <div className="border-border/80 bg-background/80 rounded-2xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Largest allocation
            </p>
            <p className="text-foreground mt-2 text-3xl font-semibold">
              {leadProject
                ? formatPercent(leadProject.allocationPercent)
                : "0%"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          {includedProjects.map((project) => (
            <div key={project.projectUrl} className="space-y-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-foreground text-lg font-semibold">
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
                <div className="min-w-32 text-right">
                  <p className="text-foreground text-xl font-semibold">
                    {formatPercent(project.allocationPercent)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Score {project.score.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="bg-secondary h-3 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${project.allocationPercent * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
