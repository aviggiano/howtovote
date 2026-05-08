import fs from "node:fs/promises";
import path from "node:path";
import { getSheetProjects } from "../lib/fetch-sheet";
import type {
  ProjectReviewSiteProfile,
  ProjectScoringInput,
  SheetProject,
} from "../lib/types";

const outputDir = path.resolve(process.cwd(), "tmp/project-scoring-inputs");
const requestTimeoutMs = 12_000;
const maxParsedHtmlChars = 60_000;
const exportConcurrency = 6;

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

async function buildSiteProfile(
  project: SheetProject,
): Promise<ProjectReviewSiteProfile> {
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

function getProjectSlug(projectUrl: string) {
  return new URL(projectUrl).pathname.replace(/^\/project\//, "");
}

function sanitizeFilename(value: string) {
  return value
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildReviewBrief(
  project: SheetProject,
  siteProfile: ProjectReviewSiteProfile,
) {
  return [
    `Project: ${project.title}`,
    `Project URL: ${project.projectUrl}`,
    `Owner: ${project.ownerName}`,
    `Description summary: ${project.descriptionSummary || "n/a"}`,
    `Categories: ${project.categoryNames.join(", ") || "n/a"}`,
    `Main categories: ${project.mainCategoryNames.join(", ") || "n/a"}`,
    `Updates count: ${project.updatesCount}`,
    `Social links: ${
      project.socialLinks
        .map((link) => `${link.type}=${link.link}`)
        .join(", ") || "n/a"
    }`,
    `Website fetched: ${siteProfile.ok ? "yes" : "no"}`,
    `Canonical website: ${siteProfile.canonicalUrl ?? "n/a"}`,
    `Fetched URL: ${siteProfile.fetchedUrl ?? "n/a"}`,
    `Website title: ${siteProfile.title || "n/a"}`,
    `Website description: ${siteProfile.description || "n/a"}`,
    `Website text excerpt: ${siteProfile.text || "n/a"}`,
  ].join("\n");
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

async function main() {
  const projects = await getSheetProjects();

  await fs.rm(outputDir, { force: true, recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  const packets = await mapWithConcurrency(
    projects,
    exportConcurrency,
    async (project, index) => {
      console.log(
        `[${index + 1}/${projects.length}] preparing ${project.title}`,
      );
      const siteProfile = await buildSiteProfile(project);
      const packet: ProjectScoringInput = {
        slug: getProjectSlug(project.projectUrl),
        project,
        siteProfile,
        preparedAt: new Date().toISOString(),
        reviewBrief: buildReviewBrief(project, siteProfile),
      };
      const filename = `${String(index + 1).padStart(3, "0")}-${sanitizeFilename(packet.slug)}.json`;
      await fs.writeFile(
        path.join(outputDir, filename),
        `${JSON.stringify(packet, null, 2)}\n`,
      );

      return {
        file: filename,
        projectUrl: project.projectUrl,
        title: project.title,
      };
    },
  );

  await fs.writeFile(
    path.join(outputDir, "index.json"),
    `${JSON.stringify(packets, null, 2)}\n`,
  );

  console.log(`Prepared ${packets.length} scoring inputs in ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
