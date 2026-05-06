import { type ThemeDefinition, type ThemeKey } from "@/lib/types";

export const themeDefinitions: ThemeDefinition[] = [
  {
    key: "core-protocol-client-security",
    label: "Core Protocol & Client Security",
    shortLabel: "Protocol",
    blurb:
      "Consensus, clients, networking, protocol hardening, and validator-critical work.",
  },
  {
    key: "tooling-fuzzing-formal-verification",
    label: "Tooling, Fuzzing & Formal Verification",
    shortLabel: "Tooling",
    blurb:
      "Fuzzers, analyzers, formal methods, testing frameworks, and developer security tooling.",
  },
  {
    key: "monitoring-incident-response-ops",
    label: "Monitoring, Incident Response & Ops",
    shortLabel: "Ops",
    blurb:
      "Detection, observability, incident response, runtime safety, and operational security.",
  },
  {
    key: "wallet-app-user-safety",
    label: "Wallet, App & User Safety",
    shortLabel: "Wallets",
    blurb:
      "Account security, wallets, phishing resistance, app-layer protections, and safer UX.",
  },
  {
    key: "cryptography-zk-security",
    label: "Cryptography & ZK Security",
    shortLabel: "Crypto",
    blurb:
      "ZK systems, cryptography, proof security, and mathematically sensitive infrastructure.",
  },
  {
    key: "education-research-coordination",
    label: "Education, Research & Coordination",
    shortLabel: "Education",
    blurb:
      "Knowledge transfer, ecosystem coordination, public research, and security education.",
  },
];

export const themeDefinitionByKey = Object.fromEntries(
  themeDefinitions.map((theme) => [theme.key, theme]),
) as Record<ThemeKey, ThemeDefinition>;
