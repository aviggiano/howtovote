import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildHeuristicCuration } from "../lib/curation";
import { SHEET_CSV_URL, normalizeProjectsFromCsv } from "../lib/fetch-sheet";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../data/curation.generated.ts");

async function main() {
  const response = await fetch(SHEET_CSV_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet CSV: ${response.status}`);
  }

  const projects = normalizeProjectsFromCsv(await response.text());
  const curations = Object.fromEntries(
    projects.map((project) => [
      project.projectUrl,
      buildHeuristicCuration(project),
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

  console.log(
    `Generated curation overlay for ${projects.length} projects at ${outputPath}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
