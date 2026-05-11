"use client";

import * as React from "react";
import Link from "next/link";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { ExternalLink, RotateCcw, Search, ZoomIn, ZoomOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getGivethRoundUrl } from "@/data/allocator-metadata";
import { themeDefinitionByKey, themeDefinitions } from "@/data/themes";
import {
  getAddressExplorerUrl,
  getTransactionExplorerUrl,
} from "@/lib/explorer-links";
import type {
  ExploreDonation,
  ExploreGraph,
  ExploreProjectNode,
  QfEstimateContext,
  ThemeKey,
} from "@/lib/types";

type ExplorePageProps = {
  graph: ExploreGraph;
  qfEstimateContext: QfEstimateContext;
};

type GraphNode = SimulationNodeDatum & {
  id: string;
  kind: "donor" | "project";
  label: string;
  radius: number;
  totalUsd: number;
  x: number;
  y: number;
};

type GraphLink = SimulationLinkDatum<GraphNode> & {
  donationCount: number;
  totalUsd: number;
  verifiedBadgeDonationCount: number;
};

const PROJECT_LIMIT_OPTIONS = [24, 48, 96] as const;
const DONOR_LIMIT_OPTIONS = [120, 240, 480] as const;

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

function scaleValue(value: number, min: number, max: number) {
  if (max <= min) {
    return 0.5;
  }

  return (value - min) / (max - min);
}

function getNodeRadius(
  value: number,
  minValue: number,
  maxValue: number,
  kind: "donor" | "project",
) {
  const normalized = Math.sqrt(scaleValue(value, minValue, maxValue));

  return kind === "project" ? 10 + normalized * 20 : 5 + normalized * 11;
}

function ExplorerAddress({
  networkId = 1,
  value,
}: {
  networkId?: number;
  value: string;
}) {
  const explorerUrl = getAddressExplorerUrl(value, networkId);

  if (!explorerUrl) {
    return <span className="font-mono text-[0.76rem]">{value}</span>;
  }

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noreferrer"
      className="text-foreground hover:text-primary font-mono text-[0.76rem] break-all underline decoration-transparent underline-offset-4 transition hover:decoration-current"
    >
      {value}
    </a>
  );
}

function ExplorerTransaction({
  networkId = 1,
  value,
}: {
  networkId?: number;
  value: string | null;
}) {
  if (!value) {
    return <span className="text-muted-foreground text-xs">No tx hash</span>;
  }

  const explorerUrl = getTransactionExplorerUrl(value, networkId);

  if (!explorerUrl) {
    return <span className="font-mono text-[0.76rem]">{value}</span>;
  }

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noreferrer"
      className="text-foreground hover:text-primary font-mono text-[0.76rem] break-all underline decoration-transparent underline-offset-4 transition hover:decoration-current"
    >
      {value}
    </a>
  );
}

function buildProjectSearchText(project: ExploreProjectNode) {
  const themeLabels = project.themeBaskets
    .map((themeKey) => themeDefinitionByKey[themeKey].label)
    .join(" ");

  return [
    project.title,
    project.ownerName,
    project.projectSlug,
    project.mainCategoryNames.join(" "),
    themeLabels,
  ]
    .join(" ")
    .toLowerCase();
}

function getLinkNodeId(value: string | number | GraphNode) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return value.id;
}

export function ExplorePage({ graph, qfEstimateContext }: ExplorePageProps) {
  const [query, setQuery] = React.useState("");
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeKey | "all">(
    "all",
  );
  const [badgeOnly, setBadgeOnly] = React.useState(false);
  const [projectLimit, setProjectLimit] =
    React.useState<(typeof PROJECT_LIMIT_OPTIONS)[number]>(48);
  const [donorLimit, setDonorLimit] =
    React.useState<(typeof DONOR_LIMIT_OPTIONS)[number]>(240);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null,
  );
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const panSessionRef = React.useRef<{
    originX: number;
    originY: number;
    startX: number;
    startY: number;
  } | null>(null);

  const donorById = React.useMemo(
    () => new Map(graph.donors.map((donor) => [donor.id, donor])),
    [graph.donors],
  );
  const projectById = React.useMemo(
    () => new Map(graph.projects.map((project) => [project.id, project])),
    [graph.projects],
  );
  const projectBySlug = React.useMemo(
    () =>
      new Map(graph.projects.map((project) => [project.projectSlug, project])),
    [graph.projects],
  );
  const badgeContractExplorerUrl = getAddressExplorerUrl(
    qfEstimateContext.badgeContractAddress,
  );
  const normalizedQuery = query.trim().toLowerCase();

  const filteredGraph = React.useMemo(() => {
    const themeFilteredProjects =
      selectedTheme === "all"
        ? graph.projects
        : graph.projects.filter((project) =>
            project.themeBaskets.includes(selectedTheme),
          );
    const themeProjectIds = new Set(
      themeFilteredProjects.map((project) => project.id),
    );
    const themeFilteredDonations = graph.donations.filter((donation) =>
      themeProjectIds.has(`project:${donation.projectSlug}`),
    );
    const badgeFilteredDonations = badgeOnly
      ? themeFilteredDonations.filter(
          (donation) => donation.isVerifiedBadgeDonation,
        )
      : themeFilteredDonations;

    if (normalizedQuery) {
      const matchingDonorIds = new Set(
        graph.donors
          .filter((donor) =>
            donor.walletAddress.toLowerCase().includes(normalizedQuery),
          )
          .map((donor) => donor.id),
      );
      const matchingProjectIds = new Set(
        themeFilteredProjects
          .filter((project) =>
            buildProjectSearchText(project).includes(normalizedQuery),
          )
          .map((project) => project.id),
      );
      const visibleDonations = badgeFilteredDonations.filter(
        (donation) =>
          matchingDonorIds.has(`donor:${donation.donorWalletAddress}`) ||
          matchingProjectIds.has(`project:${donation.projectSlug}`),
      );
      const visibleProjectIds = new Set(
        visibleDonations.map((donation) => `project:${donation.projectSlug}`),
      );
      const visibleDonorIds = new Set(
        visibleDonations.map(
          (donation) => `donor:${donation.donorWalletAddress}`,
        ),
      );

      for (const projectId of matchingProjectIds) {
        visibleProjectIds.add(projectId);
      }

      for (const donorId of matchingDonorIds) {
        visibleDonorIds.add(donorId);
      }

      return {
        donations: visibleDonations,
        donors: graph.donors.filter((donor) => visibleDonorIds.has(donor.id)),
        projects: themeFilteredProjects.filter((project) =>
          visibleProjectIds.has(project.id),
        ),
      };
    }

    const visibleProjects = [...themeFilteredProjects]
      .sort(
        (left, right) =>
          right.donorCount - left.donorCount || right.totalUsd - left.totalUsd,
      )
      .slice(0, projectLimit);
    const visibleProjectIds = new Set(
      visibleProjects.map((project) => project.id),
    );
    const projectDonations = badgeFilteredDonations.filter((donation) =>
      visibleProjectIds.has(`project:${donation.projectSlug}`),
    );
    const donorTotals = new Map<string, number>();

    for (const donation of projectDonations) {
      const donorId = `donor:${donation.donorWalletAddress}`;
      donorTotals.set(
        donorId,
        (donorTotals.get(donorId) ?? 0) + donation.actualUsd,
      );
    }

    const visibleDonorIds = new Set(
      Array.from(donorTotals.entries())
        .sort((left, right) => right[1] - left[1])
        .slice(0, donorLimit)
        .map(([donorId]) => donorId),
    );
    const visibleDonations = projectDonations.filter((donation) =>
      visibleDonorIds.has(`donor:${donation.donorWalletAddress}`),
    );

    return {
      donations: visibleDonations,
      donors: graph.donors.filter((donor) => visibleDonorIds.has(donor.id)),
      projects: visibleProjects,
    };
  }, [
    badgeOnly,
    donorLimit,
    graph.donations,
    graph.donors,
    graph.projects,
    normalizedQuery,
    projectLimit,
    selectedTheme,
  ]);

  const edgeDonationsByKey = React.useMemo(() => {
    const builders = new Map<string, ExploreDonation[]>();

    for (const donation of filteredGraph.donations) {
      const key = `${donation.donorWalletAddress}:${donation.projectSlug}`;
      const edgeDonations = builders.get(key) ?? [];

      edgeDonations.push(donation);
      builders.set(key, edgeDonations);
    }

    return builders;
  }, [filteredGraph.donations]);

  const graphLinks = React.useMemo(() => {
    return Array.from(edgeDonationsByKey.entries()).map(([key, donations]) => ({
      donationCount: donations.length,
      source: `donor:${donations[0].donorWalletAddress}`,
      target: `project:${donations[0].projectSlug}`,
      totalUsd: Number(
        donations
          .reduce((total, donation) => total + donation.actualUsd, 0)
          .toFixed(2),
      ),
      verifiedBadgeDonationCount: donations.filter(
        (donation) => donation.isVerifiedBadgeDonation,
      ).length,
      key,
    }));
  }, [edgeDonationsByKey]);

  const graphLayout = React.useMemo(() => {
    if (filteredGraph.donations.length === 0) {
      return { links: [] as GraphLink[], nodes: [] as GraphNode[] };
    }

    const donorTotals = filteredGraph.donors.map((donor) => donor.totalUsd);
    const projectTotals = filteredGraph.projects.map(
      (project) => project.totalUsd,
    );
    const minDonorTotal = Math.min(...donorTotals);
    const maxDonorTotal = Math.max(...donorTotals);
    const minProjectTotal = Math.min(...projectTotals);
    const maxProjectTotal = Math.max(...projectTotals);
    const projectCount = Math.max(filteredGraph.projects.length, 1);
    const donorCount = Math.max(filteredGraph.donors.length, 1);
    const nodes: GraphNode[] = [
      ...filteredGraph.projects.map((project, index) => {
        const angle = (index / projectCount) * Math.PI * 2;

        return {
          id: project.id,
          kind: "project" as const,
          label: project.title,
          radius: getNodeRadius(
            project.totalUsd,
            minProjectTotal,
            maxProjectTotal,
            "project",
          ),
          totalUsd: project.totalUsd,
          x: Math.cos(angle) * 120,
          y: Math.sin(angle) * 120,
        };
      }),
      ...filteredGraph.donors.map((donor, index) => {
        const angle = (index / donorCount) * Math.PI * 2;

        return {
          id: donor.id,
          kind: "donor" as const,
          label: donor.walletAddress,
          radius: getNodeRadius(
            donor.totalUsd,
            minDonorTotal,
            maxDonorTotal,
            "donor",
          ),
          totalUsd: donor.totalUsd,
          x: Math.cos(angle) * 320,
          y: Math.sin(angle) * 320,
        };
      }),
    ];
    const links: GraphLink[] = graphLinks.map((link) => ({
      donationCount: link.donationCount,
      source: link.source,
      target: link.target,
      totalUsd: link.totalUsd,
      verifiedBadgeDonationCount: link.verifiedBadgeDonationCount,
    }));
    const simulation = forceSimulation<GraphNode>(nodes)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(links)
          .id((node) => node.id)
          .distance((link) => 70 + Math.min(120, link.totalUsd / 7)),
      )
      .force(
        "charge",
        forceManyBody<GraphNode>().strength((node) =>
          node.kind === "project" ? -420 : -125,
        ),
      )
      .force(
        "collide",
        forceCollide<GraphNode>((node) => node.radius + 8),
      )
      .force("center", forceCenter(0, 0))
      .force(
        "projectRadial",
        forceRadial<GraphNode>(140, 0, 0).strength((node) =>
          node.kind === "project" ? 0.32 : 0,
        ),
      )
      .force(
        "donorRadial",
        forceRadial<GraphNode>(360, 0, 0).strength((node) =>
          node.kind === "donor" ? 0.08 : 0,
        ),
      )
      .stop();

    for (let tick = 0; tick < 220; tick += 1) {
      simulation.tick();
    }

    return { links, nodes };
  }, [
    filteredGraph.donations.length,
    filteredGraph.donors,
    filteredGraph.projects,
    graphLinks,
  ]);

  const graphNodeById = React.useMemo(
    () => new Map(graphLayout.nodes.map((node) => [node.id, node])),
    [graphLayout.nodes],
  );

  const adjacency = React.useMemo(() => {
    const map = new Map<string, Set<string>>();

    for (const link of graphLayout.links) {
      const sourceId = getLinkNodeId(link.source);
      const targetId = getLinkNodeId(link.target);
      const sourceNeighbors = map.get(sourceId) ?? new Set<string>();
      const targetNeighbors = map.get(targetId) ?? new Set<string>();

      sourceNeighbors.add(targetId);
      targetNeighbors.add(sourceId);
      map.set(sourceId, sourceNeighbors);
      map.set(targetId, targetNeighbors);
    }

    return map;
  }, [graphLayout.links]);

  const visibleSelectedNodeId =
    selectedNodeId && graphNodeById.has(selectedNodeId) ? selectedNodeId : null;
  const activeNodeId = visibleSelectedNodeId ?? hoveredNodeId;
  const connectedNodeIds = React.useMemo(() => {
    if (!activeNodeId) {
      return null;
    }

    const related = new Set(adjacency.get(activeNodeId) ?? []);

    related.add(activeNodeId);
    return related;
  }, [activeNodeId, adjacency]);

  const selectedDonor = visibleSelectedNodeId
    ? (donorById.get(visibleSelectedNodeId) ?? null)
    : null;
  const selectedProject = visibleSelectedNodeId
    ? (projectById.get(visibleSelectedNodeId) ?? null)
    : null;
  const inspectorDonations = React.useMemo(() => {
    if (selectedDonor) {
      return filteredGraph.donations.filter(
        (donation) =>
          donation.donorWalletAddress === selectedDonor.walletAddress,
      );
    }

    if (selectedProject) {
      return filteredGraph.donations.filter(
        (donation) => donation.projectSlug === selectedProject.projectSlug,
      );
    }

    return [];
  }, [filteredGraph.donations, selectedDonor, selectedProject]);

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function handlePointerDown(event: React.PointerEvent<SVGSVGElement>) {
    panSessionRef.current = {
      originX: pan.x,
      originY: pan.y,
      startX: event.clientX,
      startY: event.clientY,
    };
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (!panSessionRef.current) {
      return;
    }

    setPan({
      x:
        panSessionRef.current.originX +
        (event.clientX - panSessionRef.current.startX) / zoom,
      y:
        panSessionRef.current.originY +
        (event.clientY - panSessionRef.current.startY) / zoom,
    });
  }

  function handlePointerUp() {
    panSessionRef.current = null;
  }

  function handleWheel(event: React.WheelEvent<SVGSVGElement>) {
    event.preventDefault();

    setZoom((currentZoom) => {
      const nextZoom = currentZoom + (event.deltaY < 0 ? 0.12 : -0.12);
      return Math.max(0.45, Math.min(2.4, Number(nextZoom.toFixed(2))));
    });
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-6 px-4 pt-5 pb-10 sm:px-6 lg:px-8 lg:pt-6 lg:pb-14">
        <section className="surface-panel panel-border overflow-hidden rounded-[2rem] border px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/"
                  className="border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
                >
                  Back to allocator
                </Link>
                <a
                  href={getGivethRoundUrl(qfEstimateContext.roundSlug)}
                  target="_blank"
                  rel="noreferrer"
                  className="border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
                >
                  {qfEstimateContext.roundName}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {badgeContractExplorerUrl ? (
                  <a
                    href={badgeContractExplorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
                  >
                    {qfEstimateContext.badgeContractSymbol} contract
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
              <p className="eyebrow text-muted-foreground">
                Donation network explorer
              </p>
              <h1 className="text-foreground text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.85rem] lg:leading-[1.02]">
                Explore who backed what, and how concentrated the round really
                is.
              </h1>
              <p className="text-muted-foreground max-w-3xl text-[1.02rem] leading-7 sm:text-lg">
                This view stays generic on purpose: donors, projects, donation
                edges, badge-weighted traces, and direct explorer links. It is
                meant for pattern-finding first, not final storytelling.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="border-border/75 bg-background/78 rounded-[1.25rem] border px-4 py-3">
                <p className="eyebrow text-muted-foreground">Visible donors</p>
                <p className="text-foreground mt-2 text-xl font-semibold">
                  {formatInteger(filteredGraph.donors.length)}
                </p>
              </div>
              <div className="border-border/75 bg-background/78 rounded-[1.25rem] border px-4 py-3">
                <p className="eyebrow text-muted-foreground">
                  Visible projects
                </p>
                <p className="text-foreground mt-2 text-xl font-semibold">
                  {formatInteger(filteredGraph.projects.length)}
                </p>
              </div>
              <div className="border-border/75 bg-background/78 rounded-[1.25rem] border px-4 py-3">
                <p className="eyebrow text-muted-foreground">
                  Visible donations
                </p>
                <p className="text-foreground mt-2 text-xl font-semibold">
                  {formatInteger(filteredGraph.donations.length)}
                </p>
              </div>
              <div className="border-border/75 bg-background/78 rounded-[1.25rem] border px-4 py-3">
                <p className="eyebrow text-muted-foreground">Unresolved</p>
                <p className="text-foreground mt-2 text-xl font-semibold">
                  {formatInteger(graph.unresolvedDonationCount)}
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  {formatCurrency(graph.unresolvedRaisedUsd)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)_22rem]">
          <Card className="panel-border bg-card/88 xl:sticky xl:top-6 xl:self-start">
            <CardHeader className="gap-2">
              <p className="eyebrow text-muted-foreground">Graph filters</p>
              <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                Focus the graph
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <p className="eyebrow text-muted-foreground">Search</p>
                <div className="relative">
                  <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Project title or full donor address"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="eyebrow text-muted-foreground">Theme</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTheme("all")}
                    className={`rounded-full border px-3 py-1.5 text-sm transition ${
                      selectedTheme === "all"
                        ? "border-primary/35 bg-primary/8 text-foreground"
                        : "border-border/75 bg-background/78 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    All themes
                  </button>
                  {themeDefinitions.map((theme) => (
                    <button
                      key={theme.key}
                      type="button"
                      onClick={() => setSelectedTheme(theme.key)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        selectedTheme === theme.key
                          ? "border-primary/35 bg-primary/8 text-foreground"
                          : "border-border/75 bg-background/78 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {theme.shortLabel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="eyebrow text-muted-foreground">Density</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Project limit
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PROJECT_LIMIT_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setProjectLimit(option)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition ${
                            projectLimit === option
                              ? "border-primary/35 bg-primary/8 text-foreground"
                              : "border-border/75 bg-background/78 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Donor limit
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {DONOR_LIMIT_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setDonorLimit(option)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition ${
                            donorLimit === option
                              ? "border-primary/35 bg-primary/8 text-foreground"
                              : "border-border/75 bg-background/78 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="eyebrow text-muted-foreground">Mode</p>
                <button
                  type="button"
                  onClick={() => setBadgeOnly((current) => !current)}
                  className={`w-full rounded-[1.1rem] border px-4 py-3 text-left transition ${
                    badgeOnly
                      ? "border-primary/35 bg-primary/8 text-foreground"
                      : "border-border/75 bg-background/78 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <p className="text-sm font-semibold">Badge-weighted only</p>
                  <p className="mt-1 text-sm leading-6">
                    Show only donations verified as badge-holder activity.
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="panel-border bg-card/90 overflow-hidden">
            <CardHeader className="border-border/70 gap-3 border-b md:flex-row md:items-end md:justify-between">
              <div className="space-y-1">
                <p className="eyebrow text-muted-foreground">Graph</p>
                <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                  Donor ↔ project network
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() =>
                    setZoom((currentZoom) =>
                      Math.min(2.4, Number((currentZoom + 0.12).toFixed(2))),
                    )
                  }
                >
                  <ZoomIn className="mr-2 h-4 w-4" />
                  Zoom in
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() =>
                    setZoom((currentZoom) =>
                      Math.max(0.45, Number((currentZoom - 0.12).toFixed(2))),
                    )
                  }
                >
                  <ZoomOut className="mr-2 h-4 w-4" />
                  Zoom out
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={resetView}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset view
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {graphLayout.nodes.length > 0 ? (
                <div className="bg-background/74 relative h-[42rem]">
                  <svg
                    className="h-full w-full touch-none"
                    viewBox="-640 -420 1280 840"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onWheel={handleWheel}
                  >
                    <g
                      transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}
                    >
                      {graphLayout.links.map((link) => {
                        const sourceNode = graphNodeById.get(
                          getLinkNodeId(link.source),
                        );
                        const targetNode = graphNodeById.get(
                          getLinkNodeId(link.target),
                        );

                        if (!sourceNode || !targetNode) {
                          return null;
                        }

                        const isActive =
                          !connectedNodeIds ||
                          (connectedNodeIds.has(sourceNode.id) &&
                            connectedNodeIds.has(targetNode.id));

                        return (
                          <line
                            key={`${sourceNode.id}:${targetNode.id}`}
                            x1={sourceNode.x}
                            y1={sourceNode.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            stroke={
                              link.verifiedBadgeDonationCount > 0
                                ? "color-mix(in oklab, var(--color-primary) 48%, transparent)"
                                : "color-mix(in oklab, var(--color-foreground) 18%, transparent)"
                            }
                            strokeOpacity={isActive ? 0.65 : 0.16}
                            strokeWidth={Math.max(
                              1,
                              Math.min(5, link.totalUsd / 85),
                            )}
                          />
                        );
                      })}

                      {graphLayout.nodes.map((node) => {
                        const donorNode =
                          node.kind === "donor" ? donorById.get(node.id) : null;
                        const isHighlighted =
                          !connectedNodeIds || connectedNodeIds.has(node.id);

                        return (
                          <g
                            key={node.id}
                            transform={`translate(${node.x} ${node.y})`}
                            onClick={() => setSelectedNodeId(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className="cursor-pointer"
                          >
                            <circle
                              r={node.radius}
                              fill={
                                node.kind === "project"
                                  ? "color-mix(in oklab, var(--color-primary) 22%, var(--color-card))"
                                  : donorNode?.verifiedBadgeDonationCount
                                    ? "color-mix(in oklab, var(--color-primary) 10%, var(--color-card))"
                                    : "color-mix(in oklab, var(--color-foreground) 5%, var(--color-card))"
                              }
                              stroke={
                                selectedNodeId === node.id
                                  ? "color-mix(in oklab, var(--color-primary) 68%, transparent)"
                                  : "color-mix(in oklab, var(--color-border) 90%, transparent)"
                              }
                              strokeWidth={selectedNodeId === node.id ? 3 : 1.2}
                              opacity={isHighlighted ? 1 : 0.3}
                            />
                            <title>{node.label}</title>
                            {(node.kind === "project" ||
                              activeNodeId === node.id) && (
                              <text
                                y={node.radius + 16}
                                textAnchor="middle"
                                className={
                                  node.kind === "project"
                                    ? "fill-foreground text-[11px] font-medium"
                                    : "fill-foreground font-mono text-[9px] font-medium"
                                }
                              >
                                {node.kind === "project"
                                  ? node.label.slice(0, 32)
                                  : node.label}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>
              ) : (
                <div className="px-6 py-14">
                  <p className="text-muted-foreground text-sm leading-6">
                    No visible graph nodes match the current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="panel-border bg-card/88 xl:sticky xl:top-6 xl:self-start">
            <CardHeader className="gap-2">
              <p className="eyebrow text-muted-foreground">Inspector</p>
              <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                {selectedDonor
                  ? "Selected donor"
                  : selectedProject
                    ? "Selected project"
                    : "Selection details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDonor ? (
                <>
                  <div className="space-y-2">
                    <ExplorerAddress value={selectedDonor.walletAddress} />
                    <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                      <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
                        <p className="eyebrow text-muted-foreground">
                          Actual $
                        </p>
                        <p className="text-foreground mt-2 text-lg font-semibold">
                          {formatCurrency(selectedDonor.totalUsd)}
                        </p>
                      </div>
                      <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
                        <p className="eyebrow text-muted-foreground">
                          Projects
                        </p>
                        <p className="text-foreground mt-2 text-lg font-semibold">
                          {formatInteger(selectedDonor.projectCount)}
                        </p>
                      </div>
                      <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
                        <p className="eyebrow text-muted-foreground">
                          Badge donations
                        </p>
                        <p className="text-foreground mt-2 text-lg font-semibold">
                          {formatInteger(
                            selectedDonor.verifiedBadgeDonationCount,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-foreground text-sm font-semibold">
                      Donation trace
                    </p>
                    {inspectorDonations
                      .sort(
                        (left, right) =>
                          right.actualUsd - left.actualUsd ||
                          Date.parse(right.donatedAt) -
                            Date.parse(left.donatedAt),
                      )
                      .map((donation) => {
                        const project = projectBySlug.get(donation.projectSlug);

                        return (
                          <div
                            key={donation.id}
                            className="border-border/75 bg-background/78 space-y-2 rounded-[1.15rem] border px-4 py-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-foreground text-sm font-semibold">
                                  {project?.title ?? donation.projectSlug}
                                </p>
                                <p className="text-muted-foreground mt-1 text-sm">
                                  {new Date(
                                    donation.donatedAt,
                                  ).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    timeZone: "UTC",
                                  })}
                                </p>
                              </div>
                              <p className="text-foreground text-right text-sm font-semibold">
                                {formatCurrency(donation.actualUsd)}
                              </p>
                            </div>
                            <ExplorerTransaction
                              value={donation.transactionHash}
                              networkId={donation.transactionNetworkId ?? 1}
                            />
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : selectedProject ? (
                <>
                  <div className="space-y-2">
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground hover:text-primary text-base font-semibold underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                    >
                      {selectedProject.title}
                    </a>
                    <p className="text-muted-foreground text-sm">
                      {selectedProject.ownerName}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.themeBaskets.map((themeKey) => (
                        <Badge
                          key={themeKey}
                          variant="secondary"
                          className="rounded-full"
                        >
                          {themeDefinitionByKey[themeKey].shortLabel}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                      <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
                        <p className="eyebrow text-muted-foreground">Raised</p>
                        <p className="text-foreground mt-2 text-lg font-semibold">
                          {formatCurrency(selectedProject.totalUsd)}
                        </p>
                      </div>
                      <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
                        <p className="eyebrow text-muted-foreground">Donors</p>
                        <p className="text-foreground mt-2 text-lg font-semibold">
                          {formatInteger(selectedProject.donorCount)}
                        </p>
                      </div>
                      <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
                        <p className="eyebrow text-muted-foreground">Badge $</p>
                        <p className="text-foreground mt-2 text-lg font-semibold">
                          {formatCurrency(
                            selectedProject.verifiedBadgeRaisedUsd,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-foreground text-sm font-semibold">
                      Donation trace
                    </p>
                    {inspectorDonations
                      .sort(
                        (left, right) =>
                          right.actualUsd - left.actualUsd ||
                          Date.parse(right.donatedAt) -
                            Date.parse(left.donatedAt),
                      )
                      .map((donation) => (
                        <div
                          key={donation.id}
                          className="border-border/75 bg-background/78 space-y-2 rounded-[1.15rem] border px-4 py-3"
                        >
                          <ExplorerAddress
                            value={donation.donorWalletAddress}
                          />
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-muted-foreground text-sm">
                              {new Date(donation.donatedAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  timeZone: "UTC",
                                },
                              )}
                            </p>
                            <p className="text-foreground text-right text-sm font-semibold">
                              {formatCurrency(donation.actualUsd)}
                            </p>
                          </div>
                          <ExplorerTransaction
                            value={donation.transactionHash}
                            networkId={donation.transactionNetworkId ?? 1}
                          />
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-sm leading-6">
                  Select a donor or project node to inspect its full address,
                  connected donations, and explorer links.
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
