import Papa from "papaparse";
import { z } from "zod";
import type { SheetProject, SocialLink } from "@/lib/types";

export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1o3UYyn6aqiFnoK5NvnnMXIHM4Op4Rup7HNGxGM1lL2U/export?format=csv&gid=1388538582";

const normalizedProjectSchema = z.object({
  title: z.string().min(1),
  projectUrl: z.string().url(),
  descriptionSummary: z.string(),
  ownerName: z.string().min(1),
  ownerTwitterName: z.string().nullable(),
  imageUrl: z.string().nullable(),
  categoryNames: z.array(z.string()),
  mainCategoryNames: z.array(z.string()),
  updatesCount: z.number().int().nonnegative(),
  socialLinks: z.array(
    z.object({
      link: z.string(),
      type: z.string(),
    }),
  ),
});

type SpreadsheetRow = {
  title?: string;
  project_url?: string;
  description?: string;
  description_summary?: string;
  image?: string;
  owner_name?: string;
  owner_twitter_name?: string;
  category_names?: string;
  main_category_names?: string;
  social_media?: string;
  updates_count?: string;
};

function normalizeList(value: string | undefined): string[] {
  if (!value || value === "NULL") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseJsonArray<T>(value: string | undefined): T[] {
  if (!value || value === "NULL") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function stripHtml(value: string | undefined): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSocialLinks(value: string | undefined): SocialLink[] {
  return parseJsonArray<{ link?: string; type?: string }>(value)
    .map((entry) => ({
      link: entry.link?.trim() ?? "",
      type: entry.type?.trim() ?? "UNKNOWN",
    }))
    .filter((entry) => entry.link.length > 0);
}

export function normalizeProjectsFromCsv(csv: string): SheetProject[] {
  const parsed = Papa.parse<SpreadsheetRow>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors[0]?.message ?? "Unable to parse spreadsheet");
  }

  return parsed.data
    .map((row) => {
      const normalized = normalizedProjectSchema.parse({
        title: row.title?.trim() ?? "",
        projectUrl: row.project_url?.trim() ?? "",
        descriptionSummary:
          stripHtml(row.description_summary) || stripHtml(row.description),
        ownerName: row.owner_name?.trim() ?? "Unknown",
        ownerTwitterName:
          row.owner_twitter_name && row.owner_twitter_name !== "NULL"
            ? row.owner_twitter_name.trim()
            : null,
        imageUrl: row.image && row.image !== "NULL" ? row.image.trim() : null,
        categoryNames: normalizeList(row.category_names),
        mainCategoryNames: normalizeList(row.main_category_names),
        updatesCount: Number.parseInt(row.updates_count ?? "0", 10) || 0,
        socialLinks: normalizeSocialLinks(row.social_media),
      });

      return normalized satisfies SheetProject;
    })
    .sort((left, right) => left.title.localeCompare(right.title));
}

export async function getSheetProjects(): Promise<SheetProject[]> {
  const response = await fetch(SHEET_CSV_URL, {
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet CSV: ${response.status}`);
  }

  return normalizeProjectsFromCsv(await response.text());
}
