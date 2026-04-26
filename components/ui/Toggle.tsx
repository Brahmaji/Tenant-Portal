"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function Toggle({
  defaultChecked = true,
  label,
  description,
}: {
  defaultChecked?: boolean;
  label?: string;
  description?: string;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      {(label || description) && (
        <span className="min-w-0">
          {label && (
            <span className="block text-sm font-semibold text-brand-ink dark:text-slate-100">
              {label}
            </span>
          )}
          {description && (
            <span className="mt-0.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {description}
            </span>
          )}
        </span>
      )}
      <button
        type="button"
        onClick={() => setOn((s) => !s)}
        aria-pressed={on}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition",
          on
            ? "bg-brand-gradient shadow-glow"
            : "bg-slate-200 dark:bg-slate-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
            on ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </label>
  );
}
