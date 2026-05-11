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
  OFFICIAL_PROJECT_SHEET_URL,
  getGivethRoundUrl,
} from "@/data/allocator-metadata";
import { themeDefinitionByKey } from "@/data/themes";
import {
  getAddressExplorerUrl,
  getTransactionExplorerUrl,
} from "@/lib/explorer-links";
import { cn } from "@/lib/utils";

type ProjectTableProps = {
  projects: ProjectRecommendation[];
  query: string;
  onQueryChange: (value: string) => void;
  qfEstimateContext: QfEstimateContext;
};

type ReferenceChipLinkProps = {
  href: string;
  label: string;
};

type ProjectIdentityProps = {
  project: ProjectRecommendation;
};

type NumericBarCellProps = {
  value: number;
  max: number;
  primary: string;
  secondary?: string;
};

type ScoreCellProps = {
  max: number;
  project: ProjectRecommendation;
};

type MethodologyPanelProps = {
  title: string;
  summary: string;
  children: React.ReactNode;
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

function formatSignedCurrency(value: number) {
  const absolute = formatCurrency(Math.abs(value));

  if (value > 0) {
    return `+${absolute}`;
  }

  if (value < 0) {
    return `-${absolute}`;
  }

  return absolute;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatConfidence(value: number) {
  return `${Math.round(value * 100)}%`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function WalletValue({ walletAddress }: { walletAddress: string }) {
  const explorerUrl = getAddressExplorerUrl(walletAddress);

  if (!explorerUrl) {
    return <span className="font-mono text-[0.72rem]">{walletAddress}</span>;
  }

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noreferrer"
      className="text-foreground hover:text-primary font-mono text-[0.72rem] break-all underline decoration-transparent underline-offset-4 transition hover:decoration-current"
    >
      {walletAddress}
    </a>
  );
}

function TransactionValue({
  networkId,
  transactionHash,
}: {
  networkId: number | null;
  transactionHash: string | null;
}) {
  if (!transactionHash) {
    return <span className="text-muted-foreground text-xs">No tx</span>;
  }

  const explorerUrl = getTransactionExplorerUrl(
    transactionHash,
    networkId ?? 1,
  );

  if (!explorerUrl) {
    return <span className="font-mono text-[0.72rem]">{transactionHash}</span>;
  }

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noreferrer"
      className="text-foreground hover:text-primary font-mono text-[0.72rem] break-all underline decoration-transparent underline-offset-4 transition hover:decoration-current"
    >
      {transactionHash}
    </a>
  );
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

function ReferenceChipLink({ href, label }: ReferenceChipLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

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
              className="border-border/75 h-11 w-11 shrink-0 rounded-2xl border object-cover"
            />
          </>
        ) : (
          <div className="border-border/75 bg-secondary/45 text-secondary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold">
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

function NumericBarCell({
  value,
  max,
  primary,
  secondary,
}: NumericBarCellProps) {
  const width = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const visibleWidth = value > 0 ? Math.max(width, 8) : 0;

  return (
    <div className="border-border/75 bg-background/82 relative min-w-[4.75rem] overflow-hidden rounded-2xl border px-2.5 py-2 text-right">
      <div
        className="bg-primary/12 absolute inset-y-1 left-1 rounded-xl"
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

function MethodologyPanel({ title, summary, children }: MethodologyPanelProps) {
  return (
    <details className="group border-border/75 bg-background/76 rounded-[1.5rem] border">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <div className="space-y-1.5">
          <p className="eyebrow text-muted-foreground">Reference</p>
          <p className="text-foreground text-base font-semibold">{title}</p>
          <p className="text-muted-foreground text-sm leading-6">{summary}</p>
        </div>
        <ChevronDown className="text-muted-foreground mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-border/70 border-t px-4 py-4">{children}</div>
    </details>
  );
}

function ProjectBadgeTracePanel({ project }: ProjectIdentityProps) {
  const traceRows = project.qfEstimate?.badgeDonationTraces ?? [];
  const unresolvedDonationCount =
    project.qfEstimate?.unresolvedDonationCount ?? 0;
  const unresolvedRaisedUsd = project.qfEstimate?.unresolvedRaisedUsd ?? 0;

  return (
    <div className="border-border/75 bg-background/80 space-y-4 rounded-[1.35rem] border p-4">
      <div className="space-y-1">
        <p className="eyebrow text-muted-foreground">Per-project badge trace</p>
        <p className="text-foreground text-sm font-semibold">
          Verified badge-holder donations for {project.title}
        </p>
      </div>

      {traceRows.length > 0 ? (
        <>
          <div className="hidden md:block">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Tx</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actual $</TableHead>
                  <TableHead>Weighted $</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {traceRows.map((traceRow) => (
                  <TableRow
                    key={`${traceRow.walletAddress}:${traceRow.donatedAt}:${traceRow.actualUsd}`}
                  >
                    <TableCell>
                      <WalletValue walletAddress={traceRow.walletAddress} />
                    </TableCell>
                    <TableCell>
                      <TransactionValue
                        transactionHash={traceRow.transactionHash}
                        networkId={traceRow.transactionNetworkId}
                      />
                    </TableCell>
                    <TableCell>{formatDate(traceRow.donatedAt)}</TableCell>
                    <TableCell>{formatCurrency(traceRow.actualUsd)}</TableCell>
                    <TableCell>
                      {formatCurrency(traceRow.weightedUsd)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 md:hidden">
            {traceRows.map((traceRow) => (
              <div
                key={`${traceRow.walletAddress}:${traceRow.donatedAt}:${traceRow.actualUsd}`}
                className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <WalletValue walletAddress={traceRow.walletAddress} />
                    <p className="text-muted-foreground mt-1 text-sm">
                      {formatDate(traceRow.donatedAt)}
                    </p>
                    <div className="mt-2">
                      <TransactionValue
                        transactionHash={traceRow.transactionHash}
                        networkId={traceRow.transactionNetworkId}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground text-sm font-semibold">
                      {formatCurrency(traceRow.actualUsd)}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {formatCurrency(traceRow.weightedUsd)} weighted
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-sm leading-6">
          No verified badge-holder donations were detected for this project.
        </p>
      )}

      {unresolvedDonationCount > 0 ? (
        <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
          <p className="text-foreground text-sm font-semibold">
            Unresolved donations
          </p>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {formatInteger(unresolvedDonationCount)} donations (
            {formatCurrency(unresolvedRaisedUsd)}) did not expose a donor
            wallet, so they remain unboosted in the canonical model.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function ProjectTable({
  projects,
  query,
  onQueryChange,
  qfEstimateContext,
}: ProjectTableProps) {
  const [expandedProjectUrl, setExpandedProjectUrl] = React.useState<
    string | null
  >(null);
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
  const qfBadgeDonorMax = getMaxValue(
    projects,
    (project) => project.qfEstimate?.verifiedBadgeDonorCount ?? 0,
  );
  const qfBadgeRaisedMax = getMaxValue(
    projects,
    (project) => project.qfEstimate?.verifiedBadgeRaisedUsd ?? 0,
  );
  const qfMatchMax = getMaxValue(
    projects,
    (project) => project.qfEstimate?.estimatedMatchUsd ?? 0,
  );

  function toggleProjectTrace(projectUrl: string) {
    setExpandedProjectUrl((current) =>
      current === projectUrl ? null : projectUrl,
    );
  }

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
          <div className="flex flex-wrap gap-1.5">
            {criterionDefinitions.map((criterion) => (
              <Badge
                key={criterion.key}
                variant="secondary"
                title={`${criterion.label}. ${criterion.description}`}
                className={cn(
                  "border-border/50 bg-secondary/55 rounded-full border text-[11px]",
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
      accessorFn: (project) => project.qfEstimate?.verifiedBadgeDonorCount ?? 0,
      id: "qfBadgeDonorCount",
      header: "Badge Donors",
      cell: ({ row }) =>
        row.original.qfEstimate ? (
          <NumericBarCell
            value={row.original.qfEstimate.verifiedBadgeDonorCount}
            max={qfBadgeDonorMax}
            primary={formatInteger(
              row.original.qfEstimate.verifiedBadgeDonorCount,
            )}
            secondary={`${formatInteger(row.original.qfEstimate.verifiedBadgeDonationCount)} donations`}
          />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      accessorFn: (project) => project.qfEstimate?.verifiedBadgeRaisedUsd ?? 0,
      id: "qfBadgeRaisedUsd",
      header: "Badge $",
      cell: ({ row }) =>
        row.original.qfEstimate ? (
          <NumericBarCell
            value={row.original.qfEstimate.verifiedBadgeRaisedUsd}
            max={qfBadgeRaisedMax}
            primary={formatCurrency(
              row.original.qfEstimate.verifiedBadgeRaisedUsd,
            )}
          />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      accessorFn: (project) => project.qfEstimate?.estimatedMatchUsd ?? 0,
      id: "qfEstimatedMatchUsd",
      header: "QF Match",
      cell: ({ row }) =>
        row.original.qfEstimate ? (
          <NumericBarCell
            value={row.original.qfEstimate.estimatedMatchUsd}
            max={qfMatchMax}
            primary={formatCurrency(row.original.qfEstimate.estimatedMatchUsd)}
            secondary={
              row.original.qfEstimate.estimatedMatchDeltaUsd !== 0
                ? formatSignedCurrency(
                    row.original.qfEstimate.estimatedMatchDeltaUsd,
                  )
                : "No boost"
            }
          />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      id: "badgeTrace",
      header: "Trace",
      cell: ({ row }) => {
        const project = row.original;
        const canExpand =
          (project.qfEstimate?.badgeDonationTraces.length ?? 0) > 0 ||
          (project.qfEstimate?.unresolvedDonationCount ?? 0) > 0;

        if (!canExpand) {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => toggleProjectTrace(project.projectUrl)}
          >
            {expandedProjectUrl === project.projectUrl
              ? "Hide trace"
              : "View trace"}
          </Button>
        );
      },
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

  const visibleRows = table.getRowModel().rows;

  return (
    <TooltipProvider>
      <Card className="panel-border bg-card/90 shadow-[0_24px_70px_-54px_color-mix(in_oklab,var(--color-primary)_24%,transparent)]">
        <CardHeader className="border-border/70 gap-4 border-b pb-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="eyebrow text-muted-foreground">Project comparison</p>
            <CardTitle className="text-foreground text-2xl font-semibold tracking-[-0.03em]">
              Project comparison
            </CardTitle>
            <p className="text-muted-foreground max-w-2xl text-sm leading-6">
              Sort by score, allocation, or live traction, then open the source
              links when a project clears your bar.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              <ReferenceChipLink
                href={OFFICIAL_PROJECT_SHEET_URL}
                label="Source sheet"
              />
              <ReferenceChipLink href={roundUrl} label="Round page" />
            </div>
            <div className="relative w-full md:w-80">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search projects or themes"
                aria-label="Search projects or themes"
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {visibleRows.length}
            </span>{" "}
            {visibleRows.length === 1 ? "project" : "projects"}.
          </p>

          <div className="border-border/80 bg-background/72 rounded-[1.6rem] border">
            {visibleRows.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="text-foreground text-base font-semibold">
                  No projects match that search.
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Clear the query or adjust the current weights.
                </p>
              </div>
            ) : (
              <>
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
                      {visibleRows.map((row) => {
                        const project = row.original;
                        const isExpanded =
                          expandedProjectUrl === project.projectUrl;

                        return (
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
                            {isExpanded ? (
                              <TableRow>
                                <TableCell
                                  colSpan={columns.length}
                                  className="bg-background/40"
                                >
                                  <ProjectBadgeTracePanel project={project} />
                                </TableCell>
                              </TableRow>
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-3 p-3 md:hidden">
                  {visibleRows.map((row) => {
                    const project = row.original;
                    const secondaryThemes =
                      project.curation.themeBaskets.filter(
                        (themeKey) =>
                          themeKey !== project.curation.primaryCategory,
                      );

                    return (
                      <div
                        key={project.projectUrl}
                        className="border-border/75 bg-background/82 rounded-[1.4rem] border p-4"
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
                                {formatConfidence(
                                  project.curation.confidenceScore,
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <Badge className="rounded-full text-[11px]">
                            {
                              themeDefinitionByKey[
                                project.curation.primaryCategory
                              ].shortLabel
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
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {criterionDefinitions.map((criterion) => (
                            <Badge
                              key={criterion.key}
                              variant="secondary"
                              className={cn(
                                "border-border/50 bg-secondary/55 rounded-full border text-[11px]",
                                scoreTone(project.curation[criterion.key]),
                              )}
                            >
                              {criterion.shortLabel}{" "}
                              {project.curation[criterion.key]}
                            </Badge>
                          ))}
                        </div>
                        <div className="bg-secondary/65 mt-4 h-2 overflow-hidden rounded-full">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{
                              width: `${project.allocationPercent * 100}%`,
                            }}
                          />
                        </div>
                        {project.qfEstimate ? (
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                              <p className="eyebrow text-muted-foreground">
                                Raised
                              </p>
                              <p className="text-foreground mt-2 text-sm font-semibold">
                                {formatCurrency(project.qfEstimate.raisedUsd)}
                              </p>
                            </div>
                            <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                              <p className="eyebrow text-muted-foreground">
                                Donors
                              </p>
                              <p className="text-foreground mt-2 text-sm font-semibold">
                                {formatInteger(project.qfEstimate.donorCount)}
                              </p>
                            </div>
                            <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                              <p className="eyebrow text-muted-foreground">
                                Match
                              </p>
                              <p className="text-foreground mt-2 text-sm font-semibold">
                                {formatCurrency(
                                  project.qfEstimate.estimatedMatchUsd,
                                )}
                              </p>
                            </div>
                          </div>
                        ) : null}
                        {project.qfEstimate ? (
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                              <p className="eyebrow text-muted-foreground">
                                Badge donors
                              </p>
                              <p className="text-foreground mt-2 text-sm font-semibold">
                                {formatInteger(
                                  project.qfEstimate.verifiedBadgeDonorCount,
                                )}
                              </p>
                            </div>
                            <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                              <p className="eyebrow text-muted-foreground">
                                Badge $
                              </p>
                              <p className="text-foreground mt-2 text-sm font-semibold">
                                {formatCurrency(
                                  project.qfEstimate.verifiedBadgeRaisedUsd,
                                )}
                              </p>
                            </div>
                            <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                              <p className="eyebrow text-muted-foreground">
                                Match delta
                              </p>
                              <p className="text-foreground mt-2 text-sm font-semibold">
                                {formatSignedCurrency(
                                  project.qfEstimate.estimatedMatchDeltaUsd,
                                )}
                              </p>
                            </div>
                          </div>
                        ) : null}
                        {(project.qfEstimate?.badgeDonationTraces.length ?? 0) >
                          0 ||
                        (project.qfEstimate?.unresolvedDonationCount ?? 0) >
                          0 ? (
                          <div className="mt-3">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="rounded-full"
                              onClick={() =>
                                toggleProjectTrace(project.projectUrl)
                              }
                            >
                              {expandedProjectUrl === project.projectUrl
                                ? "Hide badge trace"
                                : "View badge trace"}
                            </Button>
                          </div>
                        ) : null}
                        {expandedProjectUrl === project.projectUrl ? (
                          <div className="mt-3">
                            <ProjectBadgeTracePanel project={project} />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <MethodologyPanel
              title="Scoring model"
              summary="Five curated signals, theme multipliers, and your ballot cap drive the final split."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-6">
                  Final score = weighted signal sum multiplied by the average
                  matched theme weight. Allocation = each project&apos;s score
                  share across the top ranked projects in the ballot.
                </p>
                <p className="text-muted-foreground text-sm leading-6">
                  Confidence appears on score hover. Lower confidence means the
                  website and source sheet required more inference.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {criterionDefinitions.map((criterion) => (
                    <div
                      key={criterion.key}
                      className="border-border/70 bg-card/80 rounded-[1.1rem] border p-3"
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
            </MethodologyPanel>

            <MethodologyPanel
              title="Canonical QF model"
              summary="Raised, donors, badge weighting, and estimated match are refreshed from Giveth and Ethereum."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-6">
                  Raised and donor counts use public{" "}
                  {qfEstimateContext.roundName} donations that meet the
                  round&apos;s $1 minimum, aggregated by donor wallet.
                </p>
                <p className="text-muted-foreground text-sm leading-6">
                  Verified badge-holder donations are weighted 4x by checking
                  historical ownership of {qfEstimateContext.badgeContractName}{" "}
                  ({qfEstimateContext.badgeContractSymbol}) against each
                  donation timestamp.
                </p>
                <p className="text-muted-foreground text-sm leading-6">
                  Estimated match applies that canonical QF subsidy estimate,
                  normalizes to the current{" "}
                  {formatCurrency(qfEstimateContext.matchingPoolUsd)} pool, and
                  enforces the round&apos;s{" "}
                  {formatPercent(qfEstimateContext.maxPerProjectRatio)}{" "}
                  per-project cap ({formatCurrency(projectCapUsd)}).
                </p>
                <p className="text-muted-foreground text-sm leading-6">
                  Anonymous donations with no visible wallet stay unresolved and
                  unboosted. This still does not model Giveth&apos;s non-public
                  COCM clustering, Passport checks, first-touch rules, or
                  post-round review.
                </p>
                <div className="flex flex-wrap gap-2">
                  <ReferenceChipLink
                    href={GIVETH_QF_DOCS_URL}
                    label="Giveth QF docs"
                  />
                  <ReferenceChipLink
                    href={`https://eth.trusteeglobal.com/address/${qfEstimateContext.badgeContractAddress}`}
                    label="Voting badge contract"
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
            </MethodologyPanel>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
