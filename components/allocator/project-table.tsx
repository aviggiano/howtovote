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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  criterionDefinitions,
  type ProjectRecommendation,
  type QfEstimateContext,
} from "@/lib/types";
import {
  GIVETH_COCM_ANNOUNCEMENT_URL,
  GIVETH_GRAPHQL_URL,
  GIVETH_QF_DOCS_URL,
  OFFICIAL_PROJECT_SHEET_TITLE,
  OFFICIAL_PROJECT_SHEET_URL,
  PROJECT_SPREADSHEET_LABEL,
  getGivethRoundUrl,
} from "@/data/allocator-metadata";
import { themeDefinitionByKey } from "@/data/themes";
import { cn } from "@/lib/utils";

type ProjectTableProps = {
  projects: ProjectRecommendation[];
  query: string;
  onQueryChange: (value: string) => void;
  qfEstimateContext: QfEstimateContext;
};

function getProjectInitial(project: ProjectRecommendation) {
  return project.title.trim().charAt(0).toUpperCase() || "?";
}

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

function formatConfidence(value: number) {
  return `${Math.round(value * 100)}%`;
}

function getSignalTotal(project: ProjectRecommendation) {
  return criterionDefinitions.reduce(
    (total, criterion) => total + project.curation[criterion.key],
    0,
  );
}

function scoreTone(score: number) {
  if (score >= 4.5) {
    return "text-sky-700";
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

type ReferenceChipLinkProps = {
  href: string;
  label: string;
};

function ReferenceChipLink({ href, label }: ReferenceChipLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-border/80 bg-background/75 text-foreground hover:border-primary/35 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

type ProjectIdentityProps = {
  project: ProjectRecommendation;
};

function ProjectIdentity({ project }: ProjectIdentityProps) {
  return (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <div className="flex items-start gap-3">
        {project.imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageUrl}
              alt=""
              loading="lazy"
              className="border-border/70 h-11 w-11 shrink-0 rounded-2xl border object-cover"
            />
          </>
        ) : (
          <div className="bg-secondary text-secondary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold">
            {getProjectInitial(project)}
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-foreground group-hover:text-primary font-semibold">
                {project.title}
              </p>
              <p className="text-muted-foreground text-sm">
                {project.ownerName}
              </p>
            </div>
            <ExternalLink className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {project.ownerTwitterName ? (
              <span>@{project.ownerTwitterName}</span>
            ) : null}
            {project.updatesCount > 0 ? (
              <span>{formatInteger(project.updatesCount)} updates</span>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  );
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
    <div className="border-border/70 bg-background/80 relative min-w-[4.75rem] overflow-hidden rounded-2xl border px-2.5 py-2 text-right">
      <div
        className="bg-primary/14 absolute inset-y-1 left-1 rounded-xl"
        style={{ width: `${visibleWidth}%` }}
      />
      <div className="relative">
        <p className="text-foreground font-medium tabular-nums">{primary}</p>
        {secondary ? (
          <p className="text-muted-foreground mt-0.5 text-xs">{secondary}</p>
        ) : null}
      </div>
    </div>
  );
}

type ScoreCellProps = {
  max: number;
  project: ProjectRecommendation;
};

function ScoreCell({ max, project }: ScoreCellProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            className="block w-full cursor-help text-left outline-none"
          />
        }
      >
        <NumericBarCell
          value={project.score}
          max={max}
          primary={project.score.toFixed(2)}
        />
      </TooltipTrigger>
      <TooltipContent>
        Confidence score: {formatConfidence(project.curation.confidenceScore)}
      </TooltipContent>
    </Tooltip>
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
  const projectCapUsd =
    qfEstimateContext.matchingPoolUsd * qfEstimateContext.maxPerProjectRatio;
  const roundUrl = getGivethRoundUrl(qfEstimateContext.roundSlug);
  const scoreMax = getMaxValue(projects, (project) => project.score);
  const allocationPercentMax = getMaxValue(
    projects,
    (project) => project.allocationPercent,
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
        const secondaryThemes = project.curation.themeBaskets.filter(
          (themeKey) => themeKey !== project.curation.primaryCategory,
        );

        return (
          <div className="space-y-2">
            <ProjectIdentity project={project} />
            <div className="flex flex-wrap gap-1.5">
              <Badge className="rounded-full text-[11px]">
                {
                  themeDefinitionByKey[project.curation.primaryCategory]
                    .shortLabel
                }
              </Badge>
              {secondaryThemes.map((themeKey) => (
                <Badge
                  key={themeKey}
                  variant="outline"
                  className="bg-background/80 rounded-full text-[11px]"
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
      accessorFn: getSignalTotal,
      id: "metrics",
      header: "Signals (1-5)",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex flex-col gap-1.5">
            {criterionDefinitions.map((criterion) => (
              <Badge
                key={criterion.key}
                variant="secondary"
                title={`${criterion.label}. ${criterion.description}`}
                className={cn(
                  "border-border/50 bg-secondary/60 justify-start rounded-full border px-2.5 text-[11px]",
                  scoreTone(project.curation[criterion.key]),
                )}
              >
                {criterion.shortLabel} {project.curation[criterion.key]}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => <ScoreCell project={row.original} max={scoreMax} />,
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
    <TooltipProvider>
      <Card className="border-border/80 bg-card/90 shadow-sm">
        <CardHeader className="gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <CardTitle className="font-heading text-foreground text-2xl">
              {OFFICIAL_PROJECT_SHEET_TITLE}
            </CardTitle>
            <p className="text-muted-foreground max-w-2xl text-sm leading-6">
              Sort the allocator output, compare it against live round traction,
              and cross-check everything against the third-party synced round
              spreadsheet.
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
            <div className="hidden md:block">
              <Table className="table-fixed">
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
                    <TableRow key={row.id} className="align-top">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-3 p-3 md:hidden">
              {projects.map((project) => {
                const secondaryThemes = project.curation.themeBaskets.filter(
                  (themeKey) => themeKey !== project.curation.primaryCategory,
                );

                return (
                  <div
                    key={project.projectUrl}
                    className="border-border/70 bg-background/80 rounded-3xl border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <ProjectIdentity project={project} />
                      </div>
                      <div className="text-right">
                        <p className="text-foreground font-semibold">
                          {formatPercent(project.allocationPercent)}
                        </p>
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                className="text-muted-foreground cursor-help text-sm"
                              />
                            }
                          >
                            Score {project.score.toFixed(2)}
                          </TooltipTrigger>
                          <TooltipContent>
                            Confidence score:{" "}
                            {formatConfidence(project.curation.confidenceScore)}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge className="rounded-full text-[11px]">
                        {
                          themeDefinitionByKey[project.curation.primaryCategory]
                            .shortLabel
                        }
                      </Badge>
                      {secondaryThemes.map((themeKey) => (
                        <Badge
                          key={themeKey}
                          variant="outline"
                          className="rounded-full text-[11px]"
                        >
                          {themeDefinitionByKey[themeKey].shortLabel}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-col gap-1.5">
                      {criterionDefinitions.map((criterion) => (
                        <Badge
                          key={criterion.key}
                          variant="secondary"
                          className={cn(
                            "border-border/50 bg-secondary/60 justify-start rounded-full border px-2.5 text-[11px]",
                            scoreTone(project.curation[criterion.key]),
                          )}
                        >
                          {criterion.shortLabel}{" "}
                          {project.curation[criterion.key]}
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
                            {formatCurrency(
                              project.qfEstimate.estimatedMatchUsd,
                            )}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-border/70 bg-background/70 rounded-3xl border p-4">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                Classification Methodology
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Project metadata comes from the{" "}
                <a
                  href={OFFICIAL_PROJECT_SHEET_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground decoration-primary/40 font-medium underline underline-offset-4"
                >
                  {PROJECT_SPREADSHEET_LABEL}
                </a>
                , which is synced by a third party. Each current participant is
                reviewed against that spreadsheet context and its linked
                website. The curation layer assigns one primary category, up to
                one secondary theme, five signal scores from 1 to 5, and a
                confidence score from 0 to 1 that is surfaced on score hover.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Confidence is higher when the project website and sheet summary
                explicitly point to the same fit. It is lower when the site is
                sparse, generic, or missing, in which case the classification
                relies more heavily on the sheet summary and linked public
                artifacts such as GitHub.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                <span className="text-foreground font-medium">
                  Score formula.
                </span>{" "}
                Final project score = sum of the five signal scores after preset
                weights and your criterion multipliers are applied, then
                multiplied by the average of the project&apos;s matched theme
                weights. Allocation = project score divided by the sum of the
                top N project scores, surfaced as a share of a 100% ballot.
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
                <span className="text-foreground font-medium">QF Raised</span>{" "}
                and{" "}
                <span className="text-foreground font-medium">QF Donors</span>{" "}
                use public {qfEstimateContext.roundName} donations that meet the
                round&apos;s $1 minimum, aggregated by donor wallet from
                Giveth&apos;s public GraphQL data.{" "}
                <span className="text-foreground font-medium">
                  QF Est. Match
                </span>{" "}
                applies a standard QF subsidy estimate to those public
                donations, normalizes to the current{" "}
                {formatCurrency(qfEstimateContext.matchingPoolUsd)} matching
                pool, and enforces the round&apos;s{" "}
                {formatPercent(qfEstimateContext.maxPerProjectRatio)}{" "}
                per-project cap ({formatCurrency(projectCapUsd)}). Data
                refreshes roughly every{" "}
                {qfEstimateContext.refreshIntervalMinutes} minutes. It does not
                model Giveth&apos;s non-public COCM clustering, ETHSecurity
                badge 4x donor weights, Passport or first-touch checks, or
                post-round fraud review.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ReferenceChipLink href={roundUrl} label="Round page" />
                <ReferenceChipLink
                  href={GIVETH_QF_DOCS_URL}
                  label="Giveth QF docs"
                />
                <ReferenceChipLink
                  href={GIVETH_COCM_ANNOUNCEMENT_URL}
                  label="COCM announcement"
                />
                <ReferenceChipLink
                  href={GIVETH_GRAPHQL_URL}
                  label="Public GraphQL API"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
