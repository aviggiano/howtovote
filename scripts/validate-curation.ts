import { generatedProjectCurations } from "../data/curation.generated";
import { getSheetProjects } from "../lib/fetch-sheet";

async function main() {
  const projects = await getSheetProjects();
  const missingProjects = projects.filter(
    (project) => generatedProjectCurations[project.projectUrl] === undefined,
  );

  if (missingProjects.length > 0) {
    console.error(
      `Missing curation entries for ${missingProjects.length} projects.`,
    );
    console.error(
      missingProjects
        .map((project) => `- ${project.title} (${project.projectUrl})`)
        .join("\n"),
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Validated curation coverage for ${projects.length} projects.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
