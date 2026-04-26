"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import type { PassportProgressProps, SectionStatus } from "./types";

const statusMeta: Record<
  SectionStatus,
  {
    label: string;
    badge: "success" | "warning" | "danger";
    fillPct: number;
    railClass: string;
    nodeClass: string;
    Icon: typeof CheckCircle2;
  }
> = {
  complete: {
    label: "Complete",
    badge: "success",
    fillPct: 100,
    railClass: "bg-emerald-400",
    nodeClass:
      "bg-emerald-500 text-white ring-emerald-100 dark:ring-emerald-500/20",
    Icon: CheckCircle2,
  },
  needs_update: {
    label: "Needs update",
    badge: "warning",
    fillPct: 65,
    railClass: "bg-amber-400",
    nodeClass:
      "bg-amber-500 text-white ring-amber-100 dark:ring-amber-500/20",
    Icon: Clock,
  },
  missing: {
    label: "Missing",
    badge: "danger",
    fillPct: 25,
    railClass: "bg-rose-400",
    nodeClass:
      "bg-rose-500 text-white ring-rose-100 dark:ring-rose-500/20",
    Icon: AlertTriangle,
  },
};

export function ProgressTimeline({
  sections,
  detail,
  completion,
}: PassportProgressProps) {
  const firstActionable = sections.findIndex((s) => s.status !== "complete");
  const [expandedKey, setExpandedKey] = useState<string | null>(
    firstActionable >= 0 ? sections[firstActionable].key : sections[0]?.key ?? null
  );

  const completed = sections.filter((s) => s.status === "complete").length;

  return (
    <div className="space-y-4">
      {/* Summary row */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Verification progress
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-2xl font-extrabold tracking-tight">
              {completion}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {completed} of {sections.length} sections complete
            </div>
          </div>
        </div>
        <ProgressBar value={completion} className="max-w-xs flex-1" />
      </div>

      {/* Vertical timeline */}
      <ol className="relative space-y-3">
        {sections.map((s, i) => {
          const meta = statusMeta[s.status];
          const det = detail[s.key];
          const expanded = expandedKey === s.key;
          const isLast = i === sections.length - 1;
          const NodeIcon = meta.Icon;
          const SectionIcon = det?.icon ?? Circle;

          return (
            <li key={s.key} className="relative">
              {/* Connector rail */}
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[19px] top-10 h-[calc(100%+0.75rem)] w-px",
                    s.status === "complete"
                      ? "bg-emerald-300 dark:bg-emerald-500/40"
                      : "bg-slate-200 dark:bg-slate-700"
                  )}
                />
              ) : null}

              <div
                className={cn(
                  "relative rounded-2xl border bg-white transition dark:bg-slate-900",
                  expanded
                    ? "border-brand-blue/40 shadow-soft dark:border-cyan-400/30"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedKey(expanded ? null : s.key)}
                  aria-expanded={expanded}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left sm:gap-4 sm:px-4"
                >
                  {/* Status node */}
                  <span
                    className={cn(
                      "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-offset-0",
                      meta.nodeClass
                    )}
                  >
                    <NodeIcon className="h-5 w-5" />
                  </span>

                  <span
                    className="hidden h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15 sm:flex dark:text-cyan-300"
                    aria-hidden
                  >
                    <SectionIcon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-sm font-semibold">
                        {det?.title ?? s.label}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge tone={meta.badge}>{meta.label}</Badge>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-slate-400 transition",
                            expanded && "rotate-180"
                          )}
                        />
                      </div>
                    </div>
                    <div className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {det?.desc ?? "—"}
                    </div>
                  </div>
                </button>

                {/* Expanded body */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3 sm:pl-[4.5rem] dark:border-slate-800">
                      <div
                        className={cn(
                          "h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                        )}
                      >
                        <div
                          className={cn(
                            "h-full rounded-full transition-[width] duration-500",
                            meta.railClass
                          )}
                          style={{ width: `${meta.fillPct}%` }}
                        />
                      </div>

                      {s.status === "complete" ? (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {det?.updated
                            ? `Last verified ${det.updated}.`
                            : "Verified and reusable across applications."}
                        </div>
                      ) : (
                        <ul className="space-y-1.5 text-sm">
                          {(det?.todos ?? []).map((t, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                            >
                              <span
                                className={cn(
                                  "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                                  s.status === "missing"
                                    ? "bg-rose-500"
                                    : "bg-amber-500"
                                )}
                              />
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Step {i + 1} of {sections.length}
                        </div>
                        <div className="flex gap-2">
                          {s.status !== "complete" ? (
                            <Button variant="ghost" size="sm">
                              Skip for now
                            </Button>
                          ) : null}
                          <Button size="sm">
                            {det?.cta ??
                              (s.status === "complete" ? "Review" : "Continue")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
