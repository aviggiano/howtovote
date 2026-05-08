import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { getSheetProjects } from "../lib/fetch-sheet";
import { themeKeys, type ProjectCuration } from "../lib/types";

const inputDir = path.resolve(process.cwd(), "tmp/project-scoring-results");
const outputPath = path.resolve(process.cwd(), "data/curation.generated.ts");

const projectScoreSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

const projectCurationSchema = z.object({
  primaryCategory: z.enum(themeKeys),
  themeBaskets: z.array(z.enum(themeKeys)).min(1).max(2),
  trackRecord: projectScoreSchema,
  underfundedness: projectScoreSchema,
  ecosystemLeverage: projectScoreSchema,
  publicGoodsOpenness: projectScoreSchema,
  executionClarity: projectScoreSchema,
  confidenceScore: z.number().min(0).max(1),
  notes: z.string().min(1),
});

const projectScoringResultSchema = z.object({
  projectUrl: z.string().url(),
  title: z.string().min(1),
  reviewedAt: z.string().min(1),
  evidence: z.array(z.string()).min(1),
  rationale: z.object({
    trackRecord: z.string().min(1),
    underfundedness: z.string().min(1),
    ecosystemLeverage: z.string().min(1),
    publicGoodsOpenness: z.string().min(1),
    executionClarity: z.string().min(1),
  }),
  curation: projectCurationSchema,
});

type ParsedProjectScoringResult = z.infer<typeof projectScoringResultSchema>;

function createFinalCuration(
  result: ParsedProjectScoringResult,
): ProjectCuration {
  return {
    ...result.curation,
    themeBaskets: Array.from(new Set(result.curation.themeBaskets)).slice(0, 2),
    notes: [
      result.curation.notes.trim(),
      `Evidence: ${result.evidence.join(" | ")}`,
      `Rationale / Track Record: ${result.rationale.trackRecord.trim()}`,
      `Rationale / Underfundedness: ${result.rationale.underfundedness.trim()}`,
      `Rationale / Ecosystem Leverage: ${result.rationale.ecosystemLeverage.trim()}`,
      `Rationale / Public Goods Openness: ${result.rationale.publicGoodsOpenness.trim()}`,
      `Rationale / Execution Clarity: ${result.rationale.executionClarity.trim()}`,
      `Reviewed at: ${result.reviewedAt}`,
    ].join("\n"),
    source: "llm",
  };
}

async function main() {
  const projects = await getSheetProjects();
  const filenames = (await fs.readdir(inputDir))
    .filter((filename) => filename.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right));

  if (filenames.length === 0) {
    throw new Error(`No scoring result JSON files found in ${inputDir}`);
  }

  const results = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(inputDir, filename);
      const raw = await fs.readFile(filePath, "utf8");
      return projectScoringResultSchema.parse(JSON.parse(raw));
    }),
  );

  const resultsByProjectUrl = new Map(
    results.map((result) => [result.projectUrl, result]),
  );

  const missingProjects = projects.filter(
    (project) => !resultsByProjectUrl.has(project.projectUrl),
  );

  if (missingProjects.length > 0) {
    throw new Error(
      `Missing scoring results for ${missingProjects.length} projects: ${missingProjects
        .map((project) => project.title)
        .join(", ")}`,
    );
  }

  const unknownProjectUrls = results.filter(
    (result) =>
      !projects.some((project) => project.projectUrl === result.projectUrl),
  );

  if (unknownProjectUrls.length > 0) {
    throw new Error(
      `Found scoring results for unknown projects: ${unknownProjectUrls
        .map((result) => result.projectUrl)
        .join(", ")}`,
    );
  }

  const curations = Object.fromEntries(
    projects.map((project) => [
      project.projectUrl,
      createFinalCuration(resultsByProjectUrl.get(project.projectUrl)!),
    ]),
  );

  const fileContents = `import type { ProjectCuration } from "@/lib/types";

export const generatedProjectCurations: Record<string, ProjectCuration> = ${JSON.stringify(
    curations,
    null,
    2,
  )};
`;

  await fs.writeFile(outputPath, fileContents);

  console.log(`Merged ${results.length} scoring results into ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
