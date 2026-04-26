"use client";

import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { creditTrend } from "@/lib/mock";

export function CreditChip() {
  const score = creditTrend[creditTrend.length - 1];
  const delta = score - creditTrend[0];

  return (
    <Link
      href="/rent-reporting"
      title="View rent reporting"
      className="group hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-2.5 py-1.5 text-left transition hover:border-brand-blue/30 hover:bg-white md:inline-flex dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-400/30 dark:hover:bg-slate-900"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-glow">
        <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Equifax score
        </span>
        <span className="flex items-center gap-1 text-sm font-bold tracking-tight">
          {score}
          <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />+{delta}
          </span>
        </span>
      </span>
    </Link>
  );
}
