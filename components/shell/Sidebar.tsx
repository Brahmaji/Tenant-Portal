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
    "flex h-screen w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80";

  const wrapClasses =
    variant === "fixed"
      ? cn("sticky top-0 hidden lg:flex", baseClasses)
      : cn("h-full w-72", baseClasses);

  return (
    <aside className={wrapClasses}>
      <div className="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
          <ShieldCheck className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <div className="leading-tight">
          <div className="text-base font-bold tracking-tight">
            Leaze<span className="text-gradient">Sure</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Tenant Portal
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-2.5 pb-3 pt-1 scrollbar-clean">
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {section.title ? (
              <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
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
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-brand-blue/15 bg-brand-gradient-soft p-2.5 text-xs transition hover:border-brand-blue/30"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-brand-blue shadow-soft dark:bg-slate-900 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-brand-ink dark:text-slate-100">
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
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "text-brand-ink dark:text-slate-50"
          : "text-slate-500 hover:bg-slate-50 hover:text-brand-ink dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
      )}
    >
      {active ? (
        <span
          aria-hidden
          className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-brand-gradient"
        />
      ) : null}
      <item.icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          active
            ? "text-brand-blue dark:text-cyan-300"
            : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
        )}
        strokeWidth={active ? 2.2 : 1.9}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge ? (
        <span
          className={cn(
            "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md px-1.5 text-[10px] font-bold",
            item.tone === "brand"
              ? "bg-brand-gradient text-white"
              : active
              ? "bg-brand-gradient-soft text-brand-blue dark:text-cyan-300"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
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
    <div ref={wrapRef} className="relative border-t border-slate-200/70 p-2.5 dark:border-slate-800">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-xl border border-transparent px-2 py-2 text-left transition",
          open
            ? "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
            : "hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-900"
        )}
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-soft">
          {tenant.initials}
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-950" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-sm font-semibold">
            {tenant.firstName} {tenant.lastName}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            Verified · Pro
          </span>
        </span>
        <ChevronUp
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition",
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
