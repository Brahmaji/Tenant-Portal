import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export type Step = {
  label: string;
  description?: string;
  status: "complete" | "current" | "upcoming";
};

export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => {
        const isComplete = s.status === "complete";
        const isCurrent = s.status === "current";
        return (
          <li
            key={i}
            className={cn(
              "relative overflow-hidden rounded-xl border p-3 transition",
              isComplete &&
                "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-500/5",
              isCurrent &&
                "border-brand-blue/30 bg-brand-gradient-soft ring-2 ring-brand-blue/15",
              !isComplete && !isCurrent &&
                "border-slate-200/70 bg-white/40 dark:border-slate-800 dark:bg-slate-900/40"
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ring-2 transition",
                  isComplete &&
                    "bg-emerald-500 text-white ring-emerald-200 dark:ring-emerald-500/30",
                  isCurrent &&
                    "bg-brand-gradient text-white ring-brand-blue/20 shadow-glow",
                  !isComplete && !isCurrent &&
                    "bg-white text-slate-400 ring-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:ring-slate-800"
                )}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <div className="min-w-0">
                <div
                  className={cn(
                    "text-sm font-semibold tracking-tight",
                    isCurrent && "text-brand-blue dark:text-cyan-300"
                  )}
                >
                  {s.label}
                </div>
                {s.description ? (
                  <div className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                    {s.description}
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
