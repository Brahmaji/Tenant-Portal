"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Info,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScoreGauge } from "@/components/rent/ScoreGauge";
import { Stepper, type Step } from "@/components/rent/Stepper";
import { CreditProjection } from "@/components/rent/CreditProjection";
import { TrustCards } from "@/components/rent/TrustCards";
import { UpgradeProButton } from "@/components/rent/UpgradeProButton";
import { creditTrend, rent, rentMonths } from "@/lib/mock";

export default function RentReportingPage() {
  const currentScore = creditTrend[creditTrend.length - 1];
  const startScore = creditTrend[0];
  const delta = currentScore - startScore;
  const reported = rentMonths.filter((m) => m.status === "reported").length;
  const onTimeRate = Math.round((reported / rentMonths.length) * 100);

  const [marked, setMarked] = useState(false);

  const steps: Step[] = [
    {
      label: "Verify identity",
      description: "Tenant Passport at 78% — almost there.",
      status: "complete",
    },
    {
      label: "Connect lease",
      description: `${rent.property} · $${rent.amount}/mo`,
      status: "complete",
    },
    {
      label: "Confirm rent paid",
      description: "Mark this month as paid + add proof.",
      status: marked ? "complete" : "current",
    },
    {
      label: "Reported to Equifax",
      description: "Auto-reports on the 5th every month.",
      status: marked ? "current" : "upcoming",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Credit Building · Equifax"
        title="Rent Reporting"
        description="Pay your landlord like you always do — then confirm here. LeazeSure verifies the payment and reports it to Equifax to help you build a stronger credit profile."
        action={
          <Link href="/rent-reporting/manage">
            <Button>
              <ShieldCheck className="h-4 w-4" />
              Manage Reporting
            </Button>
          </Link>
        }
      />

      {/* HERO — score ring + KPI rail + this-month confirm */}
      <Card className="overflow-hidden">
        <div className="relative grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8 lg:gap-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-[0.08] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-dot-grid opacity-[0.55]"
          />

          <div className="relative flex justify-center md:justify-start">
            <div className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px]">
              <ScoreGauge score={currentScore} delta={delta} />
            </div>
          </div>

          <div className="relative flex flex-col gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">
                  <Sparkles className="h-3 w-3" /> Pro plan
                </Badge>
                <Badge tone="success">
                  <ArrowUpRight className="h-3 w-3" /> +{delta} pts since start
                </Badge>
                <Badge tone="info">
                  <CheckCircle2 className="h-3 w-3" /> {onTimeRate}% on-time
                </Badge>
              </div>
              <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                You&apos;re building credit, every month.
              </h2>
              <p className="mt-1.5 max-w-lg text-sm text-slate-500 dark:text-slate-400">
                LeazeSure has reported {reported} on-time payments to Equifax. Tenants
                like you typically see meaningful score growth within 3–6 months.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat
                label="Reported"
                value={`${reported}/${rentMonths.length}`}
                hint="months"
              />
              <Stat label="Bureau" value="Equifax" hint="Canada" />
              <Stat label="Cadence" value="Monthly" hint="every 5th" />
              <Stat label="Next report" value="May 5" hint="auto" />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link href="/rent-reporting/manage">
                <Button>
                  <Upload className="h-4 w-4" />
                  Upload rent proof
                </Button>
              </Link>
              <Link href="/rent-reporting/manage">
                <Button variant="outline">Add 24mo of history</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* THIS MONTH — confirm rent paid */}
      <Card className="overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">
                <CalendarDays className="h-3 w-3" /> April rent
              </Badge>
              {marked ? (
                <Badge tone="success">
                  <CheckCircle2 className="h-3 w-3" /> Marked paid
                </Badge>
              ) : (
                <Badge tone="warning">
                  <ClipboardCheck className="h-3 w-3" /> Action needed
                </Badge>
              )}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight tabular-nums">
                  ${rent.amount.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  due {rent.due}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Pay <strong>{rent.landlord}</strong> via {rent.method.toLowerCase()}.
                Then confirm here so we can verify and report it.
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold text-brand-ink dark:text-slate-100">
                <Info className="h-3.5 w-3.5 text-brand-blue dark:text-cyan-300" />
                LeazeSure never moves rent funds.
              </div>
              <p className="mt-1">
                We&apos;re a credit-reporting partner — you continue paying your
                landlord directly, and we handle the verification and bureau
                reporting on your behalf.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => setMarked((v) => !v)}
                disabled={marked}
                className="disabled:opacity-100"
              >
                <CheckCircle2 className="h-4 w-4" />
                {marked ? "Marked paid · awaiting verification" : "I’ve paid April rent"}
              </Button>
              <Link href="/rent-reporting/manage">
                <Button variant="outline">
                  <Upload className="h-4 w-4" />
                  Upload e-transfer receipt
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative bg-brand-gradient-soft p-6 md:p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue dark:text-cyan-300">
              How this month flows
            </div>
            <ol className="mt-3 space-y-3 text-sm">
              <FlowStep
                n={1}
                title="You pay rent"
                text="Send your usual e-transfer or bank payment to your landlord."
                done
              />
              <FlowStep
                n={2}
                title="Confirm here"
                text="Tap “I’ve paid” + share a quick proof (receipt or statement)."
                done={marked}
                active={!marked}
              />
              <FlowStep
                n={3}
                title="LeazeSure verifies"
                text="We check the amount, date, and lease — usually under 24h."
                active={marked}
              />
              <FlowStep
                n={4}
                title="Reported to Equifax"
                text="Auto-reports on May 5. Your score is updated within days."
              />
            </ol>
          </div>
        </div>
      </Card>

      {/* STEPPER */}
      <Card>
        <CardHeader
          title="Where you are in reporting"
          description="A quick view of what's verified, what's pending, and what's next."
          action={
            <Badge tone="brand">
              <Lock className="h-3 w-3" /> Bank-level encryption
            </Badge>
          }
        />
        <CardBody>
          <Stepper steps={steps} />
        </CardBody>
      </Card>

      {/* PROJECTION */}
      <Card>
        <CardHeader
          title="Your projected credit growth"
          description="With LeazeSure vs. without — based on reporting on-time."
          action={
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-full bg-brand-gradient" />
                With LeazeSure
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                <span className="h-[2px] w-3 border-t-2 border-dashed border-current" />
                Without
              </span>
            </div>
          }
        />
        <CardBody>
          <div className="h-44 w-full sm:h-56 lg:h-64">
            <CreditProjection baseline={currentScore} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Info className="h-3.5 w-3.5" />
            Projection is based on average results for tenants reporting on-time.
            Individual results vary by credit history and existing accounts.
          </div>
        </CardBody>
      </Card>

      {/* TWO-UP: how it works + landlord */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="How rent reporting builds credit"
            description="What happens, and when."
          />
          <CardBody className="space-y-3">
            <FlowStepLong
              n={1}
              title="You pay rent"
              text="Through your usual method — e-transfer, bank, or cheque."
            />
            <FlowStepLong
              n={2}
              title="LeazeSure verifies"
              text="We confirm the amount, date, and that it’s the correct lease."
            />
            <FlowStepLong
              n={3}
              title="Reported to Equifax"
              text="On the 5th of every month, on-time payments are sent to the bureau."
            />
            <FlowStepLong
              n={4}
              title="Your score grows"
              text="Most tenants see meaningful improvement within 3–6 months."
            />
            <div className="flex items-start gap-2 rounded-xl bg-brand-gradient-soft p-3 text-xs text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Late or missed payments may also be reported. Keeping rent on-time
                is the strongest signal to the bureaus.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Your landlord & lease"
            description="We use this to match payments. Update if anything changes."
          />
          <CardBody className="space-y-3">
            <Field label="Property" value={rent.property} />
            <Field label="Landlord" value={rent.landlord} />
            <Field
              label="Monthly rent"
              value={`$${rent.amount.toLocaleString()} CAD`}
            />
            <Field label="Payment method" value={rent.method} />
            <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <Banknote className="h-4 w-4 text-brand-blue dark:text-cyan-300" />
                </span>
                <div>
                  <div className="text-sm font-semibold">No gateway needed</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Keep paying your landlord directly — we just verify.
                  </div>
                </div>
              </div>
              <Link href="/rent-reporting/manage">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* UPGRADE BAND */}
      <Card className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-brand-gradient opacity-[0.95]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-25"
        />
        <div className="relative flex flex-col gap-5 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur">
              <TrendingUp className="h-3 w-3" />
              LeazeSure Pro
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight">
              Add 24 months of past rent.
            </h3>
            <p className="mt-1.5 text-sm text-white/85">
              Backfill up to 2 years of verified rent payments and watch your
              score jump in days, not months. Most users see <strong>+38 pts</strong>{" "}
              from backfill alone.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            <div className="sm:text-right">
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-3xl font-bold leading-none tracking-tight tabular-nums">
                  $9
                </span>
                <span className="text-sm font-semibold text-white/80">/ mo</span>
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Cancel anytime · 7-day money back
              </div>
            </div>
            <UpgradeProButton size="lg" label="Upgrade" />
          </div>
        </div>
      </Card>

      {/* TRUST CARDS */}
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

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-0.5 text-base font-bold tracking-tight tabular-nums">
        {value}
      </div>
      {hint ? (
        <div className="text-[10px] text-slate-400 dark:text-slate-500">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

function FlowStep({
  n,
  title,
  text,
  done,
  active,
}: {
  n: number;
  title: string;
  text: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <li className="flex gap-3">
      <span
        className={
          done
            ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white shadow-soft"
            : active
            ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[11px] font-bold text-white shadow-glow"
            : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-slate-400 ring-2 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
        }
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : n}
      </span>
      <div>
        <div className="text-sm font-semibold leading-tight">{title}</div>
        <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
          {text}
        </div>
      </div>
    </li>
  );
}

function FlowStepLong({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-soft">
        {n}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{text}</div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 last:border-0 last:pb-0 dark:border-slate-800">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-sm font-semibold text-brand-ink dark:text-slate-100">
        {value}
      </span>
    </div>
  );
}
