import type { ProjectQfEstimate, QfEstimateContext } from "@/lib/types";

const GIVETH_GRAPHQL_URL = "https://core.v6.giveth.io/graphql";
const ROUND_SLUG = "ethereum-security";
const PROJECTS_PAGE_SIZE = 200;
const DONATIONS_PAGE_SIZE = 1000;
const FETCH_CONCURRENCY = 12;
const REVALIDATE_SECONDS = 60 * 30;

type GraphqlError = {
  message: string;
};

type GraphqlResponse<T> = {
  data?: T;
  errors?: GraphqlError[];
};

type RoundBySlugResponse = {
  qfRoundBySlug: {
    id: string;
    name: string;
    slug: string;
    allocatedFundUSD: number;
    allocatedFundUSDPreferred: boolean;
    allocatedFund: number;
    allocatedTokenSymbol: string;
    maximumReward: number;
  } | null;
};

type ProjectsForRoundResponse = {
  projects: {
    total: number;
    projects: {
      id: string;
      slug: string;
    }[];
  };
};

type DonationsByProjectResponse = {
  donationsByProject: {
    total: number;
    donations: {
      id: string;
      valueUsd: number;
      fromWalletAddress: string | null;
    }[];
  };
};

type RoundProject = {
  projectId: number;
  projectSlug: string;
};

type RoundProjectWithDonations = RoundProject & {
  donations: DonationsByProjectResponse["donationsByProject"]["donations"];
};

type RawProjectEstimate = ProjectQfEstimate & {
  rawScore: number;
};

type QfEstimateBundle = {
  context: QfEstimateContext;
  estimatesBySlug: Map<string, ProjectQfEstimate>;
};

async function fetchGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(GIVETH_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apollo-require-preflight": "true",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Giveth GraphQL data: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as GraphqlResponse<T>;

  if (payload.errors && payload.errors.length > 0) {
    throw new Error(payload.errors[0]?.message ?? "Giveth GraphQL error");
  }

  if (!payload.data) {
    throw new Error("Missing Giveth GraphQL payload");
  }

  return payload.data;
}

async function mapWithConcurrency<T, U>(
  items: T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<U>,
) {
  const results = new Array<U>(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );

  return results;
}

async function getRound() {
  const data = await fetchGraphql<RoundBySlugResponse>(
    `
      query QfRoundBySlug($slug: String!) {
        qfRoundBySlug(slug: $slug) {
          id
          name
          slug
          allocatedFundUSD
          allocatedFundUSDPreferred
          allocatedFund
          allocatedTokenSymbol
          maximumReward
        }
      }
    `,
    { slug: ROUND_SLUG },
  );

  if (!data.qfRoundBySlug) {
    throw new Error(`Unable to find Giveth round for slug "${ROUND_SLUG}"`);
  }

  return {
    id: Number(data.qfRoundBySlug.id),
    name: data.qfRoundBySlug.name,
    slug: data.qfRoundBySlug.slug,
    allocatedFundUSD: data.qfRoundBySlug.allocatedFundUSD,
    allocatedFundUSDPreferred: data.qfRoundBySlug.allocatedFundUSDPreferred,
    allocatedFund: data.qfRoundBySlug.allocatedFund,
    allocatedTokenSymbol: data.qfRoundBySlug.allocatedTokenSymbol,
    maximumReward: data.qfRoundBySlug.maximumReward,
  };
}

async function getRoundProjects(roundId: number): Promise<RoundProject[]> {
  const projects: RoundProject[] = [];
  let skip = 0;
  let total = Number.POSITIVE_INFINITY;

  while (projects.length < total) {
    const data = await fetchGraphql<ProjectsForRoundResponse>(
      `
        query ProjectsForRound(
          $skip: Int
          $take: Int
          $filters: ProjectFiltersInput
        ) {
          projects(skip: $skip, take: $take, filters: $filters) {
            total
            projects {
              id
              slug
            }
          }
        }
      `,
      {
        skip,
        take: PROJECTS_PAGE_SIZE,
        filters: { qfRoundId: roundId },
      },
    );

    total = data.projects.total;
    projects.push(
      ...data.projects.projects.map((project) => ({
        projectId: Number(project.id),
        projectSlug: project.slug,
      })),
    );

    if (data.projects.projects.length === 0) {
      break;
    }

    skip += PROJECTS_PAGE_SIZE;
  }

  return projects;
}

async function getProjectDonations(
  projectId: number,
  roundId: number,
): Promise<DonationsByProjectResponse["donationsByProject"]["donations"]> {
  const donations: DonationsByProjectResponse["donationsByProject"]["donations"] =
    [];
  let skip = 0;
  let total = Number.POSITIVE_INFINITY;

  while (donations.length < total) {
    const data = await fetchGraphql<DonationsByProjectResponse>(
      `
        query DonationsByProject(
          $projectId: Int!
          $skip: Int
          $take: Int
          $orderBy: DonationSortField!
          $orderDirection: SortDirection!
          $qfRoundId: Int
        ) {
          donationsByProject(
            projectId: $projectId
            skip: $skip
            take: $take
            orderBy: $orderBy
            orderDirection: $orderDirection
            qfRoundId: $qfRoundId
          ) {
            total
            donations {
              id
              valueUsd
              fromWalletAddress
            }
          }
        }
      `,
      {
        projectId,
        skip,
        take: DONATIONS_PAGE_SIZE,
        orderBy: "CreatedAt",
        orderDirection: "DESC",
        qfRoundId: roundId,
      },
    );

    total = data.donationsByProject.total;
    donations.push(...data.donationsByProject.donations);

    if (data.donationsByProject.donations.length === 0) {
      break;
    }

    skip += DONATIONS_PAGE_SIZE;
  }

  return donations;
}

function buildRawProjectEstimate(
  project: RoundProjectWithDonations,
): RawProjectEstimate {
  const donorTotals = new Map<string, number>();
  let raisedUsd = 0;
  let donationCount = 0;

  for (const donation of project.donations) {
    const amount = Number(donation.valueUsd ?? 0);

    if (!Number.isFinite(amount) || amount < 1) {
      continue;
    }

    const donorKey =
      donation.fromWalletAddress?.toLowerCase() ?? `donation:${donation.id}`;

    raisedUsd += amount;
    donationCount += 1;
    donorTotals.set(donorKey, (donorTotals.get(donorKey) ?? 0) + amount);
  }

  const donorAmounts = Array.from(donorTotals.values());
  const sqrtSum = donorAmounts.reduce(
    (total, amount) => total + Math.sqrt(amount),
    0,
  );
  const rawScore = Math.max(0, sqrtSum * sqrtSum - raisedUsd);

  return {
    projectId: project.projectId,
    projectSlug: project.projectSlug,
    raisedUsd: Number(raisedUsd.toFixed(2)),
    donorCount: donorTotals.size,
    donationCount,
    estimatedMatchUsd: 0,
    rawScore,
  };
}

// Apply the round cap iteratively so capped projects stop receiving overflow.
function applyMatchingCap(
  rawEstimates: RawProjectEstimate[],
  matchingPoolUsd: number,
  projectCapUsd: number,
) {
  const allocated = new Map<number, number>();
  const remaining = rawEstimates.filter((project) => project.rawScore > 0);
  let remainingPoolUsd = matchingPoolUsd;

  while (remaining.length > 0 && remainingPoolUsd > 0) {
    const totalScore = remaining.reduce(
      (total, project) => total + project.rawScore,
      0,
    );

    if (totalScore <= 0) {
      break;
    }

    const cappedProjects = remaining.filter(
      (project) =>
        remainingPoolUsd * (project.rawScore / totalScore) > projectCapUsd,
    );

    if (cappedProjects.length === 0) {
      for (const project of remaining) {
        allocated.set(
          project.projectId,
          remainingPoolUsd * (project.rawScore / totalScore),
        );
      }
      break;
    }

    for (const project of cappedProjects) {
      allocated.set(project.projectId, projectCapUsd);
      remainingPoolUsd -= projectCapUsd;
    }

    const cappedProjectIds = new Set(
      cappedProjects.map((project) => project.projectId),
    );

    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      if (cappedProjectIds.has(remaining[index].projectId)) {
        remaining.splice(index, 1);
      }
    }
  }

  return rawEstimates.map((project) => ({
    projectId: project.projectId,
    estimatedMatchUsd: Number(
      (allocated.get(project.projectId) ?? 0).toFixed(2),
    ),
  }));
}

export async function getEthereumSecurityQfEstimates(): Promise<QfEstimateBundle> {
  const round = await getRound();
  const roundProjects = await getRoundProjects(round.id);
  const projectsWithDonations = await mapWithConcurrency(
    roundProjects,
    FETCH_CONCURRENCY,
    async (project) => ({
      ...project,
      donations: await getProjectDonations(project.projectId, round.id),
    }),
  );

  const rawEstimates = projectsWithDonations.map(buildRawProjectEstimate);
  const projectCapUsd = round.allocatedFundUSD * round.maximumReward;
  const allocations = applyMatchingCap(
    rawEstimates,
    round.allocatedFundUSD,
    projectCapUsd,
  );
  const estimatesByProjectId = new Map(
    allocations.map((allocation) => [allocation.projectId, allocation]),
  );

  return {
    context: {
      roundName: round.name,
      roundSlug: round.slug,
      matchingPoolUsd: round.allocatedFundUSD,
      matchingPoolTokenAmount: round.allocatedFund,
      matchingPoolTokenSymbol: round.allocatedTokenSymbol,
      maxPerProjectRatio: round.maximumReward,
      refreshIntervalMinutes: REVALIDATE_SECONDS / 60,
    },
    estimatesBySlug: new Map(
      rawEstimates.map((estimate) => [
        estimate.projectSlug,
        {
          projectId: estimate.projectId,
          projectSlug: estimate.projectSlug,
          raisedUsd: estimate.raisedUsd,
          donorCount: estimate.donorCount,
          donationCount: estimate.donationCount,
          estimatedMatchUsd:
            estimatesByProjectId.get(estimate.projectId)?.estimatedMatchUsd ??
            0,
        },
      ]),
    ),
  };
}
