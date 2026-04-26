"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Edit3,
  FileText,
  Home,
  Lock,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type StepId = 1 | 2 | 3 | 4 | 5;

type StepDef = {
  id: StepId;
  label: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  ring: string;
};

const STEPS: StepDef[] = [
  {
    id: 1,
    label: "KYC Verification",
    description: "Confirm your identity",
    icon: ScanFace,
    gradient: "from-cyan-500 to-teal-500",
    ring: "ring-cyan-400/30",
  },
  {
    id: 2,
    label: "Personal Information",
    description: "Your details & consent",
    icon: User,
    gradient: "from-violet-500 to-fuchsia-500",
    ring: "ring-violet-400/30",
  },
  {
    id: 3,
    label: "Lease Information",
    description: "Property & landlord",
    icon: Home,
    gradient: "from-blue-500 to-indigo-500",
    ring: "ring-blue-400/30",
  },
  {
    id: 4,
    label: "Review",
    description: "Confirm everything",
    icon: ClipboardCheck,
    gradient: "from-amber-500 to-orange-500",
    ring: "ring-amber-400/30",
  },
  {
    id: 5,
    label: "Activate",
    description: "Go live & report",
    icon: Rocket,
    gradient: "from-emerald-500 to-teal-500",
    ring: "ring-emerald-400/30",
  },
];

type WizardData = {
  // KYC
  kycVerified: boolean;
  // Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  consent: boolean;
  // Lease
  property: string;
  unit: string;
  city: string;
  province: string;
  postalCode: string;
  rent: string;
  dueDay: string;
  leaseStart: string;
  landlordName: string;
  landlordEmail: string;
};

const INITIAL: WizardData = {
  kycVerified: false,
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (416) 555 0123",
  dob: "1994-08-21",
  consent: false,
  property: "1480 Bay Street",
  unit: "1208",
  city: "Toronto",
  province: "Ontario",
  postalCode: "M5R 0A4",
  rent: "2200",
  dueDay: "1",
  leaseStart: "2023-04-01",
  landlordName: "Maple Leaf Property Mgmt.",
  landlordEmail: "leasing@mapleleafpm.ca",
};

export function EnrollWizard() {
  const [step, setStep] = useState<StepId>(1);
  const [done, setDone] = useState<Record<StepId, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [data, setData] = useState<WizardData>(INITIAL);
  const [activated, setActivated] = useState(false);

  const update = <K extends keyof WizardData>(key: K, value: WizardData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const goTo = (id: StepId) => {
    if (id < step || done[id] || done[(id - 1) as StepId] || id === step) {
      setStep(id);
    }
  };

  const next = (current: StepId) => {
    setDone((d) => ({ ...d, [current]: true }));
    if (current < 5) setStep(((current as number) + 1) as StepId);
  };

  const back = () => {
    if (step > 1) setStep(((step as number) - 1) as StepId);
  };

  if (activated) {
    return <ActivatedScreen data={data} />;
  }

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="surface-smoky relative overflow-hidden rounded-2xl p-5 sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.22),transparent_70%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/70 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700 dark:border-cyan-400/20 dark:from-cyan-500/10 dark:to-blue-500/10 dark:text-cyan-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Equifax rent reporting
            </div>
            <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900 sm:text-[26px] dark:text-white">
              Add a property & start reporting
            </h1>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Five quick steps to verify your identity, connect your lease, and
              go live with on-time rent reporting to Equifax Canada.
            </p>
          </div>
          <Link
            href="/rent-reporting"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        </div>
      </div>

      {/* Step indicator */}
      <StepIndicator step={step} done={done} onSelect={goTo} />

      {/* Step content */}
      <div className="surface-smoky relative overflow-hidden rounded-2xl">
        {/* Progress strip */}
        <div className="relative h-1 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 transition-[width] duration-700"
            style={{ width: `${((step as number) / 5) * 100}%` }}
          />
        </div>
        <div className="p-5 sm:p-7 lg:p-8">
          {step === 1 && (
            <Step1KYC
              verified={data.kycVerified}
              onVerify={() => update("kycVerified", true)}
              onNext={() => next(1)}
            />
          )}
          {step === 2 && (
            <Step2Personal
              data={data}
              onChange={update}
              onBack={back}
              onNext={() => next(2)}
            />
          )}
          {step === 3 && (
            <Step3Lease
              data={data}
              onChange={update}
              onBack={back}
              onNext={() => next(3)}
            />
          )}
          {step === 4 && (
            <Step4Review
              data={data}
              onBack={back}
              onNext={() => next(4)}
              onEdit={(s) => setStep(s)}
            />
          )}
          {step === 5 && (
            <Step5Activate
              data={data}
              onBack={back}
              onActivate={() => {
                next(5);
                setActivated(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Step indicator ───────────────────────── */

function StepIndicator({
  step,
  done,
  onSelect,
}: {
  step: StepId;
  done: Record<StepId, boolean>;
  onSelect: (id: StepId) => void;
}) {
  return (
    <div className="surface-smoky relative overflow-hidden rounded-2xl px-3 py-5 sm:px-5 sm:py-6">
      <div className="relative">
        {/* Connector lines */}
        <div className="pointer-events-none absolute inset-x-0 top-[22px] z-0 grid grid-cols-5 sm:top-[26px]">
          {STEPS.map((s, idx) => {
            if (idx === 0) return <div key={s.id} />;
            const prevDone = done[STEPS[idx - 1].id] || step > STEPS[idx - 1].id;
            return (
              <div key={s.id} className="px-0">
                <div
                  className={cn(
                    "h-[3px] w-full -translate-x-1/2 rounded-full transition-all duration-500",
                    prevDone
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : "bg-slate-200 dark:bg-slate-800"
                  )}
                />
              </div>
            );
          })}
        </div>

        <div className="relative z-10 grid grid-cols-5 gap-1">
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isDone = done[s.id] && !isActive;
            const isReachable =
              s.id <= step || done[s.id] || done[(s.id - 1) as StepId];
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                type="button"
                disabled={!isReachable}
                onClick={() => onSelect(s.id)}
                className={cn(
                  "group flex flex-col items-center gap-1.5 px-1 transition",
                  isReachable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                )}
              >
                <span
                  className={cn(
                    "relative flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    "h-11 w-11 sm:h-12 sm:w-12",
                    isActive && "scale-110 border-transparent shadow-lg",
                    isDone && "border-transparent shadow-md",
                    !isActive &&
                      !isDone &&
                      isReachable &&
                      "border-slate-200 bg-white hover:border-cyan-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900",
                    !isReachable &&
                      "border-dashed border-slate-300/70 bg-slate-100/60 dark:border-slate-700/60 dark:bg-slate-800/40"
                  )}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -inset-1.5 rounded-full bg-gradient-to-br opacity-25 blur-md animate-pulse",
                        s.gradient
                      )}
                    />
                  )}
                  {(isActive || isDone) && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-br",
                        isDone ? "from-emerald-500 to-teal-500" : s.gradient
                      )}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center">
                    {!isReachable ? (
                      <Lock className="h-4 w-4 text-slate-400" />
                    ) : isDone ? (
                      <CheckCircle2
                        className="h-5 w-5 text-white"
                        strokeWidth={2.4}
                      />
                    ) : (
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-white" : "text-slate-500 dark:text-slate-400"
                        )}
                        strokeWidth={isActive ? 2.4 : 2}
                      />
                    )}
                  </span>
                </span>

                <span className="mt-0.5 flex flex-col items-center text-center">
                  <span
                    className={cn(
                      "text-[10px] font-bold leading-tight sm:text-[11px] md:text-xs",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : isDone
                        ? "text-emerald-700 dark:text-emerald-300"
                        : isReachable
                        ? "text-slate-600 dark:text-slate-400"
                        : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {s.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 hidden text-[10px] leading-tight sm:block",
                      isActive
                        ? "text-slate-500 dark:text-slate-400"
                        : isDone
                        ? "text-emerald-600/80 dark:text-emerald-400/70"
                        : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {isDone ? "Completed" : s.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Step 1: KYC ───────────────────────── */

function Step1KYC({
  verified,
  onVerify,
  onNext,
}: {
  verified: boolean;
  onVerify: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader
        icon={ScanFace}
        gradient="from-cyan-500 to-teal-500"
        eyebrow="Step 1 · Verify"
        title="Confirm it's really you"
        description="A quick KYC scan to protect your credit file. We'll match your photo ID with a live selfie — takes under 2 minutes."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <KycTile
          icon={FileText}
          title="Government ID"
          desc="Driver's licence, passport, or PR card. Front + back."
          state={verified ? "done" : "pending"}
        />
        <KycTile
          icon={ScanFace}
          title="Live selfie"
          desc="A short liveness check confirms you're really there."
          state={verified ? "done" : "pending"}
        />
      </div>

      <Callout tone="brand">
        <strong className="font-semibold text-slate-900 dark:text-white">
          Bank-level security.
        </strong>{" "}
        Your ID is encrypted, never shared with landlords, and used only to
        verify your identity.
      </Callout>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Lock className="h-3.5 w-3.5" />
          AES-256 encrypted · SOC 2 Type II
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {verified ? (
            <Button onClick={onNext}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onVerify}>
              <ScanFace className="h-4 w-4" />
              Start verification
            </Button>
          )}
          {verified ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Identity confirmed
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function KycTile({
  icon: Icon,
  title,
  desc,
  state,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  state: "pending" | "done";
}) {
  const isDone = state === "done";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 transition",
        isDone
          ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-500/5"
          : "border-slate-200/80 bg-white/70 dark:border-slate-700/60 dark:bg-slate-900/50"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset",
            isDone
              ? "bg-emerald-500 text-white ring-emerald-300/40"
              : "bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 ring-cyan-200/70 dark:from-cyan-500/15 dark:to-blue-500/15 dark:text-cyan-300 dark:ring-cyan-400/20"
          )}
        >
          {isDone ? (
            <CheckCircle2 className="h-5 w-5" strokeWidth={2.4} />
          ) : (
            <Icon className="h-5 w-5" strokeWidth={2} />
          )}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Step 2: Personal Info ──────────────────── */

function Step2Personal({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: WizardData;
  onChange: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!data.consent) return;
    onNext();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <StepHeader
        icon={User}
        gradient="from-violet-500 to-fuchsia-500"
        eyebrow="Step 2 · Personal"
        title="Your details"
        description="We use these to match your reporting record at Equifax. Most fields are pre-filled from your Tenant Passport."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="First name"
          icon={User}
          value={data.firstName}
          onChange={(v) => onChange("firstName", v)}
          required
        />
        <Field
          label="Last name"
          icon={User}
          value={data.lastName}
          onChange={(v) => onChange("lastName", v)}
          required
        />
        <Field
          label="Email"
          icon={Mail}
          type="email"
          value={data.email}
          onChange={(v) => onChange("email", v)}
          required
        />
        <Field
          label="Phone"
          icon={Phone}
          value={data.phone}
          onChange={(v) => onChange("phone", v)}
        />
        <Field
          label="Date of birth"
          type="date"
          value={data.dob}
          onChange={(v) => onChange("dob", v)}
          required
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-4 transition hover:border-cyan-300/70 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-cyan-400/40">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => onChange("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-cyan-400/40 dark:border-slate-600 dark:bg-slate-800"
        />
        <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          I consent to LeazeSure verifying my identity and reporting my rent
          payment history to Equifax Canada. I understand both on-time and late
          payments may be reported.
        </span>
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" disabled={!data.consent}>
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

/* ──────────────────── Step 3: Lease Info ──────────────────── */

function Step3Lease({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: WizardData;
  onChange: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  function submit(e: FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <StepHeader
        icon={Home}
        gradient="from-blue-500 to-indigo-500"
        eyebrow="Step 3 · Lease"
        title="Tell us about your rental"
        description="The address you currently rent and pay for. We'll match your monthly payments to this lease."
      />

      <Section title="Property" icon={Building2}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Street address"
            icon={MapPin}
            value={data.property}
            onChange={(v) => onChange("property", v)}
            required
            className="sm:col-span-2"
          />
          <Field
            label="Unit / Suite (optional)"
            value={data.unit}
            onChange={(v) => onChange("unit", v)}
          />
          <Field
            label="City"
            value={data.city}
            onChange={(v) => onChange("city", v)}
            required
          />
          <Field
            label="Province"
            value={data.province}
            onChange={(v) => onChange("province", v)}
            required
          />
          <Field
            label="Postal code"
            value={data.postalCode}
            onChange={(v) => onChange("postalCode", v)}
            required
          />
        </div>
      </Section>

      <Section title="Lease terms" icon={FileText}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Monthly rent (CAD)"
            type="number"
            value={data.rent}
            onChange={(v) => onChange("rent", v)}
            required
          />
          <Field
            label="Due day of month"
            type="number"
            value={data.dueDay}
            onChange={(v) => onChange("dueDay", v)}
            required
          />
          <Field
            label="Lease start date"
            type="date"
            value={data.leaseStart}
            onChange={(v) => onChange("leaseStart", v)}
            required
          />
        </div>
      </Section>

      <Section title="Landlord" icon={User}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Landlord name"
            icon={User}
            value={data.landlordName}
            onChange={(v) => onChange("landlordName", v)}
            required
          />
          <Field
            label="Landlord email"
            icon={Mail}
            type="email"
            value={data.landlordEmail}
            onChange={(v) => onChange("landlordEmail", v)}
          />
        </div>
      </Section>

      <Callout tone="brand">
        <strong className="font-semibold text-slate-900 dark:text-white">
          Optional but powerful:
        </strong>{" "}
        Upload your lease agreement to unlock 24-month backfill once your
        property is verified.
        <button
          type="button"
          className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline dark:text-cyan-300"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload lease (PDF)
        </button>
      </Callout>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

/* ──────────────────── Step 4: Review ──────────────────── */

function Step4Review({
  data,
  onBack,
  onNext,
  onEdit,
}: {
  data: WizardData;
  onBack: () => void;
  onNext: () => void;
  onEdit: (s: StepId) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeader
        icon={ClipboardCheck}
        gradient="from-amber-500 to-orange-500"
        eyebrow="Step 4 · Review"
        title="Make sure everything checks out"
        description="You can edit any section before activating. Once active, we'll start matching payments and reporting on the next cycle."
      />

      <ReviewBlock
        title="Identity"
        onEdit={() => onEdit(1)}
        rows={[{ k: "KYC verification", v: "Confirmed" }]}
      />

      <ReviewBlock
        title="Personal"
        onEdit={() => onEdit(2)}
        rows={[
          { k: "Name", v: `${data.firstName} ${data.lastName}` },
          { k: "Email", v: data.email },
          { k: "Phone", v: data.phone || "—" },
          { k: "Date of birth", v: data.dob },
        ]}
      />

      <ReviewBlock
        title="Lease"
        onEdit={() => onEdit(3)}
        rows={[
          {
            k: "Property",
            v: `${data.property}${data.unit ? ` · #${data.unit}` : ""}, ${data.city}, ${data.province} ${data.postalCode}`,
          },
          { k: "Monthly rent", v: `$${Number(data.rent).toLocaleString()} CAD` },
          { k: "Due day", v: `Day ${data.dueDay} of each month` },
          { k: "Lease start", v: data.leaseStart },
          { k: "Landlord", v: data.landlordName },
        ]}
      />

      <Callout tone="amber">
        Once activated, late or missed payments may also be reported. Keeping
        rent on-time is the strongest signal to the bureaus.
      </Callout>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Looks good
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ──────────────────── Step 5: Activate ──────────────────── */

function Step5Activate({
  data,
  onBack,
  onActivate,
}: {
  data: WizardData;
  onBack: () => void;
  onActivate: () => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader
        icon={Rocket}
        gradient="from-emerald-500 to-teal-500"
        eyebrow="Step 5 · Activate"
        title="Ready to go live"
        description="Activating starts your reporting on the next cycle. Your first month posts to Equifax on the 5th."
      />

      <div className="rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-slate-900/40 dark:to-teal-500/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              You&rsquo;re enrolling
            </div>
            <div className="mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {data.property}
              {data.unit ? ` · #${data.unit}` : ""}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {data.city}, {data.province} {data.postalCode}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              Monthly rent
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
              ${Number(data.rent).toLocaleString()}
            </div>
            <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              Reports on the 5th
            </div>
          </div>
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        <Bullet>Reporting starts on the next cycle</Bullet>
        <Bullet>Confirmation email sent to your inbox</Bullet>
        <Bullet>First Equifax update within ~30 days</Bullet>
        <Bullet>Cancel anytime from Manage Reporting</Bullet>
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onActivate}>
          <Sparkles className="h-4 w-4" />
          Activate reporting
        </Button>
      </div>
    </div>
  );
}

/* ──────────────────── Activated screen ──────────────────── */

function ActivatedScreen({ data }: { data: WizardData }) {
  return (
    <div className="surface-smoky relative overflow-hidden rounded-2xl p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.25),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.18),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-lg space-y-6 text-center">
        <div className="relative mx-auto h-28 w-28">
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20"
          />
          <span
            aria-hidden
            className="absolute inset-2 rounded-full bg-emerald-500/15"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]">
              <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
            </span>
          </span>
        </div>

        <div>
          <h2 className="text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
            You&rsquo;re all set!
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Rent reporting for{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {data.property}
              {data.unit ? ` · #${data.unit}` : ""}
            </strong>{" "}
            is now active. Your on-time payments will be reported to Equifax
            Canada starting from the next reporting cycle.
          </p>
        </div>

        <ol className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-left text-sm text-slate-600 dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-300">
          {[
            "Reporting account confirmed and saved",
            "First report submitted next cycle",
            "Confirmation email sent to your inbox",
            "Credit file updated within 30 days",
          ].map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                {i + 1}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Link href="/rent-reporting/manage">
            <Button variant="outline">View reporting status</Button>
          </Link>
          <Link href="/rent-reporting">
            <Button>
              <Sparkles className="h-4 w-4" />
              Back to Rent Reporting
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Shared ───────────────────────── */

function StepHeader({
  icon: Icon,
  gradient,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  gradient: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-glow",
          gradient
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-cyan-300">
          {eyebrow}
        </div>
        <h2 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 ring-1 ring-inset ring-cyan-200/70 dark:from-cyan-500/15 dark:to-blue-500/15 dark:text-cyan-300 dark:ring-cyan-400/20">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  required,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: LucideIcon;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
        {label}
        {required ? (
          <span className="ml-0.5 text-rose-500">*</span>
        ) : null}
      </span>
      <div
        className={cn(
          "mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3 transition focus-within:border-cyan-400/70 focus-within:ring-2 focus-within:ring-cyan-400/20 dark:border-slate-700/60 dark:bg-slate-900/50 dark:focus-within:border-cyan-400/40"
        )}
      >
        {Icon ? (
          <Icon className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={2} />
        ) : null}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
        />
      </div>
    </label>
  );
}

function ReviewBlock({
  title,
  onEdit,
  rows,
}: {
  title: string;
  onEdit: () => void;
  rows: { k: string; v: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/70 dark:border-slate-700/60 dark:bg-slate-900/50">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 dark:border-slate-800">
        <h4 className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
          {title}
        </h4>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline dark:text-cyan-300"
        >
          <Edit3 className="h-3 w-3" />
          Edit
        </button>
      </div>
      <dl className="divide-y divide-slate-100 dark:divide-slate-800">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex items-center justify-between gap-3 px-4 py-2.5"
          >
            <dt className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">
              {r.k}
            </dt>
            <dd className="text-right text-[13px] font-semibold text-slate-900 dark:text-white">
              {r.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Callout({
  tone,
  children,
}: {
  tone: "brand" | "amber";
  children: ReactNode;
}) {
  const styles =
    tone === "brand"
      ? "border-cyan-200/70 bg-gradient-to-r from-cyan-50 to-blue-50 text-slate-700 dark:border-cyan-400/20 dark:from-cyan-500/10 dark:to-blue-500/10 dark:text-slate-300"
      : "border-amber-200/70 bg-amber-50/80 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200";
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-xs leading-relaxed",
        styles
      )}
    >
      {children}
    </div>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-2.5 dark:border-slate-700/60 dark:bg-slate-900/50">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.4} />
      <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">
        {children}
      </span>
    </li>
  );
}
