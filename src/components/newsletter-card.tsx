"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In production, integrate with Resend, ConvertKit, Beehiiv, Mailchimp or database
      setSubscribed(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#172B24]/40 to-[#121316] p-6 sm:p-8">
      <div className="absolute -top-12 -right-12 size-40 rounded-full bg-emerald-500/10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 w-fit">
            <Mail className="size-3.5" />
            <span>Radar Matinal Diário</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Receba as vagas 100% remotas e artigos antes de todo mundo
          </h3>
          <p className="text-sm text-zinc-400">
            Enviamos um resumo limpo todo dia às 11:00 com links diretos, salários e novidades do mundo open-source. Sem spam.
          </p>
        </div>

        <div className="w-full md:w-auto md:min-w-[320px]">
          {subscribed ? (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300 font-mono">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
              <span>Inscrição confirmada! Fique de olho na sua caixa de entrada.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="seu.email@dev.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#101114] border-white/[0.12] text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500"
              />
              <Button type="submit" className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold font-mono shrink-0">
                <span>Inscrever</span>
                <ArrowRight className="size-4 ml-1" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
