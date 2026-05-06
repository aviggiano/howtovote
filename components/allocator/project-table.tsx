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
import { criterionDefinitions, type ProjectRecommendation } from "@/lib/types";
import { themeDefinitionByKey } from "@/data/themes";
import { cn } from "@/lib/utils";

type ProjectTableProps = {
  projects: ProjectRecommendation[];
  query: string;
  onQueryChange: (value: string) => void;
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

function scoreTone(score: number) {
  if (score >= 4.5) {
    return "text-primary";
  }
  if (score >= 3.5) {
    return "text-foreground";
  }
  return "text-muted-foreground";
}

export function ProjectTable({
  projects,
  query,
  onQueryChange,
}: ProjectTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "allocationPercent", desc: true },
  ]);
  const [expandedProjectUrl, setExpandedProjectUrl] = React.useState<
    string | null
  >(null);

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
      header: "Curated Signals",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex flex-wrap gap-1.5">
            {criterionDefinitions.map((criterion) => (
              <Badge
                key={criterion.key}
                variant="secondary"
                className={cn(
                  "border-border/50 bg-secondary/60 rounded-full border",
                  scoreTone(project.curation[criterion.key]),
                )}
              >
                {criterion.shortLabel} {project.curation[criterion.key]}
              </Badge>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => row.original.score.toFixed(2),
    },
    {
      accessorKey: "allocationPercent",
      header: "Allocation",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="text-foreground font-medium">
            {formatPercent(row.original.allocationPercent)}
          </p>
          <div className="bg-secondary h-2 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${row.original.allocationPercent * 100}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      accessorKey: "allocationAmount",
      header: "Amount",
      cell: ({ row }) => formatCurrency(row.original.allocationAmount),
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
            Full Recommendation Table
          </CardTitle>
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            Sort by the recommendation itself, inspect the underlying scores,
            and open the rationale for each project.
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
      </CardContent>
    </Card>
  );
}
