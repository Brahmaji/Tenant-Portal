"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Info,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toggle } from "@/components/ui/Toggle";
import { UploadZone, type UploadFile } from "@/components/upload/UploadZone";
import { YearStrip } from "@/components/rent/YearStrip";
import { TrustCards } from "@/components/rent/TrustCards";
import { ComingSoonBanner } from "@/components/rent/ComingSoonBanner";
import { rentMonths } from "@/lib/mock";
import { cn } from "@/lib/cn";

const monthLabel = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function buildPeriodOptions() {
  const now = new Date();
  const opts: { value: string; label: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    opts.push({
      value,
      label: `${monthLabel[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return opts;
}

const docCategories = [
  {
    key: "stub",
    title: "Pay stubs",
    desc: "One per month covering the last 3 months.",
    required: 3,
    have: 2,
  },
  {
    key: "bank",
    title: "Bank statements",
    desc: "Most recent month showing rent transfers.",
    required: 1,
    have: 1,
  },
  {
    key: "lease",
    title: "Lease agreement",
    desc: "Current signed lease.",
    required: 1,
    have: 1,
  },
] as const;

export default function ManageReportingPage() {
  const periodOptions = useMemo(() => buildPeriodOptions(), []);
  const [submitted, setSubmitted] = useState(0);

  const totalRequired = docCategories.reduce((n, c) => n + c.required, 0);
  const totalHave = docCategories.reduce((n, c) => n + c.have, 0);
  const completionPct = Math.round((totalHave / totalRequired) * 100);

  const reportedCount = rentMonths.filter((m) => m.status === "reported").length;
  const lateCount = rentMonths.filter((m) => m.status === "late").length;
  const pendingCount = rentMonths.filter((m) => m.status === "pending").length;

  function handleSubmit(files: UploadFile[]) {
    setSubmitted((n) => n + files.length);
  }

  return (
    <div className="space-y-8">
      <Link
        href="/rent-reporting"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-brand-blue dark:text-slate-400 dark:hover:text-cyan-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Rent Reporting
      </Link>

      <PageHeader
        breadcrumbs={[
          { label: "Rent Reporting", href: "/rent-reporting" },
          { label: "Manage" },
        ]}
        eyebrow="Verification & Documents"
        title="Manage Reporting"
        description="Upload pay stubs, bank statements, and lease documents so we can verify your rent payments and report them to Equifax. We never move rent funds — you pay your landlord directly."
        action={
          <Badge tone="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Equifax connection active
          </Badge>
        }
      />

      {/* STATUS RAIL */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatusTile
          icon={CheckCircle2}
          tone="success"
          label="Months reported"
          value={`${reportedCount}`}
          hint={`of ${rentMonths.length} total`}
        />
        <StatusTile
          icon={Clock}
          tone="warning"
          label="Awaiting verification"
          value={`${pendingCount}`}
          hint="needs proof"
        />
        <StatusTile
          icon={AlertTriangle}
          tone="danger"
          label="Late / disputed"
          value={`${lateCount}`}
          hint="action needed"
        />
        <StatusTile
          icon={CalendarDays}
          tone="info"
          label="Next report"
          value="May 5"
          hint="auto · 9 days"
        />
      </section>

      {submitted > 0 ? (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <div className="font-semibold">
              {submitted} file{submitted === 1 ? "" : "s"} sent for verification.
            </div>
            <div className="text-xs opacity-80">
              We&apos;ll review within 24 hours and notify you when reporting is
              live for each month.
            </div>
          </div>
        </div>
      ) : null}

      {/* UPLOAD + REQUIREMENTS */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Upload supporting documents"
            description="Drag in multiple files at once — tag each one to the month it covers so we can match it to your lease."
            action={
              <Badge tone="brand">
                <Lock className="h-3 w-3" /> Encrypted at rest
              </Badge>
            }
          />
          <CardBody>
            <UploadZone
              periodOptions={periodOptions}
              defaultPeriod={periodOptions[0]?.value}
              onSubmit={handleSubmit}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="What we need"
            description={`${totalHave} of ${totalRequired} required documents on file.`}
          />
          <CardBody className="space-y-3">
            <div className="rounded-xl bg-brand-gradient-soft p-3 ring-1 ring-brand-blue/15">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-brand-blue dark:text-cyan-300">
                <span>Verification progress</span>
                <span>{completionPct}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/60 dark:bg-slate-900/60">
                <div
                  className="h-full rounded-full bg-brand-gradient transition-[width]"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>

            {docCategories.map((c) => {
              const done = c.have >= c.required;
              const missing = c.required - c.have;
              return (
                <div
                  key={c.key}
                  className={cn(
                    "rounded-xl border p-3 transition",
                    done
                      ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/5"
                      : "border-amber-200 bg-amber-50/40 dark:border-amber-500/20 dark:bg-amber-500/5"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold">{c.title}</div>
                    {done ? (
                      <Badge tone="success">
                        <CheckCircle2 className="h-3 w-3" /> Complete
                      </Badge>
                    ) : (
                      <Badge tone="warning">
                        <Clock className="h-3 w-3" /> {missing} needed
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {c.desc}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {c.have} of {c.required} on file
                  </div>
                </div>
              );
            })}

            <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900/60 dark:text-slate-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Documents are reused across all your applications and rent reporting.
                You only need to upload each document once.
              </p>
            </div>

            <Toggle
              label="Notify me when reporting completes"
              description="Send a push when a month is reported to Equifax."
            />
          </CardBody>
        </Card>
      </section>

      {/* YEAR STRIP — per-month status */}
      <Card>
        <CardHeader
          title="Per-month reporting status"
          description="Click a month to see its proof, status, and next action."
          action={
            <div className="flex items-center gap-2">
              <Badge tone="success">{reportedCount} reported</Badge>
              <Badge tone="warning">{pendingCount} pending</Badge>
              <Badge tone="danger">{lateCount} late</Badge>
            </div>
          }
        />
        <CardBody>
          <YearStrip months={rentMonths} />
        </CardBody>
      </Card>

      {/* COMING SOON — Backfill 24 months */}
      <ComingSoonBanner />

      {/* TRUST CARDS — premium stat cards */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-blue dark:text-cyan-300">
              Built on trust
            </div>
            <h3 className="mt-1 text-lg font-bold tracking-tight">
              Why your data is safe with LeazeSure
            </h3>
          </div>
          <Link
            href="/settings"
            className="text-xs font-semibold text-brand-blue hover:underline dark:text-cyan-300"
          >
            Privacy controls →
          </Link>
        </div>
        <TrustCards />
      </section>
    </div>
  );
}

function StatusTile({
  icon: Icon,
  tone,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "success" | "warning" | "danger" | "info";
  label: string;
  value: string;
  hint?: string;
}) {
  const tones: Record<typeof tone, string> = {
    success:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    warning:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    danger:
      "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30",
    info: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30",
  };
  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
            tones[tone]
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {label}
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums">
            {value}
          </div>
          {hint ? (
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {hint}
            </div>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
}

