"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronUp,
  Compass,
  Contact,
  CreditCard,
  FileText,
  FolderLock,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { applications, conversations, tenant } from "@/lib/mock";
import { cn } from "@/lib/cn";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  tone?: "neutral" | "brand";
};

type Section = { title?: string; items: NavItem[] };

function buildSections(): Section[] {
  const unreadMessages = conversations.reduce(
    (n, c) => n + (c.unread || 0),
    0
  );
  const openApplications = applications.filter(
    (a) => a.status !== "rejected"
  ).length;

  return [
    {
      items: [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/discover", label: "Discover", icon: Compass },
      ],
    },
    {
      title: "Rent & Credit",
      items: [
        {
          href: "/rent-reporting",
          label: "Rent Reporting",
          icon: TrendingUp,
          tone: "brand",
        },
        { href: "/billing", label: "Billing", icon: CreditCard },
      ],
    },
    {
      title: "Tenancy",
      items: [
        { href: "/passport", label: "Tenant Passport", icon: Contact },
        {
          href: "/applications",
          label: "Applications",
          icon: FileText,
          badge: openApplications,
        },
        { href: "/documents", label: "Documents", icon: FolderLock },
        {
          href: "/messages",
          label: "Messages",
          icon: MessageSquare,
          badge: unreadMessages || undefined,
        },
      ],
    },
    {
      title: "Account",
      items: [{ href: "/settings", label: "Settings", icon: Settings }],
    },
  ];
}

export function Sidebar({
  variant = "fixed",
  onNavigate,
}: {
  variant?: "fixed" | "drawer";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const sections = buildSections();

  const baseClasses =
    "surface-smoky-vert relative flex h-screen w-64 shrink-0 flex-col border-r border-slate-200/70 backdrop-blur-xl dark:border-slate-800/80";

  const wrapClasses =
    variant === "fixed"
      ? cn("sticky top-0 hidden lg:flex", baseClasses)
      : cn("h-full w-72", baseClasses);

  return (
    <aside className={wrapClasses}>
      {/* Hairline brand strip on the right edge — subtle premium cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
      />
      {/* Soft brand bloom near the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(6,182,212,0.22),transparent_70%)]"
      />
      {/* Smoky dot-grid texture, masked so it fades out toward the middle */}
      <div
        aria-hidden
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.4]"
        style={{
          maskImage:
            "linear-gradient(180deg, black 0%, transparent 35%, transparent 65%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, transparent 35%, transparent 65%, black 100%)",
        }}
      />

      <div className="relative flex items-center gap-2.5 px-5 pb-4 pt-5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
          <span
            aria-hidden
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-60"
          />
          <ShieldCheck className="relative h-5 w-5" strokeWidth={2.4} />
        </div>
        <div className="leading-tight">
          <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Leaze<span className="text-gradient">Sure</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Tenant Portal
          </div>
        </div>
      </div>

      <nav className="relative flex flex-1 flex-col gap-4 overflow-y-auto px-2.5 pb-3 pt-1 scrollbar-clean">
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {section.title ? (
              <div className="px-3 pb-1.5 pt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-900 dark:text-slate-100">
                {section.title}
              </div>
            ) : null}
            {section.items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                pathname={pathname || ""}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}

        <div className="mt-auto px-2 pt-3">
          <Link
            href="/rent-reporting/manage"
            onClick={onNavigate}
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-cyan-200/60 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-2.5 text-xs shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_4px_16px_-8px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/80 hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_22px_-10px_rgba(37,99,235,0.4)] dark:border-cyan-400/20 dark:from-cyan-500/10 dark:via-slate-900/40 dark:to-blue-500/10 dark:hover:border-cyan-400/40"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/10"
            />
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-soft">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="relative leading-tight">
              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                Boost reporting
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                Add 24 months of history →
              </span>
            </span>
          </Link>
        </div>
      </nav>

      <UserCard onNavigate={onNavigate} />
    </aside>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active =
    item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg px-2 py-1 text-[14px] font-semibold transition-all duration-200",
        active
          ? "border border-cyan-200/70 bg-gradient-to-r from-cyan-50/80 via-white/70 to-blue-50/60 text-slate-900 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_4px_14px_-8px_rgba(37,99,235,0.3)] dark:border-cyan-400/20 dark:from-cyan-500/10 dark:via-slate-900/40 dark:to-blue-500/10 dark:text-white"
          : "border border-transparent text-slate-700 hover:translate-x-0.5 hover:border-slate-200/70 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700/70 dark:hover:bg-slate-900/60 dark:hover:text-white"
      )}
    >
      {active ? (
        <span
          aria-hidden
          className="absolute inset-y-1.5 -left-px w-[3px] rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(37,99,235,0.6)]"
        />
      ) : null}
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          active
            ? "bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 dark:from-cyan-500/20 dark:to-blue-500/20 dark:text-cyan-200"
            : "text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:bg-slate-800 dark:group-hover:text-slate-200"
        )}
      >
        <item.icon
          className="h-[18px] w-[18px]"
          strokeWidth={active ? 2.2 : 2}
        />
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge ? (
        <span
          className={cn(
            "inline-flex h-5 min-w-[1.35rem] items-center justify-center rounded-md px-1.5 text-[11px] font-bold ring-1 ring-inset",
            item.tone === "brand"
              ? "bg-brand-gradient text-white ring-white/20"
              : active
              ? "bg-white/80 text-blue-700 ring-cyan-200/70 dark:bg-slate-950/60 dark:text-cyan-300 dark:ring-cyan-400/20"
              : "bg-slate-100/80 text-slate-700 ring-slate-200/60 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-700/60"
          )}
        >
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

function UserCard({ onNavigate }: { onNavigate?: () => void }) {
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
    <div
      ref={wrapRef}
      className="relative border-t border-slate-200/60 p-2.5 dark:border-slate-800/70"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-xl border px-2 py-2 text-left transition-all duration-200",
          open
            ? "border-cyan-200/70 bg-gradient-to-r from-cyan-50/80 via-white/70 to-blue-50/60 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_4px_14px_-8px_rgba(37,99,235,0.3)] dark:border-cyan-400/20 dark:from-cyan-500/10 dark:via-slate-900/40 dark:to-blue-500/10"
            : "border-transparent hover:border-slate-200/80 hover:bg-white/70 hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_4px_14px_-8px_rgba(15,23,42,0.12)] dark:hover:border-slate-700/70 dark:hover:bg-slate-900/60"
        )}
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-glow">
          <span
            aria-hidden
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-60"
          />
          <span className="relative">{tenant.initials}</span>
          <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
          </span>
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
            {tenant.firstName} {tenant.lastName}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            Verified · Pro
          </span>
        </span>
        <ChevronUp
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
            !open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute bottom-[calc(100%-0.25rem)] left-2.5 right-2.5 z-30 origin-bottom overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-glow animate-fadeIn dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
            <div className="truncate text-xs text-slate-500 dark:text-slate-400">
              {tenant.email}
            </div>
          </div>
          <nav className="p-1.5">
            <UserMenuLink
              href="/passport"
              icon={Contact}
              label="Tenant Passport"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            />
            <UserMenuLink
              href="/billing"
              icon={CreditCard}
              label="Billing & invoices"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            />
            <UserMenuLink
              href="/settings"
              icon={Settings}
              label="Settings"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            />
            <UserMenuLink
              href="/settings"
              icon={HelpCircle}
              label="Help & support"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            />
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
