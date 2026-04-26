import Link from "next/link";
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { ScoreRing } from "@/components/ui/ProgressBar";
import { tenant } from "@/lib/mock";

export function HeroPassport() {
  const { passport, firstName } = tenant;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand-gradient p-5 text-white shadow-glow sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Tenant Passport
          </div>
          <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight sm:text-3xl">
            Welcome back, {firstName}.
            <br className="hidden sm:block" />
            <span className="text-white/85">
              Your rental identity is ready to go.
            </span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/85">
            Apply to homes faster, build credit on every rent payment, and keep
            your verified profile in one place.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <MiniStat
              label="Tenant Score"
              value={`${passport.score}/100`}
              hint="Top 12% in Toronto"
            />
            <MiniStat
              label="Status"
              value={tenant.verified ? "Verified" : "In Progress"}
              hint="ID + income confirmed"
            />
            <MiniStat
              label="Credit Impact"
              value={`+${passport.creditDelta} pts`}
              hint="Past 12 months"
              icon={<TrendingUp className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/passport"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-blue shadow-soft transition hover:bg-white/90"
            >
              <Sparkles className="h-4 w-4" />
              Complete Passport ({passport.completion}%)
            </Link>
            <Link
              href="/rent-reporting"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
            >
              <TrendingUp className="h-4 w-4" />
              Improve Score
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-3xl bg-white/10 p-3 backdrop-blur sm:p-4 lg:w-auto">
            <div className="rounded-2xl bg-white p-4 text-brand-ink shadow-soft sm:p-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Tenant Score
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  Verified
                </span>
              </div>
              {/* Mobile: stack ring above details. Tablet+: side-by-side. */}
              <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-4">
                <ScoreRing score={passport.score} label="of 100" />
                <div className="grid w-full grid-cols-2 gap-x-3 gap-y-1.5 text-xs sm:flex sm:flex-col sm:gap-1.5">
                  <Detail label="Identity" value="Confirmed" tone="ok" />
                  <Detail label="Income (3.0×)" value="$6,400/mo" tone="ok" />
                  <Detail label="Rental history" value="36 months" tone="ok" />
                  <Detail label="References" value="1 missing" tone="warn" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/12 p-3 backdrop-blur ring-1 ring-white/15">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/75">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-lg font-bold leading-none">
        {icon}
        {value}
      </div>
      {hint ? (
        <div className="mt-1 text-[11px] text-white/75">{hint}</div>
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
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span
        className={
          tone === "ok"
            ? "h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
            : "h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
        }
      />
      <span className="truncate text-[11px] text-slate-500 sm:text-xs">{label}:</span>
      <span className="truncate text-[11px] font-semibold text-brand-ink sm:text-xs">
        {value}
      </span>
    </div>
  );
}
