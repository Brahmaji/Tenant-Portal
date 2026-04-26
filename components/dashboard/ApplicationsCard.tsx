import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { applications } from "@/lib/mock";

const statusMap = {
  new: { tone: "info" as const, label: "New" },
  in_review: { tone: "warning" as const, label: "In review" },
  approved: { tone: "success" as const, label: "Approved" },
  rejected: { tone: "danger" as const, label: "Rejected" },
};

export function ApplicationsCard() {
  return (
    <Card>
      <CardHeader
        title="Active Applications"
        description="Track every application from submission to approval."
        action={
          <Link
            href="/applications"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gradient-soft px-3 py-1.5 text-xs font-semibold text-brand-blue ring-1 ring-brand-blue/15 transition hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" /> Apply to listings
          </Link>
        }
      />
      <CardBody className="px-0 pb-2 pt-3">
        <ul className="divide-y divide-slate-100">
          {applications.map((app) => {
            const s = statusMap[app.status];
            return (
              <li
                key={app.id}
                className="group flex items-center justify-between gap-4 px-6 py-3.5 transition hover:bg-slate-50/60"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">
                      {app.property}
                    </span>
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    {app.id} · Submitted {app.submitted} · {app.landlord}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold">${app.rent.toLocaleString()}<span className="text-xs font-medium text-slate-500">/mo</span></div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">Rent</div>
                  </div>
                  <Link
                    href={`/applications`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition group-hover:bg-white group-hover:text-brand-blue group-hover:shadow-soft"
                    aria-label="Open"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
