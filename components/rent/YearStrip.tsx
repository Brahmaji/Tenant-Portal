"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  Clock,
  FileText,
  RotateCw,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { RentMonth } from "@/components/ui/Timeline";

type Status = RentMonth["status"];

/* -----------------------------------------------------------------
 * Equifax-style code mapping
 *  R = Reported (green)  ·  P = Pending (amber)  ·  L = Late (rose)
 * ----------------------------------------------------------------- */

type StatusCfg = {
  code: string;
  codeLong: string;
  label: string;
  short: string;
  icon: typeof CheckCircle2;
  badgeTone: "success" | "warning" | "danger";
  /* inner gradient disc inside the layered chip */
  tileBg: string;
  tileShadow: string;
  /* halo wrapper around the inner disc */
  haloBg: string;
  haloBgSelected: string;
  /* radial-style bloom sitting at the bottom of the tile */
  bloom: string;
  bloomSelected: string;
  /* tile border + glow on selection */
  borderSelected: string;
  glowSelected: string;
  /* status chip in detail card */
  chipClass: string;
  cardAccent: string;
  rail: string;
};

const cfgMap: Record<Status, StatusCfg> = {
  reported: {
    code: "R",
    codeLong: "R · On time",
    label: "Reported to Equifax",
    short: "Reported",
    icon: CheckCircle2,
    badgeTone: "success",
    tileBg:
      "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600",
    tileShadow:
      "shadow-[0_6px_14px_-4px_rgba(16,185,129,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]",
    haloBg:
      "bg-emerald-100/60 ring-1 ring-emerald-200/80 dark:bg-emerald-500/10 dark:ring-emerald-500/25",
    haloBgSelected:
      "bg-emerald-100 ring-1 ring-emerald-300 dark:bg-emerald-500/15 dark:ring-emerald-400/40",
    bloom:
      "bg-[radial-gradient(120%_65%_at_50%_115%,rgba(16,185,129,0.22)_0%,rgba(16,185,129,0.08)_45%,transparent_72%)] dark:bg-[radial-gradient(120%_65%_at_50%_115%,rgba(16,185,129,0.22)_0%,rgba(16,185,129,0.06)_45%,transparent_72%)]",
    bloomSelected:
      "bg-[radial-gradient(120%_75%_at_50%_115%,rgba(16,185,129,0.32)_0%,rgba(16,185,129,0.12)_45%,transparent_72%)] dark:bg-[radial-gradient(120%_75%_at_50%_115%,rgba(16,185,129,0.32)_0%,rgba(16,185,129,0.10)_45%,transparent_72%)]",
    borderSelected:
      "border-emerald-300/80 dark:border-emerald-400/40",
    glowSelected:
      "shadow-[0_16px_32px_-16px_rgba(16,185,129,0.55),0_0_0_1px_rgba(16,185,129,0.15)_inset]",
    chipClass:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    cardAccent:
      "from-emerald-400/15 via-transparent to-transparent",
    rail: "bg-emerald-400",
  },
  pending: {
    code: "P",
    codeLong: "P · Verifying",
    label: "Awaiting verification",
    short: "Pending",
    icon: Clock,
    badgeTone: "warning",
    tileBg:
      "bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500",
    tileShadow:
      "shadow-[0_6px_14px_-4px_rgba(245,158,11,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]",
    haloBg:
      "bg-amber-100/60 ring-1 ring-amber-200/80 dark:bg-amber-500/10 dark:ring-amber-500/25",
    haloBgSelected:
      "bg-amber-100 ring-1 ring-amber-300 dark:bg-amber-500/15 dark:ring-amber-400/40",
    bloom:
      "bg-[radial-gradient(120%_65%_at_50%_115%,rgba(245,158,11,0.22)_0%,rgba(245,158,11,0.08)_45%,transparent_72%)]",
    bloomSelected:
      "bg-[radial-gradient(120%_75%_at_50%_115%,rgba(245,158,11,0.32)_0%,rgba(245,158,11,0.12)_45%,transparent_72%)]",
    borderSelected:
      "border-amber-300/80 dark:border-amber-400/40",
    glowSelected:
      "shadow-[0_16px_32px_-16px_rgba(245,158,11,0.55),0_0_0_1px_rgba(245,158,11,0.15)_inset]",
    chipClass:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    cardAccent: "from-amber-400/15 via-transparent to-transparent",
    rail: "bg-amber-400",
  },
  late: {
    code: "L",
    codeLong: "L · 30 days",
    label: "Late — needs proof or dispute",
    short: "Late",
    icon: AlertTriangle,
    badgeTone: "danger",
    tileBg:
      "bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600",
    tileShadow:
      "shadow-[0_6px_14px_-4px_rgba(244,63,94,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]",
    haloBg:
      "bg-rose-100/60 ring-1 ring-rose-200/80 dark:bg-rose-500/10 dark:ring-rose-500/25",
    haloBgSelected:
      "bg-rose-100 ring-1 ring-rose-300 dark:bg-rose-500/15 dark:ring-rose-400/40",
    bloom:
      "bg-[radial-gradient(120%_65%_at_50%_115%,rgba(244,63,94,0.22)_0%,rgba(244,63,94,0.08)_45%,transparent_72%)]",
    bloomSelected:
      "bg-[radial-gradient(120%_75%_at_50%_115%,rgba(244,63,94,0.32)_0%,rgba(244,63,94,0.12)_45%,transparent_72%)]",
    borderSelected: "border-rose-300/80 dark:border-rose-400/40",
    glowSelected:
      "shadow-[0_16px_32px_-16px_rgba(244,63,94,0.55),0_0_0_1px_rgba(244,63,94,0.15)_inset]",
    chipClass:
      "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30",
    cardAccent: "from-rose-400/15 via-transparent to-transparent",
    rail: "bg-rose-400",
  },
};

/* -----------------------------------------------------------------
 * Date helpers — derive (Month, Year) for each entry.
 * Last entry of `months` is the current month; we step backwards.
 * ----------------------------------------------------------------- */

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type EnrichedMonth = RentMonth & {
  monthIdx: number;
  year: number;
  isCurrent: boolean;
  daysLate?: number;
  proofCount: number;
  reportedOn?: string;
  dueOn: string;
};

function enrich(months: RentMonth[]): EnrichedMonth[] {
  if (months.length === 0) return [];
  const newestIdx = SHORT_MONTHS.indexOf(months[months.length - 1].month);
  const newestYear = new Date().getFullYear();

  return months.map((m, i) => {
    const offsetFromNewest = months.length - 1 - i;
    const totalMonths = newestIdx - offsetFromNewest;
    const yearOffset = totalMonths < 0 ? Math.ceil(-totalMonths / 12) : 0;
    const monthIdx = ((totalMonths % 12) + 12) % 12;
    const year = newestYear - yearOffset;
    const proofCount =
      m.status === "reported" ? 2 : m.status === "pending" ? 1 : 0;
    const daysLate = m.status === "late" ? 12 : undefined;
    const reportedOn =
      m.status === "reported" ? `${SHORT_MONTHS[monthIdx]} 5` : undefined;
    const dueOn = `${SHORT_MONTHS[monthIdx]} 1`;
    return {
      ...m,
      monthIdx,
      year,
      isCurrent: i === months.length - 1,
      daysLate,
      proofCount,
      reportedOn,
      dueOn,
    };
  });
}

/* -----------------------------------------------------------------
 * Component
 * ----------------------------------------------------------------- */

export function YearStrip({ months }: { months: RentMonth[] }) {
  // chronological order: oldest → newest (current month is the last tile)
  const ordered = useMemo(() => enrich(months), [months]);
  const lastIndex = ordered.length - 1;
  const [selected, setSelected] = useState<number>(lastIndex);
  const m = ordered[selected] ?? ordered[lastIndex];
  const cfg = cfgMap[m.status];

  return (
    <div className="space-y-5">
      {/* LEGEND — status key */}
      <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-2.5 py-1.5 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-950/40">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Status
        </span>
        <span aria-hidden className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
        <LegendItem cfg={cfgMap.reported} />
        <LegendItem cfg={cfgMap.pending} />
        <LegendItem cfg={cfgMap.late} />
      </div>

      {/* GRID — chronological, premium credit-grid tiles */}
      <div
        role="tablist"
        aria-label="Reporting months"
        className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 md:grid-cols-6 lg:grid-cols-12"
      >
        {ordered.map((mo, idx) => {
          const s = cfgMap[mo.status];
          const Icon = s.icon;
          const isSelected = idx === selected;
          return (
            <button
              key={`${mo.month}-${mo.year}`}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelected(idx)}
              className={cn(
                "group relative isolate flex min-h-[120px] flex-col items-center overflow-hidden rounded-xl border bg-white px-1.5 pb-2 pt-2.5 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 dark:bg-slate-950/40",
                isSelected
                  ? cn(
                      s.borderSelected,
                      s.glowSelected,
                      "-translate-y-0.5"
                    )
                  : "border-slate-200/70 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_24px_-16px_rgba(15,23,42,0.22)] dark:border-slate-800/70 dark:hover:border-slate-700"
              )}
            >
              {/* Bloom — radial status glow rising from the bottom */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300",
                  isSelected ? s.bloomSelected : s.bloom
                )}
              />

              {/* Dot-grid micro-texture */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] [background-image:radial-gradient(rgba(15,23,42,0.07)_0.7px,transparent_0.7px)] [background-position:0_0] [background-size:8px_8px] dark:opacity-30 dark:[background-image:radial-gradient(rgba(255,255,255,0.06)_0.7px,transparent_0.7px)]"
              />

              {/* Top sheen */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80 dark:bg-white/5"
              />

              {/* Month + year */}
              <div className="text-[11px] font-extrabold uppercase leading-none tracking-tight text-slate-900 dark:text-slate-100">
                {mo.month}
              </div>
              <div className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                {mo.year}
              </div>

              {/* Icon chip — solid status background with raw icon */}
              <div
                className={cn(
                  "relative mt-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-transform duration-300",
                  s.tileBg,
                  s.tileShadow,
                  isSelected ? "scale-[1.08]" : "group-hover:scale-[1.06]"
                )}
                title={s.label}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.6} />
              </div>

              {/* Amount */}
              <div className="mt-1.5 text-[11px] font-bold leading-none tabular-nums text-slate-800 dark:text-slate-100">
                ${mo.amount.toLocaleString()}
              </div>

              {/* Current marker */}
              {mo.isCurrent ? (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-white shadow-[0_3px_8px_-3px_rgba(37,99,235,0.55)] ring-1 ring-white/30">
                  <span className="relative flex h-1 w-1 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
                    <span className="relative inline-flex h-1 w-1 rounded-full bg-white" />
                  </span>
                  Now
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* DETAIL CARD */}
      <div
        role="tabpanel"
        className="surface-card relative overflow-hidden rounded-2xl"
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.7]",
            cfg.cardAccent
          )}
        />
        <span
          aria-hidden
          className={cn("absolute inset-x-0 top-0 h-0.5", cfg.rail)}
        />

        <div className="relative grid gap-4 p-4 sm:gap-5 sm:p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6">
          <div className="flex items-center justify-between gap-3 md:justify-start">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-soft sm:h-14 sm:w-14",
                  cfg.tileBg,
                  cfg.tileShadow
                )}
              >
                <cfg.icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.4} />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Reporting period
                </div>
                <div className="text-base font-bold tracking-tight sm:text-lg">
                  {FULL_MONTHS[m.monthIdx]} {m.year}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {cfg.codeLong}
                </div>
              </div>
            </div>

            {/* Status badge to the right of the period on mobile */}
            <div className="flex flex-col items-end gap-1 md:hidden">
              <Badge tone={cfg.badgeTone}>{cfg.short}</Badge>
              {m.status === "reported" ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  On credit file
                </span>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
            <DetailField
              label="Rent paid"
              value={`$${m.amount.toLocaleString()}`}
              hint={m.status === "reported" ? "Confirmed" : "Awaiting"}
            />
            <DetailField
              label="Due date"
              value={m.dueOn}
              hint={`${FULL_MONTHS[m.monthIdx]} ${m.year}`}
            />
            <DetailField
              label="Reported"
              value={m.reportedOn ?? "—"}
              hint={
                m.status === "reported"
                  ? "Equifax received"
                  : m.status === "pending"
                  ? "Queued · < 24h"
                  : m.daysLate
                  ? `${m.daysLate} days late`
                  : "Action needed"
              }
            />
            <DetailField
              label="Proofs"
              value={`${m.proofCount}`}
              hint={
                m.proofCount > 0
                  ? "Encrypted in library"
                  : "Upload to resolve"
              }
            />
          </div>

          {/* Desktop badge column */}
          <div className="hidden flex-col items-end gap-2 md:flex">
            <Badge tone={cfg.badgeTone}>{cfg.short}</Badge>
            {m.status === "reported" ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                On your credit file
              </span>
            ) : null}
          </div>
        </div>

        {/* Proof + actions */}
        <div className="relative grid gap-3 border-t border-slate-200/70 p-4 sm:p-5 md:grid-cols-2 md:p-6 dark:border-slate-800">
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Proof on file
            </div>
            {m.status === "reported" ? (
              <div className="flex flex-col gap-1.5">
                <ProofRow
                  icon={FileText}
                  title="Pay stub"
                  detail={`${m.month} ${m.year} · 240 KB · verified`}
                  ok
                />
                <ProofRow
                  icon={Banknote}
                  title="Bank statement"
                  detail={`${m.month} ${m.year} · 612 KB · verified`}
                  ok
                />
              </div>
            ) : m.status === "pending" ? (
              <div className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>
                  Verification is in progress — typically{" "}
                  <strong>under 24 hours</strong>. We&rsquo;ll notify you when{" "}
                  {FULL_MONTHS[m.monthIdx]} is locked in.
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                <span>
                  No verified proof yet. Upload a pay stub or bank statement to
                  resolve this month and keep your credit file clean.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 md:items-end md:text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              What you can do
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {m.status === "reported" ? (
                <>
                  <Button variant="outline" size="sm">
                    <FileText className="h-3.5 w-3.5" />
                    Download report
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dispute
                  </Button>
                </>
              ) : m.status === "pending" ? (
                <Button size="sm">
                  <Upload className="h-3.5 w-3.5" />
                  Add another proof
                </Button>
              ) : (
                <>
                  <Button size="sm">
                    <Upload className="h-3.5 w-3.5" />
                    Upload proof
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-3.5 w-3.5" />
                    Mark as resolved
                  </Button>
                </>
              )}
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <ShieldCheck className="h-3 w-3" />
              Encrypted · stays in your library
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------- */

function LegendItem({ cfg }: { cfg: StatusCfg }) {
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "relative flex h-5 w-5 items-center justify-center rounded-md text-white",
          cfg.tileBg,
          cfg.tileShadow
        )}
      >
        <Icon className="h-3 w-3" strokeWidth={2.7} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-md bg-gradient-to-b from-white/40 to-transparent"
        />
      </span>
      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
        {cfg.short}
      </span>
    </span>
  );
}

function DetailField({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <div className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-bold leading-tight tracking-tight tabular-nums sm:text-base">
        {value}
      </div>
      {hint ? (
        <div className="truncate text-[10px] text-slate-500 dark:text-slate-400 sm:text-[11px]">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

function ProofRow({
  icon: Icon,
  title,
  detail,
  ok,
}: {
  icon: typeof FileText;
  title: string;
  detail: string;
  ok?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-slate-800">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold">{title}</div>
        <div className="truncate text-[10px] text-slate-500 dark:text-slate-400">
          {detail}
        </div>
      </div>
      {ok ? (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
      ) : null}
    </div>
  );
}
