import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type TrustCard = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  /** Short, factual headline metric — kept compact and uniform across cards. */
  metric: string;
  metricLabel: string;
  /** brand accent for the icon "tile" */
  accent: "brand" | "violet" | "emerald";
};

const cards: TrustCard[] = [
  {
    icon: ShieldCheck,
    eyebrow: "Reporting partner",
    title: "Equifax-certified furnisher",
    description:
      "LeazeSure is a registered furnisher of credit data in Canada. Reports go directly to Equifax — no intermediaries, no resellers.",
    metric: "Monthly",
    metricLabel: "auto-reports on the 5th",
    accent: "brand",
  },
  {
    icon: Lock,
    eyebrow: "Data protection",
    title: "Bank-level encryption",
    description:
      "AES-256 at rest, TLS 1.3 in transit, and a zero-knowledge document store. Your proof stays yours.",
    metric: "AES-256",
    metricLabel: "with TLS 1.3 in transit",
    accent: "violet",
  },
  {
    icon: CheckCircle2,
    eyebrow: "Compliance",
    title: "SOC 2 Type II",
    description:
      "Independently audited security, availability, and privacy controls — reviewed annually by accredited firms.",
    metric: "Type II",
    metricLabel: "audited annually",
    accent: "emerald",
  },
];

const accentMap: Record<
  TrustCard["accent"],
  { tile: string; ring: string; glow: string }
> = {
  brand: {
    tile: "bg-brand-gradient text-white",
    ring: "ring-brand-blue/20",
    glow: "bg-brand-gradient",
  },
  violet: {
    tile: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
    ring: "ring-violet-500/20",
    glow: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
  },
  emerald: {
    tile: "bg-gradient-to-br from-emerald-500 to-teal-500 text-white",
    ring: "ring-emerald-500/20",
    glow: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
};

export function TrustCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <TrustCardItem key={c.title} card={c} />
      ))}
    </div>
  );
}

function TrustCardItem({ card }: { card: TrustCard }) {
  const a = accentMap[card.accent];
  const Icon = card.icon;
  return (
    <div className="surface-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-glow">
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.08] blur-3xl ${a.glow}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.4]"
      />

      {/* Header row: icon tile + eyebrow chip */}
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-soft ring-4 ring-white/60 transition group-hover:scale-105 dark:ring-slate-900/40 ${a.tile}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 ring-1 ${a.ring} dark:bg-slate-900/60 dark:text-slate-400`}
        >
          {card.eyebrow}
        </span>
      </div>

      {/* Body — flex-1 so footer always pins to the same Y across cards */}
      <div className="relative mt-4 flex-1">
        <div className="text-[15px] font-bold tracking-tight">{card.title}</div>
        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {card.description}
        </p>
      </div>

      {/* Footer — fixed-height row so metric labels line up across all 3 cards */}
      <div className="relative mt-4 flex h-[52px] items-center justify-between gap-3 border-t border-slate-200/70 pt-3 dark:border-slate-800">
        <div className="min-w-0">
          <div className="truncate text-[18px] font-bold leading-none tracking-tight text-brand-ink dark:text-slate-50">
            {card.metric}
          </div>
          <div className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            {card.metricLabel}
          </div>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </div>
      </div>
    </div>
  );
}
