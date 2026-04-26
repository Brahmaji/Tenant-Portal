"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  Calendar,
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

const statusMap: Record<
  Status,
  {
    label: string;
    short: string;
    icon: typeof CheckCircle2;
    badgeTone: "success" | "warning" | "danger";
    barClass: string;
    chipClass: string;
    cardAccent: string;
  }
> = {
  reported: {
    label: "Reported to Equifax",
    short: "Reported",
    icon: CheckCircle2,
    badgeTone: "success",
    barClass: "bg-emerald-400",
    chipClass:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    cardAccent:
      "from-emerald-400/15 via-transparent to-transparent",
  },
  pending: {
    label: "Awaiting verification",
    short: "Pending",
    icon: Clock,
    badgeTone: "warning",
    barClass: "bg-amber-400",
    chipClass:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    cardAccent:
      "from-amber-400/15 via-transparent to-transparent",
  },
  late: {
    label: "Late — needs proof or dispute",
    short: "Late",
    icon: AlertTriangle,
    badgeTone: "danger",
    barClass: "bg-rose-400",
    chipClass:
      "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30",
    cardAccent: "from-rose-400/15 via-transparent to-transparent",
  },
};

export function YearStrip({ months }: { months: RentMonth[] }) {
  const lastIndex = months.length - 1;
  const [selected, setSelected] = useState<number>(lastIndex);
  const m = months[selected] ?? months[lastIndex];
  const cfg = statusMap[m.status];

  return (
    <div className="space-y-5">
      {/* STRIP — 4 cols on phones, 6 on small tablets, 12 on desktop */}
      <div
        role="tablist"
        aria-label="Reporting months"
        className="grid grid-cols-4 gap-1 sm:grid-cols-6 sm:gap-1.5 lg:grid-cols-12"
      >
        {months.map((mo, idx) => {
          const s = statusMap[mo.status];
          const isSelected = idx === selected;
          return (
            <button
              key={`${mo.month}-${idx}`}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelected(idx)}
              className={cn(
                "group relative flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 sm:gap-1.5 sm:py-2",
                isSelected
                  ? "bg-white shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
                  : "hover:bg-slate-50 dark:hover:bg-slate-900/60"
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider transition",
                  isSelected
                    ? "text-brand-ink dark:text-slate-100"
                    : "text-slate-400 dark:text-slate-500"
                )}
              >
                {mo.month}
              </span>
              <span
                className={cn(
                  "flex h-6 w-full items-center justify-center rounded-lg text-white transition group-hover:scale-[1.05] sm:h-7",
                  s.barClass,
                  isSelected && "ring-2 ring-white dark:ring-slate-900"
                )}
                title={`${mo.month}: ${s.label}`}
              >
                <s.icon className="h-3 w-3" strokeWidth={2.4} />
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold tabular-nums transition",
                  isSelected
                    ? "text-slate-700 dark:text-slate-200"
                    : "text-slate-400 dark:text-slate-500"
                )}
              >
                ${mo.amount}
              </span>
              {isSelected ? (
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-gradient"
                />
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
          className={cn(
            "absolute inset-x-0 top-0 h-0.5",
            cfg.barClass
          )}
        />

        <div className="relative grid gap-4 p-4 sm:gap-5 sm:p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6">
          <div className="flex items-center justify-between gap-3 md:justify-start">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:text-cyan-300 dark:ring-slate-700 sm:h-12 sm:w-12">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Reporting period
                </div>
                <div className="text-base font-bold tracking-tight sm:text-lg">
                  {m.month} 2026
                </div>
              </div>
            </div>

            {/* Status badge sits to the right of the period on mobile */}
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

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <DetailField
              label="Rent paid"
              value={`$${m.amount.toLocaleString()}`}
              hint={m.status === "reported" ? "Confirmed" : "Awaiting"}
            />
            <DetailField
              label="Status"
              value={
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 sm:text-[11px]",
                    cfg.chipClass
                  )}
                >
                  <cfg.icon className="h-3 w-3" />
                  {cfg.short}
                </span>
              }
              hint={cfg.label}
            />
            <DetailField
              label="Reported on"
              value={
                m.status === "reported"
                  ? `${m.month} 5`
                  : m.status === "pending"
                  ? "Queued"
                  : "—"
              }
              hint={
                m.status === "reported"
                  ? "Equifax received"
                  : m.status === "pending"
                  ? "< 24h of proof"
                  : "Action needed"
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
                  detail={`${m.month} · 240 KB · verified`}
                  ok
                />
                <ProofRow
                  icon={Banknote}
                  title="Bank statement"
                  detail={`${m.month} · 612 KB · verified`}
                  ok
                />
              </div>
            ) : m.status === "pending" ? (
              <div className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>
                  Verification is in progress — typically{" "}
                  <strong>under 24 hours</strong>. We&rsquo;ll notify you when{" "}
                  {m.month} is locked in.
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
