"use client";

import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  criterionDefinitions,
  type ProjectRecommendation,
  type QfEstimateContext,
} from "@/lib/types";
import {
  OFFICIAL_PROJECT_SHEET_TITLE,
  OFFICIAL_PROJECT_SHEET_URL,
} from "@/data/allocator-metadata";
import { themeDefinitionByKey } from "@/data/themes";
import { cn } from "@/lib/utils";

type ProjectTableProps = {
  projects: ProjectRecommendation[];
  query: string;
  onQueryChange: (value: string) => void;
  qfEstimateContext: QfEstimateContext;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatInteger(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function scoreTone(score: number) {
  if (score >= 4.5) {
    return "text-primary";
  }
  if (score >= 3.5) {
    return "text-foreground";
  }
  return "text-muted-foreground";
}

function getMaxValue(
  projects: ProjectRecommendation[],
  selector: (project: ProjectRecommendation) => number,
) {
  return projects.reduce((max, project) => Math.max(max, selector(project)), 0);
}

type NumericBarCellProps = {
  value: number;
  max: number;
  primary: string;
  secondary?: string;
};

function NumericBarCell({
  value,
  max,
  primary,
  secondary,
}: NumericBarCellProps) {
  const width = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const visibleWidth = value > 0 ? Math.max(width, 8) : 0;

  return (
    <div className="border-border/70 bg-background/80 relative min-w-24 overflow-hidden rounded-2xl border px-3 py-2 text-right">
      <div
        className="bg-primary/14 absolute inset-y-1 left-1 rounded-xl"
        style={{ width: `${visibleWidth}%` }}
      />
      <div className="relative">
        <p className="text-foreground font-medium">{primary}</p>
        {secondary ? (
          <p className="text-muted-foreground mt-0.5 text-xs">{secondary}</p>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectTable({
  projects,
  query,
  onQueryChange,
  qfEstimateContext,
}: ProjectTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "allocationPercent", desc: true },
  ]);
  const [expandedProjectUrl, setExpandedProjectUrl] = React.useState<
    string | null
  >(null);
  const projectCapUsd =
    qfEstimateContext.matchingPoolUsd * qfEstimateContext.maxPerProjectRatio;
  const scoreMax = getMaxValue(projects, (project) => project.score);
  const allocationPercentMax = getMaxValue(
    projects,
    (project) => project.allocationPercent,
  );
  const allocationAmountMax = getMaxValue(
    projects,
    (project) => project.allocationAmount,
  );
  const qfRaisedMax = getMaxValue(
    projects,
    (project) => project.qfEstimate?.raisedUsd ?? 0,
  );
  const qfDonorMax = getMaxValue(
    projects,
    (project) => project.qfEstimate?.donorCount ?? 0,
  );
  const qfMatchMax = getMaxValue(
    projects,
    (project) => project.qfEstimate?.estimatedMatchUsd ?? 0,
  );

  const columns: ColumnDef<ProjectRecommendation>[] = [
    {
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-primary font-semibold"
                >
                  {project.title}
                </a>
                <p className="text-muted-foreground text-sm">
                  {project.ownerName}
                </p>
              </div>
              <ExternalLink className="text-muted-foreground mt-1 h-4 w-4" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.curation.themeBaskets.map((themeKey) => (
                <Badge
                  key={themeKey}
                  variant="outline"
                  className="bg-background/80 rounded-full"
                >
                  {themeDefinitionByKey[themeKey].shortLabel}
                </Badge>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      id: "metrics",
      header: "Signals (1-5)",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex flex-wrap gap-1.5">
            {criterionDefinitions.map((criterion) => (
              <Badge
                key={criterion.key}
                variant="secondary"
                title={`${criterion.label}. ${criterion.description}`}
                className={cn(
                  "border-border/50 bg-secondary/60 rounded-full border",
                  scoreTone(project.curation[criterion.key]),
                )}
              >
                {criterion.shortLabel} {project.curation[criterion.key]}
              </Badge>
            ))}
            <Badge variant="outline" className="bg-background/80 rounded-full">
              {project.curation.source === "manual" ? "Manual" : "Generated"}
            </Badge>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => (
        <NumericBarCell
          value={row.original.score}
          max={scoreMax}
          primary={row.original.score.toFixed(2)}
        />
      ),
    },
    {
      accessorKey: "allocationPercent",
      header: "Allocation",
      cell: ({ row }) => (
        <NumericBarCell
          value={row.original.allocationPercent}
          max={allocationPercentMax}
          primary={formatPercent(row.original.allocationPercent)}
        />
      ),
    },
    {
      accessorKey: "allocationAmount",
      header: "Amount",
      cell: ({ row }) => (
        <NumericBarCell
          value={row.original.allocationAmount}
          max={allocationAmountMax}
          primary={formatCurrency(row.original.allocationAmount)}
        />
      ),
    },
    {
      accessorFn: (project) => project.qfEstimate?.raisedUsd ?? 0,
      id: "qfRaisedUsd",
      header: "QF Raised",
      cell: ({ row }) =>
        row.original.qfEstimate ? (
          <NumericBarCell
            value={row.original.qfEstimate.raisedUsd}
            max={qfRaisedMax}
            primary={formatCurrency(row.original.qfEstimate.raisedUsd)}
          />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      accessorFn: (project) => project.qfEstimate?.donorCount ?? 0,
      id: "qfDonorCount",
      header: "QF Donors",
      cell: ({ row }) =>
        row.original.qfEstimate ? (
          <NumericBarCell
            value={row.original.qfEstimate.donorCount}
            max={qfDonorMax}
            primary={formatInteger(row.original.qfEstimate.donorCount)}
          />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      accessorFn: (project) => project.qfEstimate?.estimatedMatchUsd ?? 0,
      id: "qfEstimatedMatchUsd",
      header: "QF Est. Match",
      cell: ({ row }) =>
        row.original.qfEstimate ? (
          <NumericBarCell
            value={row.original.qfEstimate.estimatedMatchUsd}
            max={qfMatchMax}
            primary={formatCurrency(row.original.qfEstimate.estimatedMatchUsd)}
          />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      id: "details",
      header: "",
      cell: ({ row }) => {
        const project = row.original;
        const expanded = expandedProjectUrl === project.projectUrl;

        return (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() =>
              setExpandedProjectUrl(expanded ? null : project.projectUrl)
            }
          >
            {expanded ? "Hide" : "Why"}
          </Button>
        );
      },
      enableSorting: false,
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className="border-border/80 bg-card/90 shadow-sm">
      <CardHeader className="gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <CardTitle className="font-heading text-foreground text-2xl">
            {OFFICIAL_PROJECT_SHEET_TITLE}
          </CardTitle>
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            Sort the allocator output, compare it against live round traction,
            and cross-check everything against the official sheet source.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by project, owner, or theme"
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-border/80 rounded-3xl border">
          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <Button
                            variant="ghost"
                            className="-ml-3 h-9 rounded-full px-3 text-left"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : null}
                          </Button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow className="align-top">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {expandedProjectUrl === row.original.projectUrl ? (
                      <TableRow className="bg-secondary/20">
                        <TableCell colSpan={columns.length}>
                          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                            <div className="space-y-3">
                              <p className="text-muted-foreground text-sm leading-6">
                                {row.original.descriptionSummary}
                              </p>
                              {row.original.qfEstimate ? (
                                <div className="grid gap-3 sm:grid-cols-3">
                                  <div className="border-border/70 bg-background/70 rounded-2xl border p-4">
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                                      QF Raised
                                    </p>
                                    <p className="text-foreground mt-2 text-lg font-semibold">
                                      {formatCurrency(
                                        row.original.qfEstimate.raisedUsd,
                                      )}
                                    </p>
                                  </div>
                                  <div className="border-border/70 bg-background/70 rounded-2xl border p-4">
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                                      QF Donors
                                    </p>
                                    <p className="text-foreground mt-2 text-lg font-semibold">
                                      {formatInteger(
                                        row.original.qfEstimate.donorCount,
                                      )}
                                    </p>
                                  </div>
                                  <div className="border-border/70 bg-background/70 rounded-2xl border p-4">
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                                      QF Est. Match
                                    </p>
                                    <p className="text-foreground mt-2 text-lg font-semibold">
                                      {formatCurrency(
                                        row.original.qfEstimate
                                          .estimatedMatchUsd,
                                      )}
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                              <p className="border-border/70 bg-background/70 text-muted-foreground rounded-2xl border p-4 text-sm leading-6">
                                {row.original.curation.notes}
                              </p>
                            </div>
                            <div className="border-border/70 bg-background/70 rounded-2xl border p-4">
                              <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                                Weighted breakdown
                              </p>
                              <div className="mt-4 space-y-3">
                                {criterionDefinitions.map((criterion) => (
                                  <div
                                    key={criterion.key}
                                    className="space-y-1.5"
                                  >
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">
                                        {criterion.label}
                                      </span>
                                      <span className="text-foreground font-medium">
                                        {row.original.breakdown[
                                          criterion.key
                                        ].toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="bg-secondary h-2 overflow-hidden rounded-full">
                                      <div
                                        className="bg-primary h-full rounded-full"
                                        style={{
                                          width: `${(row.original.breakdown[criterion.key] / 7.5) * 100}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-3 p-3 md:hidden">
            {projects.map((project) => {
              const expanded = expandedProjectUrl === project.projectUrl;

              return (
                <div
                  key={project.projectUrl}
                  className="border-border/70 bg-background/80 rounded-3xl border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground hover:text-primary font-semibold"
                      >
                        {project.title}
                      </a>
                      <p className="text-muted-foreground text-sm">
                        {project.ownerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground font-semibold">
                        {formatCurrency(project.allocationAmount)}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatPercent(project.allocationPercent)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.curation.themeBaskets.map((themeKey) => (
                      <Badge
                        key={themeKey}
                        variant="outline"
                        className="rounded-full"
                      >
                        {themeDefinitionByKey[themeKey].shortLabel}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-secondary mt-4 h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${project.allocationPercent * 100}%` }}
                    />
                  </div>
                  {project.qfEstimate ? (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="border-border/70 bg-secondary/20 rounded-2xl border p-3">
                        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                          Raised
                        </p>
                        <p className="text-foreground mt-2 text-sm font-semibold">
                          {formatCurrency(project.qfEstimate.raisedUsd)}
                        </p>
                      </div>
                      <div className="border-border/70 bg-secondary/20 rounded-2xl border p-3">
                        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                          Donors
                        </p>
                        <p className="text-foreground mt-2 text-sm font-semibold">
                          {formatInteger(project.qfEstimate.donorCount)}
                        </p>
                      </div>
                      <div className="border-border/70 bg-secondary/20 rounded-2xl border p-3">
                        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                          Est. Match
                        </p>
                        <p className="text-foreground mt-2 text-sm font-semibold">
                          {formatCurrency(project.qfEstimate.estimatedMatchUsd)}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-3 rounded-full"
                    onClick={() =>
                      setExpandedProjectUrl(
                        expanded ? null : project.projectUrl,
                      )
                    }
                  >
                    {expanded ? "Hide rationale" : "Show rationale"}
                  </Button>
                  {expanded ? (
                    <div className="border-border/70 bg-secondary/20 text-muted-foreground mt-3 rounded-2xl border p-4 text-sm leading-6">
                      {project.curation.notes}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
          <div className="border-border/70 bg-background/70 rounded-3xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Curated Signals Methodology
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              Project metadata comes from the{" "}
              <a
                href={OFFICIAL_PROJECT_SHEET_URL}
                target="_blank"
                rel="noreferrer"
                className="text-foreground decoration-primary/40 font-medium underline underline-offset-4"
              >
                official project sheet
              </a>
              . Raw curation signals are scored from 1 to 5. If a project has a
              manual curation entry, that manual score wins. Otherwise the app
              generates a baseline from sheet metadata and category tags.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              <span className="text-foreground font-medium">
                Score formula.
              </span>{" "}
              Final project score = sum of the five signal scores after preset
              weights and your criterion multipliers are applied, then
              multiplied by the average of the project&apos;s matched theme
              weights. Allocation = project score divided by the sum of the top{" "}
              N project scores, then multiplied by budget.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-5">
              {criterionDefinitions.map((criterion) => (
                <div
                  key={criterion.key}
                  className="border-border/70 bg-card/80 rounded-2xl border p-3"
                >
                  <p className="text-foreground font-semibold">
                    {criterion.shortLabel}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs font-semibold tracking-[0.16em] uppercase">
                    {criterion.label}
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    {criterion.description}
                  </p>
                  <p className="text-muted-foreground mt-3 text-xs leading-5">
                    {criterion.calculation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-border/70 bg-background/70 rounded-3xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              QF Estimate Methodology
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              <span className="text-foreground font-medium">QF Raised</span> and{" "}
              <span className="text-foreground font-medium">QF Donors</span> use
              public {qfEstimateContext.roundName} donations that meet the
              round&apos;s $1 minimum, aggregated by donor wallet.{" "}
              <span className="text-foreground font-medium">QF Est. Match</span>{" "}
              applies a standard QF subsidy estimate to those public donations,
              normalizes to the current{" "}
              {formatCurrency(qfEstimateContext.matchingPoolUsd)} matching pool,
              and enforces the round&apos;s{" "}
              {formatPercent(qfEstimateContext.maxPerProjectRatio)} per-project
              cap ({formatCurrency(projectCapUsd)}). Data refreshes roughly
              every {qfEstimateContext.refreshIntervalMinutes} minutes. It does
              not model Giveth&apos;s non-public COCM clustering, ETHSecurity
              badge 4x donor weights, Passport or first-touch checks, or
              post-round fraud review.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
