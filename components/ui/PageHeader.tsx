import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  breadcrumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumbs?: Crumb[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6 sm:gap-4",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        {breadcrumbs?.length ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400"
          >
            {breadcrumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition hover:text-brand-blue dark:hover:text-cyan-300"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-slate-700 dark:text-slate-200">
                    {c.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 ? (
                  <ChevronRight className="h-3 w-3 text-slate-400" />
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}

        {eyebrow ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-2 text-[22px] font-bold tracking-tight sm:text-[28px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto">
          {action}
        </div>
      ) : null}
    </div>
  );
}
