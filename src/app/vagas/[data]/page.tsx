import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getEditionByDate, getAllEditions } from "@/lib/vagas";
import { JobCard } from "@/components/job-card";
import { NewsletterCard } from "@/components/newsletter-card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ data: string }>;
}

export async function generateStaticParams() {
  const editions = await getAllEditions();
  return editions.map((e) => ({
    data: e.date,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await params;
  const edition = await getEditionByDate(data);
  if (!edition) return { title: "Edição não encontrada" };

  return {
    title: `Links das Vagas · Edição ${edition.dateLabel}`,
    description: `${edition.count} vagas tech 100% remotas no Brasil anunciadas no radar do dia ${edition.dateLabel}.`,
  };
}

export default async function EditionPage({ params }: Props) {
  const { data } = await params;
  const edition = await getEditionByDate(data);

  if (!edition) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-12 flex flex-col gap-8">
      {/* Back button */}
      <div>
        <Link
          href="/vagas"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-zinc-400 hover:text-white font-mono text-xs min-h-[44px] sm:min-h-0 flex items-center",
          })}
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          <span>Ver todas as vagas</span>
        </Link>
      </div>

      {/* Header Banner - Compact for Instagram Mobile In-App Browser */}
      <div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#172B24]/40 to-[#121316] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
            <Calendar className="size-3.5" />
            <span>Edição {edition.dateLabel}</span>
          </div>

          <Badge variant="outline" className="border-white/[0.1] text-zinc-400 text-xs font-mono">
            {edition.count} vagas
          </Badge>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Links Oficiais das Vagas
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Todas as oportunidades abaixo aceitam devs 100% home office de qualquer cidade do Brasil. Toque no botão de cada vaga para abrir a candidatura.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">Stacks:</span>
          {edition.uniqueStacks.map((s) => (
            <span key={s} className="rounded bg-white/[0.05] px-2 py-0.5 text-zinc-300 text-[11px]">
              {s}
            </span>
          ))}
          <span className="text-zinc-600">·</span>
          <span className="text-emerald-400 text-[11px]">{edition.senioritySummary}</span>
        </div>
      </div>

      {/* Jobs list */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <Sparkles className="size-4 text-emerald-400" />
          <span>Vagas anunciadas nesta edição:</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {edition.jobs.map((job) => (
            <JobCard key={job.url} job={job} editionDate={edition.dateLabel} />
          ))}
        </div>
      </div>

      {/* Capture */}
      <NewsletterCard />
    </div>
  );
}
