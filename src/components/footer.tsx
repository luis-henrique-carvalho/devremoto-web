import Link from "next/link";
import { Terminal } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0A0A0C] mt-auto pb-20 sm:pb-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="size-3.5" />
              </div>
              <span className="font-mono font-bold text-white text-sm">dev.remoto</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              Radar diário de oportunidades tech 100% remotas no Brasil, artigos técnicos e engenharia de software independente.
            </p>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://instagram.com/devremoto.br"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="Instagram @devremoto.br"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://github.com/luis-henrique-carvalho"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="GitHub de Luis Carvalho"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-henrique-carvalho-072244213/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="LinkedIn de Luis Carvalho"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <span>Desenvolvido e mantido por</span>
            <Link href="/sobre" className="text-emerald-400 hover:underline">
              Luis Carvalho
            </Link>
          </div>
          <div>
            <span>© 2026 dev.remoto · Hospedado na Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
