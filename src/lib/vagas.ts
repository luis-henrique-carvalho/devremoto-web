import fs from "node:fs/promises";
import path from "node:path";
import { Job, JobEdition } from "./types";

const VAGAS_DIR = path.join(process.cwd(), "content/vagas");
const ACTIVE_DAYS_LIMIT = 30; // 30-day TTL

export async function getAllEditions(): Promise<JobEdition[]> {
  try {
    const files = await fs.readdir(VAGAS_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const editions: JobEdition[] = [];

    for (const file of jsonFiles) {
      const date = file.replace(".json", "");
      const fullPath = path.join(VAGAS_DIR, file);
      const raw = await fs.readFile(fullPath, "utf-8");
      const parsed = JSON.parse(raw);

      editions.push({
        ...parsed,
        date: parsed.date || date,
      });
    }

    // Sort descending by date (newest first)
    return editions.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("Error loading job editions:", error);
    return [];
  }
}

export async function getLatestEdition(): Promise<JobEdition | null> {
  const editions = await getAllEditions();
  return editions[0] || null;
}

export async function getEditionByDate(date: string): Promise<JobEdition | null> {
  try {
    const fullPath = path.join(VAGAS_DIR, `${date}.json`);
    const raw = await fs.readFile(fullPath, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      date: parsed.date || date,
    };
  } catch {
    return null;
  }
}

export interface JobWithDate {
  job: Job;
  editionDate: string;
}

export async function getAllJobs(options?: { activeOnly?: boolean }): Promise<JobWithDate[]> {
  const editions = await getAllEditions();
  const all: JobWithDate[] = [];

  const now = new Date("2026-11-08T00:00:00Z").getTime();
  const cutoffTime = now - ACTIVE_DAYS_LIMIT * 24 * 60 * 60 * 1000;

  for (const edition of editions) {
    // If activeOnly is true, check if edition is within 30 days
    if (options?.activeOnly) {
      const editionTime = new Date(edition.date).getTime();
      if (!isNaN(editionTime) && editionTime < cutoffTime) {
        continue;
      }
    }

    for (const job of edition.jobs) {
      all.push({
        job,
        editionDate: edition.dateLabel || edition.date,
      });
    }
  }

  return all;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  stack?: string;
  seniority?: string;
  search?: string;
}

export interface PaginatedResult {
  jobs: JobWithDate[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  totalPages: number;
}

export async function getPaginatedJobs(params: PaginationParams = {}): Promise<PaginatedResult> {
  const {
    page = 1,
    limit = 12,
    stack = "Todas",
    seniority = "Todas",
    search = "",
  } = params;

  const allJobs = await getAllJobs({ activeOnly: true });

  const filtered = allJobs.filter(({ job }) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(q);
      const matchesCompany = job.company.toLowerCase().includes(q);
      const matchesStack = job.stacks.some((s) => s.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCompany && !matchesStack) return false;
    }

    if (stack !== "Todas" && !job.stacks.includes(stack)) {
      return false;
    }

    if (seniority !== "Todas" && job.seniority !== seniority) {
      return false;
    }

    return true;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const jobs = filtered.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  return {
    jobs,
    total,
    page,
    limit,
    hasMore,
    totalPages,
  };
}
