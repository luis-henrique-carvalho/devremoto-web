import fs from "node:fs/promises";
import path from "node:path";
import { Job, JobEdition } from "./types";

const VAGAS_DIR = path.join(process.cwd(), "content/vagas");

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

export async function getAllJobs(): Promise<{ job: Job; editionDate: string }[]> {
  const editions = await getAllEditions();
  const all: { job: Job; editionDate: string }[] = [];

  for (const edition of editions) {
    for (const job of edition.jobs) {
      all.push({
        job,
        editionDate: edition.date,
      });
    }
  }

  return all;
}
