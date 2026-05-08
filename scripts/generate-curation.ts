import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildHeuristicCuration } from "../lib/curation";
import { SHEET_CSV_URL, normalizeProjectsFromCsv } from "../lib/fetch-sheet";
import type {
  ProjectCuration,
  ProjectScore,
  SheetProject,
  ThemeKey,
} from "../lib/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../data/curation.generated.ts");

const requestTimeoutMs = 12_000;
const reviewConcurrency = 8;
const reviewNote =
  "Reviewed against project website and official sheet metadata.";
const maxParsedHtmlChars = 60_000;

type ThemeRule = {
  strong: string[];
  medium: string[];
};

type SiteProfile = {
  canonicalUrl: string | null;
  fetchedUrl: string | null;
  ok: boolean;
  title: string;
  description: string;
  text: string;
};

type ThemeInference = {
  primaryCategory: ThemeKey;
  themeBaskets: ThemeKey[];
  scores: Record<ThemeKey, number>;
};

type ProjectOverride = Partial<
  Pick<
    ProjectCuration,
    | "primaryCategory"
    | "themeBaskets"
    | "trackRecord"
    | "underfundedness"
    | "ecosystemLeverage"
    | "publicGoodsOpenness"
    | "executionClarity"
    | "confidenceScore"
  >
>;

const themeRules: Record<ThemeKey, ThemeRule> = {
  "core-protocol-client-security": {
    strong: [
      "client",
      "consensus",
      "protocol",
      "node",
      "validator",
      "stateless client",
      "execution layer",
      "mempool",
      "censorship resistance",
      "fork choice",
      "ethereum core",
      "distributed systems",
      "network layer",
    ],
    medium: [
      "ethereum",
      "eip",
      "eips",
      "p2p",
      "peer to peer",
      "mev",
      "encrypted mempool",
      "rollup",
      "core infra",
      "core infrastructure",
    ],
  },
  "tooling-fuzzing-formal-verification": {
    strong: [
      "formal verification",
      "fuzzer",
      "fuzzing",
      "property testing",
      "static analysis",
      "decompiler",
      "symbolic execution",
      "debugger",
      "language server",
      "simulator",
      "package manager",
      "benchmark suite",
      "invariant testing",
      "tooling",
      "developer tooling",
      "verification framework",
      "block explorer",
      "explorer",
      "scanner",
      "analyzer",
      "testing framework",
    ],
    medium: [
      "tool",
      "sdk",
      "library",
      "cli",
      "smart contract testing",
      "smart contract analysis",
      "developer tool",
      "open source software",
      "runtime verification",
      "bytecode",
    ],
  },
  "monitoring-incident-response-ops": {
    strong: [
      "monitoring",
      "security monitoring",
      "alert",
      "alerts",
      "incident response",
      "threat intelligence",
      "threat",
      "opsec",
      "scam",
      "recovery",
      "detection",
      "real time",
      "real-time",
      "runtime safety",
      "supply chain security",
      "domain monitoring",
    ],
    medium: [
      "incident",
      "ops",
      "operational security",
      "forensics",
      "watchtower",
      "risk layer",
      "security operations",
      "notifications",
    ],
  },
  "wallet-app-user-safety": {
    strong: [
      "wallet",
      "hardware wallet",
      "transaction guard",
      "transaction simulation",
      "signing",
      "account security",
      "account abstraction",
      "phishing",
      "user safety",
      "consumer safety",
      "recovery wallet",
      "browser security",
    ],
    medium: [
      "user protection",
      "dapp safety",
      "wallet security",
      "app safety",
      "frontend security",
      "safe ux",
      "safer ux",
    ],
  },
  "cryptography-zk-security": {
    strong: [
      "threshold encryption",
      "cryptography",
      "cryptographic",
      "zero knowledge",
      "zero-knowledge",
      "zk",
      "proof system",
      "proofs",
      "snark",
      "stark",
      "signature scheme",
      "mpc",
      "distributed key generation",
    ],
    medium: [
      "encryption",
      "proof",
      "privacy protocol",
      "commit reveal",
      "commit-reveal",
      "mathematical",
      "theorem proving",
    ],
  },
  "education-research-coordination": {
    strong: [
      "education",
      "training",
      "course",
      "classes",
      "podcast",
      "media",
      "coordination",
      "academy",
      "cat herders",
      "newsletter",
      "tutorial",
      "workshop",
    ],
    medium: [
      "research",
      "community",
      "guide",
      "knowledge",
      "publications",
      "learning",
      "insight",
      "teach",
      "resources",
      "community call",
    ],
  },
};

const primaryCategoryLeverage: Record<ThemeKey, number> = {
  "core-protocol-client-security": 4.4,
  "tooling-fuzzing-formal-verification": 4.5,
  "monitoring-incident-response-ops": 4.1,
  "wallet-app-user-safety": 3.6,
  "cryptography-zk-security": 4.4,
  "education-research-coordination": 3.5,
};

const manualOverrides: Record<string, ProjectOverride> = {
  "https://qf.giveth.io/project/agnopraxlab": {
    primaryCategory: "core-protocol-client-security",
    themeBaskets: [
      "core-protocol-client-security",
      "education-research-coordination",
    ],
    executionClarity: 3,
    confidenceScore: 0.74,
  },
  "https://qf.giveth.io/project/aragon": {
    primaryCategory: "education-research-coordination",
    themeBaskets: ["education-research-coordination", "wallet-app-user-safety"],
    confidenceScore: 0.63,
  },
  "https://qf.giveth.io/project/blockscout-open-source-block-explorer": {
    primaryCategory: "tooling-fuzzing-formal-verification",
    themeBaskets: [
      "tooling-fuzzing-formal-verification",
      "core-protocol-client-security",
    ],
    confidenceScore: 0.92,
  },
  "https://qf.giveth.io/project/fight-human-trafficking-and-crypto-fraud-with-dobs":
    {
      primaryCategory: "monitoring-incident-response-ops",
      themeBaskets: [
        "monitoring-incident-response-ops",
        "education-research-coordination",
      ],
      underfundedness: 5,
      publicGoodsOpenness: 4,
      executionClarity: 3,
      confidenceScore: 0.58,
    },
  "https://qf.giveth.io/project/ethlimo": {
    primaryCategory: "wallet-app-user-safety",
    themeBaskets: ["wallet-app-user-safety", "core-protocol-client-security"],
    confidenceScore: 0.82,
  },
  "https://qf.giveth.io/project/echidna:-a-fast-smart-contract-fuzzer": {
    trackRecord: 4,
    underfundedness: 4,
    confidenceScore: 0.98,
  },
  "https://qf.giveth.io/project/fuzzing-for-zk-systems-privacy-is-normal-but-not-safe":
    {
      primaryCategory: "tooling-fuzzing-formal-verification",
      themeBaskets: [
        "tooling-fuzzing-formal-verification",
        "cryptography-zk-security",
      ],
      executionClarity: 4,
      confidenceScore: 0.84,
    },
  "https://qf.giveth.io/project/lif:-legitimate-intervention-framework": {
    primaryCategory: "monitoring-incident-response-ops",
    themeBaskets: [
      "monitoring-incident-response-ops",
      "tooling-fuzzing-formal-verification",
    ],
    executionClarity: 4,
    confidenceScore: 0.78,
  },
  "https://qf.giveth.io/project/mabxyz-transaction-guards": {
    primaryCategory: "wallet-app-user-safety",
    themeBaskets: [
      "wallet-app-user-safety",
      "tooling-fuzzing-formal-verification",
    ],
    executionClarity: 4,
    confidenceScore: 0.75,
  },
  "https://qf.giveth.io/project/open-source-ai-security-triage-by-hackenproof":
    {
      primaryCategory: "tooling-fuzzing-formal-verification",
      themeBaskets: [
        "tooling-fuzzing-formal-verification",
        "education-research-coordination",
      ],
      publicGoodsOpenness: 5,
      executionClarity: 4,
      confidenceScore: 0.8,
    },
  "https://qf.giveth.io/project/opensense-open-web3-security": {
    primaryCategory: "education-research-coordination",
    themeBaskets: [
      "education-research-coordination",
      "tooling-fuzzing-formal-verification",
    ],
    publicGoodsOpenness: 4,
    executionClarity: 4,
    confidenceScore: 0.73,
  },
  "https://qf.giveth.io/project/scar:-ai-retrieval-for-smart-contract-security":
    {
      primaryCategory: "tooling-fuzzing-formal-verification",
      themeBaskets: [
        "tooling-fuzzing-formal-verification",
        "education-research-coordination",
      ],
      confidenceScore: 0.86,
    },
  "https://qf.giveth.io/project/securing-ai-agents-on-ethereum:-security-education":
    {
      primaryCategory: "education-research-coordination",
      themeBaskets: ["education-research-coordination"],
      publicGoodsOpenness: 4,
      executionClarity: 4,
      confidenceScore: 0.78,
    },
  "https://qf.giveth.io/project/shutter-network": {
    primaryCategory: "cryptography-zk-security",
    themeBaskets: ["cryptography-zk-security", "core-protocol-client-security"],
    confidenceScore: 0.96,
  },
  "https://qf.giveth.io/project/spamreports": {
    primaryCategory: "monitoring-incident-response-ops",
    themeBaskets: ["monitoring-incident-response-ops"],
    publicGoodsOpenness: 4,
    executionClarity: 4,
    confidenceScore: 0.83,
  },
  "https://qf.giveth.io/project/specter-on-chain-security-research-and-investigator":
    {
      primaryCategory: "monitoring-incident-response-ops",
      themeBaskets: [
        "monitoring-incident-response-ops",
        "education-research-coordination",
      ],
      underfundedness: 4,
      publicGoodsOpenness: 4,
      executionClarity: 4,
      confidenceScore: 0.82,
    },
  "https://qf.giveth.io/project/tanuki42": {
    primaryCategory: "monitoring-incident-response-ops",
    themeBaskets: [
      "monitoring-incident-response-ops",
      "education-research-coordination",
    ],
    publicGoodsOpenness: 4,
    executionClarity: 4,
    confidenceScore: 0.81,
  },
  "https://qf.giveth.io/project/tool-against-price-manipulation-attacks-in-defi-on-evm":
    {
      primaryCategory: "tooling-fuzzing-formal-verification",
      themeBaskets: [
        "tooling-fuzzing-formal-verification",
        "core-protocol-client-security",
      ],
      trackRecord: 4,
      publicGoodsOpenness: 4,
      executionClarity: 4,
      confidenceScore: 0.83,
    },
  "https://qf.giveth.io/project/web3secnews:-security-intelligence-newsletter":
    {
      primaryCategory: "monitoring-incident-response-ops",
      themeBaskets: [
        "monitoring-incident-response-ops",
        "education-research-coordination",
      ],
      confidenceScore: 0.93,
    },
  "https://qf.giveth.io/project/webacy-dd": {
    primaryCategory: "monitoring-incident-response-ops",
    themeBaskets: [
      "monitoring-incident-response-ops",
      "wallet-app-user-safety",
    ],
    publicGoodsOpenness: 4,
    executionClarity: 4,
    confidenceScore: 0.87,
  },
  "https://qf.giveth.io/project/wiimee-wallet-security-education": {
    primaryCategory: "wallet-app-user-safety",
    themeBaskets: ["wallet-app-user-safety", "education-research-coordination"],
    underfundedness: 4,
    publicGoodsOpenness: 4,
    executionClarity: 4,
    confidenceScore: 0.76,
  },
  "https://qf.giveth.io/project/zkbugs-ai": {
    primaryCategory: "cryptography-zk-security",
    themeBaskets: [
      "cryptography-zk-security",
      "tooling-fuzzing-formal-verification",
    ],
    executionClarity: 4,
    confidenceScore: 0.88,
  },
};

function clampScore(value: number): ProjectScore {
  return Math.max(1, Math.min(5, Math.round(value))) as ProjectScore;
}

function clampNumber(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value: string) {
  return normalizeWhitespace(
    decodeHtmlEntities(value.replace(/<[^>]+>/g, " ")),
  );
}

function normalizeText(value: string) {
  return normalizeWhitespace(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[^a-z0-9]+/g, " "),
  );
}

function getUniqueLinks(project: SheetProject, type: string) {
  return [
    ...new Set(
      project.socialLinks
        .filter((link) => link.type === type)
        .map((link) => link.link),
    ),
  ];
}

function getCanonicalWebsite(project: SheetProject) {
  return (
    getUniqueLinks(project, "WEBSITE")[0] ??
    getUniqueLinks(project, "GITHUB")[0] ??
    null
  );
}

function extractMetaTag(html: string, name: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+name=["']${name}["'][^>]+content=["']([\\s\\S]*?)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([\\s\\S]*?)["'][^>]+name=["']${name}["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+property=["']${name}["'][^>]+content=["']([\\s\\S]*?)["'][^>]*>`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return normalizeWhitespace(decodeHtmlEntities(match[1]));
    }
  }

  return "";
}

function extractTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? normalizeWhitespace(decodeHtmlEntities(match[1])) : "";
}

function extractBodyText(html: string) {
  const snippets: string[] = [];
  const pattern = /<(h1|h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null = null;

  while ((match = pattern.exec(html)) !== null) {
    snippets.push(stripHtml(match[2]));

    if (snippets.length >= 120 || snippets.join(" ").length >= 4_000) {
      break;
    }
  }

  return normalizeWhitespace(snippets.join(" ")).slice(0, 4_000);
}

async function fetchHtmlWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; howtovote-curation-bot/1.0; +https://qf.giveth.io)",
      },
    });

    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok || !contentType.includes("text")) {
      return {
        ok: false,
        fetchedUrl: response.url,
        html: "",
      };
    }

    return {
      ok: true,
      fetchedUrl: response.url,
      html: await readTextUpToLimit(response, maxParsedHtmlChars),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function readTextUpToLimit(response: Response, maxChars: number) {
  if (!response.body) {
    return (await response.text()).slice(0, maxChars);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (text.length < maxChars) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    text += decoder.decode(value, { stream: true });

    if (text.length >= maxChars) {
      await reader.cancel();
      break;
    }
  }

  text += decoder.decode();
  return text.slice(0, maxChars);
}

async function buildSiteProfile(project: SheetProject): Promise<SiteProfile> {
  const canonicalUrl = getCanonicalWebsite(project);

  if (!canonicalUrl) {
    return {
      canonicalUrl: null,
      fetchedUrl: null,
      ok: false,
      title: "",
      description: "",
      text: "",
    };
  }

  try {
    const response = await fetchHtmlWithTimeout(canonicalUrl);

    if (!response.ok) {
      return {
        canonicalUrl,
        fetchedUrl: response.fetchedUrl,
        ok: false,
        title: "",
        description: "",
        text: "",
      };
    }

    return {
      canonicalUrl,
      fetchedUrl: response.fetchedUrl,
      ok: true,
      title: extractTitle(response.html),
      description:
        extractMetaTag(response.html, "description") ||
        extractMetaTag(response.html, "og:description"),
      text: extractBodyText(response.html),
    };
  } catch {
    return {
      canonicalUrl,
      fetchedUrl: null,
      ok: false,
      title: "",
      description: "",
      text: "",
    };
  }
}

function scoreMatches(haystack: string, needles: string[], weight: number) {
  return needles.reduce(
    (total, needle) => (haystack.includes(needle) ? total + weight : total),
    0,
  );
}

function inferThemes(
  project: SheetProject,
  siteProfile: SiteProfile,
): ThemeInference {
  const projectText = normalizeText(
    [
      project.title,
      project.descriptionSummary,
      project.categoryNames.join(" "),
      project.mainCategoryNames.join(" "),
      siteProfile.canonicalUrl ?? "",
      siteProfile.fetchedUrl ?? "",
    ].join(" "),
  );
  const siteText = normalizeText(
    [siteProfile.title, siteProfile.description, siteProfile.text].join(" "),
  );

  const scores = Object.fromEntries(
    Object.entries(themeRules).map(([themeKey, rule]) => [
      themeKey,
      scoreMatches(projectText, rule.strong, 3.4) +
        scoreMatches(projectText, rule.medium, 1.5) +
        scoreMatches(siteText, rule.strong, 2.2) +
        scoreMatches(siteText, rule.medium, 0.9),
    ]),
  ) as Record<ThemeKey, number>;

  const combinedText = `${projectText} ${siteText}`;

  if (
    combinedText.includes("governance") ||
    combinedText.includes("treasury")
  ) {
    scores["wallet-app-user-safety"] += 0.4;
    scores["education-research-coordination"] += 0.5;
  }

  if (
    combinedText.includes("open source") ||
    combinedText.includes("open source software")
  ) {
    scores["tooling-fuzzing-formal-verification"] += 0.3;
  }

  const rankedThemes = Object.entries(scores)
    .sort((left, right) => right[1] - left[1])
    .map(([themeKey, score]) => ({
      themeKey: themeKey as ThemeKey,
      score,
    }));

  const fallback = buildHeuristicCuration(project).themeBaskets;
  const primaryCategory = rankedThemes[0]?.score
    ? rankedThemes[0].themeKey
    : fallback[0];
  const secondaryCandidate = rankedThemes[1];
  const themeBaskets = [primaryCategory];

  if (
    secondaryCandidate &&
    secondaryCandidate.score >= 2.6 &&
    secondaryCandidate.score >= (rankedThemes[0]?.score ?? 0) * 0.58 &&
    secondaryCandidate.themeKey !== primaryCategory
  ) {
    themeBaskets.push(secondaryCandidate.themeKey);
  } else if (fallback[1] && fallback[1] !== primaryCategory) {
    themeBaskets.push(fallback[1]);
  }

  return {
    primaryCategory,
    themeBaskets,
    scores,
  };
}

function hasGithub(project: SheetProject) {
  return project.socialLinks.some((link) => link.type === "GITHUB");
}

function textSignals(project: SheetProject, siteProfile: SiteProfile) {
  const combined = normalizeText(
    [
      project.title,
      project.descriptionSummary,
      project.categoryNames.join(" "),
      siteProfile.title,
      siteProfile.description,
      siteProfile.text,
    ].join(" "),
  );

  return {
    combined,
    hasDocs:
      combined.includes("docs") ||
      combined.includes("documentation") ||
      combined.includes("how it works"),
    isNonProfit:
      project.categoryNames.includes("registered-non-profits") ||
      combined.includes("nonprofit") ||
      combined.includes("non profit"),
    isPublicGoods:
      project.categoryNames.includes("public-goods") ||
      combined.includes("public good"),
    isResearch:
      project.categoryNames.includes("research") ||
      combined.includes("research"),
    isCommercial:
      combined.includes("enterprise") ||
      combined.includes("customers") ||
      combined.includes("premium") ||
      combined.includes("consulting") ||
      combined.includes("services"),
    isEarly:
      combined.includes("poc") ||
      combined.includes("proof of concept") ||
      combined.includes("prototype") ||
      combined.includes("hackathon"),
    mentionsFunding:
      combined.includes("funding") ||
      combined.includes("grant") ||
      combined.includes("donation") ||
      combined.includes("support us") ||
      combined.includes("roadmap"),
    mentionsAdoption:
      combined.includes("used by") ||
      combined.includes("partners") ||
      combined.includes("trusted by") ||
      combined.includes("since 20") ||
      combined.includes("founded in") ||
      combined.includes("launched in"),
  };
}

function buildConfidenceScore(
  project: SheetProject,
  siteProfile: SiteProfile,
  themeInference: ThemeInference,
) {
  const rankedScores = Object.values(themeInference.scores).sort(
    (left, right) => right - left,
  );
  const firstScore = rankedScores[0] ?? 0;
  const secondScore = rankedScores[1] ?? 0;
  const signals = textSignals(project, siteProfile);

  let confidence = 0.42;
  confidence += siteProfile.ok ? 0.16 : 0;
  confidence += siteProfile.title ? 0.08 : 0;
  confidence += siteProfile.description ? 0.1 : 0;
  confidence += siteProfile.text.length > 500 ? 0.08 : 0;
  confidence += firstScore >= 4 ? 0.06 : 0;
  confidence += firstScore - secondScore >= 2 ? 0.06 : 0;
  confidence += signals.hasDocs ? 0.04 : 0;
  confidence += hasGithub(project) ? 0.03 : 0;
  confidence -= siteProfile.ok ? 0 : 0.1;

  return Number(clampNumber(confidence, 0.25, 0.98).toFixed(2));
}

function buildReviewedCuration(
  project: SheetProject,
  siteProfile: SiteProfile,
): ProjectCuration {
  const themeInference = inferThemes(project, siteProfile);
  const signals = textSignals(project, siteProfile);

  const trackRecord =
    2.7 +
    (project.updatesCount > 0 ? 0.25 : 0) +
    (project.updatesCount > 2 ? 0.35 : 0) +
    (signals.mentionsAdoption ? 0.6 : 0) +
    (hasGithub(project) ? 0.2 : 0) -
    (signals.isEarly ? 0.45 : 0);

  const underfundedness =
    2.9 +
    (signals.isNonProfit ? 0.65 : 0) +
    (signals.isPublicGoods ? 0.4 : 0) +
    (signals.isResearch ? 0.3 : 0) +
    (themeInference.primaryCategory === "education-research-coordination"
      ? 0.35
      : 0) -
    (signals.isCommercial ? 0.55 : 0);

  const ecosystemLeverage =
    primaryCategoryLeverage[themeInference.primaryCategory] +
    (themeInference.themeBaskets.length > 1 ? 0.3 : 0) +
    (signals.combined.includes("ethereum") ? 0.2 : 0) +
    (signals.combined.includes("developers") ? 0.2 : 0);

  const publicGoodsOpenness =
    2.8 +
    (hasGithub(project) ? 0.75 : 0) +
    (signals.isPublicGoods ? 0.55 : 0) +
    (signals.isNonProfit ? 0.45 : 0) +
    (signals.combined.includes("open source") ||
    signals.combined.includes("open-source")
      ? 0.45
      : 0) -
    (signals.isCommercial && !signals.isPublicGoods ? 0.35 : 0);

  const executionClarity =
    2.8 +
    (siteProfile.description ? 0.4 : 0) +
    (siteProfile.text.length > 700 ? 0.4 : 0) +
    (signals.hasDocs ? 0.35 : 0) +
    (signals.mentionsFunding ? 0.25 : 0) -
    (siteProfile.ok ? 0 : 0.45);

  const confidenceScore = buildConfidenceScore(
    project,
    siteProfile,
    themeInference,
  );

  const baseCuration: ProjectCuration = {
    primaryCategory: themeInference.primaryCategory,
    themeBaskets: themeInference.themeBaskets,
    trackRecord: clampScore(trackRecord),
    underfundedness: clampScore(underfundedness),
    ecosystemLeverage: clampScore(ecosystemLeverage),
    publicGoodsOpenness: clampScore(publicGoodsOpenness),
    executionClarity: clampScore(executionClarity),
    confidenceScore,
    notes: reviewNote,
    source: "manual",
  };

  const override = manualOverrides[project.projectUrl];

  if (!override) {
    return baseCuration;
  }

  return {
    ...baseCuration,
    ...override,
    primaryCategory:
      override.primaryCategory ??
      override.themeBaskets?.[0] ??
      baseCuration.primaryCategory,
    themeBaskets: override.themeBaskets ?? baseCuration.themeBaskets,
  };
}

async function mapWithConcurrency<T, U>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<U>,
) {
  const results: U[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= items.length) {
        return;
      }

      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );

  return results;
}

function buildAuditTable(
  projects: SheetProject[],
  curations: Record<string, ProjectCuration>,
  siteProfiles: Map<string, SiteProfile>,
) {
  return projects
    .map((project) => {
      const curation = curations[project.projectUrl];
      const siteProfile = siteProfiles.get(project.projectUrl);

      return [
        project.title,
        curation.primaryCategory,
        curation.themeBaskets.join(","),
        curation.trackRecord,
        curation.underfundedness,
        curation.ecosystemLeverage,
        curation.publicGoodsOpenness,
        curation.executionClarity,
        curation.confidenceScore,
        siteProfile?.canonicalUrl ?? "",
        siteProfile?.title ?? "",
      ].join("\t");
    })
    .join("\n");
}

async function main() {
  const response = await fetch(SHEET_CSV_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet CSV: ${response.status}`);
  }

  const projects = normalizeProjectsFromCsv(await response.text());
  const siteProfiles = new Map<string, SiteProfile>();

  const reviewedEntries = await mapWithConcurrency(
    projects,
    reviewConcurrency,
    async (project, index) => {
      console.log(
        `[${index + 1}/${projects.length}] reviewing ${project.title}`,
      );
      const siteProfile = await buildSiteProfile(project);
      siteProfiles.set(project.projectUrl, siteProfile);
      return [
        project.projectUrl,
        buildReviewedCuration(project, siteProfile),
      ] as const;
    },
  );

  const curations = Object.fromEntries(reviewedEntries);

  const fileContents = `import type { ProjectCuration } from "@/lib/types";

export const generatedProjectCurations: Record<string, ProjectCuration> = ${JSON.stringify(
    curations,
    null,
    2,
  )};
`;

  await fs.writeFile(outputPath, fileContents);

  const auditPath = "/tmp/howtovote-curation-audit.tsv";
  await fs.writeFile(
    auditPath,
    buildAuditTable(projects, curations, siteProfiles),
  );

  console.log(
    `Generated reviewed curation for ${projects.length} projects at ${outputPath}`,
  );
  console.log(`Audit table written to ${auditPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
