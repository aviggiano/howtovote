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
  budget: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function AllocationSummary({
  projects,
  budget,
}: AllocationSummaryProps) {
  const topProjects = projects.slice(0, 5);
  const topShare = topProjects.reduce(
    (total, project) => total + project.allocationPercent,
    0,
  );

  return (
    <Card className="surface-panel border-primary/15 shadow-primary/5 shadow-lg">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="font-heading text-foreground text-2xl">
              Recommended Allocation
            </CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-sm leading-6">
              The table stays fully explorable, but this top slice is the
              fastest path from preset to donation plan.
            </CardDescription>
          </div>
          <div className="border-primary/15 bg-background/70 rounded-2xl border px-4 py-3 text-right">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
              Budget
            </p>
            <p className="text-foreground mt-1 text-2xl font-semibold">
              {formatCurrency(budget)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border-border/80 bg-background/80 rounded-2xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Projects shown
            </p>
            <p className="text-foreground mt-2 text-3xl font-semibold">
              {projects.length}
            </p>
          </div>
          <div className="border-border/80 bg-background/80 rounded-2xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Top 5 share
            </p>
            <p className="text-foreground mt-2 text-3xl font-semibold">
              {formatPercent(topShare)}
            </p>
          </div>
          <div className="border-border/80 bg-background/80 rounded-2xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Highest single allocation
            </p>
            <p className="text-foreground mt-2 text-3xl font-semibold">
              {topProjects[0]
                ? formatPercent(topProjects[0].allocationPercent)
                : "0.0%"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          {topProjects.map((project) => (
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
                    {formatCurrency(project.allocationAmount)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {formatPercent(project.allocationPercent)}
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
