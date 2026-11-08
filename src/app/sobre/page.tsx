import { Metadata } from "next";
import {
  Terminal,
  Mail,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Laptop,
  Megaphone,
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sobre Luis Carvalho · Engenheiro de Software & Criador",
  description:
    "Conheça Luis Carvalho, a arquitetura do projeto dev.remoto e opções de parcerias e mídia no canal.",
};

export default function SobrePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-16 flex flex-col gap-12 sm:gap-16">
      {/* Hero Profile */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          <div className="relative">
            <div className="size-20 sm:size-24 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-sky-400 p-0.5 shadow-xl shadow-emerald-500/20">
              <div className="size-full bg-[#111216] rounded-[14px] flex items-center justify-center font-mono font-extrabold text-2xl sm:text-3xl text-emerald-400">
                LC
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex size-4">
              <span className="relative inline-flex rounded-full size-4 bg-emerald-500 border-2 border-[#0D0D0F]" />
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 w-fit">
              <Terminal className="size-3" />
              <span>Engenharia de Software & Conteúdo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Luis Carvalho
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-mono">
              Engenheiro de Software & Criador do @devremoto.br
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
          Atuo no mercado de tecnologia desenvolvendo produtos digitais, arquitetura de software e sistemas automatizados com inteligência artificial. Criei o projeto <strong className="text-white">dev.remoto</strong> como uma iniciativa independente para fortalecer o ecossistema de trabalho remoto no Brasil e compartilhar análises práticas sobre desenvolvimento de software.
        </p>

        {/* Social / Direct Channels */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs pt-1">
          <a
            href="https://www.linkedin.com/in/luis-henrique-carvalho-072244213/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.1] hover:bg-white/[0.05] min-h-[44px] sm:min-h-0 flex items-center px-3.5",
            })}
          >
            <LinkedinIcon className="size-4 mr-2 text-sky-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/luis-henrique-carvalho"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.1] hover:bg-white/[0.05] min-h-[44px] sm:min-h-0 flex items-center px-3.5",
            })}
          >
            <GithubIcon className="size-4 mr-2 text-zinc-300" />
            <span>GitHub</span>
          </a>
          <a
            href="https://instagram.com/devremoto.br"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.1] hover:bg-white/[0.05] min-h-[44px] sm:min-h-0 flex items-center px-3.5",
            })}
          >
            <InstagramIcon className="size-4 mr-2 text-pink-400" />
            <span>@devremoto.br</span>
          </a>
          <a
            href="mailto:contato@luis-carvalho.online"
            className={buttonVariants({
              className: "bg-emerald-500 text-black hover:bg-emerald-400 font-bold min-h-[44px] sm:min-h-0 flex items-center px-4",
            })}
          >
            <Mail className="size-4 mr-2" />
            <span>Contato</span>
          </a>
        </div>
      </section>

      {/* Case Study: dev.remoto */}
      <section className="flex flex-col gap-6 rounded-2xl border border-white/[0.1] bg-[#16171B]/95 p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <Code2 className="size-3.5" />
            <span>Case de Engenharia & Automação</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Como o dev.remoto funciona por baixo do capô
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            O dev.remoto foi construído como uma esteira autônoma completa de ponta a ponta, demonstrando na prática o poder da automação aliada à inteligência artificial:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl border border-white/[0.06] bg-[#121316] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <span className="size-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[11px]">1</span>
              <span>Rastreamento & Ingestão</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Varredura diária de APIs, portais de vagas e repositórios do GitHub com normalização de senioridade, stack e data de publicação.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#121316] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold">
              <span className="size-5 rounded-full bg-sky-500/10 flex items-center justify-center text-[11px]">2</span>
              <span>Curadoria Automatizada</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Modelos de linguagem analisam descrições para garantir trabalho 100% home office, descartando modelos híbridos ou anúncios enganosos.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#121316] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <span className="size-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[11px]">3</span>
              <span>Renderização em Código</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Geração de carrosséis e vídeos verticais em código puro HTML/CSS/GSAP através do motor HyperFrames, renderizados diretamente pelo terminal.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#121316] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
              <span className="size-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[11px]">4</span>
              <span>Hub Web & Entrega em DM</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deploy de páginas estáticas Next.js na Vercel e disparador de links no direct do Instagram via automação conectada aos webhooks da Meta.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Stacks */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Especialidades Técnicas
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Tecnologias e conceitos aplicados no desenvolvimento deste ecossistema:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/[0.08] bg-[#16171B]/60 p-5 flex flex-col gap-3">
            <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Laptop className="size-4" />
            </div>
            <h3 className="font-bold text-white text-sm">Front-End & UI</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              TypeScript, React 19, Next.js (App Router), Tailwind CSS v4, shadcn/ui e design responsivo mobile-first.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#16171B]/60 p-5 flex flex-col gap-3">
            <div className="size-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Layers className="size-4" />
            </div>
            <h3 className="font-bold text-white text-sm">Back-End & Dados</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Node.js, Python, arquitetura modular, APIs RESTful, webhooks, SQLite e pipelines de processamento.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#16171B]/60 p-5 flex flex-col gap-3">
            <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Cpu className="size-4" />
            </div>
            <h3 className="font-bold text-white text-sm">IA & Automação</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Integrações com LLMs, agentes autônomos, automações de mídia programática e containers Docker.
            </p>
          </div>
        </div>
      </section>

      {/* Commercial & Partnerships Section (Strictly B2B / Creator Monetization) */}
      <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#172B24]/40 to-[#121316] p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 font-mono text-xs w-fit">
            Parcerias & Divulgação
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Divulgue sua empresa ou ferramenta no dev.remoto
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
            Conecte sua marca ou suas vagas abertas a uma comunidade qualificada de desenvolvedores de software no Brasil:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3.5 flex flex-col gap-1.5">
            <span className="text-emerald-400 font-bold">01 · Vagas em Destaque</span>
            <span className="text-zinc-400">Destaque posições da sua empresa no topo do site e nas edições do Instagram.</span>
          </div>

          <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3.5 flex flex-col gap-1.5">
            <span className="text-sky-400 font-bold">02 · Mídia & Publieditoriais</span>
            <span className="text-zinc-400">Reviews e artigos técnicos apresentando produtos SaaS, APIs e ferramentas tech.</span>
          </div>

          <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3.5 flex flex-col gap-1.5">
            <span className="text-amber-400 font-bold">03 · Conteúdo & Comunidade</span>
            <span className="text-zinc-400">Colaborações técnicas, estudos de caso e projetos conjuntos open-source.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="mailto:contato@luis-carvalho.online"
            className={buttonVariants({
              className: "bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold flex items-center gap-2 min-h-[44px]",
            })}
          >
            <Mail className="size-4" />
            <span>Falar sobre Parcerias</span>
          </a>

          <a
            href="https://instagram.com/devremoto.br"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/[0.12] hover:bg-white/[0.05] font-mono min-h-[44px]",
            })}
          >
            <span>Direct no Instagram</span>
            <ArrowRight className="size-4 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
