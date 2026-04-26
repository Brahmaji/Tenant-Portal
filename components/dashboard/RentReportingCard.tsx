import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/Card";
import { RentTimeline, StatusPill } from "@/components/ui/Timeline";
import { rentMonths } from "@/lib/mock";

export function RentReportingCard() {
  const current = rentMonths[rentMonths.length - 1];
  const reported = rentMonths.filter((m) => m.status === "reported").length;
  const onTimePct = Math.round((reported / rentMonths.length) * 100);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Rent Reporting"
        description="Your rent is reported to Equifax to help build your credit."
        action={<StatusPill status={current.status} />}
      />
      <CardBody className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Current month" value={current.month} hint={`$${current.amount}`} />
          <Stat label="On-time (12 mo)" value={`${onTimePct}%`} hint={`${reported}/${rentMonths.length} months`} />
          <Stat
            label="Bureau"
            value="Equifax"
            hint="Reports monthly"
            icon={<ShieldCheck className="h-3.5 w-3.5 text-brand-blue" />}
          />
        </div>

        <RentTimeline months={rentMonths} />

        <div className="flex items-start gap-2 rounded-xl bg-brand-gradient-soft p-3 text-xs text-brand-blue ring-1 ring-brand-blue/15">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Every on-time payment helps build your credit history. Late or
            missed payments may also be reported.
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <span className="text-xs text-slate-500">
          Last reported: <span className="font-semibold text-brand-ink">Mar 31, 2026</span>
        </span>
        <Link
          href="/rent-reporting"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:gap-1.5"
        >
          View credit progress <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 py-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 text-base font-bold">
        {icon}
        {value}
      </div>
      {hint ? <div className="text-[11px] text-slate-500">{hint}</div> : null}
    </div>
  );
}
