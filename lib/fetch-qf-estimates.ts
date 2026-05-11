import type {
  ExploreDonation,
  MatchingDonorTrace,
  MatchingTransparency,
  ProjectQfEstimate,
  QfEstimateContext,
} from "@/lib/types";

const GIVETH_GRAPHQL_URL = "https://core.v6.giveth.io/graphql";
const ETHEREUM_RPC_URL =
  process.env.ETHEREUM_RPC_URL ?? "https://ethereum-rpc.publicnode.com";
const ETH_SECURITY_VOTING_BADGE_CONTRACT =
  "0x3B49f45EC8796F64feBB1Ae0f5661791845ce35C";
// Fixed once so production RPCs do not need archive-state eth_getCode scans.
const ETH_SECURITY_VOTING_BADGE_CREATION_BLOCK = 24_880_973;
const ETH_SECURITY_VOTING_BADGE_TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const ROUND_SLUG = "ethereum-security";
const PROJECTS_PAGE_SIZE = 200;
const DONATIONS_PAGE_SIZE = 1000;
const FETCH_CONCURRENCY = 12;
const RPC_FETCH_CONCURRENCY = 6;
const RPC_LOG_BLOCK_RANGE = 50_000;
const RPC_BATCH_SIZE = 100;
const REVALIDATE_SECONDS = 60 * 30;
const MIN_DONATION_USD = 1;
const MAX_VISIBLE_DONOR_TRACES = 16;
const ETHEREUM_MAINNET_NETWORK_ID = 1;

type GraphqlError = {
  message: string;
};

type GraphqlResponse<T> = {
  data?: T;
  errors?: GraphqlError[];
};

type JsonRpcError = {
  code: number;
  message: string;
};

type JsonRpcResponse<T> = {
  error?: JsonRpcError;
  result?: T;
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
      createdAt: string;
      anonymous: boolean;
      transactionId: string | null;
      transactionNetworkId: number | null;
    }[];
  };
};

type RoundProject = {
  projectId: number;
  projectSlug: string;
};

type RoundDonation =
  DonationsByProjectResponse["donationsByProject"]["donations"][number];

type RoundProjectWithDonations = RoundProject & {
  donations: RoundDonation[];
};

type RawProjectEstimate = ProjectQfEstimate & {
  rawScore: number;
};

type QfEstimateBundle = {
  context: QfEstimateContext;
  estimatesBySlug: Map<string, ProjectQfEstimate>;
  exploreDonations: ExploreDonation[];
  transparency: MatchingTransparency;
};

type RpcLog = {
  address: string;
  blockNumber: string;
  transactionIndex: string;
  logIndex: string;
  transactionHash: string;
  topics: string[];
  data: string;
  blockTimestamp?: string;
};

type WalletInterval = {
  startBlockNumber: number;
  startTransactionIndex: number;
  startLogIndex: number;
  startMs: number;
  endBlockNumber: number | null;
  endTransactionIndex: number | null;
  endLogIndex: number | null;
  endMs: number | null;
};

type BadgeContractMetadata = {
  address: string;
  creationBlockNumber: number;
  name: string;
  symbol: string;
};

type DonorTraceBuilder = {
  actualUsd: number;
  donationCount: number;
  firstDonationAtMs: number;
  lastDonationAtMs: number;
  projectSlugs: Set<string>;
  weightedUsd: number;
};

type ProjectEstimateComputation = {
  baselineRawScore: number;
  estimate: RawProjectEstimate;
};

type DonationChainPosition = {
  blockNumber: number;
  timestampMs: number;
  transactionIndex: number;
};

type RpcBlockHeader = {
  number: string;
  timestamp: string;
};

type RpcTransactionReceipt = {
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
};

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
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
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error("Unknown GraphQL error");

      if (attempt < 2) {
        await sleep(250 * (attempt + 1));
      }
    }
  }

  throw lastError ?? new Error("Unable to fetch Giveth GraphQL data");
}

async function fetchJsonRpc<T>(method: string, params: unknown[]): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(ETHEREUM_RPC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method,
          params,
        }),
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Ethereum RPC data: ${response.status} ${response.statusText}`,
        );
      }

      const payload = (await response.json()) as JsonRpcResponse<T>;

      if (payload.error) {
        throw new Error(
          `Ethereum RPC error (${payload.error.code}): ${payload.error.message}`,
        );
      }

      if (payload.result === undefined) {
        throw new Error("Missing Ethereum RPC payload");
      }

      return payload.result;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unknown Ethereum RPC error");

      if (attempt < 2) {
        await sleep(250 * (attempt + 1));
      }
    }
  }

  throw lastError ?? new Error("Unable to fetch Ethereum RPC data");
}

async function fetchJsonRpcBatch<T>(
  requests: Array<{ method: string; params: unknown[] }>,
): Promise<T[]> {
  if (requests.length === 0) {
    return [];
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(ETHEREUM_RPC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          requests.map((request, index) => ({
            id: index + 1,
            jsonrpc: "2.0",
            method: request.method,
            params: request.params,
          })),
        ),
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Ethereum RPC batch data: ${response.status} ${response.statusText}`,
        );
      }

      const payload = (await response.json()) as Array<
        JsonRpcResponse<T> & { id?: number }
      >;

      if (!Array.isArray(payload)) {
        throw new Error("Missing Ethereum RPC batch payload");
      }

      const resultsById = new Map<number, T>();

      for (const item of payload) {
        if (item.error) {
          throw new Error(
            `Ethereum RPC batch error (${item.error.code}): ${item.error.message}`,
          );
        }

        if (item.result === undefined || item.id === undefined) {
          throw new Error("Malformed Ethereum RPC batch payload");
        }

        resultsById.set(item.id, item.result);
      }

      return requests.map((_, index) => {
        const result = resultsById.get(index + 1);

        if (result === undefined) {
          throw new Error("Incomplete Ethereum RPC batch payload");
        }

        return result;
      });
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unknown Ethereum RPC error");

      if (attempt < 2) {
        await sleep(250 * (attempt + 1));
      }
    }
  }

  throw lastError ?? new Error("Unable to fetch Ethereum RPC batch data");
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

function decodeAbiString(resultHex: string) {
  const normalizedHex = resultHex.startsWith("0x")
    ? resultHex.slice(2)
    : resultHex;

  if (normalizedHex.length < 128) {
    return "";
  }

  const offset = Number.parseInt(normalizedHex.slice(0, 64), 16) * 2;
  const length = Number.parseInt(normalizedHex.slice(offset, offset + 64), 16);
  const dataStart = offset + 64;
  const dataEnd = dataStart + length * 2;

  return Buffer.from(normalizedHex.slice(dataStart, dataEnd), "hex").toString(
    "utf8",
  );
}

function parseHexNumber(value: string) {
  return Number.parseInt(value, 16);
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function toHexBlock(blockNumber: number) {
  return `0x${blockNumber.toString(16)}`;
}

function normalizeWalletAddress(walletAddress: string | null) {
  return walletAddress?.toLowerCase() ?? null;
}

function walletFromTopic(topic: string) {
  return `0x${topic.slice(-40)}`.toLowerCase();
}

function computeRawScore(donorTotals: Map<string, number>, raisedUsd: number) {
  const donorAmounts = Array.from(donorTotals.values());
  const sqrtSum = donorAmounts.reduce(
    (total, amount) => total + Math.sqrt(amount),
    0,
  );

  return Math.max(0, sqrtSum * sqrtSum - raisedUsd);
}

function compareBlockPosition(
  leftBlockNumber: number,
  leftTransactionIndex: number,
  rightBlockNumber: number,
  rightTransactionIndex: number,
) {
  if (leftBlockNumber !== rightBlockNumber) {
    return leftBlockNumber - rightBlockNumber;
  }

  return leftTransactionIndex - rightTransactionIndex;
}

function holderIntervalsInclude(
  intervals: WalletInterval[] | undefined,
  donationTimestampMs: number,
  donationChainPosition?: DonationChainPosition,
) {
  if (!intervals || intervals.length === 0) {
    return false;
  }

  if (!donationChainPosition) {
    return intervals.some(
      (interval) =>
        donationTimestampMs >= interval.startMs &&
        (interval.endMs === null || donationTimestampMs < interval.endMs),
    );
  }

  return intervals.some((interval) => {
    const donationAfterStart =
      compareBlockPosition(
        donationChainPosition.blockNumber,
        donationChainPosition.transactionIndex,
        interval.startBlockNumber,
        interval.startTransactionIndex,
      ) > 0;

    if (!donationAfterStart) {
      return false;
    }

    if (
      interval.endBlockNumber === null ||
      interval.endTransactionIndex === null
    ) {
      return true;
    }

    return (
      compareBlockPosition(
        donationChainPosition.blockNumber,
        donationChainPosition.transactionIndex,
        interval.endBlockNumber,
        interval.endTransactionIndex,
      ) < 0
    );
  });
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
): Promise<RoundDonation[]> {
  const donations: RoundDonation[] = [];
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
              createdAt
              anonymous
              transactionId
              transactionNetworkId
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

async function getLatestEthereumBlockNumber() {
  const latestBlockHex = await fetchJsonRpc<string>("eth_blockNumber", []);
  return parseHexNumber(latestBlockHex);
}

async function getBadgeContractMetadata(): Promise<BadgeContractMetadata> {
  const [nameResult, symbolResult] = await Promise.all([
    fetchJsonRpc<string>("eth_call", [
      { data: "0x06fdde03", to: ETH_SECURITY_VOTING_BADGE_CONTRACT },
      "latest",
    ]),
    fetchJsonRpc<string>("eth_call", [
      { data: "0x95d89b41", to: ETH_SECURITY_VOTING_BADGE_CONTRACT },
      "latest",
    ]),
  ]);

  return {
    address: ETH_SECURITY_VOTING_BADGE_CONTRACT,
    creationBlockNumber: ETH_SECURITY_VOTING_BADGE_CREATION_BLOCK,
    name: decodeAbiString(nameResult),
    symbol: decodeAbiString(symbolResult),
  };
}

function isLogRangeTooLargeError(error: Error) {
  const message = error.message.toLowerCase();

  return [
    "block range",
    "query returned more than",
    "response size exceeded",
    "request exceeds",
    "too many results",
    "range is too wide",
  ].some((fragment) => message.includes(fragment));
}

async function getBadgeTransferLogsForRange(
  contractMetadata: BadgeContractMetadata,
  fromBlock: number,
  toBlock: number,
): Promise<RpcLog[]> {
  try {
    return await fetchJsonRpc<RpcLog[]>("eth_getLogs", [
      {
        address: contractMetadata.address,
        fromBlock: toHexBlock(fromBlock),
        toBlock: toHexBlock(toBlock),
        topics: [ETH_SECURITY_VOTING_BADGE_TRANSFER_TOPIC],
      },
    ]);
  } catch (error) {
    if (
      !(error instanceof Error) ||
      fromBlock >= toBlock ||
      !isLogRangeTooLargeError(error)
    ) {
      throw error;
    }

    const midpoint = Math.floor((fromBlock + toBlock) / 2);
    const [leftLogs, rightLogs] = await Promise.all([
      getBadgeTransferLogsForRange(contractMetadata, fromBlock, midpoint),
      getBadgeTransferLogsForRange(contractMetadata, midpoint + 1, toBlock),
    ]);

    return [...leftLogs, ...rightLogs];
  }
}

async function getBadgeTransferLogs(
  contractMetadata: BadgeContractMetadata,
  latestBlockNumber: number,
) {
  const ranges: Array<{ fromBlock: number; toBlock: number }> = [];

  for (
    let fromBlock = contractMetadata.creationBlockNumber;
    fromBlock <= latestBlockNumber;
    fromBlock += RPC_LOG_BLOCK_RANGE
  ) {
    ranges.push({
      fromBlock,
      toBlock: Math.min(latestBlockNumber, fromBlock + RPC_LOG_BLOCK_RANGE - 1),
    });
  }

  const logsByRange = await mapWithConcurrency(
    ranges,
    RPC_FETCH_CONCURRENCY,
    async ({ fromBlock, toBlock }) =>
      getBadgeTransferLogsForRange(contractMetadata, fromBlock, toBlock),
  );

  return logsByRange
    .flat()
    .sort(
      (left, right) =>
        parseHexNumber(left.blockNumber) - parseHexNumber(right.blockNumber) ||
        parseHexNumber(left.transactionIndex) -
          parseHexNumber(right.transactionIndex) ||
        parseHexNumber(left.logIndex) - parseHexNumber(right.logIndex),
    );
}

async function getBlockTimestamps(
  blockNumbers: number[],
  knownTimestamps = new Map<number, number>(),
) {
  const missingBlocks = blockNumbers.filter(
    (blockNumber) => !knownTimestamps.has(blockNumber),
  );
  const timestampsByBlock = new Map<number, number>();

  for (const [blockNumber, timestamp] of knownTimestamps) {
    timestampsByBlock.set(blockNumber, timestamp);
  }

  const blockNumberBatches = chunk(missingBlocks, RPC_BATCH_SIZE);

  await mapWithConcurrency(
    blockNumberBatches,
    RPC_FETCH_CONCURRENCY,
    async (batch) => {
      try {
        const blocks = await fetchJsonRpcBatch<RpcBlockHeader>(
          batch.map((blockNumber) => ({
            method: "eth_getBlockByNumber",
            params: [toHexBlock(blockNumber), false],
          })),
        );

        for (const block of blocks) {
          timestampsByBlock.set(
            parseHexNumber(block.number),
            parseHexNumber(block.timestamp),
          );
        }
      } catch {
        await mapWithConcurrency(
          batch,
          RPC_FETCH_CONCURRENCY,
          async (blockNumber) => {
            const block = await fetchJsonRpc<RpcBlockHeader>(
              "eth_getBlockByNumber",
              [toHexBlock(blockNumber), false],
            );
            timestampsByBlock.set(blockNumber, parseHexNumber(block.timestamp));
          },
        );
      }
    },
  );

  return timestampsByBlock;
}

async function getDonationChainPositionsById(donations: RoundDonation[]) {
  const transactionHashes = Array.from(
    new Set(
      donations
        .filter(
          (donation) =>
            Number(donation.valueUsd ?? 0) >= MIN_DONATION_USD &&
            donation.fromWalletAddress !== null &&
            donation.transactionNetworkId === ETHEREUM_MAINNET_NETWORK_ID &&
            donation.transactionId,
        )
        .map((donation) => donation.transactionId!.toLowerCase()),
    ),
  );

  if (transactionHashes.length === 0) {
    return new Map<string, DonationChainPosition>();
  }

  const receiptBatches = chunk(transactionHashes, RPC_BATCH_SIZE);
  const receiptsByHash = new Map<string, RpcTransactionReceipt>();

  await mapWithConcurrency(
    receiptBatches,
    RPC_FETCH_CONCURRENCY,
    async (batch) => {
      try {
        const receipts = await fetchJsonRpcBatch<RpcTransactionReceipt | null>(
          batch.map((transactionHash) => ({
            method: "eth_getTransactionReceipt",
            params: [transactionHash],
          })),
        );

        for (const receipt of receipts) {
          if (receipt?.transactionHash) {
            receiptsByHash.set(receipt.transactionHash.toLowerCase(), receipt);
          }
        }
      } catch {
        await mapWithConcurrency(
          batch,
          RPC_FETCH_CONCURRENCY,
          async (transactionHash) => {
            const receipt = await fetchJsonRpc<RpcTransactionReceipt | null>(
              "eth_getTransactionReceipt",
              [transactionHash],
            );

            if (receipt?.transactionHash) {
              receiptsByHash.set(
                receipt.transactionHash.toLowerCase(),
                receipt,
              );
            }
          },
        );
      }
    },
  );

  const blockTimestamps = await getBlockTimestamps(
    Array.from(
      new Set(
        Array.from(receiptsByHash.values()).map((receipt) =>
          parseHexNumber(receipt.blockNumber),
        ),
      ),
    ),
  );
  const positionsById = new Map<string, DonationChainPosition>();

  for (const donation of donations) {
    const transactionHash = donation.transactionId?.toLowerCase();

    if (
      donation.transactionNetworkId !== ETHEREUM_MAINNET_NETWORK_ID ||
      !transactionHash
    ) {
      continue;
    }

    const receipt = receiptsByHash.get(transactionHash);

    if (!receipt) {
      continue;
    }

    const blockNumber = parseHexNumber(receipt.blockNumber);
    const timestampSeconds = blockTimestamps.get(blockNumber);

    if (!timestampSeconds) {
      continue;
    }

    positionsById.set(donation.id, {
      blockNumber,
      timestampMs: timestampSeconds * 1000,
      transactionIndex: parseHexNumber(receipt.transactionIndex),
    });
  }

  return positionsById;
}

async function getBadgeHolderIntervalsByWallet(
  contractMetadata: BadgeContractMetadata,
) {
  const latestBlockNumber = await getLatestEthereumBlockNumber();
  const transferLogs = await getBadgeTransferLogs(
    contractMetadata,
    latestBlockNumber,
  );
  const blockTimestamps = await getBlockTimestamps(
    Array.from(
      new Set(
        transferLogs
          .filter((log) => !log.blockTimestamp)
          .map((log) => parseHexNumber(log.blockNumber)),
      ),
    ),
    new Map(
      transferLogs
        .filter((log) => log.blockTimestamp)
        .map((log) => [
          parseHexNumber(log.blockNumber),
          parseHexNumber(log.blockTimestamp!),
        ]),
    ),
  );
  const walletEvents = new Map<
    string,
    Array<{
      blockNumber: number;
      delta: -1 | 1;
      logIndex: number;
      timestampMs: number;
      transactionIndex: number;
    }>
  >();

  for (const log of transferLogs) {
    const blockNumber = parseHexNumber(log.blockNumber);
    const blockTimestampSeconds = log.blockTimestamp
      ? parseHexNumber(log.blockTimestamp)
      : blockTimestamps.get(blockNumber);

    if (!blockTimestampSeconds) {
      continue;
    }

    const timestampMs = blockTimestampSeconds * 1000;
    const fromWallet = walletFromTopic(log.topics[1] ?? "");
    const toWallet = walletFromTopic(log.topics[2] ?? "");
    const logIndex = parseHexNumber(log.logIndex);
    const transactionIndex = parseHexNumber(log.transactionIndex);

    if (fromWallet !== "0x0000000000000000000000000000000000000000") {
      const events = walletEvents.get(fromWallet) ?? [];
      events.push({
        blockNumber,
        delta: -1,
        logIndex,
        timestampMs,
        transactionIndex,
      });
      walletEvents.set(fromWallet, events);
    }

    if (toWallet !== "0x0000000000000000000000000000000000000000") {
      const events = walletEvents.get(toWallet) ?? [];
      events.push({
        blockNumber,
        delta: 1,
        logIndex,
        timestampMs,
        transactionIndex,
      });
      walletEvents.set(toWallet, events);
    }
  }

  const intervalsByWallet = new Map<string, WalletInterval[]>();

  for (const [walletAddress, events] of walletEvents) {
    events.sort(
      (left, right) =>
        left.blockNumber - right.blockNumber ||
        left.transactionIndex - right.transactionIndex ||
        left.logIndex - right.logIndex,
    );

    let ownedBadgeCount = 0;
    let openStart: {
      blockNumber: number;
      logIndex: number;
      timestampMs: number;
      transactionIndex: number;
    } | null = null;
    const intervals: WalletInterval[] = [];

    for (const event of events) {
      if (event.delta === 1) {
        ownedBadgeCount += 1;

        if (ownedBadgeCount === 1) {
          openStart = event;
        }

        continue;
      }

      if (ownedBadgeCount > 0) {
        ownedBadgeCount -= 1;

        if (ownedBadgeCount === 0 && openStart !== null) {
          intervals.push({
            startBlockNumber: openStart.blockNumber,
            startTransactionIndex: openStart.transactionIndex,
            startLogIndex: openStart.logIndex,
            startMs: openStart.timestampMs,
            endBlockNumber: event.blockNumber,
            endTransactionIndex: event.transactionIndex,
            endLogIndex: event.logIndex,
            endMs: event.timestampMs,
          });
          openStart = null;
        }
      }
    }

    if (ownedBadgeCount > 0 && openStart !== null) {
      intervals.push({
        startBlockNumber: openStart.blockNumber,
        startTransactionIndex: openStart.transactionIndex,
        startLogIndex: openStart.logIndex,
        startMs: openStart.timestampMs,
        endBlockNumber: null,
        endTransactionIndex: null,
        endLogIndex: null,
        endMs: null,
      });
    }

    if (intervals.length > 0) {
      intervalsByWallet.set(walletAddress, intervals);
    }
  }

  return intervalsByWallet;
}

function buildProjectEstimate(
  project: RoundProjectWithDonations,
  holderIntervalsByWallet: Map<string, WalletInterval[]>,
  donationChainPositionsById: Map<string, DonationChainPosition>,
  donorTraceBuilders: Map<string, DonorTraceBuilder>,
  exploreDonations: ExploreDonation[],
): ProjectEstimateComputation {
  const actualDonorTotals = new Map<string, number>();
  const weightedDonorTotals = new Map<string, number>();
  const badgeDonationTraces: ProjectQfEstimate["badgeDonationTraces"] = [];
  const verifiedBadgeDonors = new Set<string>();
  let raisedUsd = 0;
  let weightedRaisedUsd = 0;
  let donationCount = 0;
  let verifiedBadgeDonationCount = 0;
  let verifiedBadgeRaisedUsd = 0;
  let unresolvedDonationCount = 0;
  let unresolvedRaisedUsd = 0;

  for (const donation of project.donations) {
    const amount = Number(donation.valueUsd ?? 0);

    if (!Number.isFinite(amount) || amount < MIN_DONATION_USD) {
      continue;
    }

    const donorWallet = normalizeWalletAddress(donation.fromWalletAddress);
    const donorKey = donorWallet ?? `donation:${donation.id}`;
    const donationChainPosition = donationChainPositionsById.get(donation.id);
    const donationTimestampMs =
      donationChainPosition?.timestampMs ?? Date.parse(donation.createdAt);
    const hasResolvedWallet =
      donorWallet !== null && Number.isFinite(donationTimestampMs);
    const isVerifiedBadgeDonation =
      hasResolvedWallet &&
      holderIntervalsInclude(
        holderIntervalsByWallet.get(donorWallet),
        donationTimestampMs,
        donationChainPosition,
      );
    const weightedAmount = isVerifiedBadgeDonation ? amount * 4 : amount;

    raisedUsd += amount;
    weightedRaisedUsd += weightedAmount;
    donationCount += 1;
    actualDonorTotals.set(
      donorKey,
      (actualDonorTotals.get(donorKey) ?? 0) + amount,
    );
    weightedDonorTotals.set(
      donorKey,
      (weightedDonorTotals.get(donorKey) ?? 0) + weightedAmount,
    );

    if (!hasResolvedWallet) {
      unresolvedDonationCount += 1;
      unresolvedRaisedUsd += amount;
    }

    if (donorWallet) {
      exploreDonations.push({
        id: donation.id,
        projectId: project.projectId,
        projectSlug: project.projectSlug,
        donorWalletAddress: donorWallet,
        actualUsd: Number(amount.toFixed(2)),
        weightedUsd: Number(weightedAmount.toFixed(2)),
        donatedAt: new Date(donationTimestampMs).toISOString(),
        transactionHash: donation.transactionId?.toLowerCase() ?? null,
        transactionNetworkId: donation.transactionNetworkId,
        isVerifiedBadgeDonation,
      });
    }

    if (!isVerifiedBadgeDonation || !donorWallet) {
      continue;
    }

    verifiedBadgeDonors.add(donorWallet);
    verifiedBadgeDonationCount += 1;
    verifiedBadgeRaisedUsd += amount;
    badgeDonationTraces.push({
      walletAddress: donorWallet,
      donatedAt: new Date(donationTimestampMs).toISOString(),
      actualUsd: Number(amount.toFixed(2)),
      weightedUsd: Number(weightedAmount.toFixed(2)),
      transactionHash: donation.transactionId?.toLowerCase() ?? null,
      transactionNetworkId: donation.transactionNetworkId,
    });

    const donorTrace = donorTraceBuilders.get(donorWallet) ?? {
      actualUsd: 0,
      donationCount: 0,
      firstDonationAtMs: donationTimestampMs,
      lastDonationAtMs: donationTimestampMs,
      projectSlugs: new Set<string>(),
      weightedUsd: 0,
    };

    donorTrace.actualUsd += amount;
    donorTrace.weightedUsd += weightedAmount;
    donorTrace.donationCount += 1;
    donorTrace.projectSlugs.add(project.projectSlug);
    donorTrace.firstDonationAtMs = Math.min(
      donorTrace.firstDonationAtMs,
      donationTimestampMs,
    );
    donorTrace.lastDonationAtMs = Math.max(
      donorTrace.lastDonationAtMs,
      donationTimestampMs,
    );
    donorTraceBuilders.set(donorWallet, donorTrace);
  }

  return {
    baselineRawScore: computeRawScore(actualDonorTotals, raisedUsd),
    estimate: {
      projectId: project.projectId,
      projectSlug: project.projectSlug,
      raisedUsd: Number(raisedUsd.toFixed(2)),
      donorCount: actualDonorTotals.size,
      donationCount,
      verifiedBadgeDonorCount: verifiedBadgeDonors.size,
      verifiedBadgeDonationCount,
      verifiedBadgeRaisedUsd: Number(verifiedBadgeRaisedUsd.toFixed(2)),
      unresolvedDonationCount,
      unresolvedRaisedUsd: Number(unresolvedRaisedUsd.toFixed(2)),
      estimatedMatchUsd: 0,
      estimatedMatchDeltaUsd: 0,
      badgeDonationTraces: badgeDonationTraces.sort(
        (left, right) =>
          right.actualUsd - left.actualUsd ||
          Date.parse(right.donatedAt) - Date.parse(left.donatedAt),
      ),
      rawScore: computeRawScore(weightedDonorTotals, weightedRaisedUsd),
    },
  };
}

// Apply the round cap iteratively so capped projects stop receiving overflow.
function applyMatchingCap<T extends { projectId: number; rawScore: number }>(
  rawEstimates: T[],
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
  const [roundProjects, badgeContractMetadata] = await Promise.all([
    getRoundProjects(round.id),
    getBadgeContractMetadata(),
  ]);
  const projectsWithDonations = await mapWithConcurrency(
    roundProjects,
    FETCH_CONCURRENCY,
    async (project) => ({
      ...project,
      donations: await getProjectDonations(project.projectId, round.id),
    }),
  );
  const holderIntervalsByWallet = await getBadgeHolderIntervalsByWallet(
    badgeContractMetadata,
  );
  const donationChainPositionsById = await getDonationChainPositionsById(
    projectsWithDonations.flatMap((project) => project.donations),
  );
  const donorTraceBuilders = new Map<string, DonorTraceBuilder>();
  const exploreDonations: ExploreDonation[] = [];
  const computations = projectsWithDonations.map((project) =>
    buildProjectEstimate(
      project,
      holderIntervalsByWallet,
      donationChainPositionsById,
      donorTraceBuilders,
      exploreDonations,
    ),
  );
  const weightedRawEstimates = computations.map(
    (computation) => computation.estimate,
  );
  const baselineRawEstimates = computations.map((computation) => ({
    projectId: computation.estimate.projectId,
    rawScore: computation.baselineRawScore,
  }));
  const projectCapUsd = round.allocatedFundUSD * round.maximumReward;
  const [weightedAllocations, baselineAllocations] = await Promise.all([
    Promise.resolve(
      applyMatchingCap(
        weightedRawEstimates,
        round.allocatedFundUSD,
        projectCapUsd,
      ),
    ),
    Promise.resolve(
      applyMatchingCap(
        baselineRawEstimates,
        round.allocatedFundUSD,
        projectCapUsd,
      ),
    ),
  ]);
  const weightedMatchByProjectId = new Map(
    weightedAllocations.map((allocation) => [
      allocation.projectId,
      allocation.estimatedMatchUsd,
    ]),
  );
  const baselineMatchByProjectId = new Map(
    baselineAllocations.map((allocation) => [
      allocation.projectId,
      allocation.estimatedMatchUsd,
    ]),
  );
  const donorTraces: MatchingDonorTrace[] = Array.from(
    donorTraceBuilders.entries(),
  )
    .map(([walletAddress, donorTrace]) => ({
      walletAddress,
      donationCount: donorTrace.donationCount,
      projectCount: donorTrace.projectSlugs.size,
      actualUsd: Number(donorTrace.actualUsd.toFixed(2)),
      weightedUsd: Number(donorTrace.weightedUsd.toFixed(2)),
      firstDonationAt: new Date(donorTrace.firstDonationAtMs).toISOString(),
      lastDonationAt: new Date(donorTrace.lastDonationAtMs).toISOString(),
    }))
    .sort((left, right) => right.actualUsd - left.actualUsd);
  const visibleDonorTraces = donorTraces.slice(0, MAX_VISIBLE_DONOR_TRACES);
  const estimatesBySlug = new Map<string, ProjectQfEstimate>();
  let verifiedBadgeDonationCount = 0;
  let verifiedBadgeRaisedUsd = 0;
  let unresolvedDonationCount = 0;
  let unresolvedRaisedUsd = 0;

  for (const estimate of weightedRawEstimates) {
    const estimatedMatchUsd =
      weightedMatchByProjectId.get(estimate.projectId) ?? 0;
    const baselineMatchUsd =
      baselineMatchByProjectId.get(estimate.projectId) ?? 0;

    verifiedBadgeDonationCount += estimate.verifiedBadgeDonationCount;
    verifiedBadgeRaisedUsd += estimate.verifiedBadgeRaisedUsd;
    unresolvedDonationCount += estimate.unresolvedDonationCount;
    unresolvedRaisedUsd += estimate.unresolvedRaisedUsd;

    estimatesBySlug.set(estimate.projectSlug, {
      projectId: estimate.projectId,
      projectSlug: estimate.projectSlug,
      raisedUsd: estimate.raisedUsd,
      donorCount: estimate.donorCount,
      donationCount: estimate.donationCount,
      verifiedBadgeDonorCount: estimate.verifiedBadgeDonorCount,
      verifiedBadgeDonationCount: estimate.verifiedBadgeDonationCount,
      verifiedBadgeRaisedUsd: estimate.verifiedBadgeRaisedUsd,
      unresolvedDonationCount: estimate.unresolvedDonationCount,
      unresolvedRaisedUsd: estimate.unresolvedRaisedUsd,
      estimatedMatchUsd,
      estimatedMatchDeltaUsd: Number(
        (estimatedMatchUsd - baselineMatchUsd).toFixed(2),
      ),
      badgeDonationTraces: estimate.badgeDonationTraces,
    });
  }

  return {
    context: {
      roundName: round.name,
      roundSlug: round.slug,
      matchingPoolUsd: round.allocatedFundUSD,
      matchingPoolTokenAmount: round.allocatedFund,
      matchingPoolTokenSymbol: round.allocatedTokenSymbol,
      maxPerProjectRatio: round.maximumReward,
      refreshIntervalMinutes: REVALIDATE_SECONDS / 60,
      badgeContractAddress: badgeContractMetadata.address,
      badgeContractName: badgeContractMetadata.name,
      badgeContractSymbol: badgeContractMetadata.symbol,
      verifiedBadgeDonorWalletCount: donorTraces.length,
      verifiedBadgeDonationCount,
      verifiedBadgeRaisedUsd: Number(verifiedBadgeRaisedUsd.toFixed(2)),
      unresolvedDonationCount,
      unresolvedRaisedUsd: Number(unresolvedRaisedUsd.toFixed(2)),
    },
    estimatesBySlug,
    exploreDonations,
    transparency: {
      donorTraces: visibleDonorTraces,
      verifiedBadgeDonorWalletCount: donorTraces.length,
      verifiedBadgeDonationCount,
      verifiedBadgeRaisedUsd: Number(verifiedBadgeRaisedUsd.toFixed(2)),
      unresolvedDonationCount,
      unresolvedRaisedUsd: Number(unresolvedRaisedUsd.toFixed(2)),
    },
  };
}
