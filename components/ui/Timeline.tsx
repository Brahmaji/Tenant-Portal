import { cn } from "@/lib/cn";
import { Check, Clock, AlertTriangle } from "lucide-react";

export type RentMonth = {
  month: string;
  amount: number;
  status: "reported" | "pending" | "late";
  date?: string;
};

const styleMap = {
  reported: {
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    bar: "bg-emerald-400",
    icon: <Check className="h-3 w-3" />,
    label: "Reported",
  },
  pending: {
    pill: "bg-amber-50 text-amber-800 ring-amber-200",
    bar: "bg-amber-400",
    icon: <Clock className="h-3 w-3" />,
    label: "Pending",
  },
  late: {
    pill: "bg-rose-50 text-rose-700 ring-rose-200",
    bar: "bg-rose-400",
    icon: <AlertTriangle className="h-3 w-3" />,
    label: "Late",
  },
} as const;

export function RentTimeline({ months }: { months: RentMonth[] }) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
      {months.map((m) => {
        const s = styleMap[m.status];
        return (
          <div
            key={m.month}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {m.month}
            </div>
            <div
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-md text-white transition group-hover:scale-[1.03]",
                s.bar
              )}
              title={`${m.month}: ${s.label}`}
            >
              {s.icon}
            </div>
            <div className="text-[10px] text-slate-500">${m.amount}</div>
          </div>
        );
      })}
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: RentMonth["status"];
}) {
  const s = styleMap[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1",
        s.pill
      )}
    >
      {s.icon}
      {s.label}
    </span>
  );
}
