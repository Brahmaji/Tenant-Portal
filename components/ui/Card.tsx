import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "surface-card rounded-2xl transition",
        interactive &&
          "hover:-translate-y-0.5 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-between gap-3 px-6 pt-5",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
        {description ? (
          <p className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {action}
        </div>
      ) : null}
    </div>
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-5", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-slate-100 px-6 py-3.5 text-sm dark:border-slate-800",
        className
      )}
      {...props}
    />
  );
}
