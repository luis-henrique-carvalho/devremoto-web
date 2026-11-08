import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
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
  const posts = await getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { post, contentHtml } = result;

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-10">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-zinc-400 hover:text-white font-mono text-xs",
          })}
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          <span>Voltar para o blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="flex flex-col gap-5 border-b border-white/[0.08] pb-8">
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

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          {post.description}
        </p>

        {/* GitHub Quick Box if available */}
        {post.githubRepo && (
          <div className="flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#141519] p-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <GithubIcon className="size-4 text-white" />
              <span className="font-semibold">{post.githubRepo}</span>
              {post.stars && (
                <span className="flex items-center gap-1 text-amber-400 ml-2">
                  <Star className="size-3 fill-amber-400" />
                  {post.stars} stars
                </span>
              )}
            </div>

            <a
              href={`https://github.com/${post.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              Ver no GitHub →
            </a>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-white/[0.03] border-white/[0.08] text-zinc-400 text-xs font-mono">
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

      {/* Author Card & Promotion */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16171B] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
            LC
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base">{post.author}</span>
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
            className: "font-mono text-xs border-white/[0.12] hover:bg-white/[0.05]",
          })}
        >
          <span>Conhecer o projeto →</span>
        </Link>
      </div>

      {/* Cross-Promo Banner: Check open jobs */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#172B24]/40 to-[#121316] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Sparkles className="size-3.5" />
            <span>Procurando uma oportunidade remota?</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            Veja as vagas 100% home office abertas no radar de hoje
          </h4>
        </div>

        <Link
          href="/vagas"
          className={buttonVariants({
            className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold shrink-0",
          })}
        >
          <Briefcase className="size-4 mr-2" />
          <span>Ver Vagas Abertas</span>
        </Link>
      </div>
    </div>
  );
}
