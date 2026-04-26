"use client";

import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarRange,
  CheckCircle2,
  Clock,
  Hourglass,
  Rocket,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";

export function ComingSoonBanner() {
  const [notified, setNotified] = useState(false);

  return (
    <section
      className="surface-smoky relative overflow-hidden rounded-2xl"
      aria-label="Backfill 24 months of rent — launching soon"
    >
      {/* Brand blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.22),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),transparent_70%)] blur-2xl"
      />
      {/* Hairline brand strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
      />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-10 lg:p-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-800 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] dark:border-amber-400/20 dark:from-amber-500/10 dark:to-orange-500/10 dark:text-amber-200">
              <Hourglass className="h-3.5 w-3.5" />
              Coming soon
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/70 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700 dark:border-cyan-400/20 dark:from-cyan-500/10 dark:to-blue-500/10 dark:text-cyan-300">
              <Sparkles className="h-3 w-3" />
              LeazeSure Pro
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[24px] dark:text-white">
            Backfill 24 months of rent — <span className="text-gradient">launching soon</span>
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            We&rsquo;re getting ready to let you verify older rent payments and
            add up to 2 years of history to your credit file in one go. Want
            early access? Tap <strong className="font-semibold text-slate-900 dark:text-white">Notify me</strong> and we&rsquo;ll let you know the moment
            it&rsquo;s live.
          </p>

          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            <Perk icon={CalendarRange} text="Up to 24 months" />
            <Perk icon={TrendingUp} text="+38 pts on average" />
            <Perk icon={Rocket} text="Skip the wait" />
          </ul>
        </div>

        <div className="flex flex-col items-stretch gap-3 lg:items-end">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/60">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
              <Clock className="h-3.5 w-3.5" />
              Expected timeline
            </div>
            <div className="mt-1 text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Rolling out in the coming months
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Pro users get first access at launch.
            </div>

            <button
              type="button"
              onClick={() => setNotified((v) => !v)}
              className={cn(
                "group/cta mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                notified
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "bg-brand-gradient text-white shadow-glow hover:-translate-y-0.5"
              )}
            >
              {notified ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  We&rsquo;ll notify you
                </>
              ) : (
                <>
                  <BellRing className="h-4 w-4 transition-transform duration-200 group-hover/cta:rotate-12" />
                  Notify me at launch
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Perk({
  icon: Icon,
  text,
}: {
  icon: typeof Sparkles;
  text: string;
}) {
  return (
    <li className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/50">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 ring-1 ring-inset ring-cyan-200/70 dark:from-cyan-500/15 dark:to-blue-500/15 dark:text-cyan-300 dark:ring-cyan-400/20">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-200">
        {text}
      </span>
    </li>
  );
}
