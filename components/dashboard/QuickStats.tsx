import Link from "next/link";
import {
  FileText,
  Home,
  ClipboardCheck,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const stats = [
  {
    label: "Applications Sent",
    value: "12",
    delta: "+3 this month",
    tone: "info",
    icon: FileText,
    href: "/applications",
  },
  {
    label: "Active Lease",
    value: "1",
    delta: "Ends Aug 31, 2026",
    tone: "brand",
    icon: Home,
    href: "/passport",
  },
  {
    label: "April Rent",
    value: "Action",
    delta: "Confirm paid · upload proof",
    tone: "warning",
    icon: ClipboardCheck,
    href: "/rent-reporting",
  },
  {
    label: "Credit Building",
    value: "Active",
    delta: "+12 pts (12 mo)",
    tone: "brand",
    icon: TrendingUp,
    href: "/rent-reporting",
  },
] as const;

const toneMap: Record<string, string> = {
  info: "text-sky-600 bg-sky-50 ring-sky-200 dark:text-sky-300 dark:bg-sky-500/10 dark:ring-sky-500/30",
  brand:
    "text-brand-blue bg-brand-gradient-soft ring-brand-blue/20 dark:text-cyan-300",
  success:
    "text-emerald-600 bg-emerald-50 ring-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/10 dark:ring-emerald-500/30",
  warning:
    "text-amber-600 bg-amber-50 ring-amber-200 dark:text-amber-300 dark:bg-amber-500/10 dark:ring-amber-500/30",
};

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, delta, tone, icon: Icon, href }) => (
        <Link key={label} href={href}>
          <Card
            interactive
            className="group relative overflow-hidden p-4"
          >
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl ring-1",
                  toneMap[tone]
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-brand-blue dark:text-slate-600 dark:group-hover:text-cyan-300" />
            </div>
            <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {label}
            </div>
            <div className="mt-0.5 text-2xl font-bold tracking-tight">
              {value}
            </div>
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {delta}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
