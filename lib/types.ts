export const themeKeys = [
  "core-protocol-client-security",
  "tooling-fuzzing-formal-verification",
  "monitoring-incident-response-ops",
  "wallet-app-user-safety",
  "cryptography-zk-security",
  "education-research-coordination",
] as const;

export type ThemeKey = (typeof themeKeys)[number];

export const criterionKeys = [
  "trackRecord",
  "underfundedness",
  "ecosystemLeverage",
  "publicGoodsOpenness",
  "executionClarity",
] as const;

export type CriterionKey = (typeof criterionKeys)[number];

export type ProjectScore = 1 | 2 | 3 | 4 | 5;

export type ThemeDefinition = {
  key: ThemeKey;
  label: string;
  shortLabel: string;
  blurb: string;
};

export type CriterionDefinition = {
  key: CriterionKey;
  label: string;
  shortLabel: string;
  description: string;
  calculation: string;
};

export type SocialLink = {
  link: string;
  type: string;
};

export type BadgeDonationTrace = {
  walletAddress: string;
  donatedAt: string;
  actualUsd: number;
  weightedUsd: number;
  transactionHash: string | null;
  transactionNetworkId: number | null;
};

export type ProjectQfEstimate = {
  projectId: number;
  projectSlug: string;
  raisedUsd: number;
  donorCount: number;
  donationCount: number;
  verifiedBadgeDonorCount: number;
  verifiedBadgeDonationCount: number;
  verifiedBadgeRaisedUsd: number;
  unresolvedDonationCount: number;
  unresolvedRaisedUsd: number;
  estimatedMatchUsd: number;
  estimatedMatchDeltaUsd: number;
  badgeDonationTraces: BadgeDonationTrace[];
};

export type QfEstimateContext = {
  roundName: string;
  roundSlug: string;
  matchingPoolUsd: number;
  matchingPoolTokenAmount: number;
  matchingPoolTokenSymbol: string;
  maxPerProjectRatio: number;
  refreshIntervalMinutes: number;
  badgeContractAddress: string;
  badgeContractName: string;
  badgeContractSymbol: string;
  verifiedBadgeDonorWalletCount: number;
  verifiedBadgeDonationCount: number;
  verifiedBadgeRaisedUsd: number;
  unresolvedDonationCount: number;
  unresolvedRaisedUsd: number;
};

export type MatchingDonorTrace = {
  walletAddress: string;
  donationCount: number;
  projectCount: number;
  actualUsd: number;
  weightedUsd: number;
  firstDonationAt: string;
  lastDonationAt: string;
};

export type MatchingTransparency = {
  donorTraces: MatchingDonorTrace[];
  verifiedBadgeDonorWalletCount: number;
  verifiedBadgeDonationCount: number;
  verifiedBadgeRaisedUsd: number;
  unresolvedDonationCount: number;
  unresolvedRaisedUsd: number;
};

export type ExploreDonation = {
  id: string;
  projectId: number;
  projectSlug: string;
  donorWalletAddress: string;
  actualUsd: number;
  weightedUsd: number;
  donatedAt: string;
  transactionHash: string | null;
  transactionNetworkId: number | null;
  isVerifiedBadgeDonation: boolean;
};

export type ExploreDonorNode = {
  id: string;
  walletAddress: string;
  totalUsd: number;
  weightedUsd: number;
  donationCount: number;
  projectCount: number;
  verifiedBadgeDonationCount: number;
};

export type ExploreProjectNode = {
  id: string;
  projectId: number;
  projectSlug: string;
  projectUrl: string;
  title: string;
  ownerName: string;
  imageUrl: string | null;
  totalUsd: number;
  donorCount: number;
  verifiedBadgeRaisedUsd: number;
  mainCategoryNames: string[];
  themeBaskets: ThemeKey[];
};

export type ExploreGraph = {
  donors: ExploreDonorNode[];
  projects: ExploreProjectNode[];
  donations: ExploreDonation[];
  unresolvedDonationCount: number;
  unresolvedRaisedUsd: number;
};

export type SheetProject = {
  title: string;
  projectUrl: string;
  descriptionSummary: string;
  ownerName: string;
  ownerTwitterName: string | null;
  imageUrl: string | null;
  categoryNames: string[];
  mainCategoryNames: string[];
  updatesCount: number;
  socialLinks: SocialLink[];
};

export type CurationSource = "generated" | "manual" | "llm";

export type ProjectCuration = {
  primaryCategory: ThemeKey;
  themeBaskets: ThemeKey[];
  trackRecord: ProjectScore;
  underfundedness: ProjectScore;
  ecosystemLeverage: ProjectScore;
  publicGoodsOpenness: ProjectScore;
  executionClarity: ProjectScore;
  confidenceScore: number;
  notes: string;
  source: CurationSource;
};

export type ProjectReviewSiteProfile = {
  canonicalUrl: string | null;
  fetchedUrl: string | null;
  ok: boolean;
  title: string;
  description: string;
  text: string;
};

export type ProjectScoringInput = {
  slug: string;
  project: SheetProject;
  siteProfile: ProjectReviewSiteProfile;
  preparedAt: string;
  reviewBrief: string;
};

export type CriterionRationale = Record<CriterionKey, string>;

export type ProjectScoringResult = {
  projectUrl: string;
  title: string;
  reviewedAt: string;
  evidence: string[];
  rationale: CriterionRationale;
  curation: ProjectCuration;
};

export type AllocationProject = SheetProject & {
  curation: ProjectCuration;
  qfEstimate: ProjectQfEstimate | null;
};

export type CriterionWeights = Record<CriterionKey, number>;
export type ThemeWeights = Record<ThemeKey, number>;

export type AllocationPreset = {
  key: string;
  label: string;
  description: string;
  criteriaWeights: CriterionWeights;
  themeWeights: ThemeWeights;
};

export type RecommendationBreakdown = Record<CriterionKey, number>;

export type ProjectRecommendation = AllocationProject & {
  score: number;
  themeMultiplier: number;
  matchedThemes: ThemeKey[];
  breakdown: RecommendationBreakdown;
  allocationPercent: number;
  allocationAmount: number;
};

export type AllocationState = {
  budget: number;
  presetKey: string;
  selectedThemes: ThemeKey[];
  query: string;
};

export const criterionDefinitions: CriterionDefinition[] = [
  {
    key: "trackRecord",
    label: "Track Record",
    shortLabel: "Record",
    description:
      "How much evidence there is that the team has already shipped useful work and stayed active.",
    calculation:
      "Reviewed from project website and sheet context, looking for evidence of shipped work, adoption, continuity, and time in market.",
  },
  {
    key: "underfundedness",
    label: "Underfundedness",
    shortLabel: "Need",
    description:
      "A proxy for how much marginal funding is likely to matter right now.",
    calculation:
      "Reviewed from project structure and public positioning, with higher scores for smaller public-goods efforts and lower scores for clearly commercial organizations.",
  },
  {
    key: "ecosystemLeverage",
    label: "Ecosystem Leverage",
    shortLabel: "Leverage",
    description:
      "How broadly the project compounds value across Ethereum builders, infra, and security posture.",
    calculation:
      "Reviewed from the project’s surface area across Ethereum security, infra, tooling, coordination, and user protection.",
  },
  {
    key: "publicGoodsOpenness",
    label: "Public Goods Openness",
    shortLabel: "Openness",
    description:
      "How clearly the project behaves like an open public good rather than a closed private good.",
    calculation:
      "Reviewed from open-source posture, public-good language, nonprofit/community structure, and the visibility of public artifacts.",
  },
  {
    key: "executionClarity",
    label: "Execution Clarity",
    shortLabel: "Clarity",
    description:
      "How clearly the project explains what it plans to do and how donated funds will be used.",
    calculation:
      "Reviewed from how specifically the project explains its product, work program, roadmap, or requested funding use.",
  },
];
