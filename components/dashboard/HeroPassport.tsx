import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ScoreRing } from "@/components/ui/ProgressBar";
import { tenant } from "@/lib/mock";

export function HeroPassport() {
  const { passport, firstName } = tenant;

  return (
    <section className="surface-card group/hero relative overflow-hidden rounded-3xl p-5 sm:p-7 lg:p-8">
      {/* Ambient brand mesh — subtle, not overwhelming */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(6,182,212,0.22),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.14),transparent_70%)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(37,99,235,0.2),transparent_70%)]"
      />
      {/* Hairline brand strip on the very top edge for that "premium" cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
      />
      {/* Dot grid texture, very subtle */}
      <div
        aria-hidden
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.4]"
        style={{
          maskImage:
            "radial-gradient(ellipse at top right, black 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top right, black 0%, transparent 60%)",
        }}
      />

      <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
        <div className="min-w-0">
          {/* Verified chip — brand-tinted on a light surface */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-800 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] dark:border-cyan-400/20 dark:from-cyan-500/10 dark:to-blue-500/10 dark:text-cyan-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified Tenant Passport
          </div>

          <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[28px] dark:text-white">
            Welcome back, {firstName}.
            <br className="hidden sm:block" />
            <span className="text-gradient">
              Your rental identity is ready to go.
            </span>
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Apply to homes faster, build credit on every rent payment, and keep
            your verified profile in one place.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <MiniStat
              tone="brand"
              icon={<ShieldCheck className="h-4 w-4" />}
              label="Tenant Score"
              value={`${passport.score}/100`}
              hint="Top 12% in Toronto"
            />
            <MiniStat
              tone="emerald"
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Status"
              value={tenant.verified ? "Verified" : "In Progress"}
              hint="ID + income confirmed"
            />
            <MiniStat
              tone="violet"
              icon={<TrendingUp className="h-4 w-4" />}
              label="Credit Impact"
              value={`+${passport.creditDelta} pts`}
              hint="Past 12 months"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/passport"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
              />
              <Sparkles className="h-4 w-4" />
              <span className="relative">
                Complete Passport ({passport.completion}%)
              </span>
            </Link>
            <Link
              href="/rent-reporting"
              className="group/btn inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <TrendingUp className="h-4 w-4" />
              Improve Score
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <ScoreCard
            score={passport.score}
            completion={passport.completion}
          />
        </div>
      </div>
    </section>
  );
}

function ScoreCard({
  score,
  completion,
}: {
  score: number;
  completion: number;
}) {
  return (
    <div className="group/score relative w-full max-w-md lg:w-auto">
      {/* Soft brand glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[28px] bg-brand-gradient opacity-20 blur-xl transition-opacity duration-300 group-hover/score:opacity-30 dark:opacity-30"
      />
      <div className="surface-smoky relative overflow-hidden rounded-[24px] p-1 transition-all duration-300 group-hover/score:-translate-y-0.5 group-hover/score:shadow-[0_18px_50px_-15px_rgba(37,99,235,0.28)]">
        <div className="relative rounded-[20px] border border-slate-100/80 bg-white/70 p-4 backdrop-blur-sm sm:p-5 dark:border-slate-800/80 dark:bg-slate-950/50">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              Tenant Score
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </span>
          </div>

          {/* Mobile: stack ring above details. Tablet+: side-by-side. */}
          <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-md transition-opacity duration-300 group-hover/score:opacity-40"
              />
              <div className="relative">
                <ScoreRing score={score} label="of 100" />
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-x-3 gap-y-2 text-xs sm:flex sm:flex-col sm:gap-2">
              <Detail label="Identity" value="Confirmed" tone="ok" />
              <Detail label="Income (3.0×)" value="$6,400/mo" tone="ok" />
              <Detail label="Rental history" value="36 months" tone="ok" />
              <Detail label="References" value="1 missing" tone="warn" />
            </div>
          </div>

          {/* Compact completion strip */}
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-brand-gradient transition-[width] duration-700"
                style={{ width: `${completion}%` }}
              />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {completion}% complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  hint,
  icon,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  tone: "brand" | "emerald" | "violet";
}) {
  const toneStyles = {
    brand: {
      iconBg:
        "bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 dark:from-cyan-500/15 dark:to-blue-500/15 dark:text-cyan-300",
      hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-500/40",
      hoverGlow:
        "hover:shadow-[0_8px_24px_-12px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_8px_24px_-12px_rgba(37,99,235,0.5)]",
    },
    emerald: {
      iconBg:
        "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-500/15 dark:to-teal-500/15 dark:text-emerald-300",
      hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-500/40",
      hoverGlow:
        "hover:shadow-[0_8px_24px_-12px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_8px_24px_-12px_rgba(16,185,129,0.5)]",
    },
    violet: {
      iconBg:
        "bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-700 dark:from-violet-500/15 dark:to-fuchsia-500/15 dark:text-violet-300",
      hoverBorder: "hover:border-violet-300 dark:hover:border-violet-500/40",
      hoverGlow:
        "hover:shadow-[0_8px_24px_-12px_rgba(139,92,246,0.4)] dark:hover:shadow-[0_8px_24px_-12px_rgba(139,92,246,0.5)]",
    },
  }[tone];

  return (
    <div
      className={`group/stat relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-3 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 ${toneStyles.hoverBorder} ${toneStyles.hoverGlow} dark:border-slate-700/60 dark:bg-slate-900/60`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ring-white/40 ${toneStyles.iconBg}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
            {label}
          </div>
          <div className="mt-0.5 truncate text-base font-bold leading-none text-slate-900 dark:text-white">
            {value}
          </div>
        </div>
      </div>
      {hint ? (
        <div className="mt-1.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

function Detail({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "warn";
}) {
  const dot =
    tone === "ok"
      ? "bg-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-500/20"
      : "bg-amber-500 ring-2 ring-amber-100 dark:ring-amber-500/20";
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
        aria-hidden
      />
      <span className="truncate text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
        {label}:
      </span>
      <span className="ml-auto truncate text-[11px] font-semibold text-slate-900 sm:text-xs dark:text-white">
        {value}
      </span>
    </div>
  );
}
