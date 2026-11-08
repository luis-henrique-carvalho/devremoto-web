import Link from "next/link";
import { getLatestEdition } from "@/lib/vagas";
import { getAllPosts } from "@/lib/blog";
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
  const [latestEdition, blogPosts] = await Promise.all([
    getLatestEdition(),
    getAllPosts(),
  ]);

  return (
    <div className="flex flex-col gap-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto pt-6 pb-2">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Curadoria Diária Anti-Híbrido</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Vagas tech <span className="text-emerald-400">100% remotas</span> e inteligência de código.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Sem pegadinha de 3 dias presenciais no escritório. Oportunidades verificadas no Brasil todo dia às 11h, além de tutoriais e reviews de novas ferramentas open-source.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/vagas"
              className={buttonVariants({
                size: "lg",
                className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold",
              })}
            >
              <Briefcase className="size-4 mr-2" />
              <span>Explorar Vagas</span>
            </Link>
            <Link
              href="/blog"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "border-white/[0.12] hover:bg-white/[0.05] font-mono",
              })}
            >
              <BookOpen className="size-4 mr-2 text-sky-400" />
              <span>Radar de Ferramentas</span>
            </Link>
          </div>

          {/* Value Props Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 border-t border-white/[0.06] mt-4">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>Filtro Rigoroso Anti-Presencial</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <Zap className="size-4 text-amber-400 shrink-0" />
              <span>Atualizado Diariamente</span>
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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Sparkles className="size-3.5" />
                <span>Radar do Dia · {latestEdition?.dateLabel || "Hoje"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Vagas em Destaque Hoje
              </h2>
            </div>

            <Link
              href="/vagas"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-zinc-400 hover:text-white font-mono text-xs w-fit",
              })}
            >
              <span>Ver todas as vagas</span>
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

      {/* Open Source / Tech Articles Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                <BookOpen className="size-3.5" />
                <span>Tech Radar & Artigos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ferramentas Open-Source e Arquitetura
              </h2>
            </div>

            <Link
              href="/blog"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-zinc-400 hover:text-white font-mono text-xs w-fit",
              })}
            >
              <span>Ver todos os artigos</span>
              <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#16171B]/90 p-6 hover:border-sky-500/40 hover:bg-[#1A1B21] transition-all duration-150"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span className="text-sky-400">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white/[0.03] border-white/[0.08] text-zinc-300 text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 text-xs font-mono text-zinc-500">
                  {post.githubRepo ? (
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <GithubIcon className="size-3.5" />
                      <span>{post.githubRepo}</span>
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
