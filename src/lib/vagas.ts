import rawEditions from "../../content/vagas/editions.json";
import { Job, JobEdition } from "./types";

const ACTIVE_DAYS_LIMIT = 30; // 30-day TTL

export async function getAllEditions(): Promise<JobEdition[]> {
  const editions = (rawEditions as JobEdition[]).slice();
  return editions.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getLatestEdition(): Promise<JobEdition | null> {
  const editions = await getAllEditions();
  return editions[0] || null;
}

export async function getEditionByDate(date: string): Promise<JobEdition | null> {
  const editions = await getAllEditions();
  const match = editions.find((e) => e.date === date);
  return match || null;
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
  const validPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (validPage - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedJobs = filtered.slice(startIndex, endIndex);

  return {
    jobs: paginatedJobs,
    total,
    page: validPage,
    limit,
    hasMore: validPage < totalPages,
    totalPages,
  };
}
