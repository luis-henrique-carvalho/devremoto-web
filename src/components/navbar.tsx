import Link from "next/link";
import { Terminal, Sparkles, Briefcase, BookOpen, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0D0D0F]/80 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <Terminal className="size-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold tracking-tight text-white text-base">dev.remoto</span>
              <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline">100% home office</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/vagas"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
          >
            <Briefcase className="size-4 text-emerald-400" />
            <span>Vagas</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
          >
            <BookOpen className="size-4 text-sky-400" />
            <span>Blog & Ferramentas</span>
          </Link>
          <Link
            href="/sobre"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
          >
            <User className="size-4 text-zinc-400" />
            <span>Sobre</span>
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/devremoto.br"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "hidden sm:inline-flex border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-mono text-xs",
            })}
          >
            <Sparkles className="size-3.5 mr-1.5" />
            <span>@devremoto.br</span>
          </a>
        </div>
      </div>
    </header>
  );
}
