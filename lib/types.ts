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
};

export type SocialLink = {
  link: string;
  type: string;
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

export type ProjectCuration = {
  themeBaskets: ThemeKey[];
  trackRecord: ProjectScore;
  underfundedness: ProjectScore;
  ecosystemLeverage: ProjectScore;
  publicGoodsOpenness: ProjectScore;
  executionClarity: ProjectScore;
  notes: string;
  source: "generated" | "manual";
};

export type AllocationProject = SheetProject & {
  curation: ProjectCuration;
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
  { key: "trackRecord", label: "Track Record", shortLabel: "Record" },
  { key: "underfundedness", label: "Underfundedness", shortLabel: "Need" },
  {
    key: "ecosystemLeverage",
    label: "Ecosystem Leverage",
    shortLabel: "Leverage",
  },
  {
    key: "publicGoodsOpenness",
    label: "Public Goods Openness",
    shortLabel: "Openness",
  },
  {
    key: "executionClarity",
    label: "Execution Clarity",
    shortLabel: "Clarity",
  },
];
