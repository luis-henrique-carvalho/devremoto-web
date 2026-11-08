import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getEditionByDate, getAllEditions, getLatestEdition } from "@/lib/vagas";
import { JobCard } from "@/components/job-card";
import { NewsletterCard } from "@/components/newsletter-card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ArrowLeft, AlertTriangle, ArrowRight } from "lucide-react";

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
  const [edition, latestEdition] = await Promise.all([
    getEditionByDate(data),
    getLatestEdition(),
  ]);

  if (!edition) {
    notFound();
  }

  // Check if edition is older than 30 days
  const editionTime = new Date(edition.date).getTime();
  const now = new Date("2026-11-08T00:00:00Z").getTime();
  const daysDiff = isNaN(editionTime) ? 0 : Math.floor((now - editionTime) / (1000 * 60 * 60 * 24));
  const isOlderThan30Days = daysDiff > 30;

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-12 flex flex-col gap-6 sm:gap-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/vagas"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-zinc-400 hover:text-white font-mono text-xs min-h-[44px] sm:min-h-0 flex items-center",
          })}
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          <span>Ver radar completo</span>
        </Link>

        {isOlderThan30Days && (
          <Link
            href="/vagas"
            className={buttonVariants({
              size: "sm",
              className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold text-xs min-h-[44px] sm:min-h-0 flex items-center",
            })}
          >
            <span>Ir para o Radar de Hoje</span>
            <ArrowRight className="size-3.5 ml-1" />
          </Link>
        )}
      </div>

      {/* Smart Alert for Older Editions (> 30 days) */}
      {isOlderThan30Days && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm">
                Edição de Histórico ({edition.dateLabel} · há {daysDiff} dias)
              </span>
              <p className="text-xs text-amber-200/80 leading-relaxed max-w-xl">
                Como os processos seletivos em tech fecham rapidamente, algumas dessas vagas podem já ter sido encerradas pelas empresas. Recomendamos conferir o radar atualizado de hoje.
              </p>
            </div>
          </div>

          <Link
            href="/vagas"
            className={buttonVariants({
              className: "bg-amber-400 text-black hover:bg-amber-300 font-mono font-bold text-xs shrink-0 w-full sm:w-auto min-h-[44px] sm:min-h-0 flex items-center justify-center",
            })}
          >
            <span>Ver Vagas Abertas Hoje</span>
            <ArrowRight className="size-3.5 ml-1" />
          </Link>
        </div>
      )}

      {/* Header Banner */}
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
            {edition.hook?.lead ||
              "Todas as oportunidades abaixo aceitam devs 100% home office de qualquer cidade do Brasil. Toque no botão de cada vaga para abrir a candidatura."}
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
          <span>Vagas desta edição:</span>
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
