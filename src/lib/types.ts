export interface Job {
  url: string;
  company: string;
  handle: string;
  title: string;
  seniority: string;
  stacks: string[];
  category: string;
  source: string;
  postedAt: string;
  isRecognized?: boolean;
  score?: number;
}

export interface JobEdition {
  date: string; // e.g. "2026-11-08"
  dateLabel: string; // e.g. "08.nov"
  generatedAt: string;
  count: number;
  hook?: {
    angle: string;
    headline: string;
    lead: string;
  };
  uniqueStacks: string[];
  senioritySummary: string;
  jobs: Job[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  githubRepo?: string;
  stars?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
