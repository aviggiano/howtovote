import { themeDefinitionByKey } from "@/data/themes";
import type {
  ProjectCuration,
  ProjectScore,
  SheetProject,
  ThemeKey,
} from "@/lib/types";

const themeKeywords: Record<ThemeKey, string[]> = {
  "core-protocol-client-security": [
    "client",
    "consensus",
    "protocol",
    "validator",
    "node",
    "p2p",
    "peer",
    "reth",
    "geth",
    "besu",
    "erigon",
    "fork choice",
    "finality",
  ],
  "tooling-fuzzing-formal-verification": [
    "fuzz",
    "formal",
    "verification",
    "analyzer",
    "tooling",
    "testing",
    "audit",
    "static analysis",
    "symbolic",
    "hevm",
    "assertion",
  ],
  "monitoring-incident-response-ops": [
    "monitor",
    "incident",
    "response",
    "runtime",
    "observability",
    "alert",
    "detection",
    "ops",
    "forensics",
  ],
  "wallet-app-user-safety": [
    "wallet",
    "account",
    "user",
    "consumer",
    "frontend",
    "phishing",
    "transaction guards",
    "browser",
    "signing",
  ],
  "cryptography-zk-security": [
    "zk",
    "zero-knowledge",
    "cryptography",
    "cryptographic",
    "proof",
    "snark",
    "stark",
    "signature",
  ],
  "education-research-coordination": [
    "education",
    "research",
    "knowledge",
    "community",
    "coordination",
    "course",
    "writeup",
    "training",
    "publication",
  ],
};

function clampScore(value: number): ProjectScore {
  return Math.max(1, Math.min(5, Math.round(value))) as ProjectScore;
}

function keywordHits(content: string, keywords: string[]): number {
  return keywords.filter((keyword) => content.includes(keyword)).length;
}

function inferThemeBaskets(project: SheetProject): ThemeKey[] {
  const haystack = [
    project.title,
    project.descriptionSummary,
    project.categoryNames.join(" "),
    project.mainCategoryNames.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const matches = Object.entries(themeKeywords)
    .map(([themeKey, keywords]) => ({
      themeKey: themeKey as ThemeKey,
      hits: keywordHits(haystack, keywords),
    }))
    .filter((entry) => entry.hits > 0)
    .sort((left, right) => right.hits - left.hits);

  if (matches.length === 0) {
    return ["tooling-fuzzing-formal-verification"];
  }

  return matches.slice(0, 2).map((entry) => entry.themeKey);
}

export function buildHeuristicCuration(project: SheetProject): ProjectCuration {
  const themeBaskets = inferThemeBaskets(project);
  const haystack = [
    project.title,
    project.descriptionSummary,
    project.categoryNames.join(" "),
    project.mainCategoryNames.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const hasGithub = project.socialLinks.some((link) => link.type === "GITHUB");
  const isPublicGoods = project.categoryNames.includes("public-goods");
  const isResearch = project.categoryNames.includes("research");
  const isNonProfit = project.categoryNames.includes("registered-non-profits");

  const trackRecord =
    2.6 +
    (project.updatesCount > 0 ? 0.4 : 0) +
    (project.updatesCount > 2 ? 0.4 : 0) +
    (haystack.includes("recent work") ? 0.35 : 0) +
    (haystack.includes("widely used") ? 0.4 : 0) +
    (haystack.includes("years") ? 0.35 : 0);

  const underfundedness =
    2.8 +
    (isNonProfit ? 0.5 : 0) +
    (isResearch ? 0.35 : 0) +
    (themeBaskets.includes("education-research-coordination") ? 0.45 : 0) +
    (haystack.includes("small team") ? 0.45 : 0);

  const ecosystemLeverage =
    2.7 +
    (themeBaskets.includes("tooling-fuzzing-formal-verification") ? 0.7 : 0) +
    (themeBaskets.includes("core-protocol-client-security") ? 0.65 : 0) +
    (haystack.includes("infrastructure") ? 0.35 : 0) +
    (haystack.includes("developers") ? 0.3 : 0);

  const publicGoodsOpenness =
    2.7 +
    (hasGithub ? 0.7 : 0) +
    (isPublicGoods ? 0.6 : 0) +
    (haystack.includes("open-source") || haystack.includes("open source")
      ? 0.45
      : 0);

  const executionClarity =
    2.8 +
    (haystack.includes("how donations will be used") ? 0.7 : 0) +
    (haystack.includes("roadmap") ? 0.45 : 0) +
    (haystack.includes("deliver") ? 0.35 : 0) +
    (project.updatesCount > 0 ? 0.25 : 0);

  const themeLabels = themeBaskets
    .map((themeKey) => themeDefinitionByKey[themeKey].shortLabel)
    .join(", ");

  return {
    themeBaskets,
    trackRecord: clampScore(trackRecord),
    underfundedness: clampScore(underfundedness),
    ecosystemLeverage: clampScore(ecosystemLeverage),
    publicGoodsOpenness: clampScore(publicGoodsOpenness),
    executionClarity: clampScore(executionClarity),
    notes: `Generated baseline from spreadsheet metadata. Primary fit: ${themeLabels}. Replace with manual review notes for production allocations.`,
    source: "generated",
  };
}
