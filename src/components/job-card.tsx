import { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Building2, Calendar, CheckCircle2 } from "lucide-react";

interface JobCardProps {
  job: Job;
  editionDate?: string;
}

export function JobCard({ job, editionDate }: JobCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#16171B]/95 p-4 sm:p-5 hover:border-emerald-500/40 hover:bg-[#1A1B21] transition-all duration-150">
      <div className="flex flex-col gap-2.5">
        {/* Top row: Company handle & 100% Home Office badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold truncate">
            <Building2 className="size-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">{job.company}</span>
            {job.handle && <span className="text-zinc-500 font-normal hidden sm:inline">({job.handle})</span>}
          </div>

          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-mono shrink-0">
            100% remoto
          </Badge>
        </div>

        {/* Job Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
          {job.title}
        </h3>

        {/* Stack Tags & Seniority */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <Badge variant="secondary" className="bg-sky-500/10 text-sky-300 border-sky-500/20 text-[11px] sm:text-xs font-mono font-medium">
            {job.seniority}
          </Badge>

          {/* Show first 3 stacks on mobile, all on desktop */}
          {job.stacks.slice(0, 3).map((stack) => (
            <Badge key={stack} variant="outline" className="bg-white/[0.03] border-white/[0.08] text-zinc-300 text-[11px] sm:text-xs font-mono">
              {stack}
            </Badge>
          ))}
          {job.stacks.length > 3 && (
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
              +{job.stacks.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Mobile-First Full-Width CTA (Touch target >= 44px) */}
      <div className="pt-4 mt-3 border-t border-white/[0.06] flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {job.postedAt || editionDate || "Verificada hoje"}
          </span>
          <span className="text-zinc-400">{job.source || "Canal Oficial"}</span>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[44px] rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-mono font-semibold text-xs flex items-center justify-center gap-1.5 border border-emerald-500/30 transition-all duration-150 active:scale-[0.98]"
        >
          <span>Acessar Candidatura Oficial</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
