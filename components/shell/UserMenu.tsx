"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Contact,
  CreditCard,
  HelpCircle,
  LogOut,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { tenant } from "@/lib/mock";
import { cn } from "@/lib/cn";

const links = [
  { href: "/passport", label: "Tenant Passport", icon: Contact },
  { href: "/billing", label: "Billing & invoices", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/settings", label: "Help & support", icon: HelpCircle },
];

export function UserMenu({
  variant = "compact",
}: {
  /** "compact" — avatar-only trigger; "full" — avatar + name + chevron. */
  variant?: "compact" | "full";
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group flex items-center rounded-xl border transition",
          variant === "compact"
            ? "h-10 w-10 justify-center border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            : "gap-2 border-slate-200 bg-white/70 px-2 py-1.5 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
        )}
      >
        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-[11px] font-bold text-white shadow-soft">
          {tenant.initials}
          <span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-950"
          />
        </span>
        {variant === "full" ? (
          <>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xs font-semibold">
                {tenant.firstName} {tenant.lastName}
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                Verified · Pro
              </span>
            </span>
            <ChevronDown
              className={cn(
                "hidden h-3.5 w-3.5 text-slate-400 transition sm:block",
                open && "rotate-180"
              )}
            />
          </>
        ) : null}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-12 z-40 w-72 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-glow animate-fadeIn dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow">
              {tenant.initials}
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-950"
              />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">
                {tenant.firstName} {tenant.lastName}
              </div>
              <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                {tenant.email}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                Verified · Pro
              </div>
            </div>
          </div>

          <nav className="p-1.5">
            {links.map((l) => (
              <UserMenuLink
                key={l.label}
                href={l.href}
                icon={l.icon}
                label={l.label}
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>

          <div className="border-t border-slate-100 p-1.5 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function UserMenuLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
    >
      <Icon className="h-4 w-4 text-slate-400" />
      {label}
    </Link>
  );
}
