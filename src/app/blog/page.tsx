import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { BookOpen, Star, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Radar Open-Source",
  description:
    "Análises técnicas, tutoriais de código e novidades sobre ferramentas de inteligência artificial e projetos open-source em alta.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400">
          <BookOpen className="size-3.5" />
          <span>Tech Radar & Artigos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ferramentas, Open-Source e Carreira
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Sem enrolação: guias práticos, benchmarks reais e tutoriais passo a passo sobre o que realmente vale a pena adotar no seu fluxo de desenvolvimento.
        </p>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between gap-5 rounded-2xl border border-white/[0.08] bg-[#16171B]/90 p-6 hover:border-sky-500/40 hover:bg-[#1A1B21] transition-all duration-150"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="text-sky-400 font-semibold">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
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
