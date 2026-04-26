/**
 * "With vs without LeazeSure" projected credit growth.
 * Pure SVG, no external chart library.
 */
export function CreditProjection({
  baseline,
  months = 12,
  monthlyLift = 4,
  width = 560,
  height = 220,
}: {
  baseline: number;
  months?: number;
  monthlyLift?: number;
  width?: number;
  height?: number;
}) {
  const pad = { l: 36, r: 16, t: 16, b: 28 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;

  const without: number[] = [];
  const withLs: number[] = [];
  for (let i = 0; i <= months; i++) {
    without.push(baseline);
    // Diminishing returns curve, capped near +60 over a year.
    const lift = Math.round(monthlyLift * i * (1 - i / (months * 2.4)));
    withLs.push(Math.min(900, baseline + lift));
  }

  const allValues = [...without, ...withLs];
  const yMin = Math.min(...allValues) - 5;
  const yMax = Math.max(...allValues) + 8;

  const x = (i: number) => pad.l + (i / months) * innerW;
  const y = (v: number) =>
    pad.t + (1 - (v - yMin) / (yMax - yMin)) * innerH;

  const linePath = (data: number[]) =>
    data
      .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`)
      .join(" ");

  const areaPath = (data: number[]) =>
    `M ${x(0)} ${y(yMin)} ` +
    data.map((v, i) => `L ${x(i)} ${y(v)}`).join(" ") +
    ` L ${x(months)} ${y(yMin)} Z`;

  const ticks = 4;
  const labels = ["Now", "3mo", "6mo", "9mo", "12mo"];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="proj-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="proj-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Y grid */}
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const ty = pad.t + (i / ticks) * innerH;
        const value = Math.round(yMax - (i / ticks) * (yMax - yMin));
        return (
          <g key={i}>
            <line
              x1={pad.l}
              x2={width - pad.r}
              y1={ty}
              y2={ty}
              stroke="currentColor"
              strokeDasharray="3 4"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={pad.l - 6}
              y={ty + 3}
              textAnchor="end"
              className="fill-slate-400 text-[9px] font-semibold dark:fill-slate-500"
            >
              {value}
            </text>
          </g>
        );
      })}

      {/* X labels */}
      {labels.map((l, i) => (
        <text
          key={l}
          x={x((i / (labels.length - 1)) * months)}
          y={height - 8}
          textAnchor="middle"
          className="fill-slate-400 text-[9px] font-semibold uppercase tracking-wider dark:fill-slate-500"
        >
          {l}
        </text>
      ))}

      {/* Without (flat dashed) */}
      <path
        d={linePath(without)}
        fill="none"
        stroke="currentColor"
        strokeDasharray="5 5"
        strokeWidth={2}
        className="text-slate-400 dark:text-slate-600"
        vectorEffect="non-scaling-stroke"
      />

      {/* With LeazeSure */}
      <path d={areaPath(withLs)} fill="url(#proj-fill)" />
      <path
        d={linePath(withLs)}
        fill="none"
        stroke="url(#proj-line)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={x(months)}
        cy={y(withLs[months])}
        r={5}
        fill="white"
      />
      <circle
        cx={x(months)}
        cy={y(withLs[months])}
        r={3.5}
        fill="#2563EB"
      />
    </svg>
  );
}
