import Link from "next/link";
import {
  ArrowDownToLine,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  HelpCircle,
  Plus,
  Receipt,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { invoices, paymentMethods, subscription } from "@/lib/mock";
import { cn } from "@/lib/cn";

export default function BillingPage() {
  const upcoming = invoices.find((i) => i.status === "upcoming");
  const paidInvoices = invoices.filter((i) => i.status === "paid");
  const yearToDate = paidInvoices
    .filter((i) => i.date.includes("2026"))
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Account · Billing"
        title="Billing"
        description="Manage your LeazeSure subscription, invoices, and payment method. Rent paid to your landlord is handled separately."
        action={
          <Link href="/settings">
            <Button variant="outline">
              <HelpCircle className="h-4 w-4" />
              Billing help
            </Button>
          </Link>
        }
      />

      {/* PLAN HERO */}
      <Card className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-brand-gradient opacity-[0.12] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-dot-grid opacity-50"
        />
        <div className="relative grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8 lg:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">
                <Sparkles className="h-3 w-3" /> {subscription.plan}
              </Badge>
              <Badge tone="success">
                <CheckCircle2 className="h-3 w-3" /> Active
              </Badge>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight tabular-nums">
                  ${subscription.price}
                </span>
                <span className="text-base font-semibold text-slate-500 dark:text-slate-400">
                  / {subscription.cadence} · {subscription.currency}
                </span>
              </div>
              <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                Renews on{" "}
                <span className="font-semibold text-brand-ink dark:text-slate-100">
                  {subscription.renewsOn}
                </span>
                · started {subscription.startedOn}
              </div>
            </div>

            <ul className="grid gap-1.5 text-sm sm:grid-cols-2">
              {subscription.features.map((f) => (
                <li
                  key={f}
                  className="inline-flex items-start gap-1.5 text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Button variant="outline">Change plan</Button>
              <Button variant="ghost" className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                Cancel subscription
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start lg:grid-cols-1">
            <KpiTile
              label="Next invoice"
              value={upcoming ? `$${upcoming.amount}` : "—"}
              hint={upcoming ? upcoming.date : "No upcoming invoice"}
              icon={Clock}
            />
            <KpiTile
              label="Paid year-to-date"
              value={`$${yearToDate}`}
              hint={`${paidInvoices.length} invoices`}
              icon={Receipt}
            />
          </div>
        </div>
      </Card>

      {/* PAYMENT METHODS */}
      <Card>
        <CardHeader
          title="Payment method"
          description="Used for your LeazeSure subscription only — never for paying rent."
          action={
            <Button variant="outline" size="sm">
              <Plus className="h-3.5 w-3.5" /> Add card
            </Button>
          }
        />
        <CardBody className="grid gap-3 sm:grid-cols-2">
          {paymentMethods.map((m) => (
            <PaymentMethodCard key={m.id} method={m} />
          ))}
        </CardBody>
      </Card>

      {/* INVOICES */}
      <Card>
        <CardHeader
          title="Invoices"
          description="Receipts for every LeazeSure subscription charge."
          action={
            <Button variant="outline" size="sm">
              <ArrowDownToLine className="h-3.5 w-3.5" /> Export all
            </Button>
          }
        />
        <CardBody className="px-0 pb-2 pt-0">
          {/* Mobile: cards */}
          <ul className="divide-y divide-slate-100 px-4 sm:hidden dark:divide-slate-800">
            {invoices.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
                  <Receipt className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold">
                      {i.description}
                    </div>
                    <InvoiceStatusBadge status={i.status} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{i.number}</span>
                    <span aria-hidden>·</span>
                    <span>{i.date}</span>
                    <span aria-hidden>·</span>
                    <span className="font-bold text-brand-ink tabular-nums dark:text-slate-100">
                      ${i.amount}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden sm:block">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 text-left">Invoice</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Method</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                  <th className="px-6 py-3 text-right">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                {invoices.map((i) => (
                  <tr
                    key={i.id}
                    className="transition hover:bg-slate-50/50 dark:hover:bg-slate-900/40"
                  >
                    <td className="px-6 py-3.5 font-mono text-[12px] font-semibold text-brand-ink dark:text-slate-100">
                      {i.number}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">
                      {i.date}
                    </td>
                    <td className="px-6 py-3.5 text-slate-700 dark:text-slate-200">
                      {i.description}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400">
                      {i.method ?? "—"}
                    </td>
                    <td className="px-6 py-3.5 text-right font-bold tabular-nums">
                      ${i.amount}.00
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <InvoiceStatusBadge status={i.status} />
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      {i.status === "paid" ? (
                        <button
                          type="button"
                          aria-label={`Download ${i.number}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-blue dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* RENT NOTE */}
      <Card>
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-semibold">
                Looking for rent reminders or to confirm a rent payment?
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Rent is paid directly to your landlord. We track due dates and
                report verified payments to Equifax.
              </div>
            </div>
          </div>
          <Link href="/rent-reporting">
            <Button>
              <CreditCard className="h-4 w-4" />
              Go to Rent Reporting
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}

function KpiTile({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="text-lg font-bold tracking-tight tabular-nums">
          {value}
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          {hint}
        </div>
      </div>
    </div>
  );
}

function PaymentMethodCard({
  method,
}: {
  method: {
    brand: "Visa" | "Mastercard" | "Amex";
    last4: string;
    name: string;
    expiry: string;
    primary?: boolean;
  };
}) {
  const brandStyles: Record<typeof method.brand, string> = {
    Visa: "from-[#1A1F71] to-[#2563EB]",
    Mastercard: "from-[#EB001B] to-[#F79E1B]",
    Amex: "from-[#0F4C81] to-[#26A6D1]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 transition",
        method.primary
          ? "border-brand-blue/30 bg-brand-gradient-soft"
          : "border-slate-200/70 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold uppercase tracking-widest text-white shadow-soft",
            brandStyles[method.brand]
          )}
        >
          {method.brand.slice(0, 4)}
        </div>
        {method.primary ? (
          <Badge tone="brand">Primary</Badge>
        ) : (
          <Button variant="ghost" size="sm">
            Make primary
          </Button>
        )}
      </div>

      <div className="mt-3 font-mono text-base font-bold tracking-[0.2em] text-brand-ink dark:text-slate-100">
        •••• {method.last4}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="font-semibold uppercase tracking-wider">
          {method.name}
        </span>
        <span className="font-mono">Exp {method.expiry}</span>
      </div>
    </div>
  );
}

function InvoiceStatusBadge({ status }: { status: "paid" | "upcoming" | "failed" }) {
  if (status === "paid") {
    return (
      <Badge tone="success">
        <CheckCircle2 className="h-3 w-3" /> Paid
      </Badge>
    );
  }
  if (status === "upcoming") {
    return (
      <Badge tone="info">
        <Clock className="h-3 w-3" /> Upcoming
      </Badge>
    );
  }
  return (
    <Badge tone="danger">
      <XCircle className="h-3 w-3" /> Failed
    </Badge>
  );
}
