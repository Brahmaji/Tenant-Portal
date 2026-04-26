import { ArrowRight, Filter, MapPin, Plus, Search } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { applications } from "@/lib/mock";

const statusMap = {
  new: { tone: "info" as const, label: "New" },
  in_review: { tone: "warning" as const, label: "In review" },
  approved: { tone: "success" as const, label: "Approved" },
  rejected: { tone: "danger" as const, label: "Rejected" },
};

const stages = ["Submitted", "Verified", "Landlord review", "Decision"];

export default function ApplicationsPage() {
  const counts = applications.reduce(
    (acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }),
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Applications"
        title="Your Applications"
        description="One verified profile, every listing."
        action={
          <Button>
            <Plus className="h-4 w-4" /> Apply to a listing
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Tally label="New" value={counts.new || 0} tone="info" />
        <Tally label="In review" value={counts.in_review || 0} tone="warning" />
        <Tally label="Approved" value={counts.approved || 0} tone="success" />
        <Tally label="Rejected" value={counts.rejected || 0} tone="danger" />
      </div>

      <Card>
        <CardHeader
          title="All applications"
          action={
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search address…"
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-7 pr-2.5 text-xs focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15 dark:border-slate-700 dark:bg-slate-900 sm:w-auto"
                />
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
            </div>
          }
        />
        <CardBody className="space-y-3">
          {applications.map((app) => {
            const s = statusMap[app.status];
            const activeStage =
              app.status === "new"
                ? 1
                : app.status === "in_review"
                ? 2
                : app.status === "approved"
                ? 4
                : 4;
            return (
              <div
                key={app.id}
                className="grid items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-3.5 transition hover:shadow-glow sm:gap-4 sm:p-4 lg:grid-cols-[1.4fr_1fr_auto] dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="truncate text-sm font-semibold">
                      {app.property}
                    </div>
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Toronto, ON
                    </span>
                    <span className="hidden sm:inline">{app.id}</span>
                    <span>Submitted {app.submitted}</span>
                    <span className="hidden sm:inline">
                      Landlord · {app.landlord}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  {stages.map((label, i) => {
                    const idx = i + 1;
                    const done = idx < activeStage;
                    const current = idx === activeStage && app.status !== "rejected";
                    const failed = app.status === "rejected" && idx === 4;
                    return (
                      <div
                        key={label}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div
                          className={
                            done
                              ? "h-1.5 w-full rounded-full bg-emerald-400"
                              : current
                              ? "h-1.5 w-full rounded-full bg-brand-gradient"
                              : failed
                              ? "h-1.5 w-full rounded-full bg-rose-400"
                              : "h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700"
                          }
                        />
                        <div className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <div className="lg:text-right">
                    <div className="text-base font-bold leading-none">
                      ${app.rent.toLocaleString()}
                      <span className="ml-0.5 text-xs font-medium text-slate-500">
                        /mo
                      </span>
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">
                      Rent
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Open <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}

function Tally({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "info" | "warning" | "success" | "danger";
}) {
  const dot: Record<string, string> = {
    info: "bg-sky-500",
    warning: "bg-amber-500",
    success: "bg-emerald-500",
    danger: "bg-rose-500",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        <span className={`h-1.5 w-1.5 rounded-full ${dot[tone]}`} /> {label}
      </div>
      <div className="mt-1 text-3xl font-bold tracking-tight">{value}</div>
    </Card>
  );
}
