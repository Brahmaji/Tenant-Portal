import {
  CalendarRange,
  Flame,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const POINTS: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarRange, label: "12+ months for best results" },
  { icon: Flame, label: "Each month builds momentum" },
  { icon: Sparkles, label: "Stay active, stay rewarded" },
];

export function ConsistencyBanner() {
  return (
    <section className="surface-smoky relative overflow-hidden rounded-2xl">
      {/* Brand bloom on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.22),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),transparent_70%)] blur-2xl"
      />
      {/* Hairline brand strip on the very top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
      />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-10 lg:p-8">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/70 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] dark:border-cyan-400/20 dark:from-cyan-500/10 dark:to-blue-500/10 dark:text-cyan-300">
            <TrendingUp className="h-3.5 w-3.5" />
            Consistency wins
          </div>
          <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[24px] dark:text-white">
            Consistency is the key to a stronger credit file.
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Rent reporting works best as a long-term habit. The longer you
            report on time, the greater the positive impact on your Equifax
            credit profile. We recommend keeping your reporting active for at
            least <strong className="font-semibold text-slate-900 dark:text-white">12 months</strong> for meaningful results.
          </p>
        </div>

        <ul className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
          {POINTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-slate-200/70 bg-white/70 px-3.5 py-3 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/70 hover:shadow-[0_8px_24px_-12px_rgba(37,99,235,0.4)] dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-cyan-400/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 ring-1 ring-inset ring-cyan-200/70 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] dark:from-cyan-500/15 dark:to-blue-500/15 dark:text-cyan-300 dark:ring-cyan-400/20">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
