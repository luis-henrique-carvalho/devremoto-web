"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Sparkles, Briefcase, BookOpen, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const isVagas = pathname.startsWith("/vagas");
  const isArtigos = pathname.startsWith("/artigos") || pathname.startsWith("/blog");
  const isSobre = pathname === "/sobre";

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0D0D0F]/90 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-7 sm:size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
              <Terminal className="size-3.5 sm:size-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold tracking-tight text-white text-sm sm:text-base">dev.remoto</span>
                <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">100% home office brasil</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/vagas"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isVagas
                  ? "bg-white/[0.08] text-emerald-400 font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Briefcase className="size-4" />
              <span>Vagas</span>
            </Link>
            <Link
              href="/artigos"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isArtigos
                  ? "bg-white/[0.08] text-sky-400 font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <BookOpen className="size-4" />
              <span>Artigos</span>
            </Link>
            <Link
              href="/sobre"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isSobre
                  ? "bg-white/[0.08] text-white font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <User className="size-4" />
              <span>Sobre o Luis</span>
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
                className: "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-mono text-xs px-2.5 h-8",
              })}
            >
              <Sparkles className="size-3 mr-1 text-emerald-400" />
              <span>@devremoto.br</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation (Ergonomic thumb zone for Instagram WebView) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-white/[0.1] bg-[#0E0F13]/95 backdrop-blur-lg px-2 py-1 safe-area-pb">
        <div className="grid grid-cols-3 h-12 items-center">
          <Link
            href="/vagas"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors ${
              isVagas ? "text-emerald-400 font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Briefcase className="size-4" />
            <span className="text-[11px] font-mono leading-none">Vagas</span>
          </Link>

          <Link
            href="/artigos"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors ${
              isArtigos ? "text-sky-400 font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <BookOpen className="size-4" />
            <span className="text-[11px] font-mono leading-none">Artigos</span>
          </Link>

          <Link
            href="/sobre"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors ${
              isSobre ? "text-emerald-300 font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <User className="size-4" />
            <span className="text-[11px] font-mono leading-none">Sobre</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
