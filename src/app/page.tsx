import Link from "next/link";
import { getLatestEdition } from "@/lib/vagas";
import { getAllArtigos } from "@/lib/artigos";
import { JobCard } from "@/components/job-card";
import { NewsletterCard } from "@/components/newsletter-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  BookOpen,
  Briefcase,
  Star,
} from "lucide-react";

export default async function HomePage() {
  const [latestEdition, artigos] = await Promise.all([
    getLatestEdition(),
    getAllArtigos(),
  ]);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-6 sm:py-12">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-5 sm:gap-6 max-w-3xl mx-auto pt-2 sm:pt-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Curadoria Diária às 11:00</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Vagas tech <span className="text-emerald-400">100% home office</span> e engenharia de software.
          </h1>

          <p className="text-sm sm:text-lg text-zinc-400 leading-relaxed max-w-2xl px-2">
            Trabalhe de qualquer cidade do Brasil para empresas que confiam na sua autonomia. Oportunidades verificadas diariamente, tutoriais práticos e análises de código.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2">
            <Link
              href="/vagas"
              className={buttonVariants({
                size: "lg",
                className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold flex-1 sm:flex-none min-h-[44px]",
              })}
            >
              <Briefcase className="size-4 mr-2" />
              <span>Ver Vagas</span>
            </Link>
            <Link
              href="/artigos"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "border-white/[0.12] hover:bg-white/[0.05] font-mono flex-1 sm:flex-none min-h-[44px]",
              })}
            >
              <BookOpen className="size-4 mr-2 text-sky-400" />
              <span>Artigos</span>
            </Link>
          </div>

          {/* Value Props Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-white/[0.06] mt-3">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>100% Remoto Garantido</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <Zap className="size-4 text-amber-400 shrink-0" />
              <span>Atualizado Todo Dia</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <Globe2 className="size-4 text-sky-400 shrink-0" />
              <span>Candidatura Direta na Fonte</span>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Jobs Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                <Sparkles className="size-3.5" />
                <span>Edição de Hoje · {latestEdition?.dateLabel || "Hoje"}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                Vagas em Destaque
              </h2>
            </div>

            <Link
              href="/vagas"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-zinc-400 hover:text-white font-mono text-xs shrink-0",
              })}
            >
              <span>Todas ({latestEdition?.count || 8})</span>
              <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </div>

          {latestEdition && latestEdition.jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestEdition.jobs.slice(0, 6).map((job) => (
                <JobCard key={job.url} job={job} editionDate={latestEdition.dateLabel} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/[0.08] p-8 text-center text-zinc-500 font-mono text-sm">
              Nenhuma vaga disponível no radar hoje.
            </div>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 mb-1">
                <BookOpen className="size-3.5" />
                <span>Conteúdos & Tutoriais</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                Artigos e Engenharia
              </h2>
            </div>

            <Link
              href="/artigos"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-zinc-400 hover:text-white font-mono text-xs shrink-0",
              })}
            >
              <span>Ver todos</span>
              <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {artigos.map((post) => (
              <Link
                key={post.slug}
                href={`/artigos/${post.slug}`}
                className="group flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#16171B]/95 p-5 sm:p-6 hover:border-sky-500/40 hover:bg-[#1A1B21] transition-all duration-150"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span className="text-sky-400 font-semibold">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white/[0.03] border-white/[0.08] text-zinc-300 text-[11px] font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.05] pt-3 text-xs font-mono text-zinc-500">
                  {post.githubRepo ? (
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <GithubIcon className="size-3.5" />
                      <span className="truncate max-w-[150px]">{post.githubRepo}</span>
                      {post.stars && (
                        <span className="flex items-center gap-0.5 text-amber-400 ml-1">
                          <Star className="size-3 fill-amber-400" />
                          {post.stars}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>Por {post.author}</span>
                  )}
                  <span className="text-sky-400 group-hover:underline">Ler artigo →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Lead Capture */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <NewsletterCard />
      </section>
    </div>
  );
}
