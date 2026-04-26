"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Eye,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import type { Property } from "@/lib/properties";
import { tenant } from "@/lib/mock";
import { Button } from "@/components/ui/Button";
import { ScoreRing } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

type State = "review" | "submitting" | "done";

export function ApplyModal({
  property,
  open,
  onClose,
}: {
  property: Property;
  open: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState<State>("review");
  const [note, setNote] = useState("");
  const [moveIn, setMoveIn] = useState(property.available);
  const [lease, setLease] = useState<string>(property.leaseLengths[0]);

  useEffect(() => {
    if (!open) {
      setState("review");
      setNote("");
      setMoveIn(property.available);
      setLease(property.leaseLengths[0]);
    }
  }, [open, property]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const ratio = ((property.price / 6400) * 100).toFixed(0);

  const submit = () => {
    setState("submitting");
    setTimeout(() => setState("done"), 1100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative ml-auto flex h-full w-full max-w-xl flex-col bg-white shadow-2xl animate-slideInRight">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-100 bg-brand-gradient p-6 text-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-3 w-3" />
            One-click apply
          </div>
          <h2
            id="apply-title"
            className="mt-2 text-2xl font-bold leading-tight tracking-tight"
          >
            Apply with your Tenant Passport
          </h2>
          <p className="mt-1 text-sm text-white/85">
            {property.title} · {property.neighborhood}
          </p>
        </div>

        {state === "done" ? (
          <Success property={property} onClose={onClose} />
        ) : (
          <>
            <div className="scrollbar-clean flex-1 overflow-y-auto px-6 py-6">
              {/* Summary */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.cover}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">
                    {property.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {property.neighborhood} · {property.beds === 0 ? "Studio" : `${property.beds} bd`} · {property.baths} ba
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold leading-none">
                    ${property.price.toLocaleString()}
                    <span className="text-[11px] font-medium text-slate-500">
                      /mo
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">
                    Rent
                  </div>
                </div>
              </div>

              {/* Passport snapshot */}
              <div className="mt-5 rounded-2xl border border-slate-200/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Your Tenant Passport
                    </div>
                    <div className="mt-0.5 text-sm font-bold">
                      {tenant.firstName} {tenant.lastName}
                    </div>
                    <div className="text-xs text-slate-500">
                      Verified · {tenant.city}
                    </div>
                  </div>
                  <ScoreRing
                    score={tenant.passport.score}
                    size={68}
                    stroke={8}
                    label="of 100"
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Tile icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Identity verified" />
                  <Tile icon={<CreditCard className="h-3.5 w-3.5" />} label="Income $6,400/mo" />
                  <Tile icon={<TrendingUp className="h-3.5 w-3.5" />} label={`Rent-to-income ${ratio}%`} />
                  <Tile icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Equifax-reported" />
                </div>

                <Link
                  href="/passport"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview what the landlord sees
                </Link>
              </div>

              {/* Lease details */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Field label="Move-in date">
                  <input
                    type="date"
                    value={moveIn}
                    onChange={(e) => setMoveIn(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15"
                  />
                </Field>
                <Field label="Lease length">
                  <div className="flex gap-1.5">
                    {property.leaseLengths.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLease(l)}
                        className={cn(
                          "flex-1 rounded-xl border px-2 py-2.5 text-xs font-semibold transition",
                          lease === l
                            ? "border-brand-blue bg-brand-gradient-soft text-brand-blue"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {l === "month" ? "Month-to-month" : l === "6mo" ? "6 months" : "12 months"}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Personal note to landlord (optional)" className="mt-4">
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={`Hi ${property.host.name.split(" ")[0]} — I'd love to view this place. I'm a quiet professional with a verified Tenant Passport.`}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15"
                />
              </Field>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 ring-1 ring-emerald-200">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <p>
                  We'll only share your verified Passport summary. Sensitive
                  documents are unlocked only after the landlord makes an offer.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white px-6 py-4">
              <Link
                href={`/discover/${property.id}`}
                className="text-xs font-semibold text-slate-500 hover:text-brand-ink"
              >
                View full listing
              </Link>
              <Button onClick={submit} disabled={state === "submitting"}>
                {state === "submitting" ? (
                  "Submitting…"
                ) : (
                  <>
                    Apply with Passport <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Tile({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2 text-xs">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-brand-blue ring-1 ring-slate-200">
        {icon}
      </span>
      <span className="font-semibold text-slate-700">{label}</span>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function Success({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-white shadow-glow">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-tight">
        Application sent!
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        {property.host.name} has received your verified Passport for{" "}
        {property.title}. We'll notify you the moment they reply.
      </p>

      <div className="mt-6 w-full max-w-sm space-y-2">
        <Link
          href="/applications"
          className="block rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
        >
          Track your applications →
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Keep browsing
        </button>
      </div>
    </div>
  );
}
