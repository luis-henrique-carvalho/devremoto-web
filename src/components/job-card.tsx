import { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Building2, Calendar } from "lucide-react";

interface JobCardProps {
  job: Job;
  editionDate?: string;
}

export function JobCard({ job, editionDate }: JobCardProps) {
  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#16171B]/90 p-5 hover:border-emerald-500/40 hover:bg-[#1A1B21] transition-all duration-150"
    >
      <div className="flex flex-col gap-2.5">
        {/* Top row: Company handle & Remote badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
            <Building2 className="size-3.5 text-emerald-500" />
            <span>{job.company}</span>
            {job.handle && <span className="text-zinc-500 font-normal">({job.handle})</span>}
          </div>

          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-mono">
            remote: true
          </Badge>
        </div>

        {/* Job Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between gap-2">
          <span>{job.title}</span>
          <ExternalLink className="size-4 shrink-0 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </h3>

        {/* Stack Tags & Seniority */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Badge variant="secondary" className="bg-sky-500/10 text-sky-300 border-sky-500/20 text-xs font-mono font-medium">
            {job.seniority}
          </Badge>

          {job.stacks.map((stack) => (
            <Badge key={stack} variant="outline" className="bg-white/[0.03] border-white/[0.08] text-zinc-300 text-xs font-mono">
              {stack}
            </Badge>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.05] pt-3 text-xs text-zinc-500 font-mono">
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          {job.postedAt || editionDate || "Recente"}
        </span>
        <span className="text-emerald-400/80 group-hover:underline">Candidatar-se →</span>
      </div>
    </a>
  );
}
