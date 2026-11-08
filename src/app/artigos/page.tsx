import { Metadata } from "next";
import Link from "next/link";
import { getAllArtigos } from "@/lib/artigos";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { BookOpen, Star, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Artigos, Tutoriais e Engenharia de Software",
  description:
    "Guias práticos, tutoriais de código, comparações de ferramentas e novidades do ecossistema tech.",
};

export default async function ArtigosPage() {
  const artigos = await getAllArtigos();

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-14 flex flex-col gap-8 sm:gap-10">
      {/* Header */}
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400">
          <BookOpen className="size-3.5" />
          <span>Conteúdos & Guias Práticos</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Artigos, Tutoriais e Ferramentas
        </h1>
        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
          Sem enrolação: guias técnicos, comparativos reais de performance e tutoriais passo a passo sobre o que vale a pena adotar no seu dia a dia como desenvolvedor.
        </p>
      </div>

      {/* Artigos List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {artigos.map((post) => (
          <Link
            key={post.slug}
            href={`/artigos/${post.slug}`}
            className="group flex flex-col justify-between gap-4 rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#16171B]/95 p-5 sm:p-6 hover:border-sky-500/40 hover:bg-[#1A1B21] transition-all duration-150"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="text-sky-400 font-semibold">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
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
                  <span className="truncate max-w-[140px]">{post.githubRepo}</span>
                  {post.stars && (
                    <span className="flex items-center gap-0.5 text-amber-400 ml-1">
                      <Star className="size-3 fill-amber-400" />
                      {post.stars}
                    </span>
                  )}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {post.date}
                </span>
              )}

              <span className="flex items-center gap-1 text-sky-400 group-hover:underline font-semibold">
                <span>Ler artigo</span>
                <ArrowRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
