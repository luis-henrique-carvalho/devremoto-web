import { Metadata } from "next";
import { Terminal, ShieldCheck, Mail, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sobre o dev.remoto e Luis Carvalho",
  description:
    "Conheça o criador por trás do dev.remoto, a missão do projeto e opções de parceria e contratação.",
};

export default function SobrePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-12">
      {/* Intro */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 w-fit">
          <Terminal className="size-3.5" />
          <span>Sobre o Projeto</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Construído por quem vive o trabalho remoto.
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          O <strong className="text-white">dev.remoto</strong> nasceu para resolver uma frustração real de todo desenvolvedor brasileiro: passar horas procurando vagas e se deparar com anúncios de "remoto" que, na prática, exigem dias presenciais no escritório.
        </p>
      </div>

      {/* Creator Profile */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16171B] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center text-black font-extrabold text-xl font-mono shadow-lg shadow-emerald-500/20">
              LC
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Luis Carvalho</h2>
              <p className="text-sm text-emerald-400 font-mono">Engenheiro de Software & Criador de Conteúdo</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xl pt-2">
            Trabalho com arquitetura de software, automação inteligente e inteligência artificial. Crio conteúdo diário para ajudar profissionais de tecnologia a conquistarem vagas de trabalho 100% home office no Brasil e no exterior, além de cobrir o ecossistema open-source.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto shrink-0 font-mono text-xs">
          <a
            href="https://instagram.com/devremoto.br"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.1] hover:bg-white/[0.05] justify-start",
            })}
          >
            <InstagramIcon className="size-4 mr-2 text-pink-400" />
            <span>@devremoto.br</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.1] hover:bg-white/[0.05] justify-start",
            })}
          >
            <LinkedinIcon className="size-4 mr-2 text-sky-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.1] hover:bg-white/[0.05] justify-start",
            })}
          >
            <GithubIcon className="size-4 mr-2 text-zinc-300" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Manifest / Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/[0.08] bg-[#16171B]/60 p-6 flex flex-col gap-3">
          <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="size-4" />
          </div>
          <h3 className="font-bold text-white text-base">Filtro Anti-Híbrido</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Nenhuma oportunidade é publicada sem verificação estrita. Se pede 1 dia no escritório, está fora do radar.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#16171B]/60 p-6 flex flex-col gap-3">
          <div className="size-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Terminal className="size-4" />
          </div>
          <h3 className="font-bold text-white text-base">Código Real</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Tutoriais e análises de ferramentas testadas na prática, sem enrolação ou artigos gerados sem contexto.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#16171B]/60 p-6 flex flex-col gap-3">
          <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="size-4" />
          </div>
          <h3 className="font-bold text-white text-base">Automação Contínua</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Pipeline autônomo que rastreia centenas de portais, filtra por stack e entrega conteúdo fresco diariamente às 11h.
          </p>
        </div>
      </div>

      {/* Commercial & Contact */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#172B24]/30 to-[#121316] p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 font-mono text-xs w-fit">
            Parcerias e Anúncios
          </Badge>
          <h3 className="text-2xl font-bold text-white">
            Quer divulgar uma vaga em destaque ou sua ferramenta?
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
            Apresente sua empresa para milhares de desenvolvedores ativos e qualificados. Oferecemos pacotes de vaga patrocinada no topo do site, menções em carrosséis no Instagram e patrocínio no radar diário.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:contato@luis-carvalho.online"
            className={buttonVariants({
              className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold flex items-center gap-2",
            })}
          >
            <Mail className="size-4" />
            <span>Entrar em Contato</span>
          </a>
          <a
            href="https://instagram.com/devremoto.br"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.12] hover:bg-white/[0.05] font-mono",
            })}
          >
            <span>Falar no Direct do Instagram</span>
            <ArrowRight className="size-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
