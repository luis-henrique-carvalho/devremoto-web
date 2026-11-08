import { Metadata } from "next";
import { getAllJobs, getAllEditions } from "@/lib/vagas";
import { VagasClient } from "./vagas-client";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Vagas 100% Remotas no Brasil",
  description:
    "Explore vagas de desenvolvimento de software e tech 100% home office no Brasil, com filtros por stack e senioridade.",
};

export default async function VagasPage() {
  const [initialJobs, editions] = await Promise.all([
    getAllJobs(),
    getAllEditions(),
  ]);

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <Briefcase className="size-3.5" />
          <span>Radar Completo de Vagas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Oportunidades 100% Home Office
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Todas as vagas passam por filtro diário contra modelos híbridos ou presenciais disfarçados. Candidatura direta nos canais oficiais das empresas.
        </p>
      </div>

      {/* Interactive Client Search & Filters */}
      <VagasClient initialJobs={initialJobs} editions={editions} />
    </div>
  );
}
