import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getArtigoBySlug, getAllArtigos } from "@/lib/artigos";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllArtigos();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArtigoBySlug(slug);
  if (!data) return { title: "Artigo não encontrado" };

  return {
    title: data.post.title,
    description: data.post.description,
    openGraph: {
      title: data.post.title,
      description: data.post.description,
      type: "article",
      publishedTime: data.post.date,
      authors: [data.post.author],
    },
  };
}

export default async function ArtigoPostPage({ params }: Props) {
  const { slug } = await params;
  const result = await getArtigoBySlug(slug);

  if (!result) {
    notFound();
  }

  const { post, contentHtml } = result;

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-14 flex flex-col gap-8 sm:gap-10">
      {/* Back button */}
      <div>
        <Link
          href="/artigos"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-zinc-400 hover:text-white font-mono text-xs min-h-[44px] sm:min-h-0 flex items-center",
          })}
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          <span>Voltar para artigos</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
          <Badge variant="outline" className="border-sky-500/30 bg-sky-500/10 text-sky-400 font-mono">
            {post.category}
          </Badge>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {post.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          {post.description}
        </p>

        {/* GitHub Quick Box if available */}
        {post.githubRepo && (
          <div className="flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#141519] p-3.5 sm:p-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300 truncate">
              <GithubIcon className="size-4 text-white shrink-0" />
              <span className="font-semibold truncate">{post.githubRepo}</span>
              {post.stars && (
                <span className="flex items-center gap-0.5 text-amber-400 ml-1 shrink-0">
                  <Star className="size-3 fill-amber-400" />
                  {post.stars}
                </span>
              )}
            </div>

            <a
              href={`https://github.com/${post.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline shrink-0 ml-2"
            >
              GitHub →
            </a>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-white/[0.03] border-white/[0.08] text-zinc-400 text-[11px] font-mono">
              #{tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <article
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Author Card & Personal Portfolio link */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16171B] p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-3.5">
          <div className="size-11 sm:size-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono shrink-0">
            LC
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm sm:text-base">{post.author}</span>
            <span className="text-xs text-zinc-400">
              Engenheiro de Software & Criador do @devremoto.br
            </span>
          </div>
        </div>

        <Link
          href="/sobre"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "font-mono text-xs border-white/[0.12] hover:bg-white/[0.05] min-h-[44px] sm:min-h-0 flex items-center w-full sm:w-auto justify-center",
          })}
        >
          <span>Conhecer portfólio →</span>
        </Link>
      </div>

      {/* Cross-Promo Banner: Check open jobs */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#172B24]/40 to-[#121316] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Sparkles className="size-3.5" />
            <span>Trabalho 100% Home Office</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            Confira as vagas remotas verificadas no radar de hoje
          </h4>
        </div>

        <Link
          href="/vagas"
          className={buttonVariants({
            className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold shrink-0 min-h-[44px] flex items-center justify-center",
          })}
        >
          <Briefcase className="size-4 mr-2" />
          <span>Ver Vagas Abertas</span>
        </Link>
      </div>
    </div>
  );
}
