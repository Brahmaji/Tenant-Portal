import { cn } from "@/lib/cn";

export type ScoreBand = {
  label: string;
  range: [number, number];
};

const DEFAULT_BANDS: ScoreBand[] = [
  { label: "Poor", range: [300, 559] },
  { label: "Fair", range: [560, 659] },
  { label: "Good", range: [660, 724] },
  { label: "Very Good", range: [725, 759] },
  { label: "Excellent", range: [760, 900] },
];

function bandFor(score: number, bands: ScoreBand[]) {
  return (
    bands.find((b) => score >= b.range[0] && score <= b.range[1]) ??
    bands[bands.length - 1]
  );
}

/**
 * An elegant 3/4 ring credit-score "dial". Clean rounded stroke, soft
 * gradient halo, big number inside. No tick marks. The component fluidly
 * fills its parent (capped at `size`), so it scales down on phones and
 * tablets and stays sharp on desktops.
 */
export function ScoreGauge({
  score,
  delta = 0,
  min = 300,
  max = 900,
  /** Maximum render size (px). The component will be at most this wide and
   * keep aspect ratio. Internal SVG draws to a fixed 240 viewBox for crispness. */
  size = 240,
  bands = DEFAULT_BANDS,
}: {
  score: number;
  delta?: number;
  min?: number;
  max?: number;
  size?: number;
  bands?: ScoreBand[];
}) {
  // Internal canvas is always 240 — outer wrapper handles responsive sizing.
  const canvas = 240;
  const stroke = 16;
  const r = (canvas - stroke) / 2;
  const cx = canvas / 2;
  const cy = canvas / 2;

  // 270° sweep, opens downward (bottom gap) — feels poised and balanced.
  const startAngle = 135;
  const total = 270;

  const clamped = Math.max(min, Math.min(max, score));
  const progress = (clamped - min) / (max - min);

  const arc = (a1: number, a2: number) => {
    const p1 = polar(cx, cy, r, a1);
    const p2 = polar(cx, cy, r, a2);
    const sweep = a2 - a1;
    const large = sweep > 180 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
  };

  const valueAngle = startAngle + total * progress;
  const band = bandFor(clamped, bands);

  return (
    <div
      className="relative mx-auto aspect-square w-full"
      style={{ maxWidth: size }}
    >
      {/* Soft brand halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-full bg-brand-gradient opacity-[0.18] blur-2xl"
      />

      <svg
        viewBox={`0 0 ${canvas} ${canvas}`}
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="elegant-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <filter id="elegant-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <path
          d={arc(startAngle, startAngle + total)}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          className="text-slate-200/80 dark:text-slate-800"
        />

        {/* Progress */}
        <path
          d={arc(startAngle, valueAngle)}
          stroke="url(#elegant-fill)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          filter="url(#elegant-glow)"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Equifax · estimated
        </div>
        <div className="mt-1 text-[56px] font-bold leading-none tracking-tight tabular-nums text-brand-ink dark:text-slate-50">
          {clamped}
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-gradient-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
          {band.label}
        </div>
        {delta !== 0 ? (
          <div
            className={cn(
              "mt-2 text-[11px] font-semibold",
              delta > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          >
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta)} pts since enabling
          </div>
        ) : null}
      </div>
    </div>
  );
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
