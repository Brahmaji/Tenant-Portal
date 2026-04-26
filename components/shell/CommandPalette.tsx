"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Compass,
  Contact,
  CornerDownLeft,
  CreditCard,
  FileText,
  FolderLock,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Item = {
  id: string;
  label: string;
  hint?: string;
  href: string;
  group: "Navigation" | "Quick actions";
  icon: LucideIcon;
  keywords?: string;
};

const items: Item[] = [
  { id: "nav-dashboard", label: "Dashboard", href: "/", group: "Navigation", icon: LayoutDashboard, keywords: "home overview" },
  { id: "nav-discover", label: "Discover rentals", href: "/discover", group: "Navigation", icon: Compass, keywords: "search listings properties" },
  { id: "nav-passport", label: "Tenant Passport", href: "/passport", group: "Navigation", icon: Contact, keywords: "profile verified identity" },
  { id: "nav-applications", label: "Applications", href: "/applications", group: "Navigation", icon: FileText, keywords: "rental applications" },
  { id: "nav-rent", label: "Rent Reporting", href: "/rent-reporting", group: "Navigation", icon: TrendingUp, keywords: "credit equifax score" },
  { id: "nav-billing", label: "Billing", href: "/billing", group: "Navigation", icon: CreditCard, keywords: "subscription invoices plan card" },
  { id: "nav-docs", label: "Documents", href: "/documents", group: "Navigation", icon: FolderLock, keywords: "files paystubs lease" },
  { id: "nav-msg", label: "Messages", href: "/messages", group: "Navigation", icon: MessageSquare, keywords: "chat landlord" },
  { id: "nav-settings", label: "Settings", href: "/settings", group: "Navigation", icon: Settings, keywords: "account profile preferences" },
  {
    id: "act-manage",
    label: "Manage rent reporting",
    hint: "Upload proof, tag months",
    href: "/rent-reporting/manage",
    group: "Quick actions",
    icon: ShieldCheck,
    keywords: "upload paystub bank statement equifax",
  },
  {
    id: "act-upload",
    label: "Upload a document",
    hint: "Add to your library",
    href: "/rent-reporting/manage",
    group: "Quick actions",
    icon: Upload,
  },
  {
    id: "act-passport",
    label: "Update Tenant Passport",
    hint: "Complete verification",
    href: "/passport",
    group: "Quick actions",
    icon: Sparkles,
  },
];

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const CommandPaletteContext = createContext<Ctx | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPaletteDialog open={open} onClose={() => setOpen(false)} />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette outside provider");
  return ctx;
}

function CommandPaletteDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<Item["group"], Item[]>();
    for (const i of filtered) {
      if (!map.has(i.group)) map.set(i.group, []);
      map.get(i.group)!.push(i);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const select = useCallback(
    (i: Item) => {
      onClose();
      router.push(i.href);
    },
    [router, onClose]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-fadeIn" />
      <div
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-glow animate-fadeIn dark:border-slate-800 dark:bg-slate-950"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(filtered.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (filtered[active]) select(filtered[active]);
              }
            }}
            placeholder="Search pages, documents, actions…"
            className="h-12 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
          />
          <span className="kbd">esc</span>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-clean">
          {grouped.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No results.
            </div>
          ) : (
            grouped.map(([group, list]) => (
              <div key={group} className="mb-1">
                <div className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {group}
                </div>
                <ul>
                  {list.map((i) => {
                    const idx = filtered.indexOf(i);
                    const isActive = idx === active;
                    return (
                      <li key={i.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => select(i)}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition",
                            isActive
                              ? "bg-brand-gradient-soft text-brand-blue dark:text-cyan-300"
                              : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-lg ring-1",
                              isActive
                                ? "bg-white text-brand-blue ring-brand-blue/15 dark:bg-slate-900 dark:text-cyan-300"
                                : "bg-slate-50 text-slate-500 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800"
                            )}
                          >
                            <i.icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold">
                              {i.label}
                            </span>
                            {i.hint ? (
                              <span className="block truncate text-[11px] text-slate-500 dark:text-slate-400">
                                {i.hint}
                              </span>
                            ) : null}
                          </span>
                          {isActive ? (
                            <CornerDownLeft className="h-3.5 w-3.5 opacity-70" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-3 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span>
            <span>navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kbd">⏎</span>
            <span>open</span>
          </div>
          <Link
            href="/rent-reporting/manage"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue hover:underline"
          >
            <Sparkles className="h-3 w-3" /> Manage reporting
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteTrigger({
  className,
  variant = "input",
}: {
  className?: string;
  variant?: "input" | "icon";
}) {
  const { setOpen } = useCommandPalette();

  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
          className
        )}
      >
        <Search className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group flex h-10 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 text-left text-sm text-slate-500 transition hover:border-slate-300 hover:bg-white focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-900",
        className
      )}
    >
      <Search className="h-4 w-4 text-slate-400" />
      <span className="flex-1 truncate">
        Search pages, documents, actions…
      </span>
      <span className="hidden items-center gap-1 sm:flex">
        <span className="kbd">⌘</span>
        <span className="kbd">K</span>
      </span>
    </button>
  );
}
