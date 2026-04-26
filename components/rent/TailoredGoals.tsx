import {
  Compass,
  Plane,
  RotateCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Persona = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  accent: "brand" | "violet" | "emerald";
  badge: string;
};

const PERSONAS: Persona[] = [
  {
    icon: Plane,
    eyebrow: "Newcomers to Canada",
    title: "Build a credit history from day one",
    description:
      "Use the rent you already pay to start a recognized credit file from scratch — no Canadian credit history required to get going.",
    accent: "brand",
    badge: "Start fresh",
  },
  {
    icon: RotateCw,
    eyebrow: "Rebuilding credit",
    title: "Turn your largest expense into your strongest signal",
    description:
      "Demonstrate consistent, on-time payment behaviour. Let your rent prove your reliability — month after month — and recover faster.",
    accent: "violet",
    badge: "Bounce back",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Established credit pros",
    title: "Protect and strengthen your high score",
    description:
      "Add depth to your file with a long, verified history of major payments. A more robust profile is harder to disrupt and easier to grow.",
    accent: "emerald",
    badge: "Stay strong",
  },
];

const accentStyles = {
  brand: {
    iconRing:
      "from-cyan-100 to-blue-100 text-blue-700 ring-cyan-200/70 dark:from-cyan-500/15 dark:to-blue-500/15 dark:text-cyan-300 dark:ring-cyan-400/20",
    eyebrow: "text-blue-700 dark:text-cyan-300",
    glow: "from-cyan-500/15 to-blue-500/15",
    badge:
      "bg-cyan-50 text-blue-700 ring-cyan-200/60 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-400/20",
    bar: "from-cyan-400 to-blue-500",
    edge: "via-cyan-400/60",
  },
  violet: {
    iconRing:
      "from-violet-100 to-fuchsia-100 text-violet-700 ring-violet-200/70 dark:from-violet-500/15 dark:to-fuchsia-500/15 dark:text-violet-300 dark:ring-violet-400/20",
    eyebrow: "text-violet-700 dark:text-violet-300",
    glow: "from-violet-500/15 to-fuchsia-500/15",
    badge:
      "bg-violet-50 text-violet-700 ring-violet-200/60 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
    bar: "from-violet-400 to-fuchsia-500",
    edge: "via-violet-400/60",
  },
  emerald: {
    iconRing:
      "from-emerald-100 to-teal-100 text-emerald-700 ring-emerald-200/70 dark:from-emerald-500/15 dark:to-teal-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
    eyebrow: "text-emerald-700 dark:text-emerald-300",
    glow: "from-emerald-500/15 to-teal-500/15",
    badge:
      "bg-emerald-50 text-emerald-700 ring-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    bar: "from-emerald-400 to-teal-500",
    edge: "via-emerald-400/60",
  },
} as const;

export function TailoredGoals() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
            <Compass className="h-3.5 w-3.5" />
            Tailored for your goals
          </div>
          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-[22px] dark:text-white">
            Whether you&rsquo;re starting fresh or solidifying a legacy
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Rent reporting is the most powerful tool in your financial arsenal.
            Pick the path that fits where you are today — every month builds on
            the last.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PERSONAS.map((p) => {
          const styles = accentStyles[p.accent];
          const Icon = p.icon;
          return (
            <article
              key={p.eyebrow}
              className="surface-smoky group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.18)] dark:hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${styles.glow} opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-90`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${styles.edge} to-transparent`}
              />

              <div className="relative flex items-start justify-between gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${styles.iconRing} ring-1 ring-inset shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]`}
                >
                  <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ring-1 ring-inset ${styles.badge}`}
                >
                  {p.badge}
                </span>
              </div>

              <div
                className={`relative mt-4 text-[10px] font-bold uppercase tracking-[0.16em] ${styles.eyebrow}`}
              >
                For {p.eyebrow}
              </div>
              <h4 className="relative mt-1.5 text-base font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
                {p.title}
              </h4>
              <p className="relative mt-2 flex-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                {p.description}
              </p>

              <div
                aria-hidden
                className={`relative mt-4 h-1 w-12 rounded-full bg-gradient-to-r ${styles.bar} transition-all duration-500 group-hover:w-20`}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
