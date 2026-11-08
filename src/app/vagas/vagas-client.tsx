"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Job, JobEdition } from "@/lib/types";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Briefcase, Filter, X } from "lucide-react";

interface VagasClientProps {
  initialJobs: { job: Job; editionDate: string }[];
  editions: JobEdition[];
}

export function VagasClient({ initialJobs, editions }: VagasClientProps) {
  const [search, setSearch] = useState("");
  const [selectedStack, setSelectedStack] = useState<string>("Todas");
  const [selectedSeniority, setSelectedSeniority] = useState<string>("Todas");

  // Extract unique stacks
  const allStacks = useMemo(() => {
    const set = new Set<string>();
    for (const item of initialJobs) {
      for (const s of item.job.stacks) {
        set.add(s);
      }
    }
    return ["Todas", ...Array.from(set).sort()];
  }, [initialJobs]);

  const seniorities = ["Todas", "Júnior", "Pleno", "Sênior", "Especialista"];

  // Filter jobs
  const filtered = useMemo(() => {
    return initialJobs.filter(({ job }) => {
      // Search text
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesStack = job.stacks.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesStack) return false;
      }

      // Stack filter
      if (selectedStack !== "Todas") {
        if (!job.stacks.includes(selectedStack)) return false;
      }

      // Seniority filter
      if (selectedSeniority !== "Todas") {
        if (job.seniority !== selectedSeniority) return false;
      }

      return true;
    });
  }, [initialJobs, search, selectedStack, selectedSeniority]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3.5 rounded-xl border border-white/[0.08] bg-[#16171B]/90 p-4 sm:p-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input
            placeholder="Buscar por cargo, empresa ou stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-9 bg-[#0D0D0F] border-white/[0.12] text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500 text-sm h-11"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Stack filter pills with horizontal touch scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          <div className="flex items-center gap-1 text-zinc-400 shrink-0">
            <Filter className="size-3 text-emerald-400" />
            <span>Stack:</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {allStacks.map((stack) => (
              <button
                key={stack}
                type="button"
                onClick={() => setSelectedStack(stack)}
                className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors min-h-[32px] flex items-center shrink-0 ${
                  selectedStack === stack
                    ? "bg-emerald-500 text-black font-semibold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {stack}
              </button>
            ))}
          </div>
        </div>

        {/* Seniority filter with horizontal touch scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/[0.05] text-xs font-mono scrollbar-none">
          <div className="flex items-center gap-1 text-zinc-400 shrink-0">
            <Briefcase className="size-3 text-sky-400" />
            <span>Nível:</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {seniorities.map((sen) => (
              <button
                key={sen}
                type="button"
                onClick={() => setSelectedSeniority(sen)}
                className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors min-h-[32px] flex items-center shrink-0 ${
                  selectedSeniority === sen
                    ? "bg-sky-500 text-black font-semibold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {sen}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Counter and Editions bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400 border-b border-white/[0.06] pb-3">
        <span>
          Exibindo <strong className="text-white">{filtered.length}</strong> vagas abertas
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-zinc-500 shrink-0">Edições:</span>
          {editions.map((ed) => (
            <Link
              key={ed.date}
              href={`/vagas/${ed.date}`}
              className="inline-flex items-center gap-1 rounded bg-white/[0.05] px-2 py-1 text-zinc-300 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors shrink-0"
            >
              <Calendar className="size-3" />
              <span>{ed.dateLabel || ed.date}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(({ job, editionDate }, index) => (
            <JobCard key={`${job.url}-${index}`} job={job} editionDate={editionDate} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.08] p-8 sm:p-12 text-center flex flex-col items-center gap-3">
          <p className="text-zinc-400 text-sm">
            Nenhuma vaga encontrada com os filtros selecionados.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedStack("Todas");
              setSelectedSeniority("Todas");
            }}
            className="text-xs font-mono text-emerald-400 hover:underline min-h-[44px] flex items-center"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}
