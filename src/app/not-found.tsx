import Link from "next/link";
import { Briefcase, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 sm:py-24 flex flex-col items-center text-center gap-6">
      <div className="size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
        <Terminal className="size-8" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400">404 · Link Expirado ou Não Encontrado</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Essa edição pode ter sido encerrada.
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
          Como os processos seletivos em tech encerram rápido, essa oportunidade antiga não está mais disponível. Mas o radar atualizado de hoje já está no ar!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
        <Link
          href="/vagas"
          className={buttonVariants({
            size: "lg",
            className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold w-full sm:w-auto min-h-[48px] flex items-center justify-center",
          })}
        >
          <Briefcase className="size-4 mr-2" />
          <span>Ver Vagas Abertas Hoje</span>
          <ArrowRight className="size-4 ml-1.5" />
        </Link>

        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "border-white/[0.12] hover:bg-white/[0.05] font-mono w-full sm:w-auto min-h-[48px] flex items-center justify-center",
          })}
        >
          <span>Página Inicial</span>
        </Link>
      </div>
    </div>
  );
}
