import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Premium "Upgrade to Pro" CTA designed to sit on a brand-gradient band.
 * Glossy white pill, gradient text, gold PRO badge, and a sheen sweep on hover.
 */
export function UpgradeProButton({
  href = "/billing",
  label = "Upgrade",
  size = "md",
  className,
}: {
  href?: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${label} to LeazeSure Pro`}
      className={cn(
        "group relative inline-flex select-none items-center overflow-hidden rounded-xl bg-white font-bold text-brand-blue shadow-[0_10px_30px_-10px_rgba(2,8,23,0.45)] ring-1 ring-white/50 transition will-change-transform hover:-translate-y-[1px] hover:shadow-[0_14px_32px_-10px_rgba(2,8,23,0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/50 active:translate-y-0",
        size === "lg" ? "h-12 gap-2.5 px-5 text-[15px]" : "h-11 gap-2 px-4 text-sm",
        className
      )}
    >
      {/* Top inner highlight (glass rim) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
      />
      {/* Sheen sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
      />

      {/* Gold spark icon */}
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 text-amber-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_4px_-2px_rgba(180,83,9,0.6)]">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>

      {/* Gradient label */}
      <span className="relative bg-gradient-to-r from-brand-blue via-brand-blue to-cyan-500 bg-clip-text text-transparent">
        {label}
      </span>

      {/* Gold "PRO" pill */}
      <span className="relative inline-flex items-center rounded-md bg-gradient-to-b from-amber-300 to-amber-500 px-1.5 py-[3px] text-[10px] font-extrabold uppercase tracking-[0.14em] text-amber-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_1px_2px_rgba(180,83,9,0.4)]">
        Pro
      </span>

      <ArrowRight className="relative h-4 w-4 text-brand-blue/80 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
