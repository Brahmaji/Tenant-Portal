"use client";

import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  Contact,
  FileUp,
  Files,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar, ScoreRing } from "@/components/ui/ProgressBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { tenant } from "@/lib/mock";
import { cn } from "@/lib/cn";
import { PassportProgress } from "@/components/passport/Progress";
import type { PassportSectionDetail } from "@/components/passport/types";

const sectionDetail: Record<string, PassportSectionDetail> = {
  personal: {
    icon: Contact,
    title: "Personal Info",
    desc: "Name, contact, ID verification",
    todos: [],
    cta: "Review",
    updated: "Mar 18",
  },
  income: {
    icon: Briefcase,
    title: "Employment & Income",
    desc: "Employer, role, monthly income",
    todos: [],
    cta: "Review",
    updated: "Apr 02",
  },
  history: {
    icon: Files,
    title: "Rental History",
    desc: "Past addresses & landlords",
    todos: [
      "Confirm move-out date for 88 Spadina (Aug 2024)",
      "Add landlord contact for 412 Brunswick",
    ],
    cta: "Update history",
  },
  references: {
    icon: Users,
    title: "References",
    desc: "Personal & professional references",
    todos: [
      "Add 2 references — at least 1 professional",
      "Send reference request emails (we'll follow up automatically)",
    ],
    cta: "Add references",
  },
  documents: {
    icon: FileUp,
    title: "Documents",
    desc: "ID, pay stubs, bank statements",
    todos: [
      "Upload reference letter from J. Park",
      "Re-upload March bank statement (current is pending)",
    ],
    cta: "Upload documents",
  },
};

const statusMeta = {
  complete: {
    label: "Complete",
    tone: "success" as const,
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  needs_update: {
    label: "Needs update",
    tone: "warning" as const,
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
  missing: {
    label: "Missing",
    tone: "danger" as const,
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
};

export default function PassportPage() {
  const { passport } = tenant;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tenant Identity"
        title="Tenant Passport"
        description="Upload once, reuse everywhere. A verified passport gets you approved faster."
        action={
          <Button>
            <Sparkles className="h-4 w-4" />
            Make Passport Verified
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <CardBody className="grid gap-6 lg:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-5">
            <ScoreRing score={passport.completion} label="Complete" />
            <div className="space-y-2">
              <Badge tone="brand">
                <Star className="h-3 w-3" /> Tenant Score {passport.score}
              </Badge>
              <div className="text-xl font-bold leading-tight tracking-tight">
                {passport.completion}% complete — almost there.
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Add 2 references and 1 document to reach Verified status.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Insight
              icon={<TrendingUp className="h-4 w-4" />}
              title="Rent-to-income"
              value="34%"
              hint="Healthy — under 40% target"
              tone="ok"
            />
            <Insight
              icon={<Wallet className="h-4 w-4" />}
              title="Verified income"
              value="$6,400/mo"
              hint="3.0× your typical rent"
              tone="ok"
            />
            <Insight
              icon={<AlertTriangle className="h-4 w-4" />}
              title="Missing documents"
              value="2 items"
              hint="Reference letter, March bank stmt."
              tone="warn"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Progress"
          description="Five short sections to a fully verified passport. Tap a step to expand."
        />
        <CardBody>
          <PassportProgress
            variant="timeline"
            sections={passport.sections}
            detail={sectionDetail}
            completion={passport.completion}
          />
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {passport.sections.map((s) => {
          const det = sectionDetail[s.key];
          const status = statusMeta[s.status];
          const Icon = det.icon;
          return (
            <Card key={s.key} className="transition hover:shadow-glow">
              <CardBody className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15 dark:text-cyan-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold">{det.title}</div>
                    <Badge tone={status.tone}>
                      {status.icon}
                      {status.label}
                    </Badge>
                  </div>
                  <div className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {det.desc}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <ProgressBar
                      value={
                        s.status === "complete"
                          ? 100
                          : s.status === "needs_update"
                          ? 65
                          : 25
                      }
                      className="max-w-[200px]"
                    />
                    <Button variant="outline" size="sm">
                      {s.status === "complete" ? "Review" : "Continue"}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Insight({
  icon,
  title,
  value,
  hint,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint: string;
  tone: "ok" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/40 p-4 dark:border-slate-800 dark:bg-slate-800/40">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg ring-1",
            tone === "ok"
              ? "bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
              : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30"
          )}
        >
          {icon}
        </span>
        {title}
      </div>
      <div className="mt-1 text-xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{hint}</div>
    </div>
  );
}
