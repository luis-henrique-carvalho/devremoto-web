"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Job, JobEdition } from "@/lib/types";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Calendar,
  Briefcase,
  Filter,
  X,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const BATCH_SIZE = 12;

interface VagasClientProps {
  initialJobs: { job: Job; editionDate: string }[];
  editions: JobEdition[];
}

export function VagasClient({ initialJobs, editions }: VagasClientProps) {
  const [search, setSearch] = useState("");
  const [selectedStack, setSelectedStack] = useState<string>("Todas");
  const [selectedSeniority, setSelectedSeniority] = useState<string>("Todas");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Extract unique stacks from the available jobs
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

  // Filter jobs based on active filters
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
      if (selectedStack !== "Todas" && !job.stacks.includes(selectedStack)) {
        return false;
      }

      // Seniority filter
      if (selectedSeniority !== "Todas" && job.seniority !== selectedSeniority) {
        return false;
      }

      return true;
    });
  }, [initialJobs, search, selectedStack, selectedSeniority]);

  // Reset pagination to first batch whenever filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [search, selectedStack, selectedSeniority]);

  // Current batch to display
  const displayedJobs = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;
  const remainingCount = Math.min(BATCH_SIZE, filtered.length - visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate brief transition for silky smooth feedback
    setTimeout(() => {
      setVisibleCount((prev) => prev + BATCH_SIZE);
      setIsLoadingMore(false);
    }, 150);
  };

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
          Exibindo <strong className="text-white">{displayedJobs.length}</strong> de{" "}
          <strong className="text-emerald-400">{filtered.length}</strong> vagas abertas
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-zinc-500 shrink-0">Edições do Instagram:</span>
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
      {displayedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedJobs.map(({ job, editionDate }, index) => (
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

      {/* Batch Loading / Pagination Controls */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-4 pb-2 gap-3">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="w-full sm:w-auto min-w-[280px] min-h-[48px] rounded-xl bg-[#16171B] hover:bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/10 transition-all duration-150 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {isLoadingMore ? (
              <span>Carregando próximo lote...</span>
            ) : (
              <>
                <ChevronDown className="size-4 animate-bounce" />
                <span>Carregar mais {remainingCount} vagas</span>
              </>
            )}
          </button>
          <span className="text-[11px] font-mono text-zinc-500">
            {filtered.length - visibleCount} vagas restantes nesta listagem
          </span>
        </div>
      )}

      {/* End of list indicator */}
      {!hasMore && filtered.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-6 pb-2 text-xs font-mono text-zinc-500 border-t border-white/[0.04]">
          <CheckCircle2 className="size-4 text-emerald-500" />
          <span>Você visualizou todas as {filtered.length} vagas verificadas dos últimos 30 dias.</span>
        </div>
      )}
    </div>
  );
}
